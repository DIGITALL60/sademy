const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
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

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];

  // API Endpoints para la plataforma
  if (cleanUrl === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return res.end(JSON.stringify({
      status: 'active',
      platformName: 'Sademy Oficial',
      currency: 'ARS',
      baseCommissionPercent: 12,
      proGoldCommissionPercent: 8,
      platinumCommissionPercent: 5,
      insuranceCoverageMax: 500000,
      mercadopagoConfig: {
        publicKey: 'APP_USR-7892014-TEST-ARGENTINA',
        splitEnabled: true,
        escrowHoldHours: 24
      }
    }));
  }

  if (cleanUrl === '/api/mercadopago/create-preference' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const amount = data.amount || 24500;
        const feePercent = data.feePercent || 12;
        const platformFee = Math.round(amount * (feePercent / 100));
        const workerNet = amount - platformFee;
        const preferenceId = `PREF-${Date.now()}-${Math.floor(Math.random() * 9000)}`;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
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
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  if (cleanUrl === '/api/mercadopago/webhook' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('Mercado Pago Webhook recibido:', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ received: true, status: 'payment_in_escrow_approved' }));
    });
    return;
  }

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
  console.log(`Sademy server running at http://localhost:${PORT}/`);
});
