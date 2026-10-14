/**
 * SADEMY - Plataforma Web Oficial & PWA (Octubre 2026)
 * Marketplace de Oficios con Trabajadores Calificados, Certificados y de Confianza
 * Lógica de Sistema Real con Persistencia Local (LocalStorage), PWA Instalable y Experiencia Apple/Samsung.
 */

// ============================================================================
// 1. BASE DE DATOS MAESTRA DE PROFESIONALES VERIFICADOS
// ============================================================================
const PROFESSIONALS_DATA = [
  {
    id: 'pro-1',
    name: 'Marcos R.',
    trade: 'Electricista Matriculado',
    category: 'electricidad',
    avatar: 'assets/marcos.jpg',
    badge: 'Nuevo Calificado',
    verified: true,
    certified: true,
    matricula: 'MAT-EL-4982',
    rating: 4.9,
    reviewsCount: 38,
    zone: 'Palermo · Recoleta · Colegiales',
    city: 'CABA',
    bio: 'Especialista en instalaciones eléctricas domiciliarias y comerciales, tableros seccionales, luminaria LED y detección de fugas a tierra.',
    priceHint: '$16.500',
    priceUnit: 'por trabajo base',
    skills: ['Tableros Eléctricos', 'Luminarias LED', 'Urgencias 24h', 'Certificado DCI'],
    completedJobs: 38,
    responseTime: '< 15 min'
  },
  {
    id: 'pro-2',
    name: 'Sofía L.',
    trade: 'Plomería y Sanitarios',
    category: 'plomeria',
    avatar: 'assets/sofia.jpg',
    badge: 'Verificada Pro',
    verified: true,
    certified: true,
    matricula: 'MAT-PL-3104',
    rating: 5.0,
    reviewsCount: 52,
    zone: 'Belgrano · Núñez · Vicente López',
    city: 'CABA / GBA Norte',
    bio: 'Plomera matriculada con más de 8 años de experiencia. Reparación de pérdidas de agua, destapes con máquina, termofusión y presurizadoras.',
    priceHint: '$18.000',
    priceUnit: 'por visita técnica',
    skills: ['Termofusión Acqua System', 'Bombas Rowa', 'Destapes', 'Griferías FV'],
    completedJobs: 52,
    responseTime: '< 10 min'
  },
  {
    id: 'pro-3',
    name: 'Claudio V.',
    trade: 'Gasista Matriculado de 1ra',
    category: 'gas',
    avatar: 'assets/claudio.jpg',
    badge: 'Matriculado Oficial',
    verified: true,
    certified: true,
    matricula: 'METROGAS #84920',
    rating: 4.9,
    reviewsCount: 84,
    zone: 'Caballito · Almagro · Flores',
    city: 'CABA',
    bio: 'Gasista matriculado habilitado por distribuidoras para firmas de Metrogas / Naturgy. Calderas, estufas tiro balanceado y pruebas de hermeticidad.',
    priceHint: '$22.000',
    priceUnit: 'por inspección reglamentaria',
    skills: ['Metrogas Habilitado', 'Calderas Duales', 'Prueba de Hermeticidad', 'Trámites Forma 1022'],
    completedJobs: 84,
    responseTime: '< 20 min'
  },
  {
    id: 'pro-4',
    name: 'Diego M.',
    trade: 'Pintura & Revestimientos',
    category: 'pintura',
    avatar: 'assets/mascot.jpg',
    badge: 'Verificado',
    verified: true,
    certified: false,
    matricula: 'REG-PNT-119',
    rating: 4.8,
    reviewsCount: 41,
    zone: 'Villa Urquiza · Villa del Parque',
    city: 'CABA',
    bio: 'Pintura de interiores y exteriores, tratamiento antihumedad, aplicación de microcemento y enduido profesional. Limpieza impecable garantizada.',
    priceHint: '$6.500',
    priceUnit: 'por m² mano de obra',
    skills: ['Látex y Sintético', 'Microcemento', 'Tratamiento Antihumedad', 'Cielorrasos'],
    completedJobs: 41,
    responseTime: '< 30 min'
  },
  {
    id: 'pro-5',
    name: 'Valeria C.',
    trade: 'Cerrajería de Seguridad 24h',
    category: 'cerrajeria',
    avatar: 'assets/mascot.jpg',
    badge: 'Urgencias 24h',
    verified: true,
    certified: true,
    matricula: 'CER-SEC-992',
    rating: 4.95,
    reviewsCount: 67,
    zone: 'Centro · San Telmo · Retiro',
    city: 'CABA',
    bio: 'Apertura de puertas sin rotura, cambio de combinaciones, instalación de cerraduras multipunto computarizadas y cerrojos de seguridad.',
    priceHint: '$19.000',
    priceUnit: 'urgencia guardia',
    skills: ['Aperturas sin Daño', 'Cerraduras Trabex/Kallay', 'Puertas Blindadas', 'Móvil de Urgencia'],
    completedJobs: 67,
    responseTime: '< 15 min'
  },
  {
    id: 'pro-6',
    name: 'Gustavo F.',
    trade: 'Climatización & Refrigeración',
    category: 'aire',
    avatar: 'assets/mascot.jpg',
    badge: 'Matriculado CACAAV',
    verified: true,
    certified: true,
    matricula: 'CACAAV-7718',
    rating: 4.88,
    reviewsCount: 49,
    zone: 'Saavedra · San Isidro · San Martín',
    city: 'GBA Norte',
    bio: 'Instalación y service oficial de aires acondicionados Split e Inverter. Carga de gas R410A / R32, presurización con nitrógeno y limpieza de filtros.',
    priceHint: '$35.000',
    priceUnit: 'instalación hasta 3000f',
    skills: ['Instalador CACAAV', 'Gases Ecológicos', 'Inverter', 'Garantía Oficial'],
    completedJobs: 49,
    responseTime: '< 25 min'
  }
];

// ============================================================================
// 2. ESTADO GLOBAL REACTIVO CON PERSISTENCIA EN LOCALSTORAGE
// ============================================================================
const STORAGE_KEY = 'sademy_app_storage_v2';

const DEFAULT_ORDERS = [
  {
    id: 'ORD-2026-084',
    title: 'Instalación de luz en cocina',
    category: 'electricidad',
    categoryName: 'Electricista',
    description: 'Necesito colocar 2 tiras LED bajo alacena, conectar una luminaria central colgante y revisar una llave térmica que salta al usar el anafe.',
    address: 'Humboldt 1900, Palermo, CABA',
    status: 'Presupuestos recibidos',
    statusBadgeClass: 'badge-new',
    date: 'Hoy, 10:15 hs',
    paid: false,
    completed: false,
    escrowCode: null,
    quotes: [
      {
        id: 'quote-marcos',
        proId: 'pro-1',
        proName: 'Marcos R.',
        proTrade: 'ELECTRICISTA MATRICULADO',
        proBadge: 'NUEVO',
        avatar: 'assets/marcos.jpg',
        rating: 4.9,
        jobsCount: 38,
        materialsNote: 'Incluye materiales y mano de obra',
        laborPrice: 16500,
        materialsPrice: 8000,
        totalPrice: 24500,
        warranty: '6 meses de garantía escrita',
        estimatedDuration: '2 horas aprox.',
        availability: 'Hoy disponible a partir de las 16:30 hs',
        recommended: true,
        breakdownItems: [
          'Mano de obra especializada para 2 luminarias y tendido seguro ($16.500)',
          'Cables normalizados Prysmian antillama + regleta y conectores rápidos ($8.000)',
          'Verificación de carga de circuito y prueba con megóhmetro (Bonificado)',
          'Custodia de pago protegido Sademy hasta tu total conformidad ($0)'
        ]
      },
      {
        id: 'quote-sofia',
        proId: 'pro-2',
        proName: 'Sofía L.',
        proTrade: 'ELECTRICISTA MATRICULADA',
        proBadge: 'VERIFICADA PRO',
        avatar: 'assets/sofia.jpg',
        rating: 5.0,
        jobsCount: 52,
        materialsNote: 'Mano de obra + diagnóstico de tablero',
        laborPrice: 18000,
        materialsPrice: 3000,
        totalPrice: 21000,
        warranty: '1 año de garantía oficial matriculada',
        estimatedDuration: '2.5 horas',
        availability: 'Mañana por la mañana (09:00 hs)',
        recommended: false,
        breakdownItems: [
          'Instalación técnica certificada bajo normas IRAM 2001 ($18.000)',
          'Revisión y torque de bornes en tablero seccional ($3.000)',
          'Materiales a proveer por el cliente o cotizar al costo en visita',
          'Garantía total respaldada por Sademy ($0)'
        ]
      }
    ]
  },
  {
    id: 'ORD-2026-041',
    title: 'Reparación de válvula y termocupla de cocina',
    category: 'gas',
    categoryName: 'Gasista Matriculado',
    description: 'La hornalla grande se apagaba sola al soltar la perilla. Se cambió la termocupla y se engrasó el robinete.',
    address: 'Av. Rivadavia 5400, Caballito, CABA',
    status: 'Finalizado con éxito',
    statusBadgeClass: 'badge-completed',
    date: '28 Sep 2026',
    paid: true,
    completed: true,
    escrowCode: 'ESCROW-2026-X841',
    hiredPro: {
      name: 'Claudio V.',
      trade: 'Gasista Matriculado',
      price: 22000,
      avatar: 'assets/claudio.jpg'
    },
    review: {
      stars: 5,
      comment: 'Excelente atención de Claudio, puntual y muy prolijo.'
    },
    quotes: []
  }
];

const DEFAULT_CHATS = {
  'Marcos R.': [
    { sender: 'worker', text: 'Hola Carlos! Vi tu pedido para la instalación de luz en la cocina. Cuento con las herramientas y puedo pasar hoy mismo a las 16:30.', time: '10:45' },
    { sender: 'client', text: 'Excelente Marcos, ¿el presupuesto incluye los conectores rápidos y cables aislados?', time: '10:48' },
    { sender: 'worker', text: 'Sí, exactamente. Todo bajo norma IRAM y con garantía de 6 meses. Si te parece bien podés aceptarlo acá en la plataforma con el pago protegido.', time: '10:50' },
    { sender: 'system', text: '🛡️ Seguridad Sademy: Para conservar el Seguro de Daños hasta $500.000 y garantía de satisfacción, mantené la contratación y pagos dentro de Sademy.', time: '10:51' }
  ],
  'Sofía L.': [
    { sender: 'worker', text: 'Hola Carlos! Revisé tu solicitud. Si te sirve también puedo hacer una revisión preventiva del tablero general.', time: '11:02' }
  ],
  'Claudio V.': [
    { sender: 'worker', text: 'Hola Carlos, trabajo finalizado y prueba de hermeticidad aprobada. ¡Muchas gracias por calificar!', time: '28 Sep' }
  ]
};

// Cargar estado desde LocalStorage
function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.adminMetrics) {
        parsed.adminMetrics = { gmv: 1842500, feesCollected: 248900, escrowActive: 115000, proSubsCount: 18 };
      }
      if (!parsed.adminTransactions) {
        parsed.adminTransactions = [
          { id: 'ORD-2026-041', client: 'Carlos M.', pro: 'Claudio V.', trade: 'Gasista', amount: 22000, fee: 2640, status: 'Liberado con éxito', date: '28 Sep' },
          { id: 'ORD-2026-039', client: 'Lucía B.', pro: 'Sofía L.', trade: 'Plomería', amount: 35000, fee: 4200, status: 'Liberado con éxito', date: '27 Sep' },
          { id: 'ORD-2026-035', client: 'Esteban R.', pro: 'Marcos R.', trade: 'Electricidad', amount: 48000, fee: 5760, status: 'Liberado con éxito', date: '25 Sep' },
          { id: 'ORD-2026-031', client: 'Mariana K.', pro: 'Diego M.', trade: 'Pintura', amount: 62000, fee: 7440, status: 'Liberado con éxito', date: '22 Sep' }
        ];
      }
      if (!parsed.pendingMatriculas) {
        parsed.pendingMatriculas = [
          { id: 'pro-pending-1', name: 'Facundo G.', trade: 'Gasista Matriculado', matricula: 'METROGAS #9214', zone: 'Belgrano, CABA', dni: '34.819.201', docVerified: true },
          { id: 'pro-pending-2', name: 'Martín T.', trade: 'Electricista Matriculado', matricula: 'COPIME #3810', zone: 'Palermo, CABA', dni: '32.110.884', docVerified: true }
        ];
      }
      if (parsed.currentUser && !parsed.currentUser.proPlan) {
        parsed.currentUser.proPlan = 'basic';
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Error al cargar estado previo:', e);
  }

  // Estado por defecto
  return {
    currentUser: {
      id: 'user-carlos',
      name: 'Carlos M.',
      email: 'carlos.m@gmail.com',
      avatar: 'assets/mascot.jpg',
      role: 'client',
      verified: true,
      proPlan: 'basic'
    },
    currentRole: 'client', // 'client' | 'pro'
    orders: DEFAULT_ORDERS,
    chatThreads: DEFAULT_CHATS,
    activeOrderIndex: 0,
    proStats: {
      openRequestsCount: 12,
      acceptedQuotesCount: 8,
      escrowBalance: 49000,
      rating: 4.9
    },
    adminMetrics: {
      gmv: 1842500,
      feesCollected: 248900,
      escrowActive: 115000,
      proSubsCount: 18
    },
    adminTransactions: [
      { id: 'ORD-2026-041', client: 'Carlos M.', pro: 'Claudio V.', trade: 'Gasista', amount: 22000, fee: 2640, status: 'Liberado con éxito', date: '28 Sep' },
      { id: 'ORD-2026-039', client: 'Lucía B.', pro: 'Sofía L.', trade: 'Plomería', amount: 35000, fee: 4200, status: 'Liberado con éxito', date: '27 Sep' },
      { id: 'ORD-2026-035', client: 'Esteban R.', pro: 'Marcos R.', trade: 'Electricidad', amount: 48000, fee: 5760, status: 'Liberado con éxito', date: '25 Sep' },
      { id: 'ORD-2026-031', client: 'Mariana K.', pro: 'Diego M.', trade: 'Pintura', amount: 62000, fee: 7440, status: 'Liberado con éxito', date: '22 Sep' }
    ],
    pendingMatriculas: [
      { id: 'pro-pending-1', name: 'Facundo G.', trade: 'Gasista Matriculado', matricula: 'METROGAS #9214', zone: 'Belgrano, CABA', dni: '34.819.201', docVerified: true },
      { id: 'pro-pending-2', name: 'Martín T.', trade: 'Electricista Matriculado', matricula: 'COPIME #3810', zone: 'Palermo, CABA', dni: '32.110.884', docVerified: true }
    ],
    activeFilterTrade: 'all',
    activeFilterZone: 'all',
    activeFilterVerifiedOnly: false
  };
}

let appState = loadAppState();

function saveAppState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
}

// ============================================================================
// 3. INICIALIZACIÓN DE LA APLICACIÓN Y PWA (APPLE & SAMSUNG STANDARDS)
// ============================================================================
let deferredInstallPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  initPwaServiceWorker();
  initPreloader();
  initEventListeners();
  initCalculator();
  initScrollProgress();
  
  // Render inicial de datos reales
  renderProfessionalsDirectory();
  renderActiveOrderBanner();
  updateNavAuthState();
  updateOrdersBadges();
  renderMyOrdersModalList();
});

// Registro del Service Worker para PWA
function initPwaServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Sademy Service Worker registrado con éxito:', reg.scope);
        })
        .catch((err) => {
          console.log('Service Worker no se pudo registrar:', err);
        });
    });
  }

  // Capturar evento de instalación de navegador
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    
    // Mostrar botón de instalar en el header
    const pwaBtn = document.getElementById('pwa-install-btn');
    if (pwaBtn) {
      pwaBtn.style.display = 'inline-flex';
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('Sademy fue instalada correctamente como PWA nativa.');
    deferredInstallPrompt = null;
    const pwaBtn = document.getElementById('pwa-install-btn');
    if (pwaBtn) pwaBtn.style.display = 'none';
    showToast('¡Aplicación Instalada!', 'Ya tenés Sademy en tu pantalla de inicio.');
  });
}

// Disparador de instalación PWA
function triggerPwaInstall() {
  triggerHapticFeedback();
  playPop();

  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Instalación en progreso', 'Agregando Sademy a tu dispositivo...');
      }
      deferredInstallPrompt = null;
    });
    return;
  }

  // Si es iOS o navegador sin prompt nativo, mostrar guía visual
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const iosBox = document.getElementById('pwa-ios-instructions');
  const nativeBox = document.getElementById('pwa-native-prompt-box');

  if (isIos) {
    if (iosBox) iosBox.style.display = 'block';
    if (nativeBox) nativeBox.style.display = 'none';
  } else {
    if (iosBox) iosBox.style.display = 'none';
    if (nativeBox) nativeBox.style.display = 'block';
  }

  const modal = document.getElementById('modal-pwa-install');
  if (modal) modal.classList.add('active');
}

function executePwaInstall() {
  triggerHapticFeedback();
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
  } else {
    showToast('Instalación rápida', 'Presioná los 3 puntos del navegador y elegí "Instalar aplicación".');
  }
  closePwaModal();
}

function closePwaModal() {
  const modal = document.getElementById('modal-pwa-install');
  if (modal) modal.classList.remove('active');
}

// ============================================================================
// 4. AUTENTICACIÓN REAL, SESIÓN & MENÚ DE PERFIL DESPLEGABLE
// ============================================================================
const PROFILES = {
  client: {
    id: 'user-carlos',
    name: 'Carlos M.',
    email: 'carlos.m@gmail.com',
    avatar: 'assets/mascot.jpg',
    role: 'client',
    roleLabel: '✓ Cliente Verificado',
    roleTag: 'Cliente',
    tagBg: '#ECFDF5',
    tagColor: '#065F46',
    verified: true,
    proPlan: 'basic'
  },
  pro: {
    id: 'user-marcos-pro',
    name: 'Marcos R.',
    email: 'marcos.electricista@sademy.com',
    avatar: 'assets/marcos.jpg',
    role: 'pro',
    roleLabel: '★ Profesional Verificado Pro',
    roleTag: 'Pro Verificado',
    tagBg: '#D1FAE5',
    tagColor: '#064E3B',
    trade: 'Electricista Matriculado',
    matricula: 'MAT-EL-4982',
    verified: true,
    proPlan: 'gold'
  },
  admin: {
    id: 'user-admin-hq',
    name: 'Sademy HQ',
    email: 'admin@sademy.com.ar',
    avatar: 'assets/favicon.svg',
    role: 'admin',
    roleLabel: '👑 Administrador Master',
    roleTag: 'Dueño Admin',
    tagBg: '#FEF3C7',
    tagColor: '#92400E',
    verified: true,
    proPlan: 'platinum'
  }
};

function updateNavAuthState() {
  const user = appState.currentUser;
  const loginBtn = document.getElementById('nav-login-btn');
  const proBtn = document.getElementById('nav-pro-btn');
  const dropdownWrapper = document.getElementById('nav-user-dropdown-wrapper');
  
  const userNameText = document.getElementById('nav-user-name-text');
  const userRoleTag = document.getElementById('nav-user-role-tag');
  const userAvatarImg = document.getElementById('nav-user-avatar-img');

  const menuUserName = document.getElementById('menu-user-name');
  const menuUserEmail = document.getElementById('menu-user-email');
  const menuUserAvatar = document.getElementById('menu-user-avatar');
  const menuUserRoleLabel = document.getElementById('menu-user-role-label');

  // Ribbon elementos
  const ribbon = document.getElementById('active-role-ribbon');
  const ribbonIcon = document.getElementById('ribbon-role-icon');
  const ribbonTitle = document.getElementById('ribbon-role-title');
  const ribbonDesc = document.getElementById('ribbon-role-desc');
  const ribbonBtn = document.getElementById('ribbon-action-primary');

  // Mobile nav label
  const mobNavLabel = document.getElementById('mob-nav-perfil-label');

  // Account modal elementos
  const accAvatar = document.getElementById('account-modal-avatar');
  const accName = document.getElementById('account-modal-name');
  const accEmail = document.getElementById('account-modal-email');
  const accBadge = document.getElementById('account-modal-badge');
  const accLoggedInSec = document.getElementById('account-logged-in-section');
  const accGuestSec = document.getElementById('account-guest-section');

  const currentR = appState.currentRole || 'client';

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (proBtn) proBtn.style.display = 'none';
    if (dropdownWrapper) dropdownWrapper.style.display = 'inline-block';

    if (userNameText) userNameText.textContent = user.name;
    if (userAvatarImg) userAvatarImg.src = user.avatar || 'assets/mascot.jpg';
    if (userRoleTag) {
      userRoleTag.textContent = user.roleTag || (currentR === 'admin' ? 'Dueño Admin' : (currentR === 'pro' ? 'Pro Verificado' : 'Cliente'));
      userRoleTag.style.backgroundColor = user.tagBg || (currentR === 'admin' ? '#FEF3C7' : (currentR === 'pro' ? '#D1FAE5' : '#ECFDF5'));
      userRoleTag.style.color = user.tagColor || (currentR === 'admin' ? '#92400E' : (currentR === 'pro' ? '#064E3B' : '#065F46'));
    }

    if (menuUserName) menuUserName.textContent = user.name;
    if (menuUserEmail) menuUserEmail.textContent = user.email;
    if (menuUserAvatar) menuUserAvatar.src = user.avatar || 'assets/mascot.jpg';
    if (menuUserRoleLabel) menuUserRoleLabel.textContent = user.roleLabel || '✓ Verificado';

    // Sincronizar pills en dropdown
    ['client', 'pro', 'admin'].forEach(r => {
      const pill = document.getElementById(`role-pill-${r}`);
      if (pill) {
        if (r === currentR) pill.classList.add('active');
        else pill.classList.remove('active');
      }
      const accPill = document.getElementById(`acc-pill-${r}`);
      if (accPill) {
        if (r === currentR) accPill.classList.add('active');
        else accPill.classList.remove('active');
      }
      const ribPill = document.getElementById(`ribbon-pill-${r}`);
      if (ribPill) {
        if (r === currentR) ribPill.classList.add('active');
        else ribPill.classList.remove('active');
      }
    });

    // Actualizar Ribbon Superior de Control
    if (ribbon) {
      ribbon.style.display = 'block';
      ribbon.className = `active-role-ribbon role-${currentR}`;
      if (currentR === 'admin') {
        if (ribbonIcon) ribbonIcon.textContent = '👑';
        if (ribbonTitle) ribbonTitle.textContent = 'Modo Administrador Dueño (Sademy HQ)';
        if (ribbonDesc) ribbonDesc.textContent = 'Facturación GMV: $1.842.500 ARS · Comisiones: $248.900 ARS · Custodia: $115.000 ARS';
        if (ribbonBtn) {
          ribbonBtn.innerHTML = '👑 Abrir Backoffice';
          ribbonBtn.onclick = openAdminBackofficeModal;
        }
      } else if (currentR === 'pro') {
        if (ribbonIcon) ribbonIcon.textContent = '⚡';
        if (ribbonTitle) ribbonTitle.textContent = 'Modo Profesional Pro (Marcos R.)';
        if (ribbonDesc) ribbonDesc.textContent = 'Saldo disponible: $49.000 ARS · 12 Solicitudes abiertas en tu zona';
        if (ribbonBtn) {
          ribbonBtn.innerHTML = '⚡ Portal Sademy Pro';
          ribbonBtn.onclick = () => openProDashboardModal('oportunidades');
        }
      } else {
        if (ribbonIcon) ribbonIcon.textContent = '👤';
        if (ribbonTitle) ribbonTitle.textContent = 'Modo Cliente Particular (Carlos M.)';
        if (ribbonDesc) ribbonDesc.textContent = '2 Pedidos activos · Pago protegido en custodia de Sademy';
        if (ribbonBtn) {
          ribbonBtn.innerHTML = '📦 Mis Pedidos';
          ribbonBtn.onclick = openMyOrdersModal;
        }
      }
    }

    // Modal de cuenta
    if (accAvatar) accAvatar.src = user.avatar || 'assets/mascot.jpg';
    if (accName) accName.textContent = user.name;
    if (accEmail) accEmail.textContent = user.email;
    if (accBadge) {
      accBadge.textContent = user.roleLabel || '✓ Verificado';
      accBadge.style.backgroundColor = user.tagBg || '#ECFDF5';
      accBadge.style.color = user.tagColor || '#065F46';
    }
    if (accLoggedInSec) accLoggedInSec.style.display = 'block';
    if (accGuestSec) accGuestSec.style.display = 'none';

    if (mobNavLabel) mobNavLabel.textContent = user.name ? user.name.split(' ')[0] : 'Cuenta';

  } else {
    // Modo Invitado (Sesión Cerrada)
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (proBtn) proBtn.style.display = 'inline-flex';
    if (dropdownWrapper) dropdownWrapper.style.display = 'none';
    if (ribbon) ribbon.style.display = 'none';

    if (accLoggedInSec) accLoggedInSec.style.display = 'none';
    if (accGuestSec) accGuestSec.style.display = 'block';

    if (mobNavLabel) mobNavLabel.textContent = 'Ingresar';
  }

  // Reflejar la vista del rol activo
  applyRoleView(appState.currentRole);
}

function openAccountModal() {
  triggerHapticFeedback();
  playPop();
  if (!appState.currentUser) {
    openAuthModal('client');
    return;
  }
  const modal = document.getElementById('modal-account-view');
  if (modal) modal.classList.add('active');
}

function closeAccountModal() {
  const modal = document.getElementById('modal-account-view');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   PORTAL DEDICADO SADEMY PRO (DASHBOARD SIN SCROLL)
   ========================================================================== */
function openProDashboardModal(initialTab = 'oportunidades') {
  triggerHapticFeedback();
  playPop();
  switchProDashboardTab(initialTab);
  const modal = document.getElementById('modal-pro-dashboard');
  if (modal) modal.classList.add('active');
}

function closeProDashboardModal() {
  const modal = document.getElementById('modal-pro-dashboard');
  if (modal) modal.classList.remove('active');
}

function switchProDashboardTab(tabName) {
  triggerHapticFeedback();
  playPop();
  const tabs = ['oportunidades', 'billetera', 'cotizaciones', 'membresia'];
  tabs.forEach(t => {
    const btn = document.getElementById(`pro-dash-tab-btn-${t}`);
    const view = document.getElementById(`pro-dash-view-${t}`);
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (view) {
      if (t === tabName) view.style.display = 'block';
      else view.style.display = 'none';
    }
  });
}

function withdrawProFunds() {
  triggerHapticFeedback();
  playSuccessChime();
  showToast('💸 Retiro Solicitado con Éxito', 'Se transfirieron $49.000 ARS a tu cuenta vinculada de Marcos R. Comprobante enviado por email.');
  const balText = document.getElementById('pro-dash-balance-text');
  const bigBal = document.getElementById('pro-wallet-big-balance');
  if (balText) balText.textContent = '$0 ARS';
  if (bigBal) bigBal.innerHTML = '$0 <span style="font-size: 1rem; font-weight: 600;">ARS</span>';
}

function openClientWarrantyModal() {
  triggerHapticFeedback();
  playPop();
  const modal = document.getElementById('modal-client-warranty');
  if (modal) modal.classList.add('active');
}

function closeClientWarrantyModal() {
  const modal = document.getElementById('modal-client-warranty');
  if (modal) modal.classList.remove('active');
}

function switchProfile(roleKey) {
  triggerHapticFeedback();
  playSuccessChime();

  const profile = PROFILES[roleKey] || PROFILES.client;
  appState.currentUser = Object.assign({}, profile);
  appState.currentRole = roleKey;
  saveAppState();

  updateNavAuthState();
  applyRoleView(roleKey);
  closeUserDropdown();
  closeAccountModal();

  if (roleKey === 'admin') {
    showToast('👑 Modo Administrador Dueño Activo', 'Control total de ingresos, comisiones, pagos en custodia y matrículas.');
    setTimeout(() => {
      openAdminBackofficeModal();
    }, 300);
  } else if (roleKey === 'pro') {
    showToast('⚡ Modo Profesional Pro Activo', 'Bienvenido Marcos. Podés cotizar solicitudes abiertas y cobrar mediante Mercado Pago.');
    setTimeout(() => {
      openProDashboardModal('oportunidades');
    }, 300);
  } else {
    showToast('👤 Modo Cliente Activo', 'Bienvenido Carlos. Podés buscar oficios verificados y contratar con pago protegido.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleUserDropdown() {
  triggerHapticFeedback();
  playPop();
  const wrapper = document.getElementById('nav-user-dropdown-wrapper');
  if (!wrapper) return;
  wrapper.classList.toggle('open');
}

function closeUserDropdown() {
  const wrapper = document.getElementById('nav-user-dropdown-wrapper');
  if (wrapper) wrapper.classList.remove('open');
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('nav-user-dropdown-wrapper');
  if (wrapper && wrapper.classList.contains('open')) {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('open');
    }
  }
});

function handleProNavClick() {
  triggerHapticFeedback();
  playPop();
  if (appState.currentUser && appState.currentUser.role === 'pro') {
    openProDashboardModal('oportunidades');
  } else {
    openAuthModal('pro');
  }
}

function toggleUserRoleMode() {
  triggerHapticFeedback();
  playPop();
  const newRole = appState.currentRole === 'client' ? 'pro' : 'client';
  switchProfile(newRole);
}

function setRole(role) {
  switchProfile(role);
}

function applyRoleView(role) {
  const clientViews = document.querySelectorAll('.view-client-only');
  const proViews = document.querySelectorAll('.view-pro-only');
  const adminViews = document.querySelectorAll('.view-admin-only');
  const adminQuickBtn = document.getElementById('nav-admin-quick-btn');
  const proQuickBtn = document.getElementById('nav-pro-quick-btn');

  if (adminQuickBtn) {
    adminQuickBtn.style.display = (role === 'admin' && appState.currentUser) ? 'inline-flex' : 'none';
  }
  if (proQuickBtn) {
    proQuickBtn.style.display = (role === 'pro' && appState.currentUser) ? 'inline-flex' : 'none';
  }

  if (role === 'pro') {
    clientViews.forEach(el => el.style.display = 'none');
    proViews.forEach(el => el.style.display = 'flex');
    adminViews.forEach(el => el.style.display = 'none');
  } else if (role === 'admin') {
    clientViews.forEach(el => el.style.display = 'none');
    proViews.forEach(el => el.style.display = 'none');
    adminViews.forEach(el => el.style.display = 'flex');
  } else if (role === 'client') {
    clientViews.forEach(el => el.style.display = 'flex');
    proViews.forEach(el => el.style.display = 'none');
    adminViews.forEach(el => el.style.display = 'none');
  } else {
    // guest
    clientViews.forEach(el => el.style.display = 'none');
    proViews.forEach(el => el.style.display = 'none');
    adminViews.forEach(el => el.style.display = 'none');
  }
}

function logoutUser() {
  triggerHapticFeedback();
  playPop();
  closeUserDropdown();
  closeAccountModal();

  appState.currentUser = null;
  appState.currentRole = 'guest';
  saveAppState();

  updateNavAuthState();
  applyRoleView('guest');

  showToast('Sesión cerrada', 'Has cerrado tu sesión. Podés ingresar nuevamente con Google o elegir un perfil.');
}

function openAuthModal(initialTab = 'client') {
  triggerHapticFeedback();
  playPop();
  switchAuthTab(initialTab);
  const modal = document.getElementById('modal-auth');
  if (modal) modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('modal-auth');
  if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
  const clientTabBtn = document.getElementById('auth-tab-client');
  const proTabBtn = document.getElementById('auth-tab-pro');
  const clientView = document.getElementById('auth-client-view');
  const proView = document.getElementById('auth-pro-view');
  const modalTitle = document.getElementById('auth-modal-title');

  if (tab === 'client') {
    if (clientTabBtn) clientTabBtn.classList.add('active');
    if (proTabBtn) proTabBtn.classList.remove('active');
    if (clientView) clientView.style.display = 'block';
    if (proView) proView.style.display = 'none';
    if (modalTitle) modalTitle.textContent = 'Ingresar como Cliente';
  } else {
    if (proTabBtn) proTabBtn.classList.add('active');
    if (clientTabBtn) clientTabBtn.classList.remove('active');
    if (clientView) clientView.style.display = 'none';
    if (proView) proView.style.display = 'block';
    if (modalTitle) modalTitle.textContent = 'Registro Profesional Sademy';
  }
}

function loginWithGoogle(role = 'client') {
  triggerHapticFeedback();
  playSuccessChime();
  switchProfile(role === 'pro' ? 'pro' : 'client');
  closeAuthModal();
}

function loginWithEmail(role = 'client') {
  triggerHapticFeedback();
  playSuccessChime();
  const emailInput = document.getElementById('client-auth-email');
  const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'carlos@sademy.com';
  
  if (role === 'pro') {
    switchProfile('pro');
  } else {
    switchProfile('client');
  }
  if (appState.currentUser) {
    appState.currentUser.email = email;
    saveAppState();
    updateNavAuthState();
  }
  closeAuthModal();
}

function simulateFileUpload() {
  triggerHapticFeedback();
  playPop();
  const dropzone = document.getElementById('worker-dni-dropzone');
  const statusText = document.getElementById('dropzone-status-text');

  if (dropzone) dropzone.classList.add('uploaded');
  if (statusText) {
    statusText.innerHTML = `
      <span style="color: #065F46; font-weight: 700;">✅ DNI_Frente_Dorso_Verificado.pdf adjuntado</span>
      <span style="font-size: 0.74rem; color: #059669; display: block;">Documento cargado correctamente (2.4 MB)</span>
    `;
  }
  showToast('Documento recibido', 'Comprobante de DNI y matrícula cargado para revisión.');
}

function submitWorkerVerification() {
  triggerHapticFeedback();
  playSuccessChime();
  const tradeSelect = document.getElementById('worker-field-trade');
  const dni = document.getElementById('worker-field-dni').value.trim() || '38.492.110';
  const matricula = document.getElementById('worker-field-matricula').value.trim() || 'MAT-OFICIAL-994';
  const zone = document.getElementById('worker-field-zone').value.trim() || 'CABA y Alrededores';
  const tradeName = tradeSelect ? tradeSelect.options[tradeSelect.selectedIndex].text : 'Electricista';

  appState.currentUser = {
    id: 'usr-pro-' + Date.now(),
    name: 'Marcos R. (Pro)',
    email: 'marcos.pro@gmail.com',
    avatar: 'assets/marcos.jpg',
    role: 'pro',
    trade: tradeName,
    dni: dni,
    matricula: matricula,
    zone: zone,
    verified: true
  };
  appState.currentRole = 'pro';
  saveAppState();
  closeAuthModal();
  updateNavAuthState();

  showToast('¡Perfil Profesional Validado!', `Se verificó tu DNI (${dni}) y matrícula. Ya podés cotizar trabajos en Sademy Pro.`);
  const proSection = document.getElementById('sademy-pro');
  if (proSection) proSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================================================
// 5. GESTIÓN REAL DE PEDIDOS, PRESUPUESTOS Y PERSISTENCIA
// ============================================================================
function updateOrdersBadges() {
  const activeOrders = appState.orders.filter(o => !o.completed);
  const badgeEl = document.getElementById('nav-orders-badge');
  const menuBadgeEl = document.getElementById('menu-orders-badge');

  if (badgeEl) badgeEl.textContent = activeOrders.length;
  if (menuBadgeEl) menuBadgeEl.textContent = activeOrders.length;
}

function renderActiveOrderBanner() {
  const banner = document.getElementById('active-order-banner');
  if (!banner) return;

  const currentOrder = appState.orders[0];
  if (!currentOrder) return;

  if (currentOrder.paid && !currentOrder.completed) {
    banner.style.background = 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)';
    banner.innerHTML = `
      <div class="request-meta-info">
        <div class="request-icon-bullet" style="background-color: var(--color-primary);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <h4 class="request-heading" style="margin: 0;">🛡️ Fondos en Custodia Segura (${currentOrder.escrowCode || 'ESCROW-ACTIVO'})</h4>
            <span class="badge-tag" style="background: #065F46; color: #FFFFFF; font-weight: 800; font-size: 0.78rem;">PIN: ${currentOrder.conformityPin || '7412'}</span>
          </div>
          <p class="request-subtext" style="margin-top: 4px;">
            El profesional fue notificado. Tu dinero está protegido en Sademy y solo se transfiere cuando le entregues el PIN al finalizar.
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="openChatModal('${currentOrder.quotes[0]?.proName || 'Marcos R.'}')">Chatear</button>
        <button class="btn btn-primary btn-sm" onclick="releasePaymentPrompt('${currentOrder.id}')" style="background: #065F46; font-weight: 700;">Ingresar PIN y Liberar Fondos</button>
      </div>
    `;
  }
}

// Modal Nuevo Pedido (Wizard 3 pasos)
let currentWizardStep = 1;

function openNewOrderModal() {
  triggerHapticFeedback();
  playPop();
  currentWizardStep = 1;
  updateWizardUI();
  const modal = document.getElementById('modal-new-order');
  if (modal) modal.classList.add('active');
}

function openOrderModalWithTrade(tradeCat, workerName = '') {
  openNewOrderModal();
  const select = document.getElementById('wizard-trade-select');
  if (select && tradeCat) select.value = tradeCat;
  if (workerName) {
    const desc = document.getElementById('wizard-order-desc');
    if (desc) desc.placeholder = `Hola, me gustaría solicitar un presupuesto prioritario a ${workerName}...`;
  }
}

function closeOrderModal() {
  const modal = document.getElementById('modal-new-order');
  if (modal) modal.classList.remove('active');
}

function nextWizardStep() {
  triggerHapticFeedback();
  playPop();
  if (currentWizardStep === 1) {
    const title = document.getElementById('wizard-order-title').value.trim();
    if (!title) {
      alert('Por favor, ingresá qué necesitás resolver (ej: Reparación de canilla)');
      return;
    }
  }
  if (currentWizardStep < 3) {
    currentWizardStep++;
    updateWizardUI();
  } else {
    submitNewOrder();
  }
}

function prevWizardStep() {
  triggerHapticFeedback();
  playPop();
  if (currentWizardStep > 1) {
    currentWizardStep--;
    updateWizardUI();
  }
}

function updateWizardUI() {
  for (let i = 1; i <= 3; i++) {
    const content = document.getElementById(`wizard-step-content-${i}`);
    const bubble = document.getElementById(`wizard-bubble-${i}`);
    if (content) content.style.display = (i === currentWizardStep) ? 'block' : 'none';
    if (bubble) {
      if (i === currentWizardStep) {
        bubble.className = 'wizard-step-bubble active';
      } else if (i < currentWizardStep) {
        bubble.className = 'wizard-step-bubble completed';
      } else {
        bubble.className = 'wizard-step-bubble';
      }
    }
  }

  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  if (prevBtn) prevBtn.style.display = (currentWizardStep === 1) ? 'none' : 'inline-flex';
  if (nextBtn) nextBtn.textContent = (currentWizardStep === 3) ? 'Publicar Pedido' : 'Continuar';
}

function submitNewOrder() {
  const title = document.getElementById('wizard-order-title').value.trim() || 'Nuevo Trabajo en Casa';
  const tradeSelect = document.getElementById('wizard-trade-select');
  const tradeCat = tradeSelect ? tradeSelect.value : 'electricidad';
  const tradeName = tradeSelect ? tradeSelect.options[tradeSelect.selectedIndex].text : 'Electricista';
  const desc = document.getElementById('wizard-order-desc').value.trim() || 'Detalles a coordinar con el profesional.';
  const address = document.getElementById('wizard-order-address').value.trim() || 'Palermo, CABA';

  const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

  const newOrder = {
    id: newOrderId,
    title: title,
    category: tradeCat,
    categoryName: tradeName,
    description: desc,
    address: address,
    status: 'Buscando presupuestos',
    statusBadgeClass: 'badge-new',
    date: 'Recién publicado',
    paid: false,
    completed: false,
    escrowCode: null,
    quotes: []
  };

  // Guardar en el almacenamiento real
  appState.orders.unshift(newOrder);
  saveAppState();

  closeOrderModal();
  triggerHapticFeedback();
  playSuccessChime();
  updateOrdersBadges();
  renderMyOrdersModalList();

  showToast('¡Pedido publicado con éxito!', `Notificando a trabajadores verificados de ${tradeName} en ${address}...`);

  // Simular recepción automática de 2 cotizaciones reales de profesionales verificados
  setTimeout(() => {
    generateAutomatedQuotesForOrder(newOrderId, tradeCat);
  }, 2200);
}

function generateAutomatedQuotesForOrder(orderId, tradeCat) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  const matchingPros = PROFESSIONALS_DATA.filter(p => p.category === tradeCat);
  const pro1 = matchingPros[0] || PROFESSIONALS_DATA[0];
  const pro2 = matchingPros[1] || PROFESSIONALS_DATA[1];

  order.status = 'Presupuestos recibidos';
  order.quotes = [
    {
      id: `quote-${pro1.id}-${Date.now()}`,
      proId: pro1.id,
      proName: pro1.name,
      proTrade: pro1.trade.toUpperCase(),
      proBadge: 'VERIFICADO PRO',
      avatar: pro1.avatar,
      rating: pro1.rating,
      jobsCount: pro1.completedJobs,
      materialsNote: 'Mano de obra especializada + materiales de 1ra calidad',
      laborPrice: 19500,
      materialsPrice: 5500,
      totalPrice: 25000,
      warranty: '6 meses de garantía oficial Sademy',
      estimatedDuration: '2 a 3 horas',
      availability: 'Disponible hoy mismo',
      recommended: true,
      breakdownItems: [
        `Mano de obra calificada por ${pro1.name} ($19.500)`,
        'Materiales y piezas homologadas ($5.500)',
        'Verificación de seguridad técnica (Bonificado)',
        'Custodia de pago protegido Sademy ($0)'
      ]
    },
    {
      id: `quote-${pro2.id}-${Date.now()}`,
      proId: pro2.id,
      proName: pro2.name,
      proTrade: pro2.trade.toUpperCase(),
      proBadge: 'MATRICULADO',
      avatar: pro2.avatar,
      rating: pro2.rating,
      jobsCount: pro2.completedJobs,
      materialsNote: 'Mano de obra garantizada',
      laborPrice: 18000,
      materialsPrice: 4000,
      totalPrice: 22000,
      warranty: '1 año de garantía escrita',
      estimatedDuration: '3 horas',
      availability: 'Mañana por la mañana',
      recommended: false,
      breakdownItems: [
        `Servicio técnico certificado por ${pro2.name} ($18.000)`,
        'Repuestos de norma reglamentaria ($4.000)',
        'Seguro contra daños Sademy incluido ($0)'
      ]
    }
  ];

  saveAppState();
  triggerHapticFeedback();
  playSuccessChime();
  updateOrdersBadges();
  renderMyOrdersModalList();

  showToast('¡Nuevas cotizaciones recibidas!', `${pro1.name} y ${pro2.name} enviaron propuestas para "${order.title}".`);
}

// Modal Mis Pedidos Dinámico
function openMyOrdersModal() {
  triggerHapticFeedback();
  playPop();
  renderMyOrdersModalList();
  const modal = document.getElementById('modal-my-orders');
  if (modal) modal.classList.add('active');
}

function closeMyOrdersModal() {
  const modal = document.getElementById('modal-my-orders');
  if (modal) modal.classList.remove('active');
}

function renderMyOrdersModalList() {
  const container = document.getElementById('my-orders-list-container');
  if (!container) return;

  if (appState.orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 16px; color: var(--color-text-tertiary);">
        <p style="font-size: 1rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 6px;">No tenés pedidos activos aún</p>
        <p style="font-size: 0.85rem; margin-bottom: 16px;">Publicá una solicitud para recibir presupuestos en minutos.</p>
        <button class="btn btn-primary btn-sm" onclick="closeMyOrdersModal(); openNewOrderModal();">+ Publicar Pedido</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.orders.map(order => {
    const isCompleted = order.completed;
    const isPaid = order.paid && !order.completed;
    const hasQuotes = order.quotes && order.quotes.length > 0;

    let statusPillClass = 'badge-new';
    if (isCompleted) statusPillClass = 'badge-completed';
    else if (isPaid) statusPillClass = 'badge-profession';

    return `
      <div style="background-color: #FFFFFF; border: 1.5px solid ${isPaid ? 'var(--color-primary)' : 'var(--color-border)'}; border-radius: 12px; padding: 18px; box-shadow: var(--shadow-xs);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="badge-tag ${statusPillClass}">
            ${isCompleted ? 'Finalizado con éxito' : isPaid ? 'Pago en Custodia Segura' : `${order.status} (${order.quotes.length} cotizaciones)`}
          </span>
          <span style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600;">${order.id} · ${order.date}</span>
        </div>
        
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 4px;">
          ${order.title}
        </h4>
        <p style="font-size: 0.84rem; color: var(--color-text-secondary); margin-bottom: 12px;">
          📍 ${order.address} · <strong>${order.categoryName}</strong>
        </p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${hasQuotes && !isPaid && !isCompleted ? `
            <button class="btn btn-primary btn-sm" onclick="closeMyOrdersModal(); openQuoteDetailModal('${order.quotes[0].id}')">
              Ver Presupuestos (${order.quotes.length})
            </button>
          ` : ''}

          ${isPaid && !isCompleted ? `
            <button class="btn btn-primary btn-sm" onclick="releasePaymentPrompt('${order.id}')">
              Liberar Pago al Finalizar
            </button>
          ` : ''}

          <button class="btn btn-secondary btn-sm" onclick="closeMyOrdersModal(); openChatModal('${order.quotes[0]?.proName || 'Marcos R.'}')">
            Chatear con el Profesional
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Modal Detalle de Presupuesto
function openQuoteDetailModal(quoteId) {
  triggerHapticFeedback();
  playPop();

  let foundQuote = null;
  let targetOrder = null;

  for (const ord of appState.orders) {
    const q = ord.quotes?.find(item => item.id === quoteId);
    if (q) {
      foundQuote = q;
      targetOrder = ord;
      break;
    }
  }

  if (!foundQuote && appState.orders[0]?.quotes?.length) {
    foundQuote = appState.orders[0].quotes[0];
    targetOrder = appState.orders[0];
  }

  if (!foundQuote) return;

  const container = document.getElementById('quote-detail-content');
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border);">
      <img src="${foundQuote.avatar}" alt="${foundQuote.proName}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--color-primary);">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-main);">${foundQuote.proName}</h4>
          <span class="badge-tag badge-profession">${foundQuote.proTrade}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 2px;">
          ★ <strong>${foundQuote.rating}</strong> (${foundQuote.jobsCount} trabajos completados en Sademy)
        </p>
      </div>
    </div>

    <div style="background-color: var(--color-surface-light); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
      <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 10px;">Desglose transparente del trabajo</h5>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--color-text-secondary);">
        ${foundQuote.breakdownItems.map(item => `
          <li style="display: flex; align-items: flex-start; gap: 8px;">
            <svg style="color: var(--color-primary); margin-top: 3px; flex-shrink: 0;" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--color-border); font-weight: 800; font-size: 1.15rem; color: #065F46;">
        <span>Total final garantizado</span>
        <span>$${foundQuote.totalPrice.toLocaleString('es-AR')} ARS</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; font-size: 0.85rem;">
      <div style="background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
        <strong style="display: block; color: var(--color-text-main); margin-bottom: 4px;">⏱️ Duración estimada</strong>
        <span style="color: var(--color-text-secondary);">${foundQuote.estimatedDuration}</span>
      </div>
      <div style="background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
        <strong style="display: block; color: var(--color-text-main); margin-bottom: 4px;">🛡️ Cobertura Sademy</strong>
        <span style="color: var(--color-text-secondary);">${foundQuote.warranty}</span>
      </div>
    </div>

    <div style="background-color: #ECFDF5; border: 1px solid var(--color-primary-border); border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px;">
      <img src="assets/mascot.jpg" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="Garantía Sademy">
      <div style="font-size: 0.82rem; color: #065F46;">
        <strong>Garantía de Satisfacción 100%:</strong> Tu pago queda retenido de forma segura en Sademy y no se libera al profesional hasta que des tu conformidad de que el trabajo quedó perfecto.
      </div>
    </div>
  `;

  const payBtn = document.getElementById('modal-quote-pay-btn');
  if (payBtn) {
    payBtn.onclick = () => {
      closeQuoteDetailModal();
      openPaymentModal(foundQuote, targetOrder);
    };
  }

  const modal = document.getElementById('modal-quote-detail');
  if (modal) modal.classList.add('active');
}

function closeQuoteDetailModal() {
  const modal = document.getElementById('modal-quote-detail');
  if (modal) modal.classList.remove('active');
}

// Modal de Pasarela de Pago Protegido (Escrow)
let currentQuoteForPayment = null;
let currentOrderForPayment = null;

function openPaymentModal(quote, order = null) {
  triggerHapticFeedback();
  playPop();
  currentQuoteForPayment = quote || appState.orders[0]?.quotes[0];
  currentOrderForPayment = order || appState.orders[0];

  const amountEl = document.getElementById('payment-modal-amount');
  const proNameEl = document.getElementById('payment-modal-pro-name');
  if (amountEl && currentQuoteForPayment) {
    amountEl.textContent = `$${currentQuoteForPayment.totalPrice.toLocaleString('es-AR')} ARS`;
  }
  if (proNameEl && currentQuoteForPayment) {
    proNameEl.textContent = currentQuoteForPayment.proName;
  }

  const modal = document.getElementById('modal-escrow-payment');
  if (modal) modal.classList.add('active');
}

function closePaymentModal() {
  const modal = document.getElementById('modal-escrow-payment');
  if (modal) modal.classList.remove('active');
}

function confirmEscrowPayment() {
  triggerHapticFeedback();
  playSuccessChime();
  closePaymentModal();

  const quote = currentQuoteForPayment || appState.orders[0]?.quotes[0];
  const order = currentOrderForPayment || appState.orders[0];

  if (order) {
    const pin = Math.floor(1000 + Math.random() * 9000);
    order.paid = true;
    order.status = 'Pago en Custodia Segura';
    order.escrowCode = `ESCROW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    order.conformityPin = pin;
    order.hiredPro = {
      name: quote?.proName || 'Marcos R.',
      trade: quote?.proTrade || 'Electricista',
      price: quote?.totalPrice || 24500,
      avatar: quote?.avatar || 'assets/marcos.jpg'
    };

    // Registrar en contabilidad del Administrador
    const basePrice = quote?.totalPrice || 24500;
    const feeRate = ((appState.currentUser && appState.currentUser.proPlan === 'gold') ? 0.08 : 0.12);
    const platformCommission = Math.round(basePrice * feeRate);

    if (!appState.adminTransactions) appState.adminTransactions = [];
    appState.adminTransactions.unshift({
      id: order.id,
      client: (appState.currentUser && appState.currentUser.name) || 'Carlos M.',
      pro: order.hiredPro.name,
      trade: order.categoryName || 'Electricista',
      amount: basePrice,
      fee: platformCommission,
      status: 'Retenido en Custodia',
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    if (appState.adminMetrics) {
      appState.adminMetrics.gmv += (basePrice + 1800);
      appState.adminMetrics.feesCollected += platformCommission;
      appState.adminMetrics.escrowActive += basePrice;
    }

    saveAppState();
  }

  renderActiveOrderBanner();
  renderMyOrdersModalList();

  showToast('¡Pago en custodia confirmado con Mercado Pago!', `Fondos retenidos (${order?.escrowCode}). Tu PIN de conformidad es: ${order?.conformityPin}`);
}

function releasePaymentPrompt(orderId) {
  triggerHapticFeedback();
  playPop();
  const order = appState.orders.find(o => o.id === orderId) || appState.orders[0];
  const proName = order.hiredPro?.name || order.quotes[0]?.proName || 'Marcos R.';
  const correctPin = order.conformityPin || '7412';

  const enteredPin = prompt(`Ingresá el PIN de 4 dígitos para liberar los fondos a ${proName} (Tu PIN es ${correctPin}):`, correctPin);
  if (enteredPin === String(correctPin)) {
    order.completed = true;
    order.status = 'Finalizado con éxito';

    // Actualizar estado en el libro de transacciones de administración
    if (appState.adminTransactions) {
      const tx = appState.adminTransactions.find(t => t.id === order.id);
      if (tx) tx.status = 'Liberado al Pro (Pago MP)';
    }
    if (appState.adminMetrics && appState.adminMetrics.escrowActive >= (order.hiredPro?.price || 24500)) {
      appState.adminMetrics.escrowActive -= (order.hiredPro?.price || 24500);
    }

    saveAppState();
    playSuccessChime();
    renderActiveOrderBanner();
    renderMyOrdersModalList();
    updateOrdersBadges();

    showToast('¡Pago liberado exitosamente!', `${proName} recibió sus honorarios vía Mercado Pago. ¡Gracias por confiar en Sademy!`);
    promptReviewModal(proName, order);
  } else if (enteredPin !== null) {
    showToast('PIN incorrecto', 'Verificá el PIN de 4 dígitos generado al momento del pago.');
  }
}

function promptReviewModal(proName, order) {
  const stars = prompt(`¿Cuántas estrellas le das al trabajo de ${proName}? (1 al 5)`, '5');
  if (stars) {
    order.review = {
      stars: parseInt(stars) || 5,
      comment: 'Trabajo verificado con satisfacción total en Sademy.'
    };
    saveAppState();
    showToast('¡Reseña registrada!', 'Tu opinión ayuda a construir una comunidad de confianza en Sademy.');
  }
}

// ============================================================================
// 6. PORTAL SADEMY PRO: COTIZAR SOLICITUDES EN TIEMPO REAL
// ============================================================================
function sendWorkerProposal(orderTitle) {
  triggerHapticFeedback();
  playPop();
  
  const subtitle = document.getElementById('pro-quote-order-subtitle');
  const titleVal = document.getElementById('pro-quote-order-title-val');
  if (subtitle) subtitle.textContent = `Propuesta para: "${orderTitle}"`;
  if (titleVal) titleVal.value = orderTitle;

  const modal = document.getElementById('modal-pro-send-quote');
  if (modal) modal.classList.add('active');
}

function closeProQuoteModal() {
  const modal = document.getElementById('modal-pro-send-quote');
  if (modal) modal.classList.remove('active');
}

function submitProQuote() {
  triggerHapticFeedback();
  playSuccessChime();

  const labor = parseInt(document.getElementById('pro-quote-labor').value) || 18000;
  const materials = parseInt(document.getElementById('pro-quote-materials').value) || 0;
  const time = document.getElementById('pro-quote-time').value.trim() || '2 horas aprox.';
  const desc = document.getElementById('pro-quote-desc').value.trim();
  const orderTitle = document.getElementById('pro-quote-order-title-val').value || 'Trabajo solicitado';

  closeProQuoteModal();

  // Asociar cotización al pedido del cliente si coincide
  const matchingOrder = appState.orders.find(o => o.title.includes(orderTitle) || orderTitle.includes(o.title)) || appState.orders[0];
  if (matchingOrder) {
    const userProName = appState.currentUser?.name || 'Tu Perfil Pro';
    matchingOrder.quotes.push({
      id: `quote-custom-${Date.now()}`,
      proId: 'pro-user',
      proName: userProName,
      proTrade: 'PROFESIONAL VERIFICADO',
      proBadge: 'TU PROPUESTA',
      avatar: 'assets/mascot.jpg',
      rating: 5.0,
      jobsCount: 1,
      materialsNote: desc,
      laborPrice: labor,
      materialsPrice: materials,
      totalPrice: labor + materials,
      warranty: '6 meses de garantía oficial Sademy',
      estimatedDuration: time,
      availability: 'A coordinar',
      recommended: false,
      breakdownItems: [
        `Mano de obra especializada ($${labor.toLocaleString('es-AR')})`,
        `Materiales y repuestos ($${materials.toLocaleString('es-AR')})`,
        desc,
        'Custodia segura garantizada por Sademy ($0)'
      ]
    });
    matchingOrder.status = 'Presupuestos recibidos';
    saveAppState();
  }

  showToast('¡Cotización enviada con éxito!', `El cliente recibió tu propuesta formal de $${(labor + materials).toLocaleString('es-AR')} ARS.`);
}

// ============================================================================
// 7. CHAT PERSISTENTE Y ENMASCARAMIENTO ANTIFRAUDE
// ============================================================================
let currentChatWorker = 'Marcos R.';

function openChatModal(proName = 'Marcos R.') {
  triggerHapticFeedback();
  playPop();
  currentChatWorker = proName;
  const title = document.getElementById('chat-modal-title');
  if (title) title.textContent = `Chat con ${proName}`;
  renderChatMessages();
  const modal = document.getElementById('modal-chat');
  if (modal) modal.classList.add('active');
}

function closeChatModal() {
  const modal = document.getElementById('modal-chat');
  if (modal) modal.classList.remove('active');
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const thread = appState.chatThreads[currentChatWorker] || [
    { sender: 'worker', text: `Hola, soy ${currentChatWorker}. ¿En qué te puedo ayudar?`, time: '10:00' }
  ];

  container.innerHTML = thread.map(msg => {
    if (msg.sender === 'system') {
      return `<div class="chat-bubble system-warning">${msg.text}</div>`;
    }
    return `
      <div class="chat-bubble ${msg.sender}">
        <div>${msg.text}</div>
        <div style="font-size: 0.68rem; text-align: right; opacity: 0.75; margin-top: 4px;">${msg.time}</div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  triggerHapticFeedback();
  const input = document.getElementById('chat-input-field');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  // Detección anti-bypass de teléfonos / mails antes de pagar
  const phoneRegex = /(\+?54|11|15)?[0-9\s-]{7,12}/;
  const hasPhone = phoneRegex.test(text);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (!appState.chatThreads[currentChatWorker]) {
    appState.chatThreads[currentChatWorker] = [];
  }

  appState.chatThreads[currentChatWorker].push({
    sender: 'client',
    text: text,
    time: timeStr
  });

  input.value = '';
  renderChatMessages();
  saveAppState();
  playPop();

  if (hasPhone) {
    setTimeout(() => {
      appState.chatThreads[currentChatWorker].push({
        sender: 'system',
        text: '⚠️ Recordatorio de Seguridad: Los números y datos de contacto se habilitan automáticamente una vez confirmado el presupuesto para garantizar tu Seguro contra Daños de hasta $500.000.',
        time: timeStr
      });
      renderChatMessages();
      saveAppState();
    }, 600);
    return;
  }

  // Respuesta contextual simulada y persistente
  setTimeout(() => {
    playPop();
    appState.chatThreads[currentChatWorker].push({
      sender: 'worker',
      text: 'Entendido perfectamente. Ya registré los detalles y tengo los materiales listos para cuando confirmes la contratación.',
      time: timeStr
    });
    renderChatMessages();
    saveAppState();
  }, 1100);
}

// ============================================================================
// 8. DIRECTORIO DE PROFESIONALES Y FILTROS EN VIVO
// ============================================================================
function renderProfessionalsDirectory() {
  const container = document.getElementById('professionals-grid');
  if (!container) return;

  const filtered = PROFESSIONALS_DATA.filter(pro => {
    if (appState.activeFilterTrade !== 'all' && pro.category !== appState.activeFilterTrade) return false;
    if (appState.activeFilterZone !== 'all' && !pro.city.includes(appState.activeFilterZone)) return false;
    if (appState.activeFilterVerifiedOnly && !pro.certified) return false;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #FFFFFF; border-radius: 16px; border: 1px dashed var(--color-border);">
        <p style="font-weight: 700; font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 8px;">No se encontraron profesionales con estos filtros</p>
        <p style="color: var(--color-text-tertiary); font-size: 0.9rem;">Probá restableciendo los filtros o seleccionando otra especialidad.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 14px;" onclick="resetFilters()">Restablecer Filtros</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(pro => `
    <div class="profile-card">
      <div class="profile-card-top">
        <img src="${pro.avatar}" alt="${pro.name}" class="profile-avatar" onerror="this.src='assets/mascot.jpg'">
        <div class="profile-main-meta">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-text-main);">${pro.name}</h3>
            ${pro.certified ? `
              <span title="Matrícula y antecedentes 100% verificados" style="display: inline-flex; align-items: center; gap: 4px; color: var(--color-primary); font-size: 0.75rem; font-weight: 700;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Verificado
              </span>
            ` : ''}
          </div>
          <p style="font-size: 0.86rem; font-weight: 600; color: var(--color-text-secondary);">${pro.trade}</p>
          <div class="profile-rating-badge">
            <span style="color: var(--color-rating);">★</span>
            <span>${pro.rating}</span>
            <span style="color: var(--color-text-tertiary); font-weight: normal;">(${pro.reviewsCount} reseñas)</span>
          </div>
        </div>
      </div>

      <div class="profile-card-body">
        <p class="profile-bio">${pro.bio}</p>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--color-text-tertiary);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${pro.zone}</span>
        </div>
        <div class="profile-skills-row">
          ${pro.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>

      <div class="profile-card-footer">
        <div class="profile-price-hint">
          <span>Referencia desde</span>
          <strong>${pro.priceHint}</strong>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openOrderModalWithTrade('${pro.category}', '${pro.name}')">
          Pedir Presupuesto
        </button>
      </div>
    </div>
  `).join('');
}

function resetFilters() {
  triggerHapticFeedback();
  appState.activeFilterTrade = 'all';
  appState.activeFilterZone = 'all';
  appState.activeFilterVerifiedOnly = false;
  
  const tradeSelect = document.getElementById('filter-trade-select');
  const zoneSelect = document.getElementById('filter-zone-select');
  const verifiedCheck = document.getElementById('filter-verified-check');

  if (tradeSelect) tradeSelect.value = 'all';
  if (zoneSelect) zoneSelect.value = 'all';
  if (verifiedCheck) verifiedCheck.checked = false;

  renderProfessionalsDirectory();
}

// ============================================================================
// 9. EVENT LISTENERS & EXPERIENCIA HÁPTICA / AUDIO APPLE & SAMSUNG
// ============================================================================
function initEventListeners() {
  const tradeSelect = document.getElementById('filter-trade-select');
  if (tradeSelect) {
    tradeSelect.addEventListener('change', (e) => {
      appState.activeFilterTrade = e.target.value;
      renderProfessionalsDirectory();
    });
  }

  const zoneSelect = document.getElementById('filter-zone-select');
  if (zoneSelect) {
    zoneSelect.addEventListener('change', (e) => {
      appState.activeFilterZone = e.target.value;
      renderProfessionalsDirectory();
    });
  }

  const verifiedCheck = document.getElementById('filter-verified-check');
  if (verifiedCheck) {
    verifiedCheck.addEventListener('change', (e) => {
      appState.activeFilterVerifiedOnly = e.target.checked;
      renderProfessionalsDirectory();
    });
  }

  // Chips rápidos en hero
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      triggerHapticFeedback();
      playPop();
      document.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-cat');
      appState.activeFilterTrade = cat;
      const select = document.getElementById('filter-trade-select');
      if (select) select.value = cat;
      renderProfessionalsDirectory();
      
      const dirSection = document.getElementById('directorio');
      if (dirSection) dirSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Categorías
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      triggerHapticFeedback();
      playPop();
      const cat = card.getAttribute('data-cat');
      appState.activeFilterTrade = cat;
      const select = document.getElementById('filter-trade-select');
      if (select) select.value = cat;
      renderProfessionalsDirectory();
      const dirSection = document.getElementById('directorio');
      if (dirSection) dirSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Cerrar modales al hacer clic en el backdrop o pulsar Escape
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
      closeUserDropdown();
    }
  });
}

function initCalculator() {
  const selectTrade = document.getElementById('calc-trade');
  const selectScope = document.getElementById('calc-scope');
  const amountEl = document.getElementById('calc-result-amount');
  const timeEl = document.getElementById('calc-result-time');

  function updateCalc() {
    if (!selectTrade || !selectScope || !amountEl) return;
    const trade = selectTrade.value;
    const scope = selectScope.value;

    let base = 15000;
    let time = '1 a 2 horas';

    if (trade === 'electricidad') {
      base = scope === 'pequeño' ? 14000 : scope === 'mediano' ? 24500 : 48000;
      time = scope === 'pequeño' ? '1 hora' : scope === 'mediano' ? '2 a 3 horas' : '1 día';
    } else if (trade === 'plomeria') {
      base = scope === 'pequeño' ? 16000 : scope === 'mediano' ? 28000 : 55000;
      time = scope === 'pequeño' ? '1 hora' : scope === 'mediano' ? '3 horas' : '1 a 2 días';
    } else if (trade === 'gas') {
      base = scope === 'pequeño' ? 22000 : scope === 'mediano' ? 38000 : 75000;
      time = scope === 'pequeño' ? '2 horas' : scope === 'mediano' ? '4 horas' : '2 días';
    } else if (trade === 'pintura') {
      base = scope === 'pequeño' ? 25000 : scope === 'mediano' ? 60000 : 140000;
      time = scope === 'pequeño' ? '1 día' : scope === 'mediano' ? '2 a 3 días' : '1 semana';
    }

    amountEl.textContent = `$${base.toLocaleString('es-AR')}`;
    if (timeEl) timeEl.textContent = time;
  }

  if (selectTrade) selectTrade.addEventListener('change', updateCalc);
  if (selectScope) selectScope.addEventListener('change', updateCalc);
}

// ============================================================================
// 10. NOTIFICACIONES TOAST & FEEDBACK HÁPTICO/AUDIO
// ============================================================================
function showToast(title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <img src="assets/favicon.svg" class="toast-mascot" alt="Sademy">
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

// Vibración háptica en dispositivos móviles (Samsung Galaxy, Android, iOS WebApp)
function triggerHapticFeedback() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(10);
    } catch (e) {}
  }
}

// Audio háptico sutil (Web Audio API nativo)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playPop() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
}

function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    [523.25, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.06, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.28);
    });
  } catch (e) {}
}

// Splash Preloader Oficial Sademy
function initPreloader() {
  const preloader = document.getElementById('sademy-preloader');
  const bar = document.getElementById('preloader-bar-fill');
  const status = document.getElementById('preloader-status-text');
  if (!preloader || !bar) return;

  bar.style.width = '25%';
  setTimeout(() => {
    if (bar) bar.style.width = '65%';
    if (status) status.textContent = 'Verificando matrículas y antecedentes...';
  }, 250);

  setTimeout(() => {
    if (bar) bar.style.width = '92%';
    if (status) status.textContent = 'Cargando cotizaciones en tu zona...';
  }, 550);

  setTimeout(() => {
    if (bar) bar.style.width = '100%';
    if (status) status.textContent = '¡Plataforma lista!';
  }, 850);

  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1050);
}

// Barra de scroll ultra-fina reactiva
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

// Galería de Trabajos Verificados: Alternar Antes / Después
const CASE_DATA = {
  1: {
    beforeDesc: 'Tablero antiguo con tapones cerámicos sin disyuntor, cables de tela recalentados y corte constante de suministro.',
    afterDesc: 'Tablero seccional ignífugo con disyuntor de 40A y llaves térmicas Schneider normalizadas bajo norma IRAM 2001.'
  },
  2: {
    beforeDesc: 'Caño de plomo y hierro galvanizado picado, pérdida oculta con filtración en mueble de bajo mesada y piso.',
    afterDesc: 'Tendido completo en termofusión Acqua System con doble llave esférica independiente y prueba de estanqueidad a 6 bar.'
  },
  3: {
    beforeDesc: 'Conducto de evacuación de gases corrugado y flexible no reglamentario con riesgo de acumulación de monóxido.',
    afterDesc: 'Tiraje rígido reglamentario en chapa enlozada con sombrerete a cuatro vientos y oblea Metrogas habilitada.'
  }
};

function toggleCaseView(caseId, state) {
  triggerHapticFeedback();
  playPop();
  const btnBefore = document.getElementById(`case-btn-${caseId}-before`);
  const btnAfter = document.getElementById(`case-btn-${caseId}-after`);
  const descEl = document.getElementById(`case-desc-${caseId}`);

  if (state === 'before') {
    if (btnBefore) btnBefore.classList.add('active');
    if (btnAfter) btnAfter.classList.remove('active');
    if (descEl && CASE_DATA[caseId]) {
      descEl.textContent = '⚠️ ESTADO INICIAL: ' + CASE_DATA[caseId].beforeDesc;
      descEl.style.color = '#B45309';
    }
  } else {
    if (btnAfter) btnAfter.classList.add('active');
    if (btnBefore) btnBefore.classList.remove('active');
    if (descEl && CASE_DATA[caseId]) {
      descEl.textContent = '✅ RESULTADO FINAL: ' + CASE_DATA[caseId].afterDesc;
      descEl.style.color = 'var(--color-text-secondary)';
    }
  }
}

// ============================================================================
// 11. INTERACTIVIDAD DE LA APLICACIÓN CENTRAL (MÓVIL Y PC)
// ============================================================================
function switchAppTab(tabName) {
  triggerHapticFeedback();
  playPop();

  const tabs = ['pedidos', 'mensajes', 'ayuda'];
  tabs.forEach(t => {
    const btn = document.getElementById(`app-tab-btn-${t}`);
    const view = document.getElementById(`app-view-${t}`);
    const mobBtn = document.getElementById(`mob-nav-btn-${t}`);

    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }

    if (view) {
      if (t === tabName) {
        view.style.display = 'block';
        view.classList.add('active');
      } else {
        view.style.display = 'none';
        view.classList.remove('active');
      }
    }

    if (mobBtn) {
      if (t === tabName) mobBtn.classList.add('active');
      else mobBtn.classList.remove('active');
    }
  });
}

function selectAppQuote(quoteWorker) {
  triggerHapticFeedback();
  playPop();

  const pillMarcos = document.getElementById('pill-quote-marcos');
  const pillSofia = document.getElementById('pill-quote-sofia');
  const cardMarcos = document.getElementById('quote-card-marcos');
  const cardSofia = document.getElementById('quote-card-sofia');

  if (quoteWorker === 'marcos') {
    if (pillMarcos) pillMarcos.classList.add('active');
    if (pillSofia) pillSofia.classList.remove('active');
    if (cardMarcos) cardMarcos.style.display = 'flex';
    if (cardSofia) cardSofia.style.display = 'none';
  } else {
    if (pillSofia) pillSofia.classList.add('active');
    if (pillMarcos) pillMarcos.classList.remove('active');
    if (cardSofia) cardSofia.style.display = 'flex';
    if (cardMarcos) cardMarcos.style.display = 'none';
  }
}

// ============================================================================
// 12. CHECKOUT MERCADO PAGO Y SPLIT DE PAGOS
// ============================================================================
function selectPaymentMethodOption(method) {
  triggerHapticFeedback();
  playPop();

  const cards = document.querySelectorAll('.mp-method-card');
  cards.forEach(c => c.classList.remove('active'));

  const radioCard = document.getElementById('mp-radio-card');
  const radioBalance = document.getElementById('mp-radio-mp-balance');
  const radioTransfer = document.getElementById('mp-radio-transfer');

  if (method === 'card') {
    if (radioCard) { radioCard.checked = true; radioCard.closest('.mp-method-card')?.classList.add('active'); }
  } else if (method === 'mp-balance') {
    if (radioBalance) { radioBalance.checked = true; radioBalance.closest('.mp-method-card')?.classList.add('active'); }
  } else if (method === 'transfer') {
    if (radioTransfer) { radioTransfer.checked = true; radioTransfer.closest('.mp-method-card')?.classList.add('active'); }
  }
}

// ============================================================================
// 13. PLANES DE SUSCRIPCIÓN SADEMY PRO (MONETIZACIÓN Y MEMBRESÍAS)
// ============================================================================
let isAnnualBilling = false;

function openProSubscriptionsModal() {
  triggerHapticFeedback();
  playPop();
  updateSubscriptionPricingUI();
  highlightActiveSubscriptionCard();
  const modal = document.getElementById('modal-pro-subscriptions');
  if (modal) modal.classList.add('active');
}

function closeProSubscriptionsModal() {
  const modal = document.getElementById('modal-pro-subscriptions');
  if (modal) modal.classList.remove('active');
}

function toggleSubscriptionBillingCycle() {
  triggerHapticFeedback();
  playPop();
  const toggle = document.getElementById('sub-annual-toggle');
  isAnnualBilling = toggle ? toggle.checked : false;
  updateSubscriptionPricingUI();
}

function updateSubscriptionPricingUI() {
  const mLabel = document.getElementById('sub-billing-monthly-label');
  const aLabel = document.getElementById('sub-billing-annual-label');
  const priceGold = document.getElementById('price-val-gold');
  const periodGold = document.getElementById('price-period-gold');
  const pricePlat = document.getElementById('price-val-platinum');
  const periodPlat = document.getElementById('price-period-platinum');

  if (isAnnualBilling) {
    if (mLabel) { mLabel.style.fontWeight = '500'; mLabel.style.color = 'var(--color-text-secondary)'; }
    if (aLabel) { aLabel.style.fontWeight = '700'; aLabel.style.color = 'var(--color-text-main)'; }
    if (priceGold) priceGold.textContent = '11.600';
    if (periodGold) periodGold.textContent = '/ mes (facturado anual)';
    if (pricePlat) pricePlat.textContent = '23.120';
    if (periodPlat) periodPlat.textContent = '/ mes (facturado anual)';
  } else {
    if (mLabel) { mLabel.style.fontWeight = '700'; mLabel.style.color = 'var(--color-text-main)'; }
    if (aLabel) { aLabel.style.fontWeight = '500'; aLabel.style.color = 'var(--color-text-secondary)'; }
    if (priceGold) priceGold.textContent = '14.500';
    if (periodGold) periodGold.textContent = '/ mes';
    if (pricePlat) pricePlat.textContent = '28.900';
    if (periodPlat) periodPlat.textContent = '/ mes';
  }
}

function highlightActiveSubscriptionCard() {
  const currentPlan = (appState.currentUser && appState.currentUser.proPlan) || 'basic';
  const btnBasic = document.getElementById('btn-plan-basic');
  const btnGold = document.getElementById('btn-plan-gold');
  const btnPlat = document.getElementById('btn-plan-platinum');

  if (btnBasic) btnBasic.textContent = currentPlan === 'basic' ? '✓ Plan Actual' : 'Elegir Plan';
  if (btnGold) btnGold.textContent = currentPlan === 'gold' ? '✓ Plan Activo' : 'Suscribirme a PRO Destacado';
  if (btnPlat) btnPlat.textContent = currentPlan === 'platinum' ? '✓ Plan Activo' : 'Activar Plan Empresa';
}

function selectProSubscription(planId) {
  triggerHapticFeedback();
  playSuccessChime();

  if (appState.currentUser) {
    appState.currentUser.proPlan = planId;
    saveAppState();
  }

  highlightActiveSubscriptionCard();
  updateNavAuthState();

  const planNames = {
    basic: 'Plan Inicial ($0/mes, comisión 15%)',
    gold: 'Plan PRO Destacado ($14.500/mes, comisión reducida al 8%)',
    platinum: 'Plan Cuadrilla & Empresas (comisión mínima 5%)'
  };

  showToast('¡Membresía Activada!', `Ya contás con el ${planNames[planId] || planId}. ¡Tus ganancias por trabajo ahora son mayores!`);

  setTimeout(() => {
    closeProSubscriptionsModal();
  }, 1200);
}

// ============================================================================
// 14. PANEL DE ADMINISTRADOR / MASTER BACKOFFICE (CONTROL DE NEGOCIO Y COMISIONES)
// ============================================================================
function openAdminBackofficeModal() {
  triggerHapticFeedback();
  playPop();
  renderAdminBackoffice();
  const modal = document.getElementById('modal-admin-backoffice');
  if (modal) modal.classList.add('active');
}

function closeAdminBackofficeModal() {
  const modal = document.getElementById('modal-admin-backoffice');
  if (modal) modal.classList.remove('active');
}

function switchAdminTab(tabName) {
  triggerHapticFeedback();
  playPop();

  const tabs = ['finanzas', 'matriculas', 'custodia'];
  tabs.forEach(t => {
    const btn = document.getElementById(`admin-tab-btn-${t}`);
    const view = document.getElementById(`admin-view-${t}`);
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (view) {
      if (t === tabName) view.style.display = 'block';
      else view.style.display = 'none';
    }
  });
}

function renderAdminBackoffice() {
  // 1. Actualizar KPIs financieros
  const gmvEl = document.getElementById('admin-gmv-total');
  const feesEl = document.getElementById('admin-fees-total');
  const escrowEl = document.getElementById('admin-escrow-total');
  const subsEl = document.getElementById('admin-pro-subs-count');
  const badgeEl = document.getElementById('admin-pending-badge');

  const m = appState.adminMetrics || { gmv: 1842500, feesCollected: 248900, escrowActive: 115000, proSubsCount: 18 };

  if (gmvEl) gmvEl.innerHTML = `$${m.gmv.toLocaleString('es-AR')} <span style="font-size: 0.8rem; font-weight: 600; color: #64748B;">ARS</span>`;
  if (feesEl) feesEl.innerHTML = `$${m.feesCollected.toLocaleString('es-AR')} <span style="font-size: 0.8rem; font-weight: 600; color: #047857;">ARS</span>`;
  if (escrowEl) escrowEl.innerHTML = `$${m.escrowActive.toLocaleString('es-AR')} <span style="font-size: 0.8rem; font-weight: 600; color: #64748B;">ARS</span>`;
  if (subsEl) subsEl.innerHTML = `${m.proSubsCount} <span style="font-size: 0.8rem; font-weight: 600; color: #64748B;">Profesionales</span>`;
  if (badgeEl) badgeEl.textContent = (appState.pendingMatriculas || []).length;

  // 2. Renderizar tabla de transacciones
  renderAdminTransactions();

  // 3. Renderizar profesionales pendientes de matrícula
  renderAdminMatriculas();

  // 4. Renderizar pedidos en custodia
  renderAdminEscrow();
}

function renderAdminTransactions() {
  const tbody = document.getElementById('admin-transactions-tbody');
  if (!tbody) return;

  const txs = appState.adminTransactions || [];
  if (txs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #94A3B8; padding: 24px;">No hay transacciones registradas aún.</td></tr>';
    return;
  }

  tbody.innerHTML = txs.map(t => {
    const isEscrow = t.status.includes('Custodia');
    return `
      <tr>
        <td><strong style="color: #0F172A; font-size: 0.8rem;">${t.id}</strong></td>
        <td>${t.client}</td>
        <td><strong>${t.pro}</strong></td>
        <td><span class="badge-tag" style="background: #F1F5F9; color: #334155;">${t.trade}</span></td>
        <td><strong style="color: #065F46;">$${t.amount.toLocaleString('es-AR')} ARS</strong></td>
        <td><strong style="color: #059669;">+$${t.fee.toLocaleString('es-AR')} ARS</strong></td>
        <td>
          <span class="badge-tag" style="background: ${isEscrow ? '#FEF3C7' : '#DCFCE7'}; color: ${isEscrow ? '#92400E' : '#166534'}; font-weight: 700;">
            ${t.status}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminMatriculas() {
  const container = document.getElementById('admin-matriculas-container');
  if (!container) return;

  const pending = appState.pendingMatriculas || [];
  if (pending.length === 0) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 32px; text-align: center; color: #64748B;">
        <span style="font-size: 2rem;">🎉</span>
        <h4 style="margin: 8px 0 4px; color: #1E293B;">¡Cola al día!</h4>
        <p style="font-size: 0.86rem; margin: 0;">No hay solicitudes de verificación ni matrículas pendientes de aprobación en este momento.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pending.map(p => `
    <div class="admin-verification-card" id="matricula-card-${p.id}">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #E0E7FF; color: #4338CA; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem;">
          ${p.name.charAt(0)}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="font-size: 0.95rem; color: #1E293B;">${p.name}</strong>
            <span class="badge-tag" style="background: #FEF3C7; color: #92400E; font-weight: 700;">Pendiente Verificación</span>
          </div>
          <div style="font-size: 0.82rem; color: #64748B; margin-top: 2px;">
            ${p.trade} · <strong>${p.matricula}</strong> · DNI: ${p.dni} (${p.zone})
          </div>
          <div style="font-size: 0.74rem; color: #059669; font-weight: 600; margin-top: 3px;">
            ✓ DNI frente/dorso validado · Registro oficial cruzado con base pública
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary btn-sm" onclick="rejectAdminMatricula('${p.id}')" style="color: #DC2626; border-color: #FECACA;">
          Rechazar
        </button>
        <button class="btn btn-primary btn-sm" onclick="approveAdminMatricula('${p.id}')" style="background: #059669; border: none; font-weight: 700;">
          ✓ Aprobar y Otorgar Tilde
        </button>
      </div>
    </div>
  `).join('');
}

function approveAdminMatricula(proId) {
  triggerHapticFeedback();
  playSuccessChime();

  const idx = (appState.pendingMatriculas || []).findIndex(p => p.id === proId);
  if (idx !== -1) {
    const pro = appState.pendingMatriculas[idx];
    appState.pendingMatriculas.splice(idx, 1);

    // Agregar al directorio oficial de profesionales si no estaba
    PROFESSIONALS_DATA.push({
      id: pro.id,
      name: pro.name,
      trade: pro.trade,
      category: pro.trade.toLowerCase().includes('gas') ? 'gas' : 'electricidad',
      avatar: 'assets/mascot.jpg',
      badge: 'Matriculado Oficial',
      verified: true,
      certified: true,
      matricula: pro.matricula,
      rating: 5.0,
      reviewsCount: 1,
      zone: pro.zone,
      city: 'CABA',
      bio: 'Profesional verificado por la administración de Sademy tras revisión oficial de matrícula y antecedentes.',
      priceHint: '$18.000',
      priceUnit: 'por trabajo base',
      skills: ['Certificado Aprobado', 'Matrícula Oficial', 'Garantía Sademy'],
      completedJobs: 1,
      responseTime: '< 15 min'
    });

    saveAppState();
    renderProfessionalsDirectory();
    renderAdminBackoffice();

    showToast('¡Matrícula Aprobada!', `${pro.name} fue validado y ya figura con tilde verde de confianza en el directorio.`);
  }
}

function rejectAdminMatricula(proId) {
  triggerHapticFeedback();
  playPop();

  const idx = (appState.pendingMatriculas || []).findIndex(p => p.id === proId);
  if (idx !== -1) {
    const pro = appState.pendingMatriculas[idx];
    appState.pendingMatriculas.splice(idx, 1);
    saveAppState();
    renderAdminBackoffice();
    showToast('Solicitud rechazada', `Se notificó a ${pro.name} para que reenvíe documentación legible.`);
  }
}

function renderAdminEscrow() {
  const container = document.getElementById('admin-escrow-orders-list');
  if (!container) return;

  const escrowOrders = appState.orders.filter(o => o.paid && !o.completed);
  if (escrowOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: #64748B; font-size: 0.88rem;">
        No hay órdenes activas en custodia actualmente.
      </div>
    `;
    return;
  }

  container.innerHTML = escrowOrders.map(o => `
    <div style="border: 1px solid #CBD5E1; border-radius: 10px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: #0F172A;">${o.id} · ${o.title}</strong>
          <span class="badge-tag" style="background: #065F46; color: #FFFFFF; font-weight: 800;">PIN: ${o.conformityPin || '7412'}</span>
        </div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 3px;">
          Profesional asignado: <strong>${o.hiredPro?.name || 'Marcos R.'}</strong> · Monto retenido: <strong style="color: #065F46;">$${(o.hiredPro?.price || 24500).toLocaleString('es-AR')} ARS</strong>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="releasePaymentPrompt('${o.id}'); closeAdminBackofficeModal();" style="background: #065F46; font-weight: 700;">
        Gestionar PIN
      </button>
    </div>
  `).join('');
}


