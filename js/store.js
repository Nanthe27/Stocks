// StockFlow Data Store — v1.0.0
// In-memory primary store with background Google Sheets sync

import { t } from './locale.js?v=2';

// ── Default seed data ────────────────────────────────────────────────────────
const DEFAULT_USERS = [
  {
    id: 'u1',
    username: 'nan',
    password: 'admin@nan',
    fullName: 'Owner Account',
    email: 'owner@stockflow.app',
    role: 'owner',
    active: true,
    createdAt: new Date().toISOString(),
  }
];

const DEFAULT_ROLES_PERMISSIONS = {
  owner:    { viewDashboard:true, manageStock:true, manageUsers:true, viewReports:true, editRecords:true, deleteRecords:true, accessSettings:true },
  admin:    { viewDashboard:true, manageStock:true, manageUsers:true, viewReports:true, editRecords:true, deleteRecords:true, accessSettings:false },
  sale:     { viewDashboard:true, manageStock:true, manageUsers:false, viewReports:true, editRecords:true, deleteRecords:false, accessSettings:false },
  customer: { viewDashboard:false, manageStock:false, manageUsers:false, viewReports:false, editRecords:false, deleteRecords:false, accessSettings:false },
};

const DEFAULT_SETTINGS = {
  scriptUrl: 'https://script.google.com/macros/s/AKfycbwyaklphNVT4V8umYwlAV13LyEWsFH2dDay6RpTvE2sLzL2dM2kkRmDJ2-iVNg3B8gd/exec',
  exchangeRate: 4100,
  theme: 'dark',
  lastSync: null,
};

const DEFAULT_STOCK = [];

const DEFAULT_TRANSACTIONS = [];

// ── Store ────────────────────────────────────────────────────────────────────
const Store = {
  users: [],
  stock: [],
  transactions: [],
  rolesPermissions: {},
  settings: { ...DEFAULT_SETTINGS },
  currentUser: null,
  syncStatus: 'idle', // idle | syncing | synced | error
  listeners: {},

  // Event bus
  on(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
  },
  off(event, cb) {
    if (this.listeners[event]) this.listeners[event] = this.listeners[event].filter(f => f !== cb);
  },
  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  },

  // Init: load from localStorage or seed defaults
  init() {
    try {
      const saved = localStorage.getItem('stockflow_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.users = parsed.users || [...DEFAULT_USERS];
        this.stock = parsed.stock || [...DEFAULT_STOCK];
        this.transactions = parsed.transactions || [...DEFAULT_TRANSACTIONS];
        this.rolesPermissions = parsed.rolesPermissions || { ...DEFAULT_ROLES_PERMISSIONS };
        this.settings = { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) };
      } else {
        this._seed();
      }
    } catch {
      this._seed();
    }
  },

  _seed() {
    this.users = [...DEFAULT_USERS];
    this.stock = [...DEFAULT_STOCK];
    this.transactions = [...DEFAULT_TRANSACTIONS];
    this.rolesPermissions = JSON.parse(JSON.stringify(DEFAULT_ROLES_PERMISSIONS));
    this.settings = { ...DEFAULT_SETTINGS };
    this._persist();
  },

  _persist() {
    try {
      localStorage.setItem('stockflow_data', JSON.stringify({
        users: this.users,
        stock: this.stock,
        transactions: this.transactions,
        rolesPermissions: this.rolesPermissions,
        settings: this.settings,
      }));
    } catch (e) {
      console.warn('localStorage persist failed:', e);
    }
  },

  clearCache() {
    localStorage.removeItem('stockflow_data');
    this._seed();
    this.emit('storeChanged', 'cache_cleared');
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  login(username, password) {
    const user = this.users.find(u => u.username === username && u.password === password && u.active);
    if (user) {
      this.currentUser = user;
      sessionStorage.setItem('stockflow_session', JSON.stringify({ id: user.id }));
      return { success: true, user };
    }
    return { success: false };
  },

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('stockflow_session');
    this.emit('logout');
  },

  restoreSession() {
    try {
      const s = sessionStorage.getItem('stockflow_session');
      if (s) {
        const { id } = JSON.parse(s);
        const user = this.users.find(u => u.id === id && u.active);
        if (user) { this.currentUser = user; return true; }
      }
    } catch {}
    return false;
  },

  hasPermission(perm) {
    if (!this.currentUser) return false;
    const rp = this.rolesPermissions[this.currentUser.role];
    return rp ? !!rp[perm] : false;
  },

  // ── Stock CRUD ────────────────────────────────────────────────────────────
  getStock() { return [...this.stock]; },

  addStockItem(item) {
    const newItem = {
      ...item,
      id: 's' + Date.now(),
      createdAt: new Date().toISOString(),
      status: item.quantity <= 0 ? 'out_of_stock' : item.quantity <= 5 ? 'low_stock' : 'in_stock',
    };
    this.stock.push(newItem);
    this._persist();
    this.emit('stockChanged');
    this._bgSync();
    return newItem;
  },

  updateStockItem(id, updates) {
    const idx = this.stock.findIndex(s => s.id === id);
    if (idx === -1) return null;
    const qty = updates.quantity !== undefined ? updates.quantity : this.stock[idx].quantity;
    this.stock[idx] = {
      ...this.stock[idx],
      ...updates,
      status: qty <= 0 ? 'out_of_stock' : qty <= 5 ? 'low_stock' : 'in_stock',
      updatedAt: new Date().toISOString(),
    };
    this._persist();
    this.emit('stockChanged');
    this._bgSync();
    return this.stock[idx];
  },

  deleteStockItem(id) {
    this.stock = this.stock.filter(s => s.id !== id);
    this._persist();
    this.emit('stockChanged');
    this._bgSync();
  },

  // ── Users CRUD ────────────────────────────────────────────────────────────
  getUsers() { return [...this.users]; },

  addUser(user) {
    const newUser = { ...user, id: 'u' + Date.now(), createdAt: new Date().toISOString() };
    this.users.push(newUser);
    this._persist();
    this.emit('usersChanged');
    this._bgSync();
    return newUser;
  },

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    if (this.currentUser && this.currentUser.id === id) {
      this.currentUser = { ...this.users[idx] };
      sessionStorage.setItem('stockflow_session', JSON.stringify({ id: this.currentUser.id }));
    }
    this._persist();
    this.emit('usersChanged');
    this._bgSync();
    return this.users[idx];
  },

  deleteUser(id) {
    if (this.currentUser && this.currentUser.id === id) return false;
    this.users = this.users.filter(u => u.id !== id);
    this._persist();
    this.emit('usersChanged');
    this._bgSync();
    return true;
  },

  // ── Transactions ──────────────────────────────────────────────────────────
  getTransactions() { return [...this.transactions]; },

  addTransaction(tx) {
    const newTx = { ...tx, id: 't' + Date.now(), date: new Date().toISOString() };
    this.transactions.push(newTx);
    this._persist();
    this.emit('transactionsChanged');
    this._bgSync();
    return newTx;
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  getSettings() { return { ...this.settings }; },

  saveSettings(updates) {
    this.settings = { ...this.settings, ...updates };
    this._persist();
    this.emit('settingsChanged', this.settings);
  },

  updateRolesPermissions(newMatrix) {
    this.rolesPermissions = JSON.parse(JSON.stringify(newMatrix));
    this._persist();
    this.emit('settingsChanged', this.settings);
    this._bgSync();
  },

  // ── Google Sheets Sync ────────────────────────────────────────────────────
  async _bgSync() {
    const { scriptUrl } = this.settings;
    if (!scriptUrl) return;
    this.syncStatus = 'syncing';
    this.emit('syncStatus', 'syncing');
    try {
      await this._pushToSheets();
      this.syncStatus = 'synced';
      this.settings.lastSync = new Date().toISOString();
      this._persist();
      this.emit('syncStatus', 'synced');
    } catch (e) {
      this.syncStatus = 'error';
      this.emit('syncStatus', 'error');
      console.warn('Sheets sync error:', e);
    }
  },

  async _pushToSheets() {
    const { scriptUrl } = this.settings;
    if (!scriptUrl) throw new Error('No script URL');
    const payload = {
      action: 'push',
      users: this.users,
      stock: this.stock,
      transactions: this.transactions,
      rolesPermissions: this.rolesPermissions,
    };
    // GAS Web App does a 302 redirect on POST which breaks CORS preflight.
    // no-cors bypasses preflight — response is opaque but data IS received by GAS.
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    });
  },

  async forceSync() {
    const { scriptUrl } = this.settings;
    if (!scriptUrl) return { success: false, message: t('noScript') };
    this.syncStatus = 'syncing';
    this.emit('syncStatus', 'syncing');
    try {
      // Pull from Sheets
      const resp = await fetch(scriptUrl + '?action=pull');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (data.users) this.users = data.users;
      if (data.stock) this.stock = data.stock;
      if (data.transactions) this.transactions = data.transactions;
      if (data.rolesPermissions) this.rolesPermissions = data.rolesPermissions;
      this.settings.lastSync = new Date().toISOString();
      this._persist();
      this.syncStatus = 'synced';
      this.emit('syncStatus', 'synced');
      this.emit('storeChanged', 'force_sync');
      return { success: true };
    } catch (e) {
      this.syncStatus = 'error';
      this.emit('syncStatus', 'error');
      return { success: false, message: e.message };
    }
  },

  // ── Analytics helpers ─────────────────────────────────────────────────────
  getAnalytics(period = 'month', month = null, year = null) {
    const now = new Date();
    let txs = [...this.transactions];

    if (period === 'month') {
      const m = month !== null ? month : now.getMonth();
      const y = year !== null ? year : now.getFullYear();
      txs = txs.filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() === m && d.getFullYear() === y;
      });
    } else if (period === 'year') {
      const y = year !== null ? year : now.getFullYear();
      txs = txs.filter(tx => new Date(tx.date).getFullYear() === y);
    }

    const income = txs.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);

    // Per-user breakdown
    const byUser = {};
    txs.forEach(tx => {
      if (!byUser[tx.userId]) byUser[tx.userId] = { income: 0, expense: 0 };
      if (tx.type === 'income') byUser[tx.userId].income += tx.amount;
      else byUser[tx.userId].expense += tx.amount;
    });

    return {
      income,
      expense,
      profit: income - expense,
      transactions: txs,
      byUser,
      totalStock: this.stock.length,
      totalStockValue: this.stock.reduce((a, s) => a + s.quantity * s.costPrice, 0),
      lowStockCount: this.stock.filter(s => s.status === 'low_stock').length,
      outOfStockCount: this.stock.filter(s => s.status === 'out_of_stock').length,
    };
  },
};

export default Store;
export { DEFAULT_ROLES_PERMISSIONS };
