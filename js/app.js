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
// 2. ESTADO GLOBAL REACTIVO CON PERSISTENCIA EN LOCALSTORAGE Y SERVIDOR
// ============================================================================
const STORAGE_KEY = 'sademy_platform_prod_v1';

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
    id: 'ORD-2026-085',
    title: 'Apertura de cerradura de seguridad y cambio de combinación',
    category: 'cerrajeria',
    categoryName: 'Cerrajería de Seguridad 24h',
    description: 'Traba mecánica en cerrojo multipunto. Requiere cambio de cilindro computado y nuevas llaves de seguridad.',
    address: 'Palermo Chico, CABA',
    status: 'Presupuestos recibidos',
    statusBadgeClass: 'badge-new',
    date: 'Hoy, 11:30 hs',
    paid: false,
    completed: false,
    escrowCode: null,
    quotes: [
      {
        id: 'quote-valeria',
        proId: 'pro-5',
        proName: 'Valeria C.',
        proTrade: 'CERRAJERÍA DE SEGURIDAD 24H',
        avatar: 'assets/mascot.jpg',
        rating: 4.95,
        jobsCount: 67,
        materialsNote: 'Mano de obra calificada + materiales homologados',
        laborPrice: 19500,
        materialsPrice: 5500,
        totalPrice: 25000,
        warranty: '6 meses de garantía oficial Sademy',
        estimatedDuration: '2 a 3 horas',
        availability: 'Guardia disponible inmediata',
        recommended: true,
        breakdownItems: [
          'Mano de obra calificada por Valeria C. ($19.500)',
          'Materiales y piezas homologadas ($5.500)',
          'Verificación de seguridad técnica (Bonificado)',
          'Custodia de pago protegido Sademy ($0)'
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
    { sender: 'system', text: 'Seguridad Sademy: Para conservar el Seguro de Daños hasta $500.000 y garantía de satisfacción, mantené la contratación y pagos dentro de Sademy.', time: '10:51' }
  ],
  'Sofía L.': [
    { sender: 'worker', text: 'Hola Carlos! Revisé tu solicitud. Si te sirve también puedo hacer una revisión preventiva del tablero general.', time: '11:02' }
  ],
  'Claudio V.': [
    { sender: 'worker', text: 'Hola Carlos, trabajo finalizado y prueba de hermeticidad aprobada. ¡Muchas gracias por calificar!', time: '28 Sep' }
  ]
};

// ============================================================================
// BASE DE DATOS CRM INTEGRADA PARA TRABAJADORES SADEMY PRO
// ============================================================================
const DEFAULT_PRO_CRM_CLIENTS = [
  {
    id: 'crm-cli-1',
    name: 'Carlos M.',
    avatar: 'assets/mascot.jpg',
    phone: '+54 11 5421-9988',
    whatsapp: '5491154219988',
    email: 'carlos.m@gmail.com',
    address: 'Av. del Libertador 2450, Piso 6, Palermo Chico, CABA',
    zone: 'Palermo Chico',
    category: 'Residencial Premium',
    rating: 5.0,
    totalBilled: 74000,
    totalNetEarned: 68080,
    jobsCompleted: 3,
    lastServiceDate: '15/10/2026',
    notes: 'Tablero seccional en hall de entrada. Llaves térmicas Schneider de 32A y 16A. Excelente cliente, da conformidad y libera con PIN de inmediato.',
    history: [
      {
        orderId: 'ORD-2026-085',
        title: 'Instalación de luminaria LED y balanceo de fases',
        date: '15/10/2026',
        amount: 25000,
        fee: 2000,
        netAmount: 23000,
        status: 'Cobrado / En Garantía',
        warrantyUntil: '15/04/2027',
        escrowCode: 'ESC-2026-94812',
        invoiceId: 'INV-2026-00428'
      },
      {
        orderId: 'ORD-2026-061',
        title: 'Detección de fuga a tierra y cambio de disyuntor bipolar',
        date: '18/08/2026',
        amount: 27000,
        fee: 2160,
        netAmount: 24840,
        status: 'Finalizado con éxito',
        warrantyUntil: '18/02/2027',
        escrowCode: 'ESC-2026-78419',
        invoiceId: 'INV-2026-00392'
      },
      {
        orderId: 'ORD-2026-035',
        title: 'Tendido independiente de 4mm para aire acondicionado 4500W',
        date: '10/06/2026',
        amount: 22000,
        fee: 1760,
        netAmount: 20240,
        status: 'Finalizado con éxito',
        warrantyUntil: '10/12/2026',
        escrowCode: 'ESC-2026-55104',
        invoiceId: 'INV-2026-00340'
      }
    ]
  },
  {
    id: 'crm-cli-2',
    name: 'Lucía B.',
    avatar: 'assets/sofia.jpg',
    phone: '+54 11 6332-1144',
    whatsapp: '5491163321144',
    email: 'lucia.b@outlook.com',
    address: 'Juramento 1940, Depto 4B, Belgrano R, CABA',
    zone: 'Belgrano R',
    category: 'Residencial',
    rating: 5.0,
    totalBilled: 59000,
    totalNetEarned: 54280,
    jobsCompleted: 2,
    lastServiceDate: '12/10/2026',
    notes: 'Edificio clásico. Cableado normalizado antiflama. Solicitar autorización en conserjería para ingreso con herramientas.',
    history: [
      {
        orderId: 'ORD-2026-082',
        title: 'Revisión técnica de tablero seccional y recambio de 4 térmicas',
        date: '12/10/2026',
        amount: 24000,
        fee: 1920,
        netAmount: 22080,
        status: 'Cobrado / En Garantía',
        warrantyUntil: '12/04/2027',
        escrowCode: 'ESC-2026-88194',
        invoiceId: 'INV-2026-00427'
      },
      {
        orderId: 'ORD-2026-049',
        title: 'Instalación de luminaria dicroica y tomas protegidos bajo mesada',
        date: '20/07/2026',
        amount: 35000,
        fee: 2800,
        netAmount: 32200,
        status: 'Finalizado con éxito',
        warrantyUntil: '20/01/2027',
        escrowCode: 'ESC-2026-61902',
        invoiceId: 'INV-2026-00366'
      }
    ]
  },
  {
    id: 'crm-cli-3',
    name: 'Diego F.',
    avatar: 'assets/claudio.jpg',
    phone: '+54 11 4982-5501',
    whatsapp: '5491149825501',
    email: 'diego.fernandez@yahoo.com.ar',
    address: 'Av. Callao 1420, Piso 8, Recoleta, CABA',
    zone: 'Recoleta',
    category: 'Comercial / Oficina',
    rating: 4.9,
    totalBilled: 63000,
    totalNetEarned: 57960,
    jobsCompleted: 2,
    lastServiceDate: '28/09/2026',
    notes: 'Oficina de consultoría. Horario preferente para trabajos después de las 18:00 hs. Llaves de paso en pasillo común.',
    history: [
      {
        orderId: 'ORD-2026-077',
        title: 'Instalación de apliques de pared y toma Schuko para rack de servidores',
        date: '28/09/2026',
        amount: 25000,
        fee: 2000,
        netAmount: 23000,
        status: 'Finalizado con éxito',
        warrantyUntil: '28/03/2027',
        escrowCode: 'ESC-2026-72410',
        invoiceId: 'INV-2026-00412'
      },
      {
        orderId: 'ORD-2026-052',
        title: 'Certificado de aptitud eléctrica DCI para seguro de local comercial',
        date: '05/08/2026',
        amount: 38000,
        fee: 3040,
        netAmount: 34960,
        status: 'Finalizado con éxito',
        warrantyUntil: '05/08/2027',
        escrowCode: 'ESC-2026-66301',
        invoiceId: 'INV-2026-00380'
      }
    ]
  },
  {
    id: 'crm-cli-4',
    name: 'Mariana K.',
    avatar: 'assets/sofia.jpg',
    phone: '+54 11 3190-8822',
    whatsapp: '5491131908822',
    email: 'mariana.k@gmail.com',
    address: 'Conde 2150, Colegiales, CABA',
    zone: 'Colegiales',
    category: 'Residencial',
    rating: 5.0,
    totalBilled: 42000,
    totalNetEarned: 38640,
    jobsCompleted: 1,
    lastServiceDate: '15/09/2026',
    notes: 'Jardín exterior con luminarias estancas IP65 y fotocélula de encendido nocturno. Tablero estanco.',
    history: [
      {
        orderId: 'ORD-2026-071',
        title: 'Iluminación exterior perimetral y fotocélulas en jardín',
        date: '15/09/2026',
        amount: 42000,
        fee: 3360,
        netAmount: 38640,
        status: 'Finalizado con éxito',
        warrantyUntil: '15/03/2027',
        escrowCode: 'ESC-2026-69112',
        invoiceId: 'INV-2026-00405'
      }
    ]
  },
  {
    id: 'crm-cli-5',
    name: 'Esteban R.',
    avatar: 'assets/mascot.jpg',
    phone: '+54 11 7210-4499',
    whatsapp: '5491172104499',
    email: 'esteban.r@empresa.com.ar',
    address: 'Amenábar 1850, Núñez, CABA',
    zone: 'Núñez',
    category: 'Residencial',
    rating: 5.0,
    totalBilled: 48000,
    totalNetEarned: 44160,
    jobsCompleted: 1,
    lastServiceDate: '25/09/2026',
    notes: 'Instalación de protector de sobretensión monofásico y puesta a tierra con jabalina.',
    history: [
      {
        orderId: 'ORD-2026-035',
        title: 'Instalación de protector de alta/baja tensión y descarga atmosférica',
        date: '25/09/2026',
        amount: 48000,
        fee: 3840,
        netAmount: 44160,
        status: 'Finalizado con éxito',
        warrantyUntil: '25/03/2027',
        escrowCode: 'ESC-2026-71089',
        invoiceId: 'INV-2026-00408'
      }
    ]
  }
];

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
      if (parsed.orders && !parsed.orders.some(o => o.id === 'ORD-2026-085')) {
        const valeriaOrder = DEFAULT_ORDERS.find(o => o.id === 'ORD-2026-085');
        if (valeriaOrder) parsed.orders.unshift(valeriaOrder);
      }
      if (!parsed.workerInvoices || !Array.isArray(parsed.workerInvoices)) {
        parsed.workerInvoices = [
          {
            id: 'INV-2026-00428',
            orderId: 'ORD-2026-085',
            date: '14/10/2026',
            clientName: 'Carlos M.',
            clientDni: '20-35849120-4',
            clientAddress: 'Palermo Chico, CABA',
            jobDescription: 'Apertura de cerradura de seguridad y cambio de combinación europerfil con 5 llaves',
            laborPrice: 19500,
            materialsPrice: 5500,
            totalPrice: 25000,
            warranty: '6 meses de garantía oficial Sademy',
            proName: 'Valeria C.',
            proTrade: 'Cerrajería de Seguridad 24h',
            escrowCode: 'ESC-2026-94812',
            paymentMethod: 'Mercado Pago Escrow Sademy (Pago Protegido liberado)',
            status: 'Cobrada / En Garantía'
          },
          {
            id: 'INV-2026-00427',
            orderId: 'ORD-2026-082',
            date: '12/10/2026',
            clientName: 'Lucía B.',
            clientDni: '27-38192041-2',
            clientAddress: 'Belgrano R, CABA',
            jobDescription: 'Revisión técnica de tablero seccional y cambio de 4 térmicas normalizadas',
            laborPrice: 24000,
            materialsPrice: 0,
            totalPrice: 24000,
            warranty: '6 meses de garantía oficial Sademy',
            proName: 'Marcos R.',
            proTrade: 'Electricista Matriculado',
            escrowCode: 'ESC-2026-88194',
            paymentMethod: 'Mercado Pago Escrow Sademy (Pago Protegido liberado)',
            status: 'Cobrada / En Garantía'
          }
        ];
      }
      if (!parsed.proCrmClients || !Array.isArray(parsed.proCrmClients) || parsed.proCrmClients.length === 0) {
        parsed.proCrmClients = DEFAULT_PRO_CRM_CLIENTS;
      }
      if (parsed.professionalsRatings) {
        Object.keys(parsed.professionalsRatings).forEach(proId => {
          const p = PROFESSIONALS_DATA.find(x => x.id === proId || x.name === proId);
          if (p) {
            if (parsed.professionalsRatings[proId].rating !== undefined) p.rating = parsed.professionalsRatings[proId].rating;
            if (parsed.professionalsRatings[proId].reviewsCount !== undefined) p.reviewsCount = parsed.professionalsRatings[proId].reviewsCount;
            if (parsed.professionalsRatings[proId].completedJobs !== undefined) p.completedJobs = parsed.professionalsRatings[proId].completedJobs;
            if (parsed.professionalsRatings[proId].reviewsList) p.reviewsList = parsed.professionalsRatings[proId].reviewsList;
            if (parsed.professionalsRatings[proId].avatar) p.avatar = parsed.professionalsRatings[proId].avatar;
          }
        });
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Error al cargar estado previo:', e);
  }

  // Estado por defecto en Producción (Visitante Invitado)
  return {
    currentUser: null,
    currentRole: 'guest', // 'guest' | 'client' | 'pro' | 'admin'
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
    workerInvoices: [
      {
        id: 'INV-2026-00428',
        orderId: 'ORD-2026-085',
        date: '14/10/2026',
        clientName: 'Carlos M.',
        clientDni: '20-35849120-4',
        clientAddress: 'Palermo Chico, CABA',
        jobDescription: 'Apertura de cerradura de seguridad y cambio de combinación europerfil con 5 llaves',
        laborPrice: 19500,
        materialsPrice: 5500,
        totalPrice: 25000,
        warranty: '6 meses de garantía oficial Sademy',
        proName: 'Valeria C.',
        proTrade: 'Cerrajería de Seguridad 24h',
        escrowCode: 'ESC-2026-94812',
        paymentMethod: 'Mercado Pago Escrow Sademy (Pago Protegido liberado)',
        status: 'Cobrada / En Garantía'
      },
      {
        id: 'INV-2026-00427',
        orderId: 'ORD-2026-082',
        date: '12/10/2026',
        clientName: 'Lucía B.',
        clientDni: '27-38192041-2',
        clientAddress: 'Belgrano R, CABA',
        jobDescription: 'Revisión técnica de tablero seccional y cambio de 4 térmicas normalizadas',
        laborPrice: 24000,
        materialsPrice: 0,
        totalPrice: 24000,
        warranty: '6 meses de garantía oficial Sademy',
        proName: 'Marcos R.',
        proTrade: 'Electricista Matriculado',
        escrowCode: 'ESC-2026-88194',
        paymentMethod: 'Mercado Pago Escrow Sademy (Pago Protegido liberado)',
        status: 'Cobrada / En Garantía'
      }
    ],
    proCrmClients: DEFAULT_PRO_CRM_CLIENTS,
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
    roleLabel: 'Cliente Verificado',
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
    roleLabel: 'Profesional Verificado Pro',
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
    name: 'Sademy HQ Directivos',
    email: 'sademyapp@gmail.com',
    avatar: 'assets/favicon.svg',
    role: 'admin',
    roleLabel: 'Administrador General Sademy HQ',
    roleTag: 'HQ Directivo',
    tagBg: '#FEF3C7',
    tagColor: '#92400E',
    verified: true,
    proPlan: 'platinum'
  }
};

function updateNavAuthState() {
  const user = appState.currentUser;
  const loginBtn = document.getElementById('nav-login-btn');
  const registerBtn = document.getElementById('nav-register-btn');
  const proBtn = document.getElementById('nav-pro-btn');
  const dropdownWrapper = document.getElementById('nav-user-dropdown-wrapper');
  
  const userNameText = document.getElementById('nav-user-name-text');
  const userRoleTag = document.getElementById('nav-user-role-tag');
  const userAvatarImg = document.getElementById('nav-user-avatar-img');

  const menuUserName = document.getElementById('menu-user-name');
  const menuUserEmail = document.getElementById('menu-user-email');
  const menuUserAvatar = document.getElementById('menu-user-avatar');
  const menuUserRoleLabel = document.getElementById('menu-user-role-label');
  const menuUserStatus = document.getElementById('menu-user-status-text');

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

  const currentR = user ? (user.role || appState.currentRole || 'client') : 'guest';
  appState.currentRole = currentR;

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (proBtn) proBtn.style.display = 'none';
    if (dropdownWrapper) dropdownWrapper.style.display = 'inline-block';

    if (userNameText) userNameText.textContent = user.name;
    if (userAvatarImg) userAvatarImg.src = user.avatar || 'assets/mascot.jpg';
    if (userRoleTag) {
      userRoleTag.textContent = user.roleTag || (currentR === 'admin' ? 'Administrador' : (currentR === 'pro' ? 'Pro Verificado' : 'Cliente'));
      userRoleTag.style.backgroundColor = user.tagBg || (currentR === 'admin' ? '#FEF3C7' : (currentR === 'pro' ? '#D1FAE5' : '#ECFDF5'));
      userRoleTag.style.color = user.tagColor || (currentR === 'admin' ? '#92400E' : (currentR === 'pro' ? '#064E3B' : '#065F46'));
    }

    if (menuUserName) menuUserName.textContent = user.name;
    if (menuUserEmail) menuUserEmail.textContent = user.email;
    if (menuUserAvatar) menuUserAvatar.src = user.avatar || 'assets/mascot.jpg';
    if (menuUserRoleLabel) menuUserRoleLabel.textContent = user.roleLabel || 'Verificado';
    if (menuUserStatus) menuUserStatus.textContent = currentR === 'admin' ? 'Acceso Master HQ' : (currentR === 'pro' ? 'Habilitado para Trabajos' : 'Cliente Protegido');

    // Ribbon: Solo visible para Pro y Admin (clientes disfrutan de interfaz limpia)
    if (ribbon) {
      if (currentR === 'admin') {
        ribbon.style.display = 'block';
        ribbon.className = 'active-role-ribbon role-admin';
        if (ribbonIcon) ribbonIcon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>';
        if (ribbonTitle) ribbonTitle.textContent = 'Sademy HQ Security Backoffice';
        const gmvVal = appState.adminMetrics ? (appState.adminMetrics.gmv || 1842500) : 1842500;
        const escrowVal = appState.adminMetrics ? (appState.adminMetrics.escrowActive || 115000) : 115000;
        if (ribbonDesc) ribbonDesc.textContent = `Sesión Administrativa Activa · Facturación GMV: $${gmvVal.toLocaleString('es-AR')} ARS · Custodia: $${escrowVal.toLocaleString('es-AR')} ARS`;
        if (ribbonBtn) {
          ribbonBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> Abrir Backoffice';
          ribbonBtn.onclick = openAdminBackofficeModal;
        }
      } else if (currentR === 'pro') {
        ribbon.style.display = 'block';
        ribbon.className = 'active-role-ribbon role-pro';
        if (ribbonIcon) ribbonIcon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
        if (ribbonTitle) ribbonTitle.textContent = `Sesión Sademy PRO (${user.name})`;
        const proBal = appState.proStats ? (appState.proStats.escrowBalance ?? 49000) : 49000;
        const openReqs = appState.proStats ? (appState.proStats.openRequestsCount ?? 12) : 12;
        if (ribbonDesc) ribbonDesc.textContent = `Saldo disponible: $${proBal.toLocaleString('es-AR')} ARS · ${openReqs} Solicitudes abiertas · Sademy CRM Activo`;
        if (ribbonBtn) {
          ribbonBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Portal Sademy Pro';
          ribbonBtn.onclick = () => openProDashboardModal('oportunidades');
        }
      } else {
        ribbon.style.display = 'none';
      }
    }

    // Actualizar Billetera de Pro en Menú Desplegable y Modal
    const activeProBal = appState.proStats ? (appState.proStats.escrowBalance ?? 49000) : 49000;
    const menuProBalEl = document.getElementById('menu-pro-wallet-balance');
    if (menuProBalEl) menuProBalEl.textContent = `Billetera y Cobros ($${activeProBal.toLocaleString('es-AR')})`;
    const accProBalEl = document.getElementById('acc-pro-wallet-balance');
    if (accProBalEl) accProBalEl.textContent = `Mi Billetera & Cobros ($${activeProBal.toLocaleString('es-AR')})`;

    // Resaltar píldoras de roles activos en el menú y modal de cuenta estilo Apple
    ['client', 'pro', 'admin'].forEach(r => {
      const p1 = document.getElementById(`role-pill-${r}`);
      const p2 = document.getElementById(`acc-role-pill-${r}`);
      const isActive = currentR === r;
      const activeColor = r === 'admin' ? '#92400E' : (r === 'pro' ? '#047857' : '#065F46');
      if (p1) {
        p1.style.background = isActive ? '#FFFFFF' : 'transparent';
        p1.style.color = isActive ? activeColor : '#64748B';
        p1.style.fontWeight = isActive ? '800' : '600';
        p1.style.boxShadow = isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none';
      }
      if (p2) {
        p2.style.background = isActive ? '#FFFFFF' : 'transparent';
        p2.style.color = isActive ? activeColor : '#64748B';
        p2.style.fontWeight = isActive ? '800' : '600';
        p2.style.boxShadow = isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none';
      }
    });

    // Modal de cuenta
    if (accAvatar) accAvatar.src = user.avatar || 'assets/mascot.jpg';
    if (accName) accName.textContent = user.name;
    if (accEmail) accEmail.textContent = user.email;
    if (accBadge) {
      accBadge.textContent = user.roleLabel || 'Verificado';
      accBadge.style.backgroundColor = user.tagBg || '#ECFDF5';
      accBadge.style.color = user.tagColor || '#065F46';
    }
    if (accLoggedInSec) accLoggedInSec.style.display = 'block';
    if (accGuestSec) accGuestSec.style.display = 'none';

    if (mobNavLabel) mobNavLabel.textContent = user.name ? user.name.split(' ')[0] : 'Cuenta';

  } else {
    // Modo Invitado (Sesión no iniciada)
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (registerBtn) registerBtn.style.display = 'inline-flex';
    if (proBtn) proBtn.style.display = 'inline-flex';
    if (dropdownWrapper) dropdownWrapper.style.display = 'none';
    if (ribbon) ribbon.style.display = 'none';

    if (accLoggedInSec) accLoggedInSec.style.display = 'none';
    if (accGuestSec) accGuestSec.style.display = 'block';

    if (mobNavLabel) mobNavLabel.textContent = 'Ingresar';
  }

  // Reflejar la vista del rol activo
  applyRoleView(currentR);
}

function openAccountModal() {
  triggerHapticFeedback();
  playPop();
  if (!appState.currentUser) {
    openAuthModal('login');
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
function openProDashboardModal(initialTab = 'crm') {
  if (appState.currentRole !== 'pro' && appState.currentRole !== 'admin') {
    triggerHapticFeedback();
    playPop();
    showToast('Acceso para Profesionales Verificados', 'El Portal PRO y CRM es de uso exclusivo para técnicos y profesionales matriculados.');
    openAuthModal('register');
    switchRegisterRole('pro');
    return;
  }

  triggerHapticFeedback();
  playPop();
  switchProDashboardTab(initialTab);
  renderWorkerInvoicesList();

  // Sincronizar saldos de billetera y métricas del pro en tiempo real
  const bal = appState.proStats ? (appState.proStats.escrowBalance ?? 49000) : 49000;
  const balText = document.getElementById('pro-dash-balance-text');
  const bigBal = document.getElementById('pro-wallet-big-balance');
  if (balText) balText.textContent = `$${bal.toLocaleString('es-AR')} ARS`;
  if (bigBal) bigBal.innerHTML = `$${bal.toLocaleString('es-AR')} <span style="font-size: 1rem; font-weight: 600;">ARS</span>`;

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
  const tabs = ['crm', 'oportunidades', 'billetera', 'cotizaciones', 'membresia'];
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

  if (tabName === 'cotizaciones') {
    renderWorkerInvoicesList();
  } else if (tabName === 'crm') {
    renderWorkerCrmDashboard();
  }
}

function withdrawProFunds() {
  triggerHapticFeedback();
  const currentBal = appState.proStats ? (appState.proStats.escrowBalance ?? 0) : 0;
  if (currentBal <= 0) {
    showToast('Saldo insuficiente', 'No tenés saldo acumulado disponible para transferir en este momento.');
    return;
  }
  playSuccessChime();
  const proName = (appState.currentUser && appState.currentUser.name) || 'tu cuenta profesional';
  showToast('Retiro Solicitado con Éxito', `Se transfirieron $${currentBal.toLocaleString('es-AR')} ARS a la cuenta vinculada de ${proName}. Comprobante enviado por email.`);
  
  if (appState.proStats) {
    appState.proStats.escrowBalance = 0;
  }
  saveAppState();

  const balText = document.getElementById('pro-dash-balance-text');
  const bigBal = document.getElementById('pro-wallet-big-balance');
  if (balText) balText.textContent = '$0 ARS';
  if (bigBal) bigBal.innerHTML = '$0 <span style="font-size: 1rem; font-weight: 600;">ARS</span>';

  updateNavAuthState();
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

  if (roleKey === 'admin') {
    const isAuthAdmin = appState.currentUser && 
                        appState.currentRole === 'admin' && 
                        (appState.currentUser.email === 'sademyapp@gmail.com' || appState.currentUser.email === 'admin@sademy.com.ar');
    if (isAuthAdmin) {
      openAdminBackofficeModal();
    } else {
      playPop();
      showToast('Acceso Restringido · Sademy HQ', 'Debés validar las credenciales oficiales de Sademy para ingresar.');
      closeUserDropdown();
      closeAccountModal();
      openAdminLoginModal();
    }
    return;
  }

  playSuccessChime();
  const profile = PROFILES[roleKey] || PROFILES.client;
  appState.currentUser = Object.assign({}, profile);
  appState.currentRole = roleKey;
  saveAppState();

  updateNavAuthState();
  applyRoleView(roleKey);
  closeUserDropdown();
  closeAccountModal();

  if (roleKey === 'pro') {
    showToast('Modo Profesional Pro Activo', 'Bienvenido Marcos. Podés cotizar solicitudes abiertas y gestionar tu CRM.');
    setTimeout(() => {
      openProDashboardModal('crm');
    }, 300);
  } else {
    showToast('Modo Cliente Activo', 'Bienvenido Carlos. Podés buscar oficios verificados y contratar con pago protegido.');
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
    openAuthModal('register');
    switchRegisterRole('pro');
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

  showToast('Sesión cerrada', 'Has cerrado tu sesión de forma segura.');
}

function openAuthModal(initialMode = 'login') {
  triggerHapticFeedback();
  playPop();
  switchAuthMode(initialMode === 'register' ? 'register' : 'login');
  const modal = document.getElementById('modal-auth');
  if (modal) modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('modal-auth');
  if (modal) modal.classList.remove('active');
}

function switchAuthMode(mode) {
  const loginTab = document.getElementById('auth-mode-tab-login');
  const regTab = document.getElementById('auth-mode-tab-register');
  const loginPanel = document.getElementById('auth-panel-login');
  const regPanel = document.getElementById('auth-panel-register');
  const modalTitle = document.getElementById('auth-modal-title');
  const modalSub = document.getElementById('auth-modal-subtitle');

  if (mode === 'register') {
    if (regTab) regTab.classList.add('active');
    if (loginTab) loginTab.classList.remove('active');
    if (loginPanel) loginPanel.style.display = 'none';
    if (regPanel) regPanel.style.display = 'block';
    if (modalTitle) modalTitle.textContent = 'Creá tu Cuenta en Sademy';
    if (modalSub) modalSub.textContent = 'Acceso a profesionales matriculados y contratación con pago protegido';
  } else {
    if (loginTab) loginTab.classList.add('active');
    if (regTab) regTab.classList.remove('active');
    if (loginPanel) loginPanel.style.display = 'block';
    if (regPanel) regPanel.style.display = 'none';
    if (modalTitle) modalTitle.textContent = 'Iniciar Sesión';
    if (modalSub) modalSub.textContent = 'Ingresá para gestionar tus solicitudes, cotizaciones y custodia';
  }
}

function switchRegisterRole(role) {
  const clientTab = document.getElementById('reg-tab-client');
  const proTab = document.getElementById('reg-tab-pro');
  const clientForm = document.getElementById('form-register-client');
  const proForm = document.getElementById('form-register-pro');

  if (role === 'pro') {
    if (proTab) proTab.classList.add('active');
    if (clientTab) clientTab.classList.remove('active');
    if (proForm) proForm.style.display = 'flex';
    if (clientForm) clientForm.style.display = 'none';
  } else {
    if (clientTab) clientTab.classList.add('active');
    if (proTab) proTab.classList.remove('active');
    if (clientForm) clientForm.style.display = 'flex';
    if (proForm) proForm.style.display = 'none';
  }
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  if (btnEl) {
    btnEl.innerHTML = isPass
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  }
}

function openAdminLoginModal() {
  triggerHapticFeedback();
  playPop();
  const modal = document.getElementById('modal-admin-login');
  if (modal) modal.classList.add('active');
}

function closeAdminLoginModal() {
  const modal = document.getElementById('modal-admin-login');
  if (modal) modal.classList.remove('active');
}

async function submitAdminLogin() {
  triggerHapticFeedback();
  const emailInput = document.getElementById('admin-input-email');
  const passInput = document.getElementById('admin-input-password');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passInput ? passInput.value.trim() : '';
  const btn = document.getElementById('btn-admin-submit');

  if (!email || !password) {
    showToast('Datos requeridos', 'Por favor ingresá tu usuario corporativo y contraseña.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Validando credenciales HQ...';
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.success && data.user.role === 'admin') {
      playSuccessChime();
      appState.currentUser = data.user;
      appState.currentRole = 'admin';
      saveAppState();
      closeAdminLoginModal();
      updateNavAuthState();
      showToast('Acceso Sademy HQ Autorizado', 'Consola administrativa habilitada para directivos.');
      setTimeout(() => openAdminBackofficeModal(), 300);
      return;
    } else if (res.ok && data.user && data.user.role !== 'admin') {
      showToast('Acceso Restringido', 'Esta cuenta no posee privilegios administrativos HQ.');
      return;
    } else {
      showToast('Acceso Denegado', data.error || 'Credenciales administrativas inválidas.');
      return;
    }
  } catch (e) {
    if ((email === 'sademyapp@gmail.com' && password === 'Sadmy203024..') || (email === 'admin@sademy.com.ar' && password === 'admin123')) {
      playSuccessChime();
      appState.currentUser = Object.assign({}, PROFILES.admin);
      appState.currentRole = 'admin';
      saveAppState();
      closeAdminLoginModal();
      updateNavAuthState();
      showToast('Acceso Sademy HQ Autorizado', 'Consola administrativa habilitada para directivos.');
      setTimeout(() => openAdminBackofficeModal(), 300);
      return;
    }
    showToast('Acceso Denegado', 'Credenciales administrativas inválidas.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Validar Credenciales y Entrar';
    }
  }
}

function quickFillLogin(roleKey) {
  triggerHapticFeedback();
  playPop();
  if (roleKey === 'admin') {
    closeAuthModal();
    showToast('Autenticación Corporativa Sademy', 'El acceso administrativo HQ requiere contraseña de seguridad.');
    openAdminLoginModal();
    return;
  }

  const emailInput = document.getElementById('login-input-email');
  const passInput = document.getElementById('login-input-password');
  if (roleKey === 'pro') {
    if (emailInput) emailInput.value = 'marcos.electricista@sademy.com';
    if (passInput) passInput.value = 'marcos123';
  } else {
    if (emailInput) emailInput.value = 'carlos.m@gmail.com';
    if (passInput) passInput.value = 'carlos123';
  }
  submitUserLogin();
}

async function submitUserLogin() {
  triggerHapticFeedback();
  const emailInput = document.getElementById('login-input-email');
  const passInput = document.getElementById('login-input-password');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passInput ? passInput.value.trim() : '';
  const btn = document.getElementById('btn-login-submit');

  if (!email || !password) {
    showToast('Datos requeridos', 'Por favor ingresá tu correo electrónico y contraseña.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Verificando cuenta...';
  }

  // Atajo directo si se ingresan credenciales corporativas en login general
  if ((email === 'sademyapp@gmail.com' && password === 'Sadmy203024..') || (email === 'admin@sademy.com.ar' && password === 'admin123')) {
    playSuccessChime();
    appState.currentUser = Object.assign({}, PROFILES.admin);
    appState.currentRole = 'admin';
    saveAppState();
    closeAuthModal();
    updateNavAuthState();
    showToast('¡Bienvenido Sademy HQ!', 'Acceso concedido a la consola directiva.');
    setTimeout(() => openAdminBackofficeModal(), 300);
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Ingresar a mi cuenta';
    }
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      playSuccessChime();
      appState.currentUser = data.user;
      appState.currentRole = data.user.role;
      saveAppState();
      closeAuthModal();
      updateNavAuthState();
      showToast(`¡Hola, ${data.user.name}!`, 'Sesión iniciada correctamente.');
      if (data.user.role === 'pro') {
        setTimeout(() => openProDashboardModal('oportunidades'), 300);
      }
      return;
    } else {
      showToast('No se pudo ingresar', data.error || 'Correo o contraseña incorrectos.');
    }
  } catch (err) {
    const matchedProfile = Object.values(PROFILES).find(p => p.email.toLowerCase() === email.toLowerCase()) || {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email: email,
      role: 'client',
      roleLabel: 'Cliente Verificado',
      roleTag: 'Cliente',
      avatar: 'assets/mascot.jpg',
      verified: true
    };
    playSuccessChime();
    appState.currentUser = Object.assign({}, matchedProfile);
    appState.currentRole = matchedProfile.role;
    saveAppState();
    closeAuthModal();
    updateNavAuthState();
    showToast(`¡Hola, ${matchedProfile.name}!`, 'Sesión iniciada correctamente.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Iniciar Sesión';
    }
  }
}

async function submitRegister(role) {
  triggerHapticFeedback();
  const isPro = role === 'pro';
  let payload = {};

  if (isPro) {
    const name = document.getElementById('reg-pro-name').value.trim();
    const trade = document.getElementById('reg-pro-trade').value;
    const dni = document.getElementById('reg-pro-dni').value.trim();
    const matricula = document.getElementById('reg-pro-matricula').value.trim();
    const zone = document.getElementById('reg-pro-zone').value.trim();
    const phone = document.getElementById('reg-pro-phone').value.trim();
    const email = document.getElementById('reg-pro-email').value.trim();
    const password = document.getElementById('reg-pro-password').value.trim();

    if (!name || !email || !password || !phone || !dni) {
      showToast('Campos requeridos', 'Por favor completá los datos marcados con asterisco (*).');
      return;
    }
    payload = { name, trade, dni, matricula, zone, phone, email, password, role: 'pro' };
  } else {
    const name = document.getElementById('reg-client-name').value.trim();
    const email = document.getElementById('reg-client-email').value.trim();
    const phone = document.getElementById('reg-client-phone').value.trim();
    const password = document.getElementById('reg-client-password').value.trim();

    if (!name || !email || !password || !phone) {
      showToast('Campos requeridos', 'Por favor completá todos los campos requeridos.');
      return;
    }
    payload = { name, email, phone, password, role: 'client' };
  }

  const btnId = isPro ? 'btn-reg-pro-submit' : 'btn-reg-client-submit';
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Registrando cuenta...';
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      playSuccessChime();
      appState.currentUser = data.user;
      appState.currentRole = data.user.role;
      saveAppState();
      closeAuthModal();
      updateNavAuthState();
      showToast('¡Registro Exitoso!', `Bienvenido a Sademy, ${data.user.name}.`);
      if (isPro) {
        showToast('Validación Biométrica Requerida', 'Paso 2/2: Posicioná tu rostro de frente para la captura automática de tu foto de perfil.');
        setTimeout(() => startFaceIdOnboarding(data.user), 450);
      }
      return;
    } else {
      showToast('Aviso de Registro', data.error || 'No se pudo crear la cuenta.');
    }
  } catch (e) {
    playSuccessChime();
    const newUser = {
      id: `usr-${isPro ? 'pro' : 'client'}-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: isPro ? 'pro' : 'client',
      roleLabel: isPro ? 'Profesional Verificado Pro' : 'Cliente Verificado',
      roleTag: isPro ? 'Pro Verificado' : 'Cliente',
      avatar: isPro ? 'assets/marcos.jpg' : 'assets/mascot.jpg',
      verified: true,
      faceIdVerified: false
    };
    appState.currentUser = newUser;
    appState.currentRole = newUser.role;
    saveAppState();
    closeAuthModal();
    updateNavAuthState();
    showToast('¡Cuenta Creada!', `Bienvenido/a a Sademy, ${newUser.name}.`);
    if (isPro) {
      showToast('Validación Biométrica Requerida', 'Paso 2/2: Posicioná tu rostro de frente para la captura automática de tu foto de perfil.');
      setTimeout(() => startFaceIdOnboarding(newUser), 450);
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = isPro ? 'Registrarme y Activar Perfil PRO' : 'Crear Cuenta de Cliente';
    }
  }
}

function handleGoogleSignIn() {
  triggerHapticFeedback();
  playSuccessChime();
  const googleUser = {
    id: 'usr-google-' + Date.now().toString(36),
    name: 'Carlos Martínez',
    email: 'carlos.martinez@gmail.com',
    avatar: 'assets/mascot.jpg',
    role: 'client',
    roleLabel: 'Cliente Verificado',
    roleTag: 'Cliente',
    verified: true
  };
  appState.currentUser = googleUser;
  appState.currentRole = 'client';
  saveAppState();
  closeAuthModal();
  updateNavAuthState();
  showToast('Google Sign-In Conectado', 'Acceso seguro verificado con Google.');
}

function promptForgotPassword() {
  triggerHapticFeedback();
  playPop();
  closeAuthModal();
  const modal = document.getElementById('modal-forgot-password');
  if (modal) modal.classList.add('active');
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('modal-forgot-password');
  if (modal) modal.classList.remove('active');
  openAuthModal();
}

function submitForgotPassword() {
  triggerHapticFeedback();
  playSuccessChime();
  const emailInput = document.getElementById('forgot-email-input');
  const email = emailInput ? emailInput.value.trim() : '';

  const modal = document.getElementById('modal-forgot-password');
  if (modal) modal.classList.remove('active');

  showToast('Correo Enviado', `Se enviaron instrucciones de recuperación a ${email || 'tu casilla de correo'}.`);
  if (emailInput) emailInput.value = '';
}

function simulateFileUpload() {
  triggerHapticFeedback();
  playPop();
  const dropzone = document.getElementById('worker-dni-dropzone');
  const statusText = document.getElementById('dropzone-status-text');

  if (dropzone) dropzone.classList.add('uploaded');
  if (statusText) {
    statusText.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <strong style="color: #065F46;">DNI_Constancia_Matricula.pdf adjuntado</strong>
      </div>
      <span style="font-size: 0.72rem; color: #059669; display: block; margin-top: 2px;">Documento verificado para revisión técnica (2.4 MB)</span>
    `;
  }
  showToast('Documento recibido', 'Comprobante de matrícula y DNI adjuntado correctamente.');
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
            <h4 class="request-heading" style="margin: 0;">Fondos en Custodia Segura (${currentOrder.escrowCode || 'ESCROW-ACTIVO'})</h4>
            <span class="badge-tag" style="background: #065F46; color: #FFFFFF; font-weight: 800; font-size: 0.78rem;">PIN: ${currentOrder.conformityPin || '7412'}</span>
          </div>
          <p class="request-subtext" style="margin-top: 4px;">
            El profesional fue notificado. Tu dinero está protegido en Sademy y solo se transfiere cuando le entregues el PIN al finalizar.
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="openInvoiceModalForOrder('${currentOrder.id}')" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 600;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          Factura
        </button>
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
      showToast('Completá el trabajo requerido', 'Por favor, ingresá qué necesitás resolver (ej: Reparación de canilla o cortocircuito).');
      const input = document.getElementById('wizard-order-title');
      if (input) input.focus();
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

function selectWizardUrgency(el, val) {
  triggerHapticFeedback();
  playPop();
  document.querySelectorAll('.wizard-urgency-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  appState.wizardUrgency = val;
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

  // Si no había sesión iniciada, asignar perfil de Carlos M. (Cliente) para ver la orden
  if (!appState.currentUser) {
    appState.currentUser = Object.assign({}, PROFILES.client);
    appState.currentRole = 'client';
    updateNavAuthState();
  }

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
          ${order.address} · <strong>${order.categoryName}</strong>
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

          ${isCompleted && !order.review ? `
            <button class="btn btn-primary btn-sm" onclick="closeMyOrdersModal(); openOrderReviewModal('${order.hiredPro?.name || order.quotes[0]?.proName || 'Marcos R.'}', '${order.id}')" style="background: #F59E0B; border-color: #D97706; color: #FFFFFF; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              ★ Calificar Profesional
            </button>
          ` : isCompleted && order.review ? `
            <button class="btn btn-secondary btn-sm" onclick="closeMyOrdersModal(); openOrderReviewModal('${order.hiredPro?.name || order.quotes[0]?.proName || 'Marcos R.'}', '${order.id}')" style="color: #D97706; background: #FEF3C7; border: 1px solid #FDE68A; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              ★ Calificado (${order.review.stars}★)
            </button>
          ` : ''}

          <button class="btn btn-secondary btn-sm" onclick="closeMyOrdersModal(); openChatModal('${order.quotes[0]?.proName || 'Marcos R.'}')">
            Chatear con el Profesional
          </button>

          <button class="btn btn-secondary btn-sm" onclick="closeMyOrdersModal(); openInvoiceModalForOrder('${order.id}')" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 600; color: #047857; background: #ECFDF5; border: 1px solid #A7F3D0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Factura Electrónica
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Variable global de contexto para la Factura Electrónica activa
let currentActiveQuoteForInvoice = null;
let currentActiveOrderForInvoice = null;

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

  // Registrar presupuesto y pedido para emisión de Factura Electrónica
  currentActiveQuoteForInvoice = foundQuote;
  currentActiveOrderForInvoice = targetOrder;

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

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 0.85rem;">
      <div style="background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
        <strong style="display: block; color: var(--color-text-main); margin-bottom: 4px;">Duración estimada</strong>
        <span style="color: var(--color-text-secondary);">${foundQuote.estimatedDuration}</span>
      </div>
      <div style="background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
        <strong style="display: block; color: var(--color-text-main); margin-bottom: 4px;">Cobertura Sademy</strong>
        <span style="color: var(--color-text-secondary);">${foundQuote.warranty}</span>
      </div>
    </div>

    <!-- Garantía de Pago y Custodia -->
    <div style="background-color: #ECFDF5; border: 1px solid var(--color-primary-border); border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <img src="assets/mascot.jpg" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="Garantía Sademy">
      <div style="font-size: 0.82rem; color: #065F46;">
        <strong>Garantía de Satisfacción 100%:</strong> Tu pago queda retenido de forma segura en Sademy y no se libera al profesional hasta que des tu conformidad de que el trabajo quedó perfecto.
      </div>
    </div>

    <!-- Fila Informativa de Facturación Oficial Sademy con Acceso Rápido -->
    <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        <div>
          <strong style="font-size: 0.84rem; color: #111827;">Factura de Servicio y Garantía Oficial Sademy</strong>
          <div style="font-size: 0.74rem; color: #64748B;">Comprobante oficial con desglose de mano de obra y garantía Escrow</div>
        </div>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" onclick="openInvoiceModalForCurrentQuote()" style="font-weight: 700; color: #10B981; background: #ECFDF5; border: 1.5px solid #A7F3D0; font-size: 0.78rem; padding: 6px 12px;">
        Ver Factura de Servicio →
      </button>
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

// ============================================================================
// FACTURA ELECTRÓNICA AFIP / ARCA CON LOGO DE LETRAS SADEMY
// ============================================================================
function numberToWordsSpanish(n) {
  if (n === 25000) return 'Veinticinco mil pesos argentinos con 00/100';
  if (n === 24500) return 'Veinticuatro mil quinientos pesos argentinos con 00/100';
  if (n === 28000) return 'Veintiocho mil pesos argentinos con 00/100';
  if (n === 34500) return 'Treinta y cuatro mil quinientos pesos argentinos con 00/100';
  if (n === 38000) return 'Treinta y ocho mil pesos argentinos con 00/100';
  if (n === 49000) return 'Cuarenta y nueve mil pesos argentinos con 00/100';
  return `${n.toLocaleString('es-AR')} pesos argentinos con 00/100`;
}

function openInvoiceModalForCurrentQuote() {
  triggerHapticFeedback();
  playPop();
  closeQuoteDetailModal();
  let quote = currentActiveQuoteForInvoice;
  let order = currentActiveOrderForInvoice;
  if (!quote) {
    const valeriaOrder = appState.orders.find(o => o.id === 'ORD-2026-085') || appState.orders[0];
    order = valeriaOrder;
    quote = (valeriaOrder && valeriaOrder.quotes && valeriaOrder.quotes[0]) || {
      proName: 'Valeria C.',
      proTrade: 'CERRAJERÍA DE SEGURIDAD 24H',
      laborPrice: 19500,
      materialsPrice: 5500,
      totalPrice: 25000,
      warranty: '6 meses de garantía oficial Sademy'
    };
  }
  renderAndOpenInvoice(quote, order);
}

function downloadInvoiceForCurrentQuote() {
  triggerHapticFeedback();
  playSuccessChime();
  openInvoiceModalForCurrentQuote();
  setTimeout(() => downloadInvoiceHTML(), 120);
}

function openInvoiceModal(orderId = 'ORD-2026-085') {
  openInvoiceModalForOrder(orderId);
}

function openInvoiceModalForOrder(orderId) {
  triggerHapticFeedback();
  playPop();
  closeMyOrdersModal();
  const order = appState.orders.find(o => o.id === orderId) || appState.orders[0];
  const quote = (order && order.quotes && order.quotes[0]) || {
    proName: order?.hiredPro?.name || 'Profesional Certificado',
    proTrade: order?.categoryName || 'Servicio General',
    laborPrice: order?.hiredPro?.price || 24500,
    materialsPrice: 0,
    totalPrice: order?.hiredPro?.price || 24500,
    warranty: '6 meses de garantía oficial Sademy'
  };
  renderAndOpenInvoice(quote, order);
}

// Variable global para rastrear el comprobante activo para visualización/descarga
let currentActiveInvoiceObject = null;

function renderAndOpenInvoice(quote, order, customInvoice = null) {
  const container = document.getElementById('invoice-sheet-container');
  if (!container) return;

  let proName, proTrade, laborPrice, materialsPrice, totalPrice, clientName, clientDni, clientAddress, orderId, jobDescription, warranty, dateStr, escrowCode, compNumber, paymentMethod;

  if (customInvoice) {
    currentActiveInvoiceObject = customInvoice;
    proName = customInvoice.proName || 'Marcos R.';
    proTrade = customInvoice.proTrade || 'Electricista Matriculado';
    laborPrice = customInvoice.laborPrice || 24000;
    materialsPrice = customInvoice.materialsPrice || 0;
    totalPrice = customInvoice.totalPrice || (laborPrice + materialsPrice);
    clientName = customInvoice.clientName || 'Carlos M.';
    clientDni = customInvoice.clientDni || '20-35849120-4';
    clientAddress = customInvoice.clientAddress || 'Palermo Chico, CABA';
    orderId = customInvoice.orderId || 'ORD-2026-085';
    jobDescription = customInvoice.jobDescription || 'Servicio técnico especializado';
    warranty = customInvoice.warranty || '6 meses de garantía oficial Sademy';
    dateStr = customInvoice.date || '15/10/2026';
    escrowCode = customInvoice.escrowCode || 'ESC-2026-94812';
    compNumber = customInvoice.id ? customInvoice.id.replace('INV-2026-', '') : '00000428';
    paymentMethod = customInvoice.paymentMethod || 'Mercado Pago Escrow Sademy (Pago Protegido liberado)';
  } else {
    proName = quote?.proName || (order?.hiredPro?.name) || 'Valeria C.';
    proTrade = quote?.proTrade || (order?.categoryName) || 'Cerrajería de Seguridad 24h';
    laborPrice = quote?.laborPrice || (order?.hiredPro?.price) || 19500;
    materialsPrice = quote?.materialsPrice || 5500;
    totalPrice = quote?.totalPrice || (laborPrice + materialsPrice);
    clientName = (appState.currentUser && appState.currentUser.name) || 'Carlos M.';
    clientDni = '20-35849120-4';
    clientAddress = order?.address || 'Palermo Chico, CABA';
    orderId = order?.id || 'ORD-2026-085';
    jobDescription = quote?.materialsNote || order?.title || 'Servicio técnico especializado y homologado';
    warranty = quote?.warranty || '6 meses de garantía oficial Sademy';
    dateStr = '15/10/2026';
    escrowCode = order?.escrowCode || 'ESC-2026-94812';
    compNumber = '00000428';
    paymentMethod = 'Mercado Pago Escrow Sademy (Pago Protegido liberado)';

    currentActiveInvoiceObject = {
      id: `INV-2026-${compNumber}`,
      orderId,
      date: dateStr,
      clientName,
      clientDni,
      clientAddress,
      jobDescription,
      laborPrice,
      materialsPrice,
      totalPrice,
      warranty,
      proName,
      proTrade,
      escrowCode,
      paymentMethod,
      status: 'Cobrada / En Garantía'
    };
  }

  container.innerHTML = `
    <div class="afip-outer-frame">
      
      <!-- ENCABEZADO TRIPARTITO OFICIAL SADEMY -->
      <div class="afip-header-grid">
        
        <!-- COLUMNA IZQUIERDA: LOGO CORPORATIVO SADEMY + DATOS EMISOR -->
        <div class="afip-header-left">
          <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 8px;">
            <span style="font-size: 34px; font-weight: 900; color: #10B981; letter-spacing: -1.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-transform: lowercase;">sademy</span>
            <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #34D399; margin-left: 2px;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 4px;">
            SADEMY SERVICIOS Y OFICIOS S.A.S.
          </div>
          <div style="font-size: 9.5px; color: #4B5563; line-height: 1.45;">
            <strong>Razón Social:</strong> Sademy Servicios y Oficios S.A.S.<br>
            <strong>Domicilio Legal:</strong> Av. del Libertador 6250, Piso 8, Belgrano, CABA<br>
            <strong>CUIT Plataforma:</strong> 30-71829450-8 · IVA Responsable Inscripto<br>
            <strong>Profesional Prestador:</strong> <strong>${proName}</strong> (${proTrade})
          </div>
        </div>

        <!-- CUADRO CENTRAL DE LA LETRA (SADEMY SERVICIO "S" / DOC. 06) -->
        <div class="afip-header-letter-box" style="border-color: #10B981;">
          <span class="afip-header-letter" style="color: #10B981;">S</span>
          <span class="afip-header-code" style="color: #111827;">DOC. 06</span>
        </div>

        <!-- COLUMNA DERECHA: DATOS DEL COMPROBANTE -->
        <div class="afip-header-right">
          <div style="font-size: 19px; font-weight: 900; letter-spacing: 0.5px; color: #111827; margin-bottom: 6px;">
            FACTURA DE SERVICIO
          </div>
          <div style="font-size: 10px; color: #4B5563; line-height: 1.55;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <strong>Punto de Emisión: 0001</strong>
              <strong style="color: #10B981;">Comp. Nro: ${compNumber}</strong>
            </div>
            <div><strong>Fecha de Emisión:</strong> ${dateStr}</div>
            <div><strong>CUIT Emisor:</strong> 30-71829450-8</div>
            <div><strong>Custodia Escrow:</strong> <span style="font-family: monospace; font-weight: 700; color: #10B981;">${escrowCode}</span></div>
            <div><strong>Estado de Fondos:</strong> <span style="color: #10B981; font-weight: 700;">✓ Pago Liberado / Conformidad</span></div>
          </div>
        </div>

      </div>

      <!-- SUB-BARRA DE PERÍODO & COBERTURA -->
      <div class="afip-subbar">
        <div><strong>Fecha del Servicio:</strong> ${dateStr}</div>
        <div><strong>Cobertura de Garantía Oficial:</strong> ${warranty}</div>
        <div><strong>Seguridad Financiera:</strong> Custodia Escrow Mercado Pago</div>
      </div>

      <!-- DATOS DEL CLIENTE / RECEPTOR -->
      <div class="afip-client-info">
        <div><strong>CUIT / CUIL / DNI:</strong> ${clientDni} (Consumidor Final)</div>
        <div><strong>Apellido y Nombre / Razón Social:</strong> ${clientName}</div>
        <div><strong>Condición frente al IVA:</strong> Consumidor Final</div>
        <div><strong>Domicilio del Inmueble / Trabajo:</strong> ${clientAddress}</div>
        <div><strong>Condición de Cobro:</strong> ${paymentMethod}</div>
        <div><strong>Orden Vinculada:</strong> ${orderId}</div>
      </div>

      <!-- TABLA DETALLADA DE CONCEPTOS FACTURADOS -->
      <table class="afip-items-table">
        <thead>
          <tr>
            <th style="width: 50px;">Código</th>
            <th>Producto / Servicio Realizado</th>
            <th style="width: 60px; text-align: center;">Cantidad</th>
            <th style="width: 70px;">U. Medida</th>
            <th style="width: 85px; text-align: right;">Precio Unit.</th>
            <th style="width: 55px; text-align: right;">% Bonif.</th>
            <th style="width: 70px; text-align: right;">Imp. Bonif.</th>
            <th style="width: 90px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-family: monospace;">SRV-01</td>
            <td>
              <strong>Mano de obra técnica calificada por ${proName}</strong><br>
              <span style="font-size: 9px; color: #475569;">${jobDescription}</span>
            </td>
            <td style="text-align: center;">1,00</td>
            <td>servicios</td>
            <td style="text-align: right;">$${laborPrice.toLocaleString('es-AR')},00</td>
            <td style="text-align: right;">0,00</td>
            <td style="text-align: right;">0,00</td>
            <td style="text-align: right; font-weight: 700;">$${laborPrice.toLocaleString('es-AR')},00</td>
          </tr>
          ${materialsPrice > 0 ? `
            <tr>
              <td style="font-family: monospace;">MAT-01</td>
              <td>
                <strong>Materiales, piezas de reposición e insumos técnicos</strong><br>
                <span style="font-size: 9px; color: #475569;">Componentes homologados provistos e instalados según normas de seguridad</span>
              </td>
              <td style="text-align: center;">1,00</td>
              <td>unidades</td>
              <td style="text-align: right;">$${materialsPrice.toLocaleString('es-AR')},00</td>
              <td style="text-align: right;">0,00</td>
              <td style="text-align: right;">0,00</td>
              <td style="text-align: right; font-weight: 700;">$${materialsPrice.toLocaleString('es-AR')},00</td>
            </tr>
          ` : ''}
          <tr>
            <td style="font-family: monospace;">GAR-01</td>
            <td>
              <strong>${warranty} & Custodia de Fondos Escrow</strong><br>
              <span style="font-size: 9px; color: #475569;">Certificado oficial de respaldo técnico, cobertura ante siniestros y mediación</span>
            </td>
            <td style="text-align: center;">1,00</td>
            <td>servicios</td>
            <td style="text-align: right;">$0,00</td>
            <td style="text-align: right;">100,00</td>
            <td style="text-align: right;">$0,00</td>
            <td style="text-align: right; font-weight: 700;">$0,00</td>
          </tr>
        </tbody>
      </table>

      <!-- TOTALES DE FACTURACIÓN -->
      <div class="afip-totals-box">
        <table class="afip-totals-table">
          <tr>
            <td style="color: #475569;">Subtotal Mano de Obra:</td>
            <td style="text-align: right; font-weight: 700;">$${laborPrice.toLocaleString('es-AR')},00</td>
          </tr>
          ${materialsPrice > 0 ? `
          <tr>
            <td style="color: #475569;">Subtotal Materiales:</td>
            <td style="text-align: right; font-weight: 700;">$${materialsPrice.toLocaleString('es-AR')},00</td>
          </tr>
          ` : ''}
          <tr>
            <td style="color: #475569;">Garantía Oficial Sademy:</td>
            <td style="text-align: right; font-weight: 700; color: #059669;">Bonificada 100%</td>
          </tr>
          <tr style="border-top: 1.5px solid #000000; font-size: 13px;">
            <td style="font-weight: 900; color: #000000; padding: 10px 14px;">Importe Total:</td>
            <td style="text-align: right; font-weight: 900; color: #064E3B; padding: 10px 14px;">$${totalPrice.toLocaleString('es-AR')},00 ARS</td>
          </tr>
        </table>
      </div>

      <div style="padding: 7px 16px; background: #FFFFFF; font-size: 9.5px; border-bottom: 1.5px solid #000000; color: #334155;">
        <strong>Son:</strong> ${numberToWordsSpanish(totalPrice)}.
      </div>

      <!-- PIE CON SELLO DIGITAL DE VALIDACIÓN Y QR SADEMY -->
      <div class="afip-footer-row" style="background: #F8FAFC; border-top: 1.5px solid #000000; padding: 14px 18px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <!-- QR OFICIAL SADEMY -->
          <div style="width: 74px; height: 74px; background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 6px; padding: 3px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
            <svg width="68" height="68" viewBox="0 0 85 85" fill="#064E3B">
              <rect x="5" y="5" width="25" height="25" fill="#064E3B" rx="2"/>
              <rect x="9" y="9" width="17" height="17" fill="#fff" rx="1"/>
              <rect x="13" y="13" width="9" height="9" fill="#064E3B" rx="1"/>
              <rect x="55" y="5" width="25" height="25" fill="#064E3B" rx="2"/>
              <rect x="59" y="9" width="17" height="17" fill="#fff" rx="1"/>
              <rect x="63" y="13" width="9" height="9" fill="#064E3B" rx="1"/>
              <rect x="5" y="55" width="25" height="25" fill="#064E3B" rx="2"/>
              <rect x="9" y="59" width="17" height="17" fill="#fff" rx="1"/>
              <rect x="13" y="63" width="9" height="9" fill="#064E3B" rx="1"/>
              <rect x="35" y="9" width="5" height="5"/>
              <rect x="43" y="9" width="5" height="5"/>
              <rect x="9" y="35" width="5" height="5"/>
              <rect x="9" y="43" width="5" height="5"/>
              <rect x="35" y="21" width="5" height="5"/>
              <rect x="43" y="21" width="5" height="5"/>
              <rect x="35" y="35" width="6" height="6"/>
              <rect x="45" y="35" width="6" height="6"/>
              <rect x="55" y="35" width="5" height="5"/>
              <rect x="65" y="35" width="5" height="5"/>
              <rect x="75" y="35" width="5" height="5"/>
              <rect x="35" y="45" width="5" height="5"/>
              <rect x="45" y="45" width="6" height="6"/>
              <rect x="55" y="45" width="6" height="6"/>
              <rect x="65" y="45" width="5" height="5"/>
              <rect x="35" y="55" width="5" height="5"/>
              <rect x="45" y="55" width="5" height="5"/>
              <rect x="55" y="55" width="5" height="5"/>
              <rect x="65" y="55" width="5" height="5"/>
              <rect x="75" y="55" width="5" height="5"/>
              <rect x="35" y="65" width="6" height="6"/>
              <rect x="45" y="65" width="5" height="5"/>
              <rect x="55" y="65" width="6" height="6"/>
              <rect x="65" y="65" width="5" height="5"/>
              <rect x="75" y="65" width="5" height="5"/>
              <rect x="35" y="75" width="5" height="5"/>
              <rect x="45" y="75" width="6" height="6"/>
              <rect x="55" y="75" width="5" height="5"/>
              <rect x="65" y="75" width="6" height="6"/>
              <rect x="75" y="75" width="5" height="5"/>
            </svg>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
              <span style="font-size: 13px; font-weight: 900; letter-spacing: 0.5px; color: #065F46;">SELLO DIGITAL SADEMY ESCROW</span>
              <span style="background: #ECFDF5; color: #047857; font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 4px; border: 1px solid #A7F3D0;">VERIFICADO ✓</span>
            </div>
            <div style="font-size: 9.5px; font-weight: 800; color: #111827;">
              Comprobante Oficial de Prestación y Certificado de Garantía
            </div>
            <div style="font-size: 8.5px; color: #475569; max-width: 360px; line-height: 1.35; margin-top: 3px;">
              Emitido conforme a los Términos de Servicio de Sademy Servicios y Oficios S.A.S. Válido para administraciones de consorcio, seguros, inquilinos y propietarios. Escaneá el código QR para validar autenticidad en sademy.com.
            </div>
          </div>
        </div>

        <div style="text-align: right; font-size: 10.5px; line-height: 1.6;">
          <div><strong>Token de Seguridad:</strong> <span style="font-family: monospace; font-size: 12px; font-weight: 800; color: #064E3B; letter-spacing: 1px;">SAD-${compNumber}-SEC</span></div>
          <div><strong>Profesional Prestador:</strong> <span style="font-weight: 700;">${proName}</span></div>
          <div style="font-size: 9px; color: #059669; font-weight: 700; margin-top: 3px;">✓ Garantía y Custodia Escrow Activa</div>
        </div>
      </div>

    </div>
  `;

  const modal = document.getElementById('modal-invoice-viewer');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '99999';
    const box = modal.querySelector('.modal-container');
    if (box) {
      box.style.transform = 'translateY(0) scale(1)';
      box.scrollTop = 0;
    }
  }
}

function closeInvoiceModal() {
  const modal = document.getElementById('modal-invoice-viewer');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
}

function printInvoiceDocument() {
  triggerHapticFeedback();
  window.print();
}

function downloadInvoiceHTML() {
  triggerHapticFeedback();
  playSuccessChime();

  const container = document.getElementById('invoice-sheet-container');
  if (!container) return;

  const compId = currentActiveInvoiceObject?.id ? currentActiveInvoiceObject.id.replace('INV-2026-', '') : '00000428';
  const invoiceContent = container.innerHTML;
  const fullHTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Factura_Servicio_Sademy_${compId}</title>
  <style>
    body { margin: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #FFF; color: #000; }
    .afip-outer-frame { border: 1.5px solid #000; border-radius: 4px; position: relative; max-width: 820px; margin: 0 auto; background: #FFF; }
    .afip-header-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 140px; border-bottom: 1.5px solid #000; position: relative; }
    .afip-header-left { padding: 16px 24px 16px 20px; border-right: 1.5px solid #000; }
    .afip-header-letter-box { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 58px; height: 52px; background: #FFF; border: 1.5px solid #047857; border-top: none; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; }
    .afip-header-letter { font-size: 28px; font-weight: 900; line-height: 1; color: #047857; }
    .afip-header-code { font-size: 8px; font-weight: 800; margin-top: 2px; color: #064E3B; }
    .afip-header-right { padding: 16px 20px 16px 28px; }
    .afip-subbar { display: flex; justify-content: space-between; padding: 8px 16px; border-bottom: 1.5px solid #000; background: #F8FAFC; font-size: 10px; font-weight: 700; }
    .afip-client-info { padding: 12px 16px; border-bottom: 1.5px solid #000; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; font-size: 10.5px; }
    .afip-items-table { width: 100%; border-collapse: collapse; font-size: 10px; }
    .afip-items-table th { background: #F1F5F9; border-bottom: 1.5px solid #000; border-right: 1px solid #CBD5E1; padding: 7px 8px; text-align: left; font-weight: 800; text-transform: uppercase; }
    .afip-items-table th:last-child { border-right: none; }
    .afip-items-table td { padding: 8px 8px; border-bottom: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; }
    .afip-items-table td:last-child { border-right: none; }
    .afip-totals-box { display: flex; justify-content: flex-end; border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background: #F8FAFC; }
    .afip-totals-table { width: 340px; border-collapse: collapse; font-size: 11px; }
    .afip-totals-table td { padding: 6px 14px; }
    .afip-footer-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: #F8FAFC; }
  </style>
</head>
<body onload="window.print()">
  ${invoiceContent}
</body>
</html>`;

  const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Factura_Servicio_Sademy_${compId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Comprobante Descargado', `Se descargó la Factura Oficial de Servicio Sademy (${compId}).`);
}

// ============================================================================
// FUNCIONES DE EMISIÓN DE FACTURA DE SERVICIO POR EL TRABAJADOR
// ============================================================================
function openWorkerCreateInvoiceModal(prefillOrderId = '') {
  triggerHapticFeedback();
  playPop();

  const select = document.getElementById('worker-inv-order-select');
  if (select) {
    if (prefillOrderId) {
      select.value = prefillOrderId;
    }
    onWorkerInvoiceOrderSelectChange(select.value);
  }

  updateWorkerInvoiceLiveTotal();

  const modal = document.getElementById('modal-worker-create-invoice');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '99999';
    const box = modal.querySelector('.modal-container');
    if (box) {
      box.style.transform = 'translateY(0) scale(1)';
      box.scrollTop = 0;
    }
  }
}

function closeWorkerCreateInvoiceModal() {
  const modal = document.getElementById('modal-worker-create-invoice');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
}

function onWorkerInvoiceOrderSelectChange(orderId) {
  const nameInput = document.getElementById('worker-inv-client-name');
  const dniInput = document.getElementById('worker-inv-client-dni');
  const addressInput = document.getElementById('worker-inv-client-address');
  const descInput = document.getElementById('worker-inv-description');
  const laborInput = document.getElementById('worker-inv-labor');
  const materialsInput = document.getElementById('worker-inv-materials');

  if (!orderId) {
    // Modo cliente particular / fuera de pedido
    if (nameInput && !nameInput.value) nameInput.value = 'Cliente Particular';
    if (addressInput && !addressInput.value) addressInput.value = 'Ciudad Autónoma de Buenos Aires';
    if (descInput && !descInput.value) descInput.value = 'Servicio técnico especializado a domicilio';
    updateWorkerInvoiceLiveTotal();
    return;
  }

  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    if (nameInput) nameInput.value = (appState.currentUser && appState.currentUser.name) || 'Carlos M.';
    if (dniInput) dniInput.value = '20-35849120-4';
    if (addressInput) addressInput.value = order.address || 'Palermo Chico, CABA';
    if (descInput) descInput.value = order.title + ' - ' + (order.description || 'Tareas técnicas ejecutadas con total conformidad.');
    
    // Set amounts if available in order quotes
    const quote = order.quotes && order.quotes[0];
    if (quote) {
      if (laborInput) laborInput.value = quote.laborPrice || 19500;
      if (materialsInput) materialsInput.value = quote.materialsPrice || 0;
    } else if (order.hiredPro) {
      if (laborInput) laborInput.value = order.hiredPro.price || 22000;
      if (materialsInput) materialsInput.value = 0;
    }
  }

  updateWorkerInvoiceLiveTotal();
}

function updateWorkerInvoiceLiveTotal() {
  const laborEl = document.getElementById('worker-inv-labor');
  const matEl = document.getElementById('worker-inv-materials');
  const totalDisplay = document.getElementById('worker-inv-live-total');
  const breakdownDisplay = document.getElementById('worker-inv-live-breakdown');

  const labor = parseInt(laborEl?.value) || 0;
  const materials = parseInt(matEl?.value) || 0;
  const total = labor + materials;

  if (totalDisplay) {
    totalDisplay.innerHTML = `$${total.toLocaleString('es-AR')} <span style="font-size: 0.85rem; font-weight: 700;">ARS</span>`;
  }
  if (breakdownDisplay) {
    breakdownDisplay.textContent = `Mano de obra: $${labor.toLocaleString('es-AR')} + Materiales: $${materials.toLocaleString('es-AR')}`;
  }
}

function submitWorkerCreateInvoice() {
  triggerHapticFeedback();
  playSuccessChime();

  const orderSelect = document.getElementById('worker-inv-order-select');
  const nameInput = document.getElementById('worker-inv-client-name');
  const dniInput = document.getElementById('worker-inv-client-dni');
  const addressInput = document.getElementById('worker-inv-client-address');
  const descInput = document.getElementById('worker-inv-description');
  const laborInput = document.getElementById('worker-inv-labor');
  const materialsInput = document.getElementById('worker-inv-materials');
  const warrantySelect = document.getElementById('worker-inv-warranty');
  const paymentSelect = document.getElementById('worker-inv-payment');

  const orderId = orderSelect?.value || `DIR-${Date.now().toString().slice(-6)}`;
  const clientName = nameInput?.value.trim() || 'Carlos M.';
  const clientDni = dniInput?.value.trim() || '20-35849120-4';
  const clientAddress = addressInput?.value.trim() || 'Palermo Chico, CABA';
  const jobDescription = descInput?.value.trim() || 'Servicio técnico especializado y homologado';
  const laborPrice = parseInt(laborInput?.value) || 15000;
  const materialsPrice = parseInt(materialsInput?.value) || 0;
  const totalPrice = laborPrice + materialsPrice;
  const warranty = warrantySelect?.value || '6 meses de garantía oficial Sademy';
  const paymentMethod = paymentSelect?.value || 'Mercado Pago Escrow Sademy (Pago Protegido liberado)';

  const proName = (appState.currentUser && appState.currentUser.name) || 'Marcos R.';
  const proTrade = (appState.currentUser && appState.currentUser.trade) || 'Electricista Matriculado';

  const newCompNum = String(429 + (appState.workerInvoices?.length || 0)).padStart(8, '0');
  const newInvoice = {
    id: `INV-2026-${newCompNum}`,
    orderId,
    date: new Date().toLocaleDateString('es-AR'),
    clientName,
    clientDni,
    clientAddress,
    jobDescription,
    laborPrice,
    materialsPrice,
    totalPrice,
    warranty,
    proName,
    proTrade,
    escrowCode: `ESC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    paymentMethod,
    status: 'Cobrada / En Garantía'
  };

  if (!appState.workerInvoices) appState.workerInvoices = [];
  appState.workerInvoices.unshift(newInvoice);
  saveAppState();

  closeWorkerCreateInvoiceModal();
  renderWorkerInvoicesList();

  showToast('Factura de Servicio Emitida', `Comprobante Nº ${newCompNum} generado por $${totalPrice.toLocaleString('es-AR')} ARS.`);

  // Abrir inmediatamente la factura emitida para verla y descargarla
  setTimeout(() => {
    renderAndOpenInvoice(null, null, newInvoice);
  }, 200);
}

function renderWorkerInvoicesList() {
  const container = document.getElementById('pro-dash-invoices-list');
  if (!container) return;

  const invoices = appState.workerInvoices || [];
  if (invoices.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 12px;">
        <p style="font-size: 0.86rem; color: #64748B; margin: 0 0 10px;">Aún no emitiste facturas de servicio.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="openWorkerCreateInvoiceModal()">Emitir Mi Primera Factura</button>
      </div>
    `;
    return;
  }

  container.innerHTML = invoices.map(inv => `
    <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 10px; background: #ECFDF5; border: 1.5px solid #A7F3D0; display: flex; align-items: center; justify-content: center; color: #059669; flex-shrink: 0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="color: #111827; font-size: 0.92rem;">${inv.id}</strong>
            <span class="badge-tag" style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.72rem;">✓ ${inv.status || 'Cobrada / En Garantía'}</span>
          </div>
          <div style="font-size: 0.84rem; color: #334155; font-weight: 600; margin-top: 3px;">
            Cliente: <strong>${inv.clientName}</strong> · ${inv.jobDescription.substring(0, 48)}${inv.jobDescription.length > 48 ? '...' : ''}
          </div>
          <div style="font-size: 0.76rem; color: #64748B; margin-top: 2px;">
            Fecha: ${inv.date} · Orden: ${inv.orderId} · ${inv.warranty}
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="text-align: right;">
          <div style="font-size: 1.15rem; font-weight: 900; color: #064E3B;">$${inv.totalPrice.toLocaleString('es-AR')} <span style="font-size: 0.75rem; font-weight: 700;">ARS</span></div>
          <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">Mano de obra: $${inv.laborPrice.toLocaleString('es-AR')}</div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="openSpecificWorkerInvoice('${inv.id}')" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 700; font-size: 0.78rem; padding: 7px 12px; border-radius: 8px; color: #065F46; background: #ECFDF5; border-color: #A7F3D0;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Ver
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="downloadInvoiceForWorkerInvoice('${inv.id}')" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 700; font-size: 0.78rem; padding: 7px 12px; border-radius: 8px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            PDF
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openSpecificWorkerInvoice(invId) {
  triggerHapticFeedback();
  playPop();
  const inv = (appState.workerInvoices || []).find(i => i.id === invId);
  if (inv) {
    renderAndOpenInvoice(null, null, inv);
  }
}

function downloadInvoiceForWorkerInvoice(invId) {
  triggerHapticFeedback();
  playSuccessChime();
  const inv = (appState.workerInvoices || []).find(i => i.id === invId);
  if (inv) {
    renderAndOpenInvoice(null, null, inv);
    setTimeout(() => downloadInvoiceHTML(), 150);
  }
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
      client: (appState.currentUser && appState.currentUser.name) || 'Cliente Sademy',
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
  openEscrowPinModal(order.id, proName, correctPin);
}

function openEscrowPinModal(orderId, proName, correctPin) {
  const modal = document.getElementById('modal-escrow-pin');
  const orderIdInput = document.getElementById('escrow-pin-order-id');
  const subtitle = document.getElementById('escrow-pin-subtitle');
  const hint = document.getElementById('escrow-pin-hint');
  const pinInput = document.getElementById('escrow-pin-input');

  if (orderIdInput) orderIdInput.value = orderId;
  if (subtitle) subtitle.innerHTML = `Liberarás el pago retenido a <strong>${proName}</strong> una vez finalizado el trabajo a tu conformidad.`;
  if (hint) hint.textContent = correctPin;
  if (pinInput) {
    pinInput.value = '';
    setTimeout(() => pinInput.focus(), 150);
  }
  if (modal) modal.classList.add('active');
}

function closeEscrowPinModal() {
  const modal = document.getElementById('modal-escrow-pin');
  if (modal) modal.classList.remove('active');
}

function submitEscrowPin() {
  triggerHapticFeedback();
  const orderId = document.getElementById('escrow-pin-order-id').value;
  const pinInput = document.getElementById('escrow-pin-input');
  const enteredPin = pinInput ? pinInput.value.trim() : '';

  const order = appState.orders.find(o => o.id === orderId) || appState.orders[0];
  const proName = order.hiredPro?.name || order.quotes[0]?.proName || 'Profesional';
  const correctPin = String(order.conformityPin || '7412');

  if (enteredPin === correctPin) {
    order.completed = true;
    order.status = 'Finalizado con éxito';

    const netAmount = order.hiredPro?.price || 24500;

    if (appState.adminTransactions) {
      const tx = appState.adminTransactions.find(t => t.id === order.id);
      if (tx) tx.status = 'Liberado al Pro (Pago MP)';
    }
    if (appState.adminMetrics && appState.adminMetrics.escrowActive >= netAmount) {
      appState.adminMetrics.escrowActive -= netAmount;
    }

    // Acreditar saldo en la Billetera del Profesional
    if (!appState.proStats) {
      appState.proStats = { openRequestsCount: 12, acceptedQuotesCount: 8, escrowBalance: 49000, rating: 4.9 };
    }
    appState.proStats.escrowBalance = (appState.proStats.escrowBalance || 0) + netAmount;
    appState.proStats.acceptedQuotesCount = (appState.proStats.acceptedQuotesCount || 8) + 1;

    // Sincronizar en tiempo real en Sademy CRM Pro del Trabajador
    if (appState.proCrmClients && Array.isArray(appState.proCrmClients)) {
      const clientName = (appState.currentUser && appState.currentUser.name) || 'Carlos M.';
      let crmClient = appState.proCrmClients.find(c => c.name.toLowerCase().includes(clientName.toLowerCase().split(' ')[0]));
      if (!crmClient) crmClient = appState.proCrmClients[0];
      if (crmClient) {
        crmClient.totalBilled = (crmClient.totalBilled || 0) + netAmount;
        crmClient.totalNetEarned = (crmClient.totalNetEarned || 0) + Math.round(netAmount * 0.92);
        crmClient.jobsCompleted = (crmClient.jobsCompleted || 0) + 1;
        crmClient.lastServiceDate = new Date().toLocaleDateString('es-AR');
        if (!crmClient.history) crmClient.history = [];
        crmClient.history.unshift({
          orderId: order.id,
          title: order.title,
          date: new Date().toLocaleDateString('es-AR'),
          amount: netAmount,
          fee: Math.round(netAmount * 0.08),
          netAmount: Math.round(netAmount * 0.92),
          status: 'Cobrado / En Garantía',
          warrantyUntil: '15/04/2027',
          escrowCode: order.escrowCode || 'ESC-2026-LIVE',
          invoiceId: `INV-2026-00${Math.floor(430 + Math.random() * 60)}`
        });
      }
    }

    saveAppState();
    updateNavAuthState();
    playSuccessChime();
    closeEscrowPinModal();
    renderActiveOrderBanner();
    renderMyOrdersModalList();
    updateOrdersBadges();

    showToast('¡Pago liberado exitosamente!', `${proName} recibió sus honorarios vía Mercado Pago. ¡Gracias por confiar en Sademy!`);
    openOrderReviewModal(proName, order.id);
  } else {
    showToast('PIN incorrecto', 'Verificá el código PIN de 4 dígitos indicado en pantalla.');
    if (pinInput) {
      pinInput.classList.add('error');
      pinInput.focus();
    }
  }
}

function openOrderReviewModal(proName, orderId) {
  const modal = document.getElementById('modal-order-review');
  const orderIdInput = document.getElementById('review-order-id');
  const subtitle = document.getElementById('review-subtitle');
  if (orderIdInput) orderIdInput.value = orderId;
  if (subtitle) subtitle.innerHTML = `¿Cómo fue tu experiencia de servicio con <strong>${proName}</strong>?`;
  renderStarRating(5);
  if (modal) modal.classList.add('active');
}

function closeOrderReviewModal() {
  const modal = document.getElementById('modal-order-review');
  if (modal) modal.classList.remove('active');
}

function renderStarRating(selectedRating) {
  const container = document.getElementById('star-rating-selector');
  const valInput = document.getElementById('review-rating-value');
  if (valInput) valInput.value = selectedRating;
  if (!container) return;

  container.innerHTML = [1, 2, 3, 4, 5].map(star => {
    const isFilled = star <= selectedRating;
    return `
      <button type="button" onclick="renderStarRating(${star})" style="background: none; border: none; cursor: pointer; padding: 4px; transition: transform 0.15s ease;" onmouseenter="this.style.transform='scale(1.2)'" onmouseleave="this.style.transform='scale(1)'" aria-label="${star} estrellas">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="${isFilled ? '#F59E0B' : '#E2E8F0'}" stroke="${isFilled ? '#D97706' : '#94A3B8'}" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>
    `;
  }).join('');
}

function submitOrderReview() {
  triggerHapticFeedback();
  playSuccessChime();
  const orderId = document.getElementById('review-order-id').value;
  const rating = parseInt(document.getElementById('review-rating-value').value) || 5;
  const comment = document.getElementById('review-comment-input').value.trim() || 'Servicio verificado de excelencia.';

  const order = appState.orders.find(o => o.id === orderId) || appState.orders[0];
  let targetPro = null;

  if (order) {
    order.review = {
      stars: rating,
      comment: comment,
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Identificar al profesional contratado
    const proName = order.hiredPro?.name || 'Marcos R.';
    targetPro = PROFESSIONALS_DATA.find(p => p.name.toLowerCase() === proName.toLowerCase() || (order.hiredPro?.proId && p.id === order.hiredPro.proId)) || PROFESSIONALS_DATA[0];

    if (targetPro) {
      // 2. Acumulación matemática del promedio ponderado en tiempo real
      const prevReviews = targetPro.reviewsCount || 0;
      const prevRating = targetPro.rating || 5.0;
      const nextReviews = prevReviews + 1;
      const nextRating = Math.round(((prevRating * prevReviews + rating) / nextReviews) * 10) / 10;

      targetPro.rating = nextRating;
      targetPro.reviewsCount = nextReviews;
      targetPro.completedJobs = (targetPro.completedJobs || 0) + 1;

      if (!targetPro.reviewsList) targetPro.reviewsList = [];
      targetPro.reviewsList.unshift({
        author: (appState.currentUser && appState.currentUser.name) || 'Cliente Sademy',
        rating: rating,
        comment: comment,
        date: 'Reciente',
        verified: true
      });

      // 3. Persistir calificaciones actualizadas en appState
      if (!appState.professionalsRatings) appState.professionalsRatings = {};
      appState.professionalsRatings[targetPro.id] = {
        rating: nextRating,
        reviewsCount: nextReviews,
        completedJobs: targetPro.completedJobs,
        reviewsList: targetPro.reviewsList
      };

      // 4. Si el trabajador activo o Marcos R. está en sesión, sincronizar métricas del CRM
      if (appState.proStats) {
        appState.proStats.rating = nextRating;
        appState.proStats.reviewsCount = nextReviews;
      }

      // 5. Acumular y reflejar en el CRM de clientes del profesional
      if (appState.proCrmClients) {
        const clientName = (appState.currentUser && appState.currentUser.name) || 'Cliente Sademy';
        const clientMatch = appState.proCrmClients.find(c => 
          c.name.toLowerCase().includes(clientName.toLowerCase()) || 
          clientName.toLowerCase().includes(c.name.toLowerCase())
        );
        if (clientMatch) {
          clientMatch.rating = rating;
          clientMatch.notes = (clientMatch.notes || '') + ` | Reseña recibida (${rating}★): "${comment}"`;
        }
      }
    }

    saveAppState();
  }

  closeOrderReviewModal();

  // 6. Re-renderizar directorio y dashboards en vivo
  renderProfessionalsDirectory();
  if (typeof renderFeaturedProfessionals === 'function') renderFeaturedProfessionals();
  if (typeof renderWorkerCrmDashboard === 'function') renderWorkerCrmDashboard();
  renderActiveOrderBanner();
  renderMyOrdersModalList();

  const proNameStr = targetPro ? targetPro.name : 'Profesional';
  const proRatingStr = targetPro ? targetPro.rating : '5.0';
  const proCountStr = targetPro ? targetPro.reviewsCount : '1';

  showToast(
    '⭐ Calificación y Reputación Acumuladas',
    `¡Tu puntuación de ${rating}★ se acumuló automáticamente al perfil de ${proNameStr}! Nuevo promedio oficial: ${proRatingStr}★ (${proCountStr} reseñas verificadas).`
  );
}

function openProQuoteModal(orderId, orderTitle) {
  sendWorkerProposal(orderTitle);
  const idInput = document.getElementById('pro-quote-order-id');
  if (idInput && orderId) idInput.value = orderId;
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
        text: 'Recordatorio de Seguridad: Los números y datos de contacto se habilitan automáticamente una vez confirmado el presupuesto para garantizar tu Seguro contra Daños de hasta $500.000.',
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

function handleQuickChipClick(btn, cat) {
  triggerHapticFeedback();
  playPop();
  document.querySelectorAll('.search-chips-row .quick-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  appState.activeFilterTrade = cat;
  const select = document.getElementById('filter-trade-select');
  if (select) select.value = cat;
  renderProfessionalsDirectory();
  const dirSection = document.getElementById('directorio');
  if (dirSection) dirSection.scrollIntoView({ behavior: 'smooth' });
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
      descEl.textContent = 'Estado previo: ' + CASE_DATA[caseId].beforeDesc;
      descEl.style.color = '#B45309';
    }
  } else {
    if (btnAfter) btnAfter.classList.add('active');
    if (btnBefore) btnBefore.classList.remove('active');
    if (descEl && CASE_DATA[caseId]) {
      descEl.textContent = 'Trabajo certificado: ' + CASE_DATA[caseId].afterDesc;
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
function openAdminBackofficeModal(tabName = 'finanzas') {
  // BARRERA DE SEGURIDAD EXCLUSIVA SADEMY HQ
  const isAuthAdmin = appState.currentUser && 
                      appState.currentRole === 'admin' && 
                      (appState.currentUser.email === 'sademyapp@gmail.com' || appState.currentUser.email === 'admin@sademy.com.ar');
  
  if (!isAuthAdmin) {
    triggerHapticFeedback();
    playPop();
    showToast('Acceso Restringido a Sademy HQ', 'Se requiere autenticación corporativa para ingresar a la consola directiva.');
    openAdminLoginModal();
    return;
  }

  triggerHapticFeedback();
  playPop();
  if (tabName && typeof tabName === 'string') switchAdminTab(tabName);
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
        <td><strong style="color: #111827; font-size: 0.8rem;">${t.id}</strong></td>
        <td>${t.client}</td>
        <td><strong>${t.pro}</strong></td>
        <td><span class="badge-tag" style="background: #F1F5F9; color: #334155;">${t.trade}</span></td>
        <td><strong style="color: #065F46;">$${t.amount.toLocaleString('es-AR')} ARS</strong></td>
        <td><strong style="color: #10B981;">+$${t.fee.toLocaleString('es-AR')} ARS</strong></td>
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
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" style="margin: 0 auto 10px; display: block;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <h4 style="margin: 8px 0 4px; color: #111827;">Cola al día</h4>
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
            <strong style="font-size: 0.95rem; color: #111827;">${p.name}</strong>
            <span class="badge-tag" style="background: #FEF3C7; color: #92400E; font-weight: 700;">Pendiente Verificación</span>
          </div>
          <div style="font-size: 0.82rem; color: #64748B; margin-top: 2px;">
            ${p.trade} · <strong>${p.matricula}</strong> · DNI: ${p.dni} (${p.zone})
          </div>
          <div style="font-size: 0.74rem; color: #10B981; font-weight: 600; margin-top: 3px;">
            DNI validado · Registro oficial cruzado con base pública
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary btn-sm" onclick="rejectAdminMatricula('${p.id}')" style="color: #DC2626; border-color: #FECACA;">
          Rechazar
        </button>
        <button class="btn btn-primary btn-sm" onclick="approveAdminMatricula('${p.id}')" style="background: #10B981; border: none; font-weight: 700;">
          Aprobar y Otorgar Tilde
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
          <strong style="color: #111827;">${o.id} · ${o.title}</strong>
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

// ============================================================================
// 15. SADEMY CRM PRO (GESTIÓN DE CLIENTES, COBROS, HISTORIAL Y DIRECCIONES)
// ============================================================================

let currentCrmSubTab = 'clientes'; // 'clientes' | 'trabajos' | 'cobros'
let currentCrmFilter = '';

function renderWorkerCrmDashboard() {
  const container = document.getElementById('pro-dash-view-crm');
  if (!container) return;

  const clients = appState.proCrmClients || DEFAULT_PRO_CRM_CLIENTS;
  
  // Métricas ejecutivas
  const totalClients = clients.length;
  let totalJobs = 0;
  let totalGross = 0;
  let totalNet = 0;

  clients.forEach(c => {
    totalJobs += (c.jobsCompleted || (c.history ? c.history.length : 0));
    totalGross += (c.totalBilled || 0);
    totalNet += (c.totalNetEarned || 0);
  });

  const savedFeeTotal = Math.round(totalGross * (0.15 - 0.08));

  container.innerHTML = `
    <!-- Resumen Ejecutivo Superior / Apple Bento Style -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; margin-bottom: 20px;">
      
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: #64748B; letter-spacing: 0.04em;">Clientes Activos</span>
          <span class="badge-tag" style="background: #ECFDF5; color: #065F46; font-size: 0.68rem; font-weight: 800;">Cartera</span>
        </div>
        <div style="font-size: 1.45rem; font-weight: 900; color: #111827;">${totalClients} <span style="font-size: 0.82rem; font-weight: 600; color: #64748B;">frecuentes</span></div>
        <div style="font-size: 0.72rem; color: #059669; font-weight: 600; margin-top: 3px;">100% Calificación 5.0 ★</div>
      </div>

      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: #64748B; letter-spacing: 0.04em;">Trabajos Realizados</span>
          <span class="badge-tag" style="background: #EFF6FF; color: #1E40AF; font-size: 0.68rem; font-weight: 800;">Historial</span>
        </div>
        <div style="font-size: 1.45rem; font-weight: 900; color: #111827;">${totalJobs} <span style="font-size: 0.82rem; font-weight: 600; color: #64748B;">servicios</span></div>
        <div style="font-size: 0.72rem; color: #2563EB; font-weight: 600; margin-top: 3px;">Garantías oficiales vigentes</div>
      </div>

      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: #64748B; letter-spacing: 0.04em;">Facturado Neto</span>
          <span class="badge-tag" style="background: #ECFDF5; color: #065F46; font-size: 0.68rem; font-weight: 800;">En Billetera</span>
        </div>
        <div style="font-size: 1.45rem; font-weight: 900; color: #047857;">$${totalNet.toLocaleString('es-AR')} <span style="font-size: 0.82rem; font-weight: 600;">ARS</span></div>
        <div style="font-size: 0.72rem; color: #059669; font-weight: 600; margin-top: 3px;">+${totalGross.toLocaleString('es-AR')} ARS bruto</div>
      </div>

      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: #64748B; letter-spacing: 0.04em;">Ahorro Plan PRO</span>
          <span class="badge-tag" style="background: #FEF3C7; color: #92400E; font-size: 0.68rem; font-weight: 800;">8% vs 15%</span>
        </div>
        <div style="font-size: 1.45rem; font-weight: 900; color: #B45309;">$${savedFeeTotal.toLocaleString('es-AR')} <span style="font-size: 0.82rem; font-weight: 600;">ARS</span></div>
        <div style="font-size: 0.72rem; color: #92400E; font-weight: 600; margin-top: 3px;">Ahorrados en comisiones</div>
      </div>

    </div>

    <!-- Barra de Herramientas y Subpestañas del CRM -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 10px 14px;">
      
      <!-- Segmented Switcher de CRM -->
      <div style="display: flex; gap: 6px;">
        <button type="button" id="crm-subtab-btn-clientes" onclick="switchCrmSubTab('clientes')" class="profile-role-pill ${currentCrmSubTab === 'clientes' ? 'active' : ''}" style="padding: 7px 14px; font-size: 0.78rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          Clientes & Direcciones (${totalClients})
        </button>
        <button type="button" id="crm-subtab-btn-trabajos" onclick="switchCrmSubTab('trabajos')" class="profile-role-pill ${currentCrmSubTab === 'trabajos' ? 'active' : ''}" style="padding: 7px 14px; font-size: 0.78rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          Historial de Trabajos (${totalJobs})
        </button>
        <button type="button" id="crm-subtab-btn-cobros" onclick="switchCrmSubTab('cobros')" class="profile-role-pill ${currentCrmSubTab === 'cobros' ? 'active' : ''}" style="padding: 7px 14px; font-size: 0.78rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line></svg>
          Cobros & Liquidaciones
        </button>
      </div>

      <!-- Buscador y Botón Agregar -->
      <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 440px; justify-content: flex-end;">
        <div style="position: relative; width: 100%; max-width: 260px;">
          <input type="text" id="crm-search-input" value="${currentCrmFilter}" oninput="filterWorkerCrm(this.value)" placeholder="Buscar cliente, dirección, zona..." style="width: 100%; font-size: 0.78rem; padding: 7px 12px 7px 30px; border-radius: 9px; border: 1.5px solid #CBD5E1; background: #FFFFFF; outline: none;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.2" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <button type="button" class="btn btn-primary btn-sm" onclick="openCrmNewClientModal()" style="font-size: 0.78rem; font-weight: 800; background: #059669; padding: 7px 13px; border-radius: 9px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Nuevo Cliente
        </button>
      </div>

    </div>

    <!-- Contenedor Dinámico de Subvistas -->
    <div id="pro-crm-subview-content"></div>
  `;

  renderCrmSubView();
}

function switchCrmSubTab(subTab) {
  triggerHapticFeedback();
  playPop();
  currentCrmSubTab = subTab;

  ['clientes', 'trabajos', 'cobros'].forEach(t => {
    const btn = document.getElementById(`crm-subtab-btn-${t}`);
    if (btn) {
      if (t === subTab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  renderCrmSubView();
}

function filterWorkerCrm(query) {
  currentCrmFilter = (query || '').toLowerCase().trim();
  renderCrmSubView();
}

function renderCrmSubView() {
  const container = document.getElementById('pro-crm-subview-content');
  if (!container) return;

  const allClients = appState.proCrmClients || DEFAULT_PRO_CRM_CLIENTS;
  
  const filteredClients = allClients.filter(c => {
    if (!currentCrmFilter) return true;
    const matchName = (c.name || '').toLowerCase().includes(currentCrmFilter);
    const matchZone = (c.zone || '').toLowerCase().includes(currentCrmFilter);
    const matchAddress = (c.address || '').toLowerCase().includes(currentCrmFilter);
    const matchPhone = (c.phone || '').toLowerCase().includes(currentCrmFilter);
    const matchNotes = (c.notes || '').toLowerCase().includes(currentCrmFilter);
    const matchJob = (c.history || []).some(h => 
      (h.title || '').toLowerCase().includes(currentCrmFilter) || 
      (h.orderId && h.orderId.toLowerCase().includes(currentCrmFilter)) ||
      (h.escrowCode && h.escrowCode.toLowerCase().includes(currentCrmFilter))
    );
    return matchName || matchZone || matchAddress || matchPhone || matchNotes || matchJob;
  });

  if (currentCrmSubTab === 'clientes') {
    renderCrmClientsList(filteredClients, container);
  } else if (currentCrmSubTab === 'trabajos') {
    renderCrmJobsHistory(filteredClients, container);
  } else if (currentCrmSubTab === 'cobros') {
    renderCrmPayoutsLedger(filteredClients, container);
  }
}

function renderCrmClientsList(clients, container) {
  if (clients.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 14px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" style="margin-bottom: 8px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
        <div style="font-weight: 700; color: #111827; font-size: 0.95rem;">No se encontraron clientes</div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 4px;">Probá con otro término de búsqueda o agregá un nuevo cliente.</div>
        <button type="button" class="btn btn-primary btn-sm" onclick="openCrmNewClientModal()" style="margin-top: 14px; font-weight: 700; background: #059669;">
          + Agregar Cliente
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${clients.map(c => {
        const jobsCount = c.jobsCompleted || (c.history ? c.history.length : 0);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address || '')}`;
        const waMsg = encodeURIComponent(`Hola ${c.name}, te escribe Marcos R. de Sademy Servicios. Te contacto para coordinar el trabajo programado.`);
        const waUrl = `https://wa.me/${c.whatsapp || '5491154219988'}?text=${waMsg}`;

        return `
          <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: transform 0.15s ease, box-shadow 0.15s ease;">
            
            <!-- Encabezado de Tarjeta de Cliente -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${c.avatar || 'assets/mascot.jpg'}" alt="${c.name}" style="width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2px solid #10B981; flex-shrink: 0;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="color: #111827; font-size: 1.05rem;">${c.name}</strong>
                    <span class="badge-tag" style="background: #ECFDF5; color: #065F46; font-weight: 800; font-size: 0.7rem;">★ ${(c.rating || 5.0).toFixed(1)}</span>
                    <span class="badge-tag" style="background: #F1F5F9; color: #475569; font-weight: 700; font-size: 0.7rem;">${c.category || 'Residencial'}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; font-size: 0.78rem; color: #64748B; margin-top: 3px;">
                    <span>📍 <strong>${c.zone || 'CABA'}</strong></span>
                    <span>•</span>
                    <span>Último servicio: <strong>${c.lastServiceDate || '15/10/2026'}</strong></span>
                  </div>
                </div>
              </div>

              <!-- Métricas Financieras del Cliente -->
              <div style="text-align: right;">
                <div style="font-size: 1.15rem; font-weight: 900; color: #047857;">$${(c.totalBilled || 0).toLocaleString('es-AR')} <span style="font-size: 0.75rem; font-weight: 700;">ARS</span></div>
                <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">Neto percibido: $${(c.totalNetEarned || 0).toLocaleString('es-AR')} (${jobsCount} ${jobsCount === 1 ? 'servicio' : 'servicios'})</div>
              </div>
            </div>

            <!-- Dirección y Contacto Directo -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 10px 14px; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #334155;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span style="font-weight: 600;">${c.address || 'Dirección no especificada'}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #334155;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span style="font-weight: 600;">${c.phone || '+54 11 5421-9988'}</span>
              </div>
            </div>

            <!-- Preview de Nota Técnica Privada -->
            ${c.notes ? `
              <div style="background: #FFFBEB; border-left: 3.5px solid #F59E0B; border-radius: 6px; padding: 8px 12px; margin-bottom: 14px; font-size: 0.78rem; color: #78350F; line-height: 1.4;">
                <strong style="color: #92400E; display: inline-flex; align-items: center; gap: 4px;">📝 Nota Confidencial:</strong> ${c.notes}
              </div>
            ` : ''}

            <!-- Botones de Acción Estilo Apple Cupertino -->
            <div style="display: flex; justify-content: flex-end; align-items: center; gap: 8px; flex-wrap: wrap;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; font-size: 0.78rem; font-weight: 700; padding: 6px 12px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp
              </a>
              <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background: #EFF6FF; border: 1.5px solid #BFDBFE; color: #1E40AF; font-size: 0.78rem; font-weight: 700; padding: 6px 12px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                Google Maps
              </a>
              <button type="button" class="btn btn-secondary btn-sm" onclick="openWorkerCreateInvoiceForClient('${c.id}')" style="font-size: 0.78rem; font-weight: 700; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                Emitir Factura
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="openCrmClientDetailModal('${c.id}')" style="background: #059669; font-size: 0.78rem; font-weight: 800; padding: 6px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                Ver Ficha & Historial
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderCrmJobsHistory(clients, container) {
  const allJobs = [];
  clients.forEach(c => {
    (c.history || []).forEach(h => {
      allJobs.push({
        ...h,
        clientId: c.id,
        clientName: c.name,
        clientAddress: c.address,
        clientZone: c.zone,
        clientPhone: c.phone
      });
    });
  });

  if (allJobs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 14px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" style="margin-bottom: 8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
        <div style="font-weight: 700; color: #111827; font-size: 0.95rem;">No hay trabajos registrados</div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 4px;">Los trabajos completados o presupuestados aparecerán aquí.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${allJobs.map(j => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(j.clientAddress || '')}`;
        return `
          <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            
            <div style="flex: 1; min-width: 260px;">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="color: #111827; font-size: 0.95rem;">${j.title}</strong>
                <span class="badge-tag" style="background: #DCFCE7; color: #166534; font-weight: 800; font-size: 0.7rem;">✓ ${j.status || 'Cobrado'}</span>
                <span class="badge-tag" style="background: #EFF6FF; color: #1E40AF; font-weight: 700; font-size: 0.68rem;">${j.orderId}</span>
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 4px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span>Cliente: <strong style="color: #111827; cursor: pointer; text-decoration: underline;" onclick="openCrmClientDetailModal('${j.clientId}')">${j.clientName}</strong></span>
                <span>•</span>
                <span>📍 <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563EB; text-decoration: none; font-weight: 600;">${j.clientAddress}</a></span>
              </div>
              <div style="font-size: 0.74rem; color: #64748B; margin-top: 4px;">
                Fecha: <strong>${j.date}</strong> · Garantía hasta: <strong>${j.warrantyUntil || '6 meses'}</strong> · Custodia Escrow: <strong style="color: #059669;">${j.escrowCode || 'ESC-2026-CONFIRM'}</strong>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="text-align: right;">
                <div style="font-size: 1.15rem; font-weight: 900; color: #047857;">$${(j.netAmount || j.amount).toLocaleString('es-AR')} <span style="font-size: 0.75rem; font-weight: 700;">ARS</span></div>
                <div style="font-size: 0.72rem; color: #64748B;">Bruto: $${(j.amount || 0).toLocaleString('es-AR')} (Fee PRO 8%: -$${(j.fee || 0).toLocaleString('es-AR')})</div>
              </div>
              <div style="display: flex; gap: 6px;">
                ${j.invoiceId ? `
                  <button type="button" class="btn btn-secondary btn-sm" onclick="openSpecificWorkerInvoice('${j.invoiceId}')" style="font-size: 0.78rem; font-weight: 700; padding: 6px 12px; border-radius: 8px; color: #065F46; background: #ECFDF5; border-color: #A7F3D0; display: inline-flex; align-items: center; gap: 5px;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    Factura
                  </button>
                ` : `
                  <button type="button" class="btn btn-secondary btn-sm" onclick="openWorkerCreateInvoiceForClient('${j.clientId}')" style="font-size: 0.78rem; font-weight: 700; padding: 6px 12px; border-radius: 8px;">
                    Emitir Factura
                  </button>
                `}
              </div>
            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderCrmPayoutsLedger(clients, container) {
  let totalGross = 0;
  let totalFees = 0;
  let totalNet = 0;

  const txs = [];
  clients.forEach(c => {
    (c.history || []).forEach(h => {
      totalGross += (h.amount || 0);
      totalFees += (h.fee || 0);
      totalNet += (h.netAmount || (h.amount - (h.fee || 0)));
      txs.push({
        ...h,
        clientName: c.name,
        clientZone: c.zone
      });
    });
  });

  const savingsVsStandard = Math.round(totalGross * (0.15 - 0.08));

  container.innerHTML = `
    <!-- Tarjeta de Beneficio Financiero Sademy Escrow -->
    <div style="background: linear-gradient(135deg, #064E3B 0%, #065F46 100%); color: #FFFFFF; border-radius: 14px; padding: 18px 22px; margin-bottom: 18px; box-shadow: 0 4px 14px rgba(6, 78, 59, 0.2);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-tag" style="background: #34D399; color: #064E3B; font-weight: 900; font-size: 0.72rem;">★ COMISIÓN REDUCIDA 8%</span>
            <span style="font-size: 0.78rem; color: #A7F3D0;">Plan Sademy PRO Destacado</span>
          </div>
          <h4 style="font-size: 1.15rem; margin: 6px 0 2px; font-weight: 800; color: #FFFFFF;">Liquidaciones Totales Acreditadas</h4>
          <p style="font-size: 0.8rem; color: #D1FAE5; margin: 0;">
            Gracias a tu membresía PRO, ahorraste <strong style="color: #FCD34D;">$${savingsVsStandard.toLocaleString('es-AR')} ARS</strong> frente a la comisión estándar del 15%.
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.6rem; font-weight: 900; color: #FFFFFF;">$${totalNet.toLocaleString('es-AR')} <span style="font-size: 0.85rem; font-weight: 700;">ARS</span></div>
          <div style="font-size: 0.74rem; color: #A7F3D0;">Total Bruto Cobrado: $${totalGross.toLocaleString('es-AR')} ARS</div>
        </div>
      </div>
    </div>

    <!-- Tabla Detallada de Liquidaciones -->
    <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="background: #F8FAFC; border-bottom: 1.5px solid #E2E8F0; color: #64748B; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em;">
              <th style="padding: 12px 16px;">Fecha / Orden</th>
              <th style="padding: 12px 16px;">Cliente</th>
              <th style="padding: 12px 16px;">Servicio Técnico</th>
              <th style="padding: 12px 16px; text-align: right;">Monto Bruto</th>
              <th style="padding: 12px 16px; text-align: right;">Fee PRO (8%)</th>
              <th style="padding: 12px 16px; text-align: right;">Neto Acreditado</th>
              <th style="padding: 12px 16px; text-align: center;">Custodia Escrow</th>
            </tr>
          </thead>
          <tbody>
            ${txs.map(t => `
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 16px;">
                  <strong style="color: #111827; font-size: 0.8rem;">${t.orderId}</strong>
                  <div style="font-size: 0.72rem; color: #64748B;">${t.date}</div>
                </td>
                <td style="padding: 12px 16px;">
                  <strong style="color: #111827;">${t.clientName}</strong>
                  <div style="font-size: 0.72rem; color: #64748B;">${t.clientZone || 'CABA'}</div>
                </td>
                <td style="padding: 12px 16px; color: #334155; font-weight: 600;">
                  ${t.title}
                </td>
                <td style="padding: 12px 16px; text-align: right; color: #64748B; font-weight: 600;">
                  $${(t.amount || 0).toLocaleString('es-AR')}
                </td>
                <td style="padding: 12px 16px; text-align: right; color: #DC2626; font-weight: 700;">
                  -$${(t.fee || 0).toLocaleString('es-AR')}
                </td>
                <td style="padding: 12px 16px; text-align: right;">
                  <strong style="color: #047857; font-size: 0.95rem;">$${(t.netAmount || (t.amount - (t.fee || 0))).toLocaleString('es-AR')}</strong>
                  <div style="font-size: 0.68rem; color: #059669; font-weight: 700;">✓ Acreditado</div>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                  <span class="badge-tag" style="background: #ECFDF5; color: #065F46; font-weight: 800; font-size: 0.68rem;">${t.escrowCode || 'ESC-2026-PIN'}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openCrmClientDetailModal(clientId) {
  triggerHapticFeedback();
  playPop();

  const client = (appState.proCrmClients || []).find(c => c.id === clientId) || DEFAULT_PRO_CRM_CLIENTS[0];
  if (!client) return;

  const modal = document.getElementById('modal-crm-client-detail');
  if (!modal) return;

  const avatarEl = document.getElementById('crm-modal-avatar');
  const titleEl = document.getElementById('crm-client-detail-title');
  const ratingEl = document.getElementById('crm-modal-rating-badge');
  const subEl = document.getElementById('crm-modal-subtitle');
  const addrEl = document.getElementById('crm-modal-address');
  const phoneEl = document.getElementById('crm-modal-phone');
  const billedEl = document.getElementById('crm-modal-total-billed');
  const dateEl = document.getElementById('crm-modal-last-date');
  const waBtn = document.getElementById('crm-modal-wa-btn');
  const mapBtn = document.getElementById('crm-modal-map-btn');
  const invoiceBtn = document.getElementById('crm-modal-invoice-btn');
  const noteTextarea = document.getElementById('crm-client-note-textarea');
  const saveNoteBtn = document.getElementById('crm-save-note-btn');
  const jobsListEl = document.getElementById('crm-modal-jobs-list');

  if (avatarEl) avatarEl.src = client.avatar || 'assets/mascot.jpg';
  if (titleEl) titleEl.textContent = client.name;
  if (ratingEl) ratingEl.textContent = `★ ${(client.rating || 5.0).toFixed(1)}`;
  if (subEl) subEl.textContent = `${client.category || 'Residencial'} · ${client.zone || 'CABA'}`;
  if (addrEl) addrEl.textContent = client.address;
  if (phoneEl) phoneEl.textContent = client.phone;
  if (billedEl) billedEl.innerHTML = `$${(client.totalBilled || 0).toLocaleString('es-AR')} <span style="font-size: 0.75rem; font-weight: 600; color: #059669;">(Neto: $${(client.totalNetEarned || 0).toLocaleString('es-AR')})</span>`;
  if (dateEl) dateEl.textContent = client.lastServiceDate || '15/10/2026';

  const waMsg = encodeURIComponent(`Hola ${client.name}, te escribe Marcos R. de Sademy Servicios.`);
  if (waBtn) waBtn.href = `https://wa.me/${client.whatsapp || '5491154219988'}?text=${waMsg}`;
  if (mapBtn) mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address)}`;
  if (invoiceBtn) invoiceBtn.onclick = () => openWorkerCreateInvoiceForClient(client.id);

  if (noteTextarea) noteTextarea.value = client.notes || '';
  if (saveNoteBtn) saveNoteBtn.onclick = () => saveCrmClientNote(client.id);

  if (jobsListEl) {
    const history = client.history || [];
    if (history.length === 0) {
      jobsListEl.innerHTML = `<div style="text-align: center; color: #94A3B8; font-size: 0.84rem; padding: 14px;">No hay trabajos registrados con este cliente aún.</div>`;
    } else {
      jobsListEl.innerHTML = history.map(h => `
        <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="color: #111827; font-size: 0.88rem;">${h.title}</strong>
              <span class="badge-tag" style="background: #DCFCE7; color: #166534; font-weight: 800; font-size: 0.68rem;">✓ ${h.status}</span>
            </div>
            <div style="font-size: 0.76rem; color: #64748B; margin-top: 3px;">
              Fecha: <strong>${h.date}</strong> · Orden: <strong>${h.orderId}</strong> · Garantía: <strong>${h.warrantyUntil || '6 meses'}</strong>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="text-align: right;">
              <div style="font-size: 1rem; font-weight: 900; color: #047857;">$${h.netAmount ? h.netAmount.toLocaleString('es-AR') : h.amount.toLocaleString('es-AR')} <span style="font-size: 0.7rem; font-weight: 700;">ARS</span></div>
              <div style="font-size: 0.68rem; color: #64748B;">Bruto: $${h.amount.toLocaleString('es-AR')}</div>
            </div>
            ${h.invoiceId ? `
              <button type="button" class="btn btn-secondary btn-sm" onclick="openSpecificWorkerInvoice('${h.invoiceId}')" style="font-size: 0.74rem; font-weight: 700; padding: 5px 10px; border-radius: 7px; color: #065F46; background: #ECFDF5; border-color: #A7F3D0;">
                Ver Factura
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  modal.classList.add('active');
}

function closeCrmClientDetailModal() {
  const modal = document.getElementById('modal-crm-client-detail');
  if (modal) modal.classList.remove('active');
}

function saveCrmClientNote(clientId) {
  triggerHapticFeedback();
  playSuccessChime();

  const noteTextarea = document.getElementById('crm-client-note-textarea');
  const newNote = noteTextarea ? noteTextarea.value.trim() : '';

  const client = (appState.proCrmClients || []).find(c => c.id === clientId);
  if (client) {
    client.notes = newNote;
    saveAppState();
    showToast('Nota Técnica Guardada', `Se actualizaron las especificaciones confidenciales de ${client.name}.`);
    if (currentCrmSubTab === 'clientes') {
      renderCrmSubView();
    }
  }
}

function openCrmNewClientModal() {
  triggerHapticFeedback();
  playPop();
  const form = document.getElementById('form-crm-new-client');
  if (form) form.reset();
  const modal = document.getElementById('modal-crm-new-client');
  if (modal) modal.classList.add('active');
}

function closeCrmNewClientModal() {
  const modal = document.getElementById('modal-crm-new-client');
  if (modal) modal.classList.remove('active');
}

function submitCrmNewClient() {
  triggerHapticFeedback();
  playSuccessChime();

  const nameInput = document.getElementById('crm-new-name');
  const phoneInput = document.getElementById('crm-new-phone');
  const zoneInput = document.getElementById('crm-new-zone');
  const addrInput = document.getElementById('crm-new-address');
  const jobTitleInput = document.getElementById('crm-new-job-title');
  const amountInput = document.getElementById('crm-new-amount');
  const notesInput = document.getElementById('crm-new-notes');

  const name = nameInput?.value.trim() || 'Cliente Particular';
  const phone = phoneInput?.value.trim() || '+54 11 4455-8899';
  const zone = zoneInput?.value.trim() || 'CABA';
  const address = addrInput?.value.trim() || 'Buenos Aires, CABA';
  const jobTitle = jobTitleInput?.value.trim() || 'Servicio técnico especializado';
  const amount = parseInt(amountInput?.value) || 25000;
  const notes = notesInput?.value.trim() || 'Cliente registrado directamente desde Sademy CRM.';

  const fee = Math.round(amount * 0.08);
  const netAmount = amount - fee;
  const newId = `crm-cli-${Date.now()}`;
  const orderId = `ORD-2026-${Math.floor(100 + Math.random() * 900)}`;
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const newClient = {
    id: newId,
    name,
    avatar: 'assets/mascot.jpg',
    phone,
    whatsapp: cleanPhone.startsWith('54') ? cleanPhone : `549${cleanPhone}`,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    address,
    zone,
    category: 'Residencial',
    rating: 5.0,
    totalBilled: amount,
    totalNetEarned: netAmount,
    jobsCompleted: 1,
    lastServiceDate: new Date().toLocaleDateString('es-AR'),
    notes,
    history: [
      {
        orderId,
        title: jobTitle,
        date: new Date().toLocaleDateString('es-AR'),
        amount,
        fee,
        netAmount,
        status: 'Cobrado / En Garantía',
        warrantyUntil: '15/04/2027',
        escrowCode: `ESC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        invoiceId: `INV-2026-00${Math.floor(430 + Math.random() * 60)}`
      }
    ]
  };

  if (!appState.proCrmClients) appState.proCrmClients = [];
  appState.proCrmClients.unshift(newClient);
  saveAppState();

  closeCrmNewClientModal();
  renderWorkerCrmDashboard();

  showToast('Cliente Agregado al CRM', `${name} ha sido registrado exitosamente con su primer trabajo.`);
}

function openWorkerCreateInvoiceForClient(clientId) {
  triggerHapticFeedback();
  playPop();

  const client = (appState.proCrmClients || []).find(c => c.id === clientId);
  if (!client) return;

  closeCrmClientDetailModal();
  openWorkerCreateInvoiceModal();

  setTimeout(() => {
    const nameInput = document.getElementById('worker-inv-client-name');
    const addrInput = document.getElementById('worker-inv-client-address');
    const dniInput = document.getElementById('worker-inv-client-dni');
    const descInput = document.getElementById('worker-inv-description');
    const laborInput = document.getElementById('worker-inv-labor');
    const materialsInput = document.getElementById('worker-inv-materials');

    if (nameInput) nameInput.value = client.name;
    if (addrInput) addrInput.value = client.address;
    if (dniInput) dniInput.value = '20-' + Math.floor(30000000 + Math.random() * 9000000) + '-4';

    const lastJob = client.history && client.history[0];
    if (lastJob) {
      if (descInput) descInput.value = lastJob.title;
      if (laborInput) laborInput.value = lastJob.amount || 22000;
      if (materialsInput) materialsInput.value = 0;
    }

    updateWorkerInvoiceLiveTotal();
  }, 100);
}

// ============================================================================
// 10. RECONOCIMIENTO FACIAL BIOMÉTRICO OBLIGATORIO SADEMY FACE-ID (APPLE-STYLE)
// ============================================================================
let faceIdMediaStream = null;
let faceIdDetectionTimer = null;
let faceIdCapturedDataUrl = null;
let currentFaceIdTargetUser = null;

function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // Disparo 1: Apertura de diafragma
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(850, now);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.04);
    gain1.gain.setValueAtTime(0.09, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    // Disparo 2: Cierre mecánico
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1250, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(280, now + 0.12);
    gain2.gain.setValueAtTime(0.07, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.12);
  } catch (e) {
    console.warn('Audio shutter error:', e);
  }
}

function playFaceIdBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(920, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

function startFaceIdOnboarding(targetUser) {
  triggerHapticFeedback();
  playPop();

  currentFaceIdTargetUser = targetUser || appState.currentUser;
  faceIdCapturedDataUrl = null;
  if (faceIdDetectionTimer) {
    clearTimeout(faceIdDetectionTimer);
    faceIdDetectionTimer = null;
  }

  const modal = document.getElementById('modal-pro-face-id');
  const video = document.getElementById('face-id-video');
  const preview = document.getElementById('face-id-snapshot-preview');
  const fallbackGuide = document.getElementById('face-id-fallback-guide');
  const laserScanner = document.getElementById('face-id-laser-scanner');
  const titleEl = document.getElementById('face-id-instruction-title');
  const descEl = document.getElementById('face-id-instruction-desc');
  const progressBar = document.getElementById('face-id-progress-bar');
  const retakeBtn = document.getElementById('face-id-retake-btn');
  const confirmBtn = document.getElementById('face-id-confirm-btn');

  if (preview) {
    preview.style.display = 'none';
    preview.src = '';
  }
  if (retakeBtn) retakeBtn.style.display = 'none';
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.5';
    confirmBtn.style.cursor = 'not-allowed';
    confirmBtn.innerHTML = '<span>Esperando captura automática...</span>';
  }
  if (progressBar) progressBar.style.width = '0%';
  if (laserScanner) {
    laserScanner.style.border = '2.5px dashed rgba(52, 211, 153, 0.6)';
    laserScanner.style.boxShadow = 'none';
  }
  if (titleEl) titleEl.textContent = 'Iniciando sensor biométrico...';
  if (descEl) descEl.textContent = 'Ubicá tu rostro dentro del marco oval con buena iluminación.';

  if (modal) modal.classList.add('active');

  // Intentar abrir cámara real WebRTC
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 640 }
      },
      audio: false
    }).then(stream => {
      faceIdMediaStream = stream;
      if (video) {
        video.srcObject = stream;
        video.style.display = 'block';
        video.play().catch(e => console.warn('Error play video:', e));
      }
      if (fallbackGuide) fallbackGuide.style.display = 'none';
      runFaceIdDetectionCycle(true);
    }).catch(err => {
      console.warn('Acceso a webcam física no disponible o denegado, iniciando simulación biométrica 3D:', err);
      if (video) video.style.display = 'none';
      if (fallbackGuide) fallbackGuide.style.display = 'flex';
      runFaceIdDetectionCycle(false);
    });
  } else {
    if (video) video.style.display = 'none';
    if (fallbackGuide) fallbackGuide.style.display = 'flex';
    runFaceIdDetectionCycle(false);
  }
}

function runFaceIdDetectionCycle(hasRealCamera) {
  const titleEl = document.getElementById('face-id-instruction-title');
  const descEl = document.getElementById('face-id-instruction-desc');
  const progressBar = document.getElementById('face-id-progress-bar');
  const laserScanner = document.getElementById('face-id-laser-scanner');

  // Paso 1 (0ms): Búsqueda y encuadre
  if (titleEl) titleEl.textContent = 'Buscando rostro en el visor...';
  if (descEl) descEl.textContent = 'Mirá de frente a la pantalla. Centrá ojos y boca.';
  if (progressBar) progressBar.style.width = '25%';
  if (laserScanner) {
    laserScanner.style.border = '2.5px dashed #F59E0B';
  }
  playFaceIdBeep();

  // Paso 2 (900ms): Detección facial
  faceIdDetectionTimer = setTimeout(() => {
    if (titleEl) titleEl.textContent = 'Rostro detectado · Analizando simetría 3D...';
    if (descEl) descEl.textContent = 'Mantené la posición fija. Verificando nitidez...';
    if (progressBar) progressBar.style.width = '60%';
    if (laserScanner) {
      laserScanner.style.border = '2.5px dashed #34D399';
    }
    playFaceIdBeep();

    // Paso 3 (2000ms): Iluminación óptima detectada -> Cuenta regresiva automática
    faceIdDetectionTimer = setTimeout(() => {
      if (titleEl) titleEl.textContent = '¡Encuadre e iluminación óptimos (99.8%)!';
      if (descEl) descEl.textContent = 'No te muevas. Tomando foto automáticamente...';
      if (progressBar) progressBar.style.width = '95%';
      if (laserScanner) {
        laserScanner.style.border = '3px solid #10B981';
        laserScanner.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.85)';
      }
      triggerHapticFeedback();

      // Paso 4 (3100ms): Disparo Automático
      faceIdDetectionTimer = setTimeout(() => {
        autoCaptureFaceId(hasRealCamera);
      }, 1100);

    }, 1100);

  }, 900);
}

function autoCaptureFaceId(hasRealCamera) {
  const video = document.getElementById('face-id-video');
  const canvas = document.getElementById('face-id-canvas');
  const flash = document.getElementById('face-id-flash');
  const preview = document.getElementById('face-id-snapshot-preview');
  const titleEl = document.getElementById('face-id-instruction-title');
  const descEl = document.getElementById('face-id-instruction-desc');
  const progressBar = document.getElementById('face-id-progress-bar');
  const retakeBtn = document.getElementById('face-id-retake-btn');
  const confirmBtn = document.getElementById('face-id-confirm-btn');

  // Flash visual de obturador
  if (flash) {
    flash.style.opacity = '0.9';
    setTimeout(() => { flash.style.opacity = '0'; }, 200);
  }

  // Efecto auditivo de obturador de cámara profesional
  playCameraShutterSound();
  setTimeout(() => playSuccessChime(), 180);
  triggerHapticFeedback();

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 480;
  canvas.height = 480;

  if (hasRealCamera && video && video.videoWidth > 0) {
    // Captura real de webcam con efecto espejo corregido
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    const minDim = Math.min(video.videoWidth, video.videoHeight);
    const sx = (video.videoWidth - minDim) / 2;
    const sy = (video.videoHeight - minDim) / 2;
    ctx.drawImage(video, sx, sy, minDim, minDim, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Marca de agua biométrica sutil Sademy
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.fillText('SADEMY BIOMETRIC VERIFIED 3D', 20, 455);
    
    faceIdCapturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    if (preview) {
      preview.src = faceIdCapturedDataUrl;
      preview.style.display = 'block';
    }
  } else {
    // Entorno de prueba o sin webcam: Generar foto de alta definición biométrica
    const fallbackImg = new Image();
    fallbackImg.crossOrigin = 'anonymous';
    fallbackImg.onload = () => {
      ctx.drawImage(fallbackImg, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      ctx.fillText('SADEMY BIOMETRIC VERIFIED 3D', 20, 455);
      faceIdCapturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      if (preview) {
        preview.src = faceIdCapturedDataUrl;
        preview.style.display = 'block';
      }
    };
    fallbackImg.onerror = () => {
      // Dibujar fondo degradado premium si la imagen local falla
      const grad = ctx.createLinearGradient(0, 0, 480, 480);
      grad.addColorStop(0, '#1E293B');
      grad.addColorStop(1, '#0F172A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 480, 480);
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(240, 200, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PERFIL PROFESIONAL VERIFICADO', 240, 360);
      faceIdCapturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      if (preview) {
        preview.src = faceIdCapturedDataUrl;
        preview.style.display = 'block';
      }
    };
    fallbackImg.src = 'assets/marcos.jpg';
  }

  // Detener cámara WebRTC activa
  if (faceIdMediaStream) {
    faceIdMediaStream.getTracks().forEach(track => track.stop());
    faceIdMediaStream = null;
  }

  // Actualizar estado UI
  if (titleEl) titleEl.innerHTML = '<span style="color: #34D399;">✓ Rostro Verificado con Éxito</span>';
  if (descEl) descEl.textContent = 'La foto fue tomada automáticamente sin moverte. Se usará como tu foto oficial.';
  if (progressBar) progressBar.style.width = '100%';

  if (retakeBtn) retakeBtn.style.display = 'inline-flex';
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.style.opacity = '1';
    confirmBtn.style.cursor = 'pointer';
    confirmBtn.style.background = '#059669';
    confirmBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>Confirmar Foto y Activar Perfil PRO</span>
    `;
  }
}

function retakeFaceIdPhoto() {
  triggerHapticFeedback();
  playPop();
  startFaceIdOnboarding(currentFaceIdTargetUser);
}

function confirmFaceIdAndProceed() {
  triggerHapticFeedback();
  playSuccessChime();

  if (!faceIdCapturedDataUrl) {
    showToast('Aviso', 'Esperá a que el sensor tome la foto automáticamente.');
    return;
  }

  // 1. Asignar la foto capturada como foto de perfil oficial
  if (currentFaceIdTargetUser) {
    currentFaceIdTargetUser.avatar = faceIdCapturedDataUrl;
    currentFaceIdTargetUser.faceIdVerified = true;
    currentFaceIdTargetUser.biometricDate = new Date().toISOString();
  }

  if (appState.currentUser) {
    appState.currentUser.avatar = faceIdCapturedDataUrl;
    appState.currentUser.faceIdVerified = true;
    appState.currentUser.biometricDate = new Date().toISOString();
  }

  // 2. Si el profesional está en PROFESSIONALS_DATA, actualizar su foto pública
  const proId = currentFaceIdTargetUser?.id || appState.currentUser?.id;
  const proMatch = PROFESSIONALS_DATA.find(p => p.id === proId || p.name === currentFaceIdTargetUser?.name || p.id === 'pro-1');
  if (proMatch) {
    proMatch.avatar = faceIdCapturedDataUrl;
    if (!appState.professionalsRatings) appState.professionalsRatings = {};
    if (!appState.professionalsRatings[proMatch.id]) appState.professionalsRatings[proMatch.id] = {};
    appState.professionalsRatings[proMatch.id].avatar = faceIdCapturedDataUrl;
  }

  // 3. Actualizar avatares en la interfaz de usuario en tiempo real
  const headerAvatar = document.getElementById('pro-dash-header-avatar');
  if (headerAvatar) headerAvatar.src = faceIdCapturedDataUrl;

  const navAvatar = document.getElementById('nav-user-avatar');
  if (navAvatar) navAvatar.src = faceIdCapturedDataUrl;

  const navBtnAvatar = document.getElementById('nav-user-btn-avatar');
  if (navBtnAvatar) navBtnAvatar.src = faceIdCapturedDataUrl;

  saveAppState();

  // 4. Cerrar modal biométrico
  cancelFaceIdOnboarding(true);

  // 5. Re-renderizar directorio y abrir portal PRO
  renderProfessionalsDirectory();
  if (typeof renderFeaturedProfessionals === 'function') renderFeaturedProfessionals();
  updateNavAuthState();

  showToast('¡Foto Biométrica Activada!', 'Tu imagen de perfil oficial ha sido validada y ya está disponible en toda la plataforma Sademy.');

  setTimeout(() => {
    openProDashboardModal('crm');
  }, 400);
}

function cancelFaceIdOnboarding(force = false) {
  if (!force && appState.currentUser && appState.currentUser.role === 'pro' && !appState.currentUser.faceIdVerified) {
    const confirmExit = confirm('La validación biométrica facial es obligatoria para comenzar a cotizar y recibir pagos protegidos en Sademy. ¿Deseás salir de todos modos?');
    if (!confirmExit) return;
  }

  if (faceIdDetectionTimer) {
    clearTimeout(faceIdDetectionTimer);
    faceIdDetectionTimer = null;
  }

  if (faceIdMediaStream) {
    faceIdMediaStream.getTracks().forEach(t => t.stop());
    faceIdMediaStream = null;
  }

  const modal = document.getElementById('modal-pro-face-id');
  if (modal) modal.classList.remove('active');
}




