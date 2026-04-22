// ============================================================
// StockFlow — Google Apps Script Backend  v1.0.0
// Deploy as Web App:
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployed URL → paste into StockFlow Settings
// ============================================================

const SHEET_NAMES = {
  users:            'SF_Users',
  stock:            'SF_Stock',
  transactions:     'SF_Transactions',
  rolesPermissions: 'SF_RolesPermissions',
  meta:             'SF_Meta',
};

// ── Entry points ─────────────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action || 'pull';
  if (action === 'pull') return jsonResponse(pullAll());
  if (action === 'ping') return jsonResponse({ ok: true, version: '1.0.0' });
  return jsonResponse({ error: 'Unknown action' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action || 'push';
    if (action === 'push') {
      pushAll(body);
      return jsonResponse({ ok: true });
    }
    return jsonResponse({ error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ── Auto-setup ───────────────────────────────────────────────
function autoSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  ensureSheet(ss, SHEET_NAMES.users, [
    'id','username','password','fullName','email','role','active','createdAt','updatedAt'
  ]);
  ensureSheet(ss, SHEET_NAMES.stock, [
    'id','name','sku','category','quantity','costPrice','salePrice',
    'supplier','description','status','createdAt','updatedAt'
  ]);
  ensureSheet(ss, SHEET_NAMES.transactions, [
    'id','type','amount','description','userId','date'
  ]);
  ensureSheet(ss, SHEET_NAMES.rolesPermissions, [
    'role','viewDashboard','manageStock','manageUsers','viewReports',
    'editRecords','deleteRecords','accessSettings'
  ]);
  ensureSheet(ss, SHEET_NAMES.meta, ['key','value']);

  seedDefaultData(ss);
}

function ensureSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#1a1a1a').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function seedDefaultData(ss) {
  const usersSheet = ss.getSheetByName(SHEET_NAMES.users);
  if (usersSheet.getLastRow() <= 1) {
    usersSheet.appendRow([
      'u1','nan','admin@nan','Owner Account','owner@stockflow.app',
      'owner','TRUE', new Date().toISOString(), ''
    ]);
  }

  const rpSheet = ss.getSheetByName(SHEET_NAMES.rolesPermissions);
  if (rpSheet.getLastRow() <= 1) {
    const defaults = [
      ['owner',    true, true, true, true, true, true, true],
      ['admin',    true, true, true, true, true, true, false],
      ['sale',     true, true, false, true, true, false, false],
      ['customer', false, false, false, false, false, false, false],
    ];
    defaults.forEach(row => rpSheet.appendRow(row));
  }
}

// ── Push (client → Sheets) ───────────────────────────────────
function pushAll(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (data.users)            writeUsers(ss, data.users);
  if (data.stock)            writeStock(ss, data.stock);
  if (data.transactions)     writeTransactions(ss, data.transactions);
  if (data.rolesPermissions) writeRolesPermissions(ss, data.rolesPermissions);
  updateMeta(ss, 'lastSync', new Date().toISOString());
}

function writeUsers(ss, users) {
  const sheet = ss.getSheetByName(SHEET_NAMES.users);
  if (!sheet) return;
  clearData(sheet);
  users.forEach(u => {
    sheet.appendRow([
      u.id, u.username, u.password, u.fullName, u.email,
      u.role, u.active ? 'TRUE' : 'FALSE', u.createdAt || '', u.updatedAt || ''
    ]);
  });
}

function writeStock(ss, stock) {
  const sheet = ss.getSheetByName(SHEET_NAMES.stock);
  if (!sheet) return;
  clearData(sheet);
  stock.forEach(s => {
    sheet.appendRow([
      s.id, s.name, s.sku, s.category, s.quantity,
      s.costPrice, s.salePrice, s.supplier, s.description,
      s.status, s.createdAt || '', s.updatedAt || ''
    ]);
  });
}

function writeTransactions(ss, txs) {
  const sheet = ss.getSheetByName(SHEET_NAMES.transactions);
  if (!sheet) return;
  clearData(sheet);
  txs.forEach(t => {
    sheet.appendRow([t.id, t.type, t.amount, t.description, t.userId, t.date]);
  });
}

function writeRolesPermissions(ss, rp) {
  const sheet = ss.getSheetByName(SHEET_NAMES.rolesPermissions);
  if (!sheet) return;
  clearData(sheet);
  Object.entries(rp).forEach(([role, perms]) => {
    sheet.appendRow([
      role,
      perms.viewDashboard ? 'TRUE' : 'FALSE',
      perms.manageStock ? 'TRUE' : 'FALSE',
      perms.manageUsers ? 'TRUE' : 'FALSE',
      perms.viewReports ? 'TRUE' : 'FALSE',
      perms.editRecords ? 'TRUE' : 'FALSE',
      perms.deleteRecords ? 'TRUE' : 'FALSE',
      perms.accessSettings ? 'TRUE' : 'FALSE',
    ]);
  });
}

// ── Pull (Sheets → client) ───────────────────────────────────
function pullAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    users:            readUsers(ss),
    stock:            readStock(ss),
    transactions:     readTransactions(ss),
    rolesPermissions: readRolesPermissions(ss),
    lastSync:         getMeta(ss, 'lastSync'),
  };
}

function readUsers(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.users);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  return sheet.getRange(2, 1, sheet.getLastRow()-1, 9).getValues().map(r => ({
    id: r[0], username: r[1], password: r[2], fullName: r[3], email: r[4],
    role: r[5], active: r[6] === 'TRUE' || r[6] === true,
    createdAt: r[7], updatedAt: r[8],
  }));
}

function readStock(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.stock);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  return sheet.getRange(2, 1, sheet.getLastRow()-1, 12).getValues().map(r => ({
    id: r[0], name: r[1], sku: r[2], category: r[3],
    quantity: Number(r[4]), costPrice: Number(r[5]), salePrice: Number(r[6]),
    supplier: r[7], description: r[8], status: r[9],
    createdAt: r[10], updatedAt: r[11],
  }));
}

function readTransactions(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.transactions);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  return sheet.getRange(2, 1, sheet.getLastRow()-1, 6).getValues().map(r => ({
    id: r[0], type: r[1], amount: Number(r[2]),
    description: r[3], userId: r[4], date: r[5],
  }));
}

function readRolesPermissions(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.rolesPermissions);
  if (!sheet || sheet.getLastRow() <= 1) return {};
  const rp = {};
  sheet.getRange(2, 1, sheet.getLastRow()-1, 8).getValues().forEach(r => {
    rp[r[0]] = {
      viewDashboard:   r[1] === 'TRUE' || r[1] === true,
      manageStock:     r[2] === 'TRUE' || r[2] === true,
      manageUsers:     r[3] === 'TRUE' || r[3] === true,
      viewReports:     r[4] === 'TRUE' || r[4] === true,
      editRecords:     r[5] === 'TRUE' || r[5] === true,
      deleteRecords:   r[6] === 'TRUE' || r[6] === true,
      accessSettings:  r[7] === 'TRUE' || r[7] === true,
    };
  });
  return rp;
}

// ── Helpers ──────────────────────────────────────────────────
function clearData(sheet) {
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).clearContent();
  }
}

function updateMeta(ss, key, value) {
  const sheet = ss.getSheetByName(SHEET_NAMES.meta);
  if (!sheet) return;
  const data = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow()-1, 2).getValues()
    : [];
  const row = data.findIndex(r => r[0] === key);
  if (row >= 0) sheet.getRange(row+2, 2).setValue(value);
  else sheet.appendRow([key, value]);
}

function getMeta(ss, key) {
  const sheet = ss.getSheetByName(SHEET_NAMES.meta);
  if (!sheet || sheet.getLastRow() <= 1) return null;
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 2).getValues();
  const row = data.find(r => r[0] === key);
  return row ? row[1] : null;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
