const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'database.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Read DB
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { users: [], professionals: [], orders: [], adminMetrics: {}, adminTransactions: [], pendingMatriculas: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { users: [], professionals: [], orders: [], adminMetrics: {}, adminTransactions: [], pendingMatriculas: [] };
  }
}

// Helper: Write DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Helper: Parse JSON Body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Helper: JSON Response
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  let cleanUrl = req.url.split('?')[0];

  // API Config
  if (cleanUrl === '/api/config') {
    return sendJson(res, 200, {
      status: 'production_ready',
      platformName: 'Sademy Oficial',
      currency: 'ARS',
      baseCommissionPercent: 12,
      proGoldCommissionPercent: 8,
      platinumCommissionPercent: 5,
      insuranceCoverageMax: 500000,
      mercadopagoConfig: {
        publicKey: 'APP_USR-7892014-PROD-ARGENTINA',
        splitEnabled: true,
        escrowHoldHours: 24
      }
    });
  }

  // API Auth: Login
  if (cleanUrl === '/api/auth/login' && req.method === 'POST') {
    const body = await parseBody(req);
    const { email, password } = body;
    const db = readDb();

    if (!email) {
      return sendJson(res, 400, { error: 'El correo electrónico es requerido.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return sendJson(res, 401, { error: 'No existe una cuenta registrada con este correo.' });
    }

    // Si viene con password, verificarla
    if (user.passwordHash && password && user.passwordHash !== password) {
      return sendJson(res, 401, { error: 'Contraseña incorrecta. Por favor verifique sus datos.' });
    }

    // Usuario válido: devolver objeto seguro sin exponer hashes sensibles
    const safeUser = { ...user };
    delete safeUser.passwordHash;
    return sendJson(res, 200, {
      success: true,
      token: `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: safeUser
    });
  }

  // API Auth: Register
  if (cleanUrl === '/api/auth/register' && req.method === 'POST') {
    const body = await parseBody(req);
    const { name, email, password, phone, role, trade, dni, matricula, zone } = body;
    const db = readDb();

    if (!email || !name) {
      return sendJson(res, 400, { error: 'Nombre y correo electrónico son requeridos.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return sendJson(res, 409, { error: 'Ya existe una cuenta con este correo electrónico.' });
    }

    const isPro = role === 'pro';
    const newUser = {
      id: `usr-${isPro ? 'pro' : 'client'}-${Date.now().toString(36)}`,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: password || '123456',
      phone: phone || '',
      role: isPro ? 'pro' : 'client',
      roleLabel: isPro ? 'Profesional Verificado Pro' : 'Cliente Verificado',
      roleTag: isPro ? 'Pro Verificado' : 'Cliente',
      avatar: isPro ? 'assets/marcos.jpg' : 'assets/mascot.jpg',
      verified: true,
      createdAt: new Date().toISOString()
    };

    if (isPro) {
      newUser.trade = trade || 'Electricista Matriculado';
      newUser.dni = dni || '';
      newUser.matricula = matricula || '';
      newUser.zone = zone || 'CABA y Alrededores';
      newUser.proPlan = 'basic';
    }

    db.users.push(newUser);
    writeDb(db);

    const safeUser = { ...newUser };
    delete safeUser.passwordHash;

    return sendJson(res, 201, {
      success: true,
      token: `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: safeUser
    });
  }

  // API Orders: Get All
  if (cleanUrl === '/api/orders' && req.method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, { success: true, orders: db.orders || [] });
  }

  // API Orders: Create New Order
  if (cleanUrl === '/api/orders' && req.method === 'POST') {
    const body = await parseBody(req);
    const db = readDb();

    const orderId = `ORD-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const newOrder = {
      id: orderId,
      clientId: body.clientId || 'usr-client-001',
      clientName: body.clientName || 'Cliente Sademy',
      title: body.title || 'Solicitud de servicio',
      category: body.category || 'general',
      categoryName: body.categoryName || 'Servicio Técnico',
      description: body.description || '',
      address: body.address || 'CABA',
      status: 'Presupuestos recibidos',
      statusBadgeClass: 'badge-new',
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' hs',
      paid: false,
      completed: false,
      escrowCode: null,
      quotes: []
    };

    if (!db.orders) db.orders = [];
    db.orders.unshift(newOrder);
    writeDb(db);

    return sendJson(res, 201, { success: true, order: newOrder });
  }

  // API Mercado Pago: Create Preference
  if (cleanUrl === '/api/mercadopago/create-preference' && req.method === 'POST') {
    const data = await parseBody(req);
    const amount = Number(data.amount) || 24500;
    const feePercent = Number(data.feePercent) || 12;
    const platformFee = Math.round(amount * (feePercent / 100));
    const workerNet = amount - platformFee;
    const preferenceId = `PREF-${Date.now()}-${Math.floor(Math.random() * 9000)}`;

    return sendJson(res, 200, {
      success: true,
      preferenceId,
      checkoutUrl: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`,
      financialSplit: {
        grossAmount: amount,
        platformFee,
        workerNet,
        feePercent,
        currency: 'ARS'
      }
    });
  }

  // API Mercado Pago: Webhook
  if (cleanUrl === '/api/mercadopago/webhook' && req.method === 'POST') {
    const body = await parseBody(req);
    console.log('Mercado Pago Webhook recibido:', body);
    return sendJson(res, 200, { received: true, status: 'payment_in_escrow_approved' });
  }

  // Static File Serving
  if (cleanUrl === '/') cleanUrl = '/index.html';
  
  const filePath = path.join(__dirname, cleanUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Sademy Production Server running at http://localhost:${PORT}/`);
});
