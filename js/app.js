// StockFlow — Main App v1.0.1
import { t } from './locale.js?v=3';
import Store, { DEFAULT_ROLES_PERMISSIONS } from './store.js?v=3';

// ── SVG Icons (Phosphor-style inline) ───────────────────────────────────────
const icons = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  stock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  reports: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  calculator: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/></svg>`,
  logout: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  add: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  sync: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  alert: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  box: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  dollar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  trending: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

// ── Logo SVG ─────────────────────────────────────────────────────────────────
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="48" height="48">
  <rect width="100" height="100" rx="18" fill="#000"/>
  <g transform="translate(50,50)">
    <!-- Back box -->
    <g transform="translate(0,-12)">
      <path d="M-18,-8 L0,-16 L18,-8 L18,2 L0,10 L-18,2 Z" fill="#333" stroke="#555" stroke-width="0.5"/>
      <path d="M0,-16 L0,10 L18,-8 L18,-18 Z" fill="#222"/>
      <path d="M-18,-8 L0,-16 L0,10 L-18,2 Z" fill="#2a2a2a"/>
    </g>
    <!-- Middle box -->
    <g transform="translate(0,2)">
      <path d="M-14,-6 L0,-12 L14,-6 L14,2 L0,8 L-14,2 Z" fill="#555" stroke="#777" stroke-width="0.5"/>
      <path d="M0,-12 L0,8 L14,-6 L14,-14 Z" fill="#444"/>
      <path d="M-14,-6 L0,-12 L0,8 L-14,2 Z" fill="#4a4a4a"/>
    </g>
    <!-- Front box -->
    <g transform="translate(0,14)">
      <path d="M-10,-5 L0,-9 L10,-5 L10,1 L0,5 L-10,1 Z" fill="#888" stroke="#aaa" stroke-width="0.5"/>
      <path d="M0,-9 L0,5 L10,-5 L10,-11 Z" fill="#777"/>
      <path d="M-10,-5 L0,-9 L0,5 L-10,1 Z" fill="#7a7a7a"/>
    </g>
  </g>
</svg>`;

// ── Utility functions ─────────────────────────────────────────────────────────
function fmt(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtNum(n) { return Number(n).toLocaleString('en-US'); }
function fmtKHR(n) { return '₭' + Math.round(n).toLocaleString('en-US'); }
function fmtDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function fmtDateTime(d) { return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
function uid() { return 'id' + Date.now() + Math.random().toString(36).slice(2); }
function esc(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

// ── Toast system ─────────────────────────────────────────────────────────────
function toast(msg, type = 'info', duration = 3500) {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const iconMap = { success: icons.check, error: icons.alert, warning: icons.alert, info: icons.box };
  el.innerHTML = `${iconMap[type] || ''}<span>${esc(msg)}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => {
    el.classList.add('hiding');
    setTimeout(() => el.remove(), 350);
  }, duration);
}

// ── Confirm dialog ────────────────────────────────────────────────────────────
function confirm(msg, onYes) {
  const ov = document.getElementById('confirm-overlay');
  document.getElementById('confirm-msg').textContent = msg;
  ov.classList.remove('closing');
  ov.classList.add('open');
  const cleanup = () => {
    ov.classList.add('closing');
    setTimeout(() => ov.classList.remove('open', 'closing'), 240);
  };
  document.getElementById('confirm-yes').onclick = () => { cleanup(); onYes(); };
  document.getElementById('confirm-no').onclick = cleanup;
}

// ── Modal helpers ──────────────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('closing');
  el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (!el || !el.classList.contains('open')) return;
  el.classList.add('closing');
  setTimeout(() => {
    el.classList.remove('open', 'closing');
  }, 240);
}
function openDisclaimer() { openModal('disclaimer-modal'); }

// ── Router ────────────────────────────────────────────────────────────────────
const Router = {
  current: 'dashboard',
  navigate(page) {
    this.current = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pageEl = document.getElementById('page-' + page);
    if (pageEl) pageEl.classList.add('active');
    const navEl = document.querySelector(`[data-page="${page}"]`);
    if (navEl) navEl.classList.add('active');
    document.getElementById('topbar-title').textContent = t(page);
    if (typeof MobileNav !== 'undefined') MobileNav.syncFromRouter(page);
    Pages[page] && Pages[page].render && Pages[page].render();
  }
};

// ── Sync indicator ────────────────────────────────────────────────────────────
Store.on('syncStatus', status => {
  const dot = document.getElementById('sync-dot');
  const label = document.getElementById('sync-label');
  if (!dot) return;
  dot.className = 'sync-dot ' + status;
  const labels = { syncing: t('syncing'), synced: t('synced'), error: t('error'), idle: 'Local' };
  label.textContent = labels[status] || 'Local';
});

// ── Theme ─────────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  Store.saveSettings({ theme });
  const icon = document.getElementById('theme-icon');
  if (icon) icon.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
}

// ── Auth ─────────────────────────────────────────────────────────────────────
function initAuth() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const result = Store.login(username, password);
    if (result.success) {
      bootApp();
    } else {
      const err = document.getElementById('login-error');
      err.textContent = t('loginError');
      err.classList.add('show');
      setTimeout(() => err.classList.remove('show'), 3000);
    }
  });
}

function bootApp() {
  const auth = document.getElementById('auth-screen');
  auth.style.opacity = '0';
  auth.style.pointerEvents = 'none';
  setTimeout(() => auth.classList.add('hidden'), 420);
  const app = document.getElementById('app');
  app.classList.add('visible');
  app.style.opacity = '0';
  requestAnimationFrame(() => {
    app.style.transition = 'opacity 0.38s ease';
    app.style.opacity = '1';
    setTimeout(() => { app.style.transition = ''; app.style.opacity = ''; }, 400);
  });
  updateUserDisplay();
  applyTheme(Store.settings.theme || 'dark');
  Router.navigate('dashboard');
}

function updateUserDisplay() {
  const u = Store.currentUser;
  if (!u) return;
  document.getElementById('user-name').textContent = u.fullName || u.username;
  document.getElementById('user-role').textContent = u.role;
  document.getElementById('user-avatar-text').textContent = (u.fullName || u.username)[0].toUpperCase();
}

// ── Pages object ──────────────────────────────────────────────────────────────
const Pages = {};

// ── Dashboard Page ────────────────────────────────────────────────────────────
Pages.dashboard = {
  period: 'month',
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  charts: {},

  render() {
    if (!Store.hasPermission('viewDashboard')) {
      document.getElementById('page-dashboard').innerHTML = `<div class="empty-state">${icons.alert}<p>Access denied.</p></div>`;
      return;
    }
    const data = Store.getAnalytics(this.period, this.month, this.year);
    this.renderStats(data);
    this.renderCharts(data);
    this.renderAlerts(data);
    this.renderActivity(data);
  },

  renderStats(data) {
    document.getElementById('stat-income').textContent = fmt(data.income);
    document.getElementById('stat-expense').textContent = fmt(data.expense);
    document.getElementById('stat-profit').textContent = fmt(data.profit);
    document.getElementById('stat-stock-value').textContent = fmt(data.totalStockValue);
    document.getElementById('stat-total-items').textContent = fmtNum(data.totalStock);
    document.getElementById('stat-low-stock').textContent = data.lowStockCount;
    document.getElementById('stat-out-stock').textContent = data.outOfStockCount;

    const profitEl = document.getElementById('stat-profit');
    profitEl.className = 'stat-value ' + (data.profit >= 0 ? 'text-green' : 'text-red');
  },

  renderCharts(data) {
    if (typeof Chart === 'undefined') return; // Chart.js not loaded yet
    // Bar chart — last 6 months income vs expense
    const months = [];
    const incomeData = [];
    const expenseData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleString('en-US', { month: 'short' }));
      const a = Store.getAnalytics('month', d.getMonth(), d.getFullYear());
      incomeData.push(a.income);
      expenseData.push(a.expense);
    }

    const barCtx = document.getElementById('chart-bar');
    if (barCtx) {
      if (this.charts.bar) this.charts.bar.destroy();
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
      const labelColor = isDark ? '#666' : '#999';
      this.charts.bar = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            { label: 'Income', data: incomeData, backgroundColor: 'rgba(56,161,105,0.75)', borderRadius: 4 },
            { label: 'Expenses', data: expenseData, backgroundColor: 'rgba(229,62,62,0.6)', borderRadius: 4 },
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { labels: { color: labelColor, font: { family: 'Ubuntu', size: 11 } } } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { family: 'Ubuntu', size: 11 } } },
            y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { family: 'Ubuntu', size: 11 }, callback: v => '$' + v } }
          }
        }
      });
    }

    // Donut — stock status
    const donutCtx = document.getElementById('chart-donut');
    if (donutCtx) {
      if (this.charts.donut) this.charts.donut.destroy();
      const stock = Store.getStock();
      const inStock = stock.filter(s => s.status === 'in_stock').length;
      const lowStock = stock.filter(s => s.status === 'low_stock').length;
      const outStock = stock.filter(s => s.status === 'out_of_stock').length;
      this.charts.donut = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['In Stock', 'Low Stock', 'Out of Stock'],
          datasets: [{
            data: [inStock, lowStock, outStock],
            backgroundColor: ['rgba(56,161,105,0.8)','rgba(214,158,46,0.8)','rgba(229,62,62,0.8)'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: '68%',
          plugins: { legend: { position: 'bottom', labels: { color: isDark ? '#666' : '#999', font: { family: 'Ubuntu', size: 11 } } } }
        }
      });
    }
  },

  renderAlerts(data) {
    const lowStock = Store.getStock().filter(s => s.status !== 'in_stock');
    const el = document.getElementById('low-stock-alerts');
    if (!el) return;
    if (lowStock.length === 0) {
      el.innerHTML = `<div class="empty-state" style="padding:20px"><p>All items well-stocked.</p></div>`;
    } else {
      el.innerHTML = lowStock.slice(0, 5).map(s => `
        <div class="flex items-center justify-between" style="padding:10px 0;border-bottom:1px solid var(--border-subtle)">
          <div>
            <div style="font-size:.85rem;font-weight:600">${esc(s.name)}</div>
            <div style="font-size:.75rem;color:var(--text-muted)">${esc(s.sku)}</div>
          </div>
          <span class="badge ${s.status === 'low_stock' ? 'badge-gold' : 'badge-red'}">${s.quantity} left</span>
        </div>`).join('');
    }
    const badge = document.getElementById('nav-stock-badge');
    if (badge) { badge.textContent = lowStock.length; badge.style.display = lowStock.length ? '' : 'none'; }
  },

  renderActivity(data) {
    const el = document.getElementById('recent-activity');
    if (!el) return;
    const txs = data.transactions.slice(-6).reverse();
    if (txs.length === 0) {
      el.innerHTML = `<div class="empty-state" style="padding:20px"><p>No activity this period.</p></div>`;
      return;
    }
    el.innerHTML = txs.map(tx => `
      <div class="flex items-center justify-between" style="padding:10px 0;border-bottom:1px solid var(--border-subtle)">
        <div class="flex items-center gap-2">
          <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${tx.type === 'income' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)'};">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)'}" stroke-width="2.5"><${tx.type === 'income' ? 'polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"' : 'polyline points="1 6 10.5 15.5 15.5 10.5 23 18"/><polyline points="7 6 1 6 1 12"'}/></svg>
          </div>
          <div>
            <div style="font-size:.82rem;font-weight:600">${esc(tx.description)}</div>
            <div style="font-size:.72rem;color:var(--text-muted)">${fmtDateTime(tx.date)}</div>
          </div>
        </div>
        <span style="font-weight:700;font-size:.88rem;color:${tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)'}">
          ${tx.type === 'income' ? '+' : '-'}${fmt(tx.amount)}
        </span>
      </div>`).join('');
  }
};

// ── Stock Page ────────────────────────────────────────────────────────────────
Pages.stock = {
  search: '',
  filter: 'all',
  page: 1,
  perPage: 10,
  editingId: null,
  sellingId: null,

  render() {
    this.renderTable();
  },

  filtered() {
    let items = Store.getStock();
    if (this.search) {
      const q = this.search.toLowerCase();
      items = items.filter(s => s.name.toLowerCase().includes(q) || s.sku.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }
    if (this.filter !== 'all') items = items.filter(s => s.status === this.filter);
    return items;
  },

  renderTable() {
    const items = this.filtered();
    const total = items.length;
    const start = (this.page - 1) * this.perPage;
    const paged = items.slice(start, start + this.perPage);

    const tbody = document.getElementById('stock-tbody');
    if (!tbody) return;

    const canEdit = Store.hasPermission('editRecords');
    const canDelete = Store.hasPermission('deleteRecords');

    if (paged.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted)">${t('noItems')}</td></tr>`;
    } else {
      tbody.innerHTML = paged.map(s => {
        const statusBadge = s.status === 'in_stock'
          ? `<span class="badge badge-green">${t('inStock')}</span>`
          : s.status === 'low_stock'
          ? `<span class="badge badge-gold">${t('lowStockStatus')}</span>`
          : `<span class="badge badge-red">${t('outOfStock')}</span>`;
        const rowClass = s.status === 'low_stock' ? 'row-low' : s.status === 'out_of_stock' ? 'row-out' : '';
        return `<tr class="${rowClass}" data-id="${s.id}">
          <td><span style="font-family:var(--font-heading);font-size:.75rem;font-weight:700;color:var(--text-muted)">${esc(s.sku)}</span></td>
          <td><div style="font-weight:600">${esc(s.name)}</div><div style="font-size:.75rem;color:var(--text-muted)">${esc(s.category)}</div></td>
          <td><span style="font-weight:700">${fmtNum(s.quantity)}</span></td>
          <td>${fmt(s.costPrice)}</td>
          <td>${fmt(s.salePrice)}</td>
          <td style="color:${s.salePrice - s.costPrice >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'};font-weight:600">${fmt(s.salePrice - s.costPrice)}</td>
          <td>${esc(s.supplier)}</td>
          <td>${statusBadge}</td>
          <td>
            <div class="flex gap-2">
              ${canEdit ? `<button class="btn-icon" style="color:var(--accent-green)" onclick="Pages.stock.openSell('${s.id}')" title="Record Sale"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></button>` : ''}
              ${canEdit ? `<button class="btn-icon" onclick="Pages.stock.openEdit('${s.id}')" title="${t('edit')}">${icons.edit}</button>` : ''}
              ${canDelete ? `<button class="btn-icon" style="color:var(--accent-red)" onclick="Pages.stock.confirmDelete('${s.id}')" title="${t('delete')}">${icons.trash}</button>` : ''}
            </div>
          </td>
        </tr>`;
      }).join('');
    }

    // Pagination
    const totalPages = Math.ceil(total / this.perPage) || 1;
    const pageInfo = document.getElementById('stock-page-info');
    const pageBtns = document.getElementById('stock-page-btns');
    if (pageInfo) pageInfo.textContent = `${start + 1}–${Math.min(start + this.perPage, total)} ${t('of')} ${total}`;
    if (pageBtns) {
      pageBtns.innerHTML = `
        <button class="page-btn" onclick="Pages.stock.goPage(${this.page - 1})" ${this.page <= 1 ? 'disabled' : ''}>&lt;</button>
        <button class="page-btn active">${this.page}</button>
        <button class="page-btn" onclick="Pages.stock.goPage(${this.page + 1})" ${this.page >= totalPages ? 'disabled' : ''}>&gt;</button>`;
    }
  },

  goPage(n) { this.page = Math.max(1, n); this.renderTable(); },

  openAdd() {
    this.editingId = null;
    document.getElementById('stock-modal-title').textContent = t('addItem');
    document.getElementById('stock-form').reset();
    // Auto-fill today's date
    document.getElementById('stock-date').value = new Date().toISOString().split('T')[0];
    openModal('stock-modal');
  },

  openEdit(id) {
    const item = Store.getStock().find(s => s.id === id);
    if (!item) return;
    this.editingId = id;
    document.getElementById('stock-modal-title').textContent = t('editItem');
    const f = document.getElementById('stock-form');
    f['stock-name'].value = item.name;
    f['stock-sku'].value = item.sku || '';
    f['stock-category'].value = item.category;
    f['stock-quantity'].value = item.quantity;
    f['stock-cost'].value = item.costPrice;
    f['stock-sale'].value = item.salePrice;
    f['stock-supplier'].value = item.supplier;
    f['stock-barcode'].value = item.barcode || '';
    // Show existing date or today
    const existing = item.createdAt ? item.createdAt.split('T')[0] : new Date().toISOString().split('T')[0];
    document.getElementById('stock-date').value = existing;
    openModal('stock-modal');
  },

  saveItem() {
    const f = document.getElementById('stock-form');
    const dateVal = f['stock-date'].value;
    const item = {
      name: f['stock-name'].value.trim(),
      sku: f['stock-sku'].value.trim(),
      category: f['stock-category'].value.trim(),
      quantity: parseInt(f['stock-quantity'].value) || 0,
      costPrice: parseFloat(f['stock-cost'].value) || 0,
      salePrice: parseFloat(f['stock-sale'].value) || 0,
      supplier: f['stock-supplier'].value.trim(),
      barcode: f['stock-barcode'].value.trim(),
      createdAt: dateVal ? new Date(dateVal).toISOString() : new Date().toISOString(),
    };
    if (!item.name) { toast('Item name is required.', 'error'); return; }
    if (this.editingId) {
      Store.updateStockItem(this.editingId, item);
      toast(t('success') + ': Item updated.', 'success');
    } else {
      Store.addStockItem(item);
      toast(t('success') + ': Item added.', 'success');
    }
    closeModal('stock-modal');
    this.renderTable();
    Pages.dashboard.render && Pages.dashboard.render();
  },

  confirmDelete(id) {
    confirm(t('deleteWarning'), () => {
      Store.deleteStockItem(id);
      toast('Item deleted.', 'warning');
      this.renderTable();
      Pages.dashboard.render && Pages.dashboard.render();
    });
  },

  openSell(id) {
    const item = Store.getStock().find(s => s.id === id);
    if (!item) return;
    this.sellingId = id;
    document.getElementById('sell-item-name').textContent = item.name;
    document.getElementById('sell-item-sku').textContent = item.sku;
    document.getElementById('sell-item-stock').textContent = fmtNum(item.quantity);
    document.getElementById('sell-qty').value = 1;
    document.getElementById('sell-price').value = item.salePrice;
    document.getElementById('sell-note').value = '';
    document.getElementById('sell-total-display').textContent = fmt(item.salePrice);
    openModal('sell-modal');
  },

  updateSellTotal() {
    const qty = parseFloat(document.getElementById('sell-qty').value) || 0;
    const price = parseFloat(document.getElementById('sell-price').value) || 0;
    document.getElementById('sell-total-display').textContent = fmt(qty * price);
  },

  recordSale() {
    const id = this.sellingId;
    const item = Store.getStock().find(s => s.id === id);
    if (!item) return;
    const qty = parseInt(document.getElementById('sell-qty').value) || 0;
    const price = parseFloat(document.getElementById('sell-price').value) || 0;
    const note = document.getElementById('sell-note').value.trim();
    if (qty <= 0) { toast('Quantity must be at least 1.', 'error'); return; }
    if (qty > item.quantity) { toast('Not enough stock. Available: ' + fmtNum(item.quantity), 'error'); return; }
    if (price <= 0) { toast('Sale price must be greater than 0.', 'error'); return; }
    const total = qty * price;
    Store.updateStockItem(id, { quantity: item.quantity - qty });
    Store.addTransaction({
      type: 'income',
      amount: total,
      description: `Sale: ${qty}x ${item.name}${note ? ' — ' + note : ''}`,
      userId: Store.currentUser.id,
    });
    closeModal('sell-modal');
    toast(`Sold ${qty}x ${item.name} for ${fmt(total)}`, 'success');
    this.renderTable();
    Pages.dashboard.render && Pages.dashboard.render();
  },
};

// ── Users Page ────────────────────────────────────────────────────────────────
Pages.users = {
  editingId: null,

  render() {
    if (!Store.hasPermission('manageUsers')) {
      document.getElementById('page-users').innerHTML = `<div class="empty-state">${icons.alert}<p>Access denied.</p></div>`;
      return;
    }
    this.renderTable();
  },

  renderTable() {
    const users = Store.getUsers();
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;
    const currentId = Store.currentUser.id;
    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">${t('noData')}</td></tr>`;
    } else {
      tbody.innerHTML = users.map(u => `
        <tr>
          <td><div style="font-weight:600">${esc(u.fullName || u.username)}</div><div style="font-size:.75rem;color:var(--text-muted)">${esc(u.email || '')}</div></td>
          <td><span style="font-family:var(--font-heading);font-size:.82rem">${esc(u.username)}</span></td>
          <td><span class="badge ${this.roleBadge(u.role)}">${u.role}</span></td>
          <td><span class="badge ${u.active ? 'badge-green' : 'badge-neutral'}">${u.active ? t('active') : t('inactive')}</span></td>
          <td style="color:var(--text-muted);font-size:.78rem">${fmtDate(u.createdAt)}</td>
          <td>
            <div class="flex gap-2">
              <button class="btn-icon" onclick="Pages.users.openEdit('${u.id}')">${icons.edit}</button>
              ${u.id !== currentId ? `<button class="btn-icon" style="color:var(--accent-red)" onclick="Pages.users.confirmDelete('${u.id}')">${icons.trash}</button>` : ''}
            </div>
          </td>
        </tr>`).join('');
    }
  },

  roleBadge(r) {
    return { owner: 'role-owner', admin: 'role-admin', sale: 'role-sale', customer: 'role-customer' }[r] || 'badge-neutral';
  },

  openAdd() {
    this.editingId = null;
    document.getElementById('user-modal-title').textContent = t('addUser');
    document.getElementById('user-form').reset();
    document.getElementById('user-pwd-row').style.display = '';
    openModal('user-modal');
  },

  openEdit(id) {
    const u = Store.getUsers().find(u => u.id === id);
    if (!u) return;
    this.editingId = id;
    document.getElementById('user-modal-title').textContent = t('editUser');
    const f = document.getElementById('user-form');
    f['user-fullname'].value = u.fullName || '';
    f['user-username'].value = u.username;
    f['user-email'].value = u.email || '';
    f['user-role'].value = u.role;
    f['user-active'].value = u.active ? 'true' : 'false';
    f['user-password'].value = '';
    document.getElementById('user-pwd-row').style.display = this.editingId ? '' : '';
    openModal('user-modal');
  },

  saveUser() {
    const f = document.getElementById('user-form');
    const data = {
      fullName: f['user-fullname'].value.trim(),
      username: f['user-username'].value.trim(),
      email: f['user-email'].value.trim(),
      role: f['user-role'].value,
      active: f['user-active'].value === 'true',
    };
    const pwd = f['user-password'].value;
    if (pwd) data.password = pwd;
    if (!data.username) { toast('Username required.', 'error'); return; }

    if (this.editingId) {
      Store.updateUser(this.editingId, data);
      toast('User updated.', 'success');
      updateUserDisplay();
    } else {
      if (!pwd) { toast('Password required for new user.', 'error'); return; }
      Store.addUser(data);
      toast('User added.', 'success');
    }
    closeModal('user-modal');
    this.renderTable();
  },

  confirmDelete(id) {
    confirm(t('deleteWarning'), () => {
      Store.deleteUser(id);
      toast('User deleted.', 'warning');
      this.renderTable();
    });
  },
};

// ── Reports Page ──────────────────────────────────────────────────────────────
Pages.reports = {
  period: 'month',
  chart: null,

  render() {
    if (!Store.hasPermission('viewReports')) {
      document.getElementById('page-reports').innerHTML = `<div class="empty-state">${icons.alert}<p>Access denied.</p></div>`;
      return;
    }
    const data = Store.getAnalytics(this.period);
    this.renderSummary(data);
    this.renderUserBreakdown(data);
    this.renderTrendChart(data);
  },

  renderSummary(data) {
    const el = document.getElementById('report-summary');
    if (!el) return;
    el.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div style="text-align:center;padding:20px;background:var(--bg-elevated);border-radius:var(--radius-sm)">
          <div style="font-size:1.4rem;font-weight:700;color:var(--accent-green);font-family:var(--font-heading)">${fmt(data.income)}</div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px;text-transform:uppercase;letter-spacing:.06em">${t('income')}</div>
        </div>
        <div style="text-align:center;padding:20px;background:var(--bg-elevated);border-radius:var(--radius-sm)">
          <div style="font-size:1.4rem;font-weight:700;color:var(--accent-red);font-family:var(--font-heading)">${fmt(data.expense)}</div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px;text-transform:uppercase;letter-spacing:.06em">${t('expenses')}</div>
        </div>
        <div style="text-align:center;padding:20px;background:var(--bg-elevated);border-radius:var(--radius-sm)">
          <div style="font-size:1.4rem;font-weight:700;color:${data.profit >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'};font-family:var(--font-heading)">${fmt(data.profit)}</div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px;text-transform:uppercase;letter-spacing:.06em">${t('profit')}</div>
        </div>
      </div>`;
  },

  renderUserBreakdown(data) {
    const el = document.getElementById('report-user-breakdown');
    if (!el) return;
    const users = Store.getUsers();
    const rows = Object.entries(data.byUser).map(([uid, vals]) => {
      const u = users.find(u => u.id === uid);
      return { name: u ? (u.fullName || u.username) : uid, ...vals, profit: vals.income - vals.expense };
    });
    if (rows.length === 0) { el.innerHTML = `<div class="empty-state" style="padding:20px"><p>${t('noData')}</p></div>`; return; }
    el.innerHTML = `<table class="data-table"><thead><tr>
      <th>${t('fullName')}</th><th>${t('income')}</th><th>${t('expenses')}</th><th>${t('profit')}</th>
    </tr></thead><tbody>
      ${rows.map(r => `<tr>
        <td>${esc(r.name)}</td>
        <td style="color:var(--accent-green)">${fmt(r.income)}</td>
        <td style="color:var(--accent-red)">${fmt(r.expense)}</td>
        <td style="color:${r.profit >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'};font-weight:700">${fmt(r.profit)}</td>
      </tr>`).join('')}
    </tbody></table>`;
  },

  renderTrendChart(data) {
    const ctx = document.getElementById('report-chart');
    if (!ctx) return;
    if (this.chart) this.chart.destroy();
    const months = [];
    const profits = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleString('en-US', { month: 'short' }));
      const a = Store.getAnalytics('month', d.getMonth(), d.getFullYear());
      profits.push(a.profit);
    }
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const labelColor = isDark ? '#666' : '#999';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Profit', data: profits,
          borderColor: 'rgba(49,130,206,0.8)',
          backgroundColor: 'rgba(49,130,206,0.08)',
          tension: 0.4, fill: true, borderWidth: 2,
          pointBackgroundColor: profits.map(v => v >= 0 ? 'rgba(56,161,105,1)' : 'rgba(229,62,62,1)'),
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { family: 'Ubuntu', size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { family: 'Ubuntu', size: 11 }, callback: v => '$' + v } }
        }
      }
    });
  },
};

// ── Sales Page ────────────────────────────────────────────────────────────────
Pages.sales = {
  page: 1,
  perPage: 15,

  render() {
    this.renderSummary();
    this.renderTable();
  },

  getSales() {
    const q = (document.getElementById('sales-search')?.value || '').toLowerCase();
    return Store.getTransactions()
      .filter(tx => tx.type === 'income')
      .filter(tx => !q || tx.description.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  renderSummary() {
    const txs = Store.getTransactions().filter(t => t.type === 'income');
    const total = txs.reduce((s, t) => s + t.amount, 0);
    const today = new Date().toDateString();
    const todayTotal = txs.filter(t => new Date(t.date).toDateString() === today).reduce((s, t) => s + t.amount, 0);
    const now = new Date();
    const monthTotal = txs.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((s, t) => s + t.amount, 0);

    document.getElementById('sales-summary').innerHTML = `
      <div><div style="font-size:.7rem;font-family:var(--font-heading);text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);margin-bottom:4px">Today</div><div style="font-size:1.25rem;font-weight:700;font-family:var(--font-heading);color:var(--accent-green)">${fmt(todayTotal)}</div></div>
      <div style="width:1px;background:var(--border)"></div>
      <div><div style="font-size:.7rem;font-family:var(--font-heading);text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);margin-bottom:4px">This Month</div><div style="font-size:1.25rem;font-weight:700;font-family:var(--font-heading);color:var(--accent-green)">${fmt(monthTotal)}</div></div>
      <div style="width:1px;background:var(--border)"></div>
      <div><div style="font-size:.7rem;font-family:var(--font-heading);text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);margin-bottom:4px">All Time</div><div style="font-size:1.25rem;font-weight:700;font-family:var(--font-heading);color:var(--text-primary)">${fmt(total)}</div></div>
      <div style="width:1px;background:var(--border)"></div>
      <div><div style="font-size:.7rem;font-family:var(--font-heading);text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);margin-bottom:4px">Transactions</div><div style="font-size:1.25rem;font-weight:700;font-family:var(--font-heading);color:var(--text-secondary)">${txs.length}</div></div>
    `;
  },

  renderTable() {
    const sales = this.getSales();
    const start = (this.page - 1) * this.perPage;
    const paged = sales.slice(start, start + this.perPage);
    const users = Store.getUsers();
    const getUser = id => { const u = users.find(u => u.id === id); return u ? (u.fullName || u.username) : id; };

    const table = document.getElementById('sales-table');
    if (!sales.length) {
      table.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted)">No sales recorded yet.</td></tr>`;
      document.getElementById('sales-pagination').innerHTML = '';
      return;
    }

    table.innerHTML = `
      <thead><tr>
        <th>Date</th><th>Description</th><th>Sold By</th><th style="text-align:right">Amount</th>
      </tr></thead>
      <tbody>
        ${paged.map(tx => {
          const d = new Date(tx.date);
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          return `<tr>
            <td><div style="font-weight:600;font-size:.85rem">${dateStr}</div><div style="font-size:.75rem;color:var(--text-muted)">${timeStr}</div></td>
            <td style="max-width:280px;white-space:normal">${tx.description}</td>
            <td style="color:var(--text-secondary);font-size:.85rem">${getUser(tx.userId)}</td>
            <td style="text-align:right;font-weight:700;font-family:var(--font-heading);color:var(--accent-green)">+${fmt(tx.amount)}</td>
          </tr>`;
        }).join('')}
      </tbody>
    `;

    // Pagination
    const pages = Math.ceil(sales.length / this.perPage);
    document.getElementById('sales-pagination').innerHTML = pages <= 1 ? '' : `
      <button class="btn btn-secondary btn-sm" ${this.page <= 1 ? 'disabled' : ''} onclick="Pages.sales.page--;Pages.sales.renderTable()">Prev</button>
      <span style="font-size:.82rem;color:var(--text-muted);padding:0 8px">${this.page} / ${pages}</span>
      <button class="btn btn-secondary btn-sm" ${this.page >= pages ? 'disabled' : ''} onclick="Pages.sales.page++;Pages.sales.renderTable()">Next</button>
    `;
  },
};

// ── Settings Page ─────────────────────────────────────────────────────────────
Pages.settings = {
  render() {
    if (!Store.hasPermission('accessSettings')) {
      document.getElementById('page-settings').innerHTML = `<div class="empty-state">${icons.alert}<p>Access denied.</p></div>`;
      return;
    }
    const s = Store.getSettings();
    const urlEl = document.getElementById('setting-script-url');
    const rateEl = document.getElementById('setting-exchange-rate');
    if (urlEl) urlEl.value = s.scriptUrl || '';
    if (rateEl) rateEl.value = s.exchangeRate || 4100;
    const lastSyncEl = document.getElementById('last-sync-time');
    if (lastSyncEl) lastSyncEl.textContent = s.lastSync ? fmtDateTime(s.lastSync) : t('never');
    this.renderPermMatrix();
    this.updateThemeToggle();
  },

  updateThemeToggle() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const track = document.getElementById('theme-track');
    const label = document.getElementById('theme-label');
    if (track) track.className = 'toggle-track' + (isDark ? ' on' : '');
    if (label) label.textContent = isDark ? t('darkMode') : t('lightMode');
  },

  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    applyTheme(isDark ? 'light' : 'dark');
    this.updateThemeToggle();
    Pages.dashboard.render && Pages.dashboard.render();
    Pages.reports.render && Pages.reports.render();
  },

  saveSettings() {
    const url = document.getElementById('setting-script-url').value.trim();
    const rate = parseFloat(document.getElementById('setting-exchange-rate').value) || 4100;
    Store.saveSettings({ scriptUrl: url, exchangeRate: rate });
    toast(t('success') + ': Settings saved.', 'success');
    Pages.settings.render();
  },

  async clearCache() {
    confirm(t('clearCacheConfirm'), () => {
      Store.clearCache();
      toast('Cache cleared. Data reset to defaults.', 'warning');
      updateUserDisplay();
      Pages.settings.render();
    });
  },

  async forceSync() {
    const btn = document.getElementById('btn-force-sync');
    if (btn) { btn.disabled = true; btn.textContent = t('syncing'); }
    const result = await Store.forceSync();
    if (btn) { btn.disabled = false; btn.innerHTML = `${icons.sync} ${t('forceSync')}`; }
    if (result.success) {
      toast(t('forceSyncSuccess'), 'success');
      if (Router.current) Pages[Router.current] && Pages[Router.current].render && Pages[Router.current].render();
    } else {
      toast(t('forceSyncError') + ': ' + result.message, 'error');
    }
    Pages.settings.render();
  },

  renderPermMatrix() {
    const el = document.getElementById('perm-matrix');
    if (!el) return;
    const rp = Store.rolesPermissions;
    const roles = ['owner', 'admin', 'sale', 'customer'];
    const perms = ['viewDashboard','manageStock','manageUsers','viewReports','editRecords','deleteRecords','accessSettings'];
    const permLabels = {
      viewDashboard: t('permViewDashboard'), manageStock: t('permManageStock'),
      manageUsers: t('permManageUsers'), viewReports: t('permViewReports'),
      editRecords: t('permEditRecords'), deleteRecords: t('permDeleteRecords'),
      accessSettings: t('permAccessSettings'),
    };
    const isOwner = Store.currentUser.role === 'owner';
    el.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:.85rem">
      <thead><tr>
        <th style="text-align:left;padding:8px 12px;font-family:var(--font-heading);font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)">${t('permissions')}</th>
        ${roles.map(r => `<th style="text-align:center;padding:8px 12px;font-family:var(--font-heading);font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase"><span class="badge ${Pages.users.roleBadge(r)}">${r}</span></th>`).join('')}
      </tr></thead>
      <tbody>
        ${perms.map(p => `<tr style="border-top:1px solid var(--border-subtle)">
          <td style="padding:10px 12px;font-weight:500">${permLabels[p]}</td>
          ${roles.map(r => `<td style="text-align:center;padding:10px 12px">
            <input type="checkbox" ${(rp[r] && rp[r][p]) ? 'checked' : ''} ${!isOwner ? 'disabled' : ''}
              onchange="Pages.settings.setPerm('${r}','${p}',this.checked)" style="width:15px;height:15px;cursor:pointer;accent-color:var(--text-primary)">
          </td>`).join('')}
        </tr>`).join('')}
      </tbody>
    </table>`;
  },

  setPerm(role, perm, value) {
    if (Store.currentUser.role !== 'owner') return;
    const rp = JSON.parse(JSON.stringify(Store.rolesPermissions));
    if (!rp[role]) rp[role] = {};
    rp[role][perm] = value;
    Store.updateRolesPermissions(rp);
    toast('Permissions updated.', 'success');
  },
};

// ── Calculator ────────────────────────────────────────────────────────────────
const Calc = {
  display: '0',
  expression: '',
  justCalc: false,

  open() { document.getElementById('calc-overlay').classList.add('open'); this.updateDisplay(); },
  close() {
    const ov = document.getElementById('calc-overlay');
    ov.classList.add('closing');
    setTimeout(() => ov.classList.remove('open', 'closing'), 240);
  },

  press(val) {
    if (val === 'C') { this.display = '0'; this.expression = ''; this.justCalc = false; }
    else if (val === '=') {
      try { const r = Function('"use strict";return (' + this.expression + ')')(); this.display = String(parseFloat(r.toFixed(8))); this.expression = this.display; this.justCalc = true; }
      catch { this.display = 'Error'; this.expression = ''; }
    } else if (val === '+/-') {
      this.display = String(-parseFloat(this.display));
      this.expression = this.display;
    } else if (val === '%') {
      this.display = String(parseFloat(this.display) / 100);
      this.expression = this.display;
    } else {
      if (this.justCalc && !isNaN(val)) { this.expression = val; this.display = val; this.justCalc = false; }
      else { if (this.display === '0' && !isNaN(val)) { this.expression = val; this.display = val; }
        else { this.expression += val; this.display = this.expression.length > 14 ? this.expression.slice(-14) : this.expression; }
      }
    }
    this.updateDisplay();
    this.syncConverter();
  },

  updateDisplay() {
    const d = document.getElementById('calc-main');
    const s = document.getElementById('calc-sub');
    if (d) d.textContent = this.display;
    if (s) s.textContent = this.expression || '0';
  },

  syncConverter() {
    const v = parseFloat(this.display);
    if (!isNaN(v)) {
      const rate = Store.settings.exchangeRate || 4100;
      const usdEl = document.getElementById('conv-usd');
      const khrEl = document.getElementById('conv-khr');
      if (usdEl) usdEl.value = v.toFixed(2);
      if (khrEl) khrEl.value = Math.round(v * rate);
    }
  },

  convertUSD() {
    const v = parseFloat(document.getElementById('conv-usd').value) || 0;
    const rate = Store.settings.exchangeRate || 4100;
    document.getElementById('conv-khr').value = Math.round(v * rate);
  },

  convertKHR() {
    const v = parseFloat(document.getElementById('conv-khr').value) || 0;
    const rate = Store.settings.exchangeRate || 4100;
    document.getElementById('conv-usd').value = (v / rate).toFixed(2);
  },
};

// ── App Bootstrap ─────────────────────────────────────────────────────────────
function init() {
  Store.init();

  // Inject logo SVG
  document.querySelectorAll('.app-logo-img').forEach(el => {
    el.innerHTML = LOGO_SVG;
  });

  // Apply saved theme before visible render
  const theme = Store.settings.theme || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  // Try restore session
  if (Store.restoreSession()) {
    try { bootApp(); } catch(e) { console.error('bootApp error:', e); }
  } else {
    document.getElementById('auth-screen').style.opacity = '1';
  }

  initAuth();
  initNav();
  initStoreListeners();
}

function initNav() {
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page;
      if (page === 'calculator') { Calc.open(); return; }
      Router.navigate(page);
    });
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    confirm('Sign out of StockFlow?', () => {
      Store.logout();
      document.getElementById('app').classList.remove('visible');
      document.getElementById('auth-screen').classList.remove('hidden');
    });
  });

  // Theme toggle in topbar
  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    applyTheme(isDark ? 'light' : 'dark');
    Pages.settings.updateThemeToggle && Pages.settings.updateThemeToggle();
    Pages.dashboard.render && Router.current === 'dashboard' && Pages.dashboard.render();
    Pages.reports.render && Router.current === 'reports' && Pages.reports.render();
  });
}

function initStoreListeners() {
  Store.on('stockChanged', () => { if (Router.current === 'stock') Pages.stock.renderTable(); });
  Store.on('usersChanged', () => { if (Router.current === 'users') Pages.users.renderTable(); });
  Store.on('storeChanged', () => { Router.navigate(Router.current); });
}

// ── Barcode Scanner ───────────────────────────────────────────────────────────
const Barcode = {
  _stream: null,
  _raf: null,
  _targetField: null,
  _onFound: null,

  scanIntoField(fieldId) {
    this._targetField = fieldId;
    this._onFound = (code) => {
      const el = document.getElementById(fieldId);
      if (el) { el.value = code; el.dispatchEvent(new Event('input')); }
      toast('Barcode scanned: ' + code, 'success');
    };
    this._open();
  },

  scanToFind() {
    this._targetField = null;
    this._onFound = (code) => {
      const item = Store.getStock().find(s => s.barcode === code);
      if (item) {
        toast('Found: ' + item.name, 'success');
        // Show action sheet
        setTimeout(() => {
          confirm(`${item.name}\nWhat do you want to do?`, () => Pages.stock.openSell(item.id));
          document.getElementById('confirm-yes').textContent = 'Record Sale';
          // Add restock option
          const no = document.getElementById('confirm-no');
          no.textContent = 'Restock';
          no.onclick = () => {
            closeModal('confirm-overlay');
            Pages.stock.openEdit(item.id);
          };
        }, 300);
      } else {
        toast('No item found for barcode: ' + code, 'warning');
      }
    };
    this._open();
  },

  async _open() {
    openModal('scan-modal');
    document.getElementById('scan-manual').value = '';
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      const video = document.getElementById('scan-video');
      video.srcObject = this._stream;
      video.play();
      video.addEventListener('loadedmetadata', () => this._tick(), { once: true });
    } catch {
      toast('Camera not available. Type barcode manually.', 'warning');
    }
  },

  _tick() {
    const video = document.getElementById('scan-video');
    const canvas = document.getElementById('scan-canvas');
    if (!video || !canvas || !document.getElementById('scan-modal').classList.contains('open')) {
      this.stopScan(); return;
    }
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    try {
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const result = typeof jsQR !== 'undefined' && jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
      if (result && result.data) {
        this.stopScan();
        this._onFound && this._onFound(result.data);
        return;
      }
    } catch {}
    this._raf = requestAnimationFrame(() => this._tick());
  },

  confirmManual() {
    const val = document.getElementById('scan-manual').value.trim();
    if (!val) return;
    this.stopScan();
    this._onFound && this._onFound(val);
  },

  stopScan() {
    cancelAnimationFrame(this._raf);
    if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
    closeModal('scan-modal');
  },
};

// ── Mobile Nav helper ─────────────────────────────────────────────────────────
const MobileNav = {
  setActive(btn) {
    document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },
  syncFromRouter(page) {
    document.querySelectorAll('.mob-nav-item[data-page]').forEach(b => {
      b.classList.toggle('active', b.dataset.page === page);
    });
  },
};

// Expose globally for inline handlers
window.Pages = Pages;
window.Calc = Calc;
window.Router = Router;
window.Barcode = Barcode;
window.MobileNav = MobileNav;
window.closeModal = closeModal;
window.openModal = openModal;
window.openDisclaimer = openDisclaimer;

document.addEventListener('DOMContentLoaded', init);

// ── Ripple effect on all .btn clicks ─────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn || btn.disabled) return;
  const wave = document.createElement('span');
  wave.className = 'ripple-wave';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove(), { once: true });
});

// ── Close modal on backdrop click ─────────────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('open')) {
    closeModal(e.target.id);
  }
});
