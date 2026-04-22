// i18n-ready locale system — v1.0.0 ships English only
// To add a language: add a key to LOCALES and call setLocale(langCode)

const LOCALES = {
  en: {
    // App
    appName: 'StockFlow',
    appTagline: 'Inventory Management System',
    version: 'v1.0.0',

    // Auth
    login: 'Sign In',
    logout: 'Sign Out',
    username: 'Username',
    password: 'Password',
    loginError: 'Invalid credentials. Please try again.',
    loginWelcome: 'Welcome back',

    // Nav
    dashboard: 'Dashboard',
    stock: 'Stock',
    users: 'Users',
    reports: 'Reports',
    settings: 'Settings',
    calculator: 'Calculator',

    // Dashboard
    totalItems: 'Total Items',
    totalValue: 'Total Value',
    income: 'Income',
    expenses: 'Expenses',
    profit: 'Profit',
    thisMonth: 'This Month',
    selectedMonth: 'Selected Month',
    yearly: 'Yearly',
    allTime: 'All Time',
    topProducts: 'Top Products',
    recentActivity: 'Recent Activity',
    lowStock: 'Low Stock Alert',

    // Stock
    addItem: 'Add Item',
    editItem: 'Edit Item',
    deleteItem: 'Delete Item',
    itemName: 'Item Name',
    sku: 'SKU',
    category: 'Category',
    quantity: 'Quantity',
    unitPrice: 'Unit Price',
    costPrice: 'Cost Price',
    salePrice: 'Sale Price',
    supplier: 'Supplier',
    description: 'Description',
    status: 'Status',
    inStock: 'In Stock',
    lowStockStatus: 'Low Stock',
    outOfStock: 'Out of Stock',
    confirmDelete: 'Confirm Delete',
    deleteWarning: 'This action cannot be undone.',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    noItems: 'No items found.',
    stockManagement: 'Stock Management',

    // Users
    userManagement: 'User Management',
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    role: 'Role',
    email: 'Email',
    fullName: 'Full Name',
    active: 'Active',
    inactive: 'Inactive',
    owner: 'Owner',
    admin: 'Admin',
    sale: 'Sale',
    customer: 'Customer',
    permissions: 'Permissions',
    permViewDashboard: 'View Dashboard',
    permManageStock: 'Manage Stock',
    permManageUsers: 'Manage Users',
    permViewReports: 'View Reports',
    permEditRecords: 'Edit Records',
    permDeleteRecords: 'Delete Records',
    permAccessSettings: 'Access Settings',

    // Reports
    reportsTitle: 'Reports & Analytics',
    spend: 'Spend',
    perUserBreakdown: 'Per-User Breakdown',
    salesOverview: 'Sales Overview',
    inventoryReport: 'Inventory Report',

    // Settings
    settingsTitle: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    currency: 'Currency',
    exchangeRate: 'Exchange Rate',
    usdToKhr: 'USD to KHR Rate',
    googleSheets: 'Google Sheets Sync',
    scriptUrl: 'Apps Script Web App URL',
    clearCache: 'Clear Cache',
    forceSync: 'Force Sync',
    clearCacheConfirm: 'This will wipe all local data. Are you sure?',
    forceSyncSuccess: 'Sync complete. Data reloaded.',
    forceSyncError: 'Sync failed. Check your Script URL.',
    saveSettings: 'Save Settings',
    roleMatrix: 'Role Permission Matrix',
    about: 'About',
    syncStatus: 'Sync Status',
    lastSync: 'Last Sync',
    never: 'Never',

    // Calculator
    calculatorTitle: 'Calculator',
    usdAmount: 'USD Amount',
    khrAmount: 'KHR Amount',
    convert: 'Convert',
    clearCalc: 'Clear',

    // Status
    syncing: 'Syncing...',
    synced: 'Synced',
    offline: 'Offline',
    error: 'Error',
    loading: 'Loading...',
    success: 'Success',
    noScript: 'No Script URL configured. Working in offline mode.',

    // Confirm
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    close: 'Close',

    // Table
    actions: 'Actions',
    total: 'Total',
    noData: 'No data available.',
    rowsPerPage: 'Rows per page',
    of: 'of',
  }
};

let currentLocale = 'en';

function setLocale(lang) {
  if (LOCALES[lang]) currentLocale = lang;
}

function t(key) {
  return (LOCALES[currentLocale] && LOCALES[currentLocale][key]) || key;
}

export { t, setLocale, LOCALES, currentLocale };
