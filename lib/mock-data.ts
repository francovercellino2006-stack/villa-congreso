export const mockUser = {
  id: "1",
  name: "Martín Rodríguez",
  email: "martin@gmail.com",
  avatarUrl: null,
  socioNumber: "2847",
  category: "Socio Activo",
  sports: ["Fútbol", "Básquet"],
  comunidades: ["futbol", "basquet"], // comunidades a las que pertenece
  joinedAt: "2018-03-15",
};

export type ComunidadId = "futbol" | "basquet" | "hockey" | "patin" | "gimnasia";

export const mockComunidades: {
  id: ComunidadId;
  nombre: string;
  emoji: string;
  color: string;
  colorBg: string;
  colorText: string;
  gradient: string;
  miembros: number;
  profes: string[];
  descripcion: string;
}[] = [
  {
    id: "futbol",
    nombre: "Fútbol",
    emoji: "⚽",
    color: "#15803D",
    colorBg: "bg-[#15803D]/10",
    colorText: "text-[#15803D]",
    gradient: "from-[#15803D] to-[#22C55E]",
    miembros: 87,
    profes: ["Diego Paredes", "Carlos Medina", "Lucas Ferreyra"],
    descripcion: "Novedades de todas las categorías de fútbol del club",
  },
  {
    id: "basquet",
    nombre: "Básquet",
    emoji: "🏀",
    color: "#1d4ed8",
    colorBg: "bg-[#1d4ed8]/10",
    colorText: "text-[#1d4ed8]",
    gradient: "from-[#1d4ed8] to-[#3b82f6]",
    miembros: 34,
    profes: ["Alejandro Ruiz"],
    descripcion: "Novedades del básquet infantil y juvenil",
  },
  {
    id: "hockey",
    nombre: "Hockey",
    emoji: "🏑",
    color: "#0d9488",
    colorBg: "bg-[#0d9488]/10",
    colorText: "text-[#0d9488]",
    gradient: "from-[#0d9488] to-[#14b8a6]",
    miembros: 28,
    profes: ["Valentina Sosa"],
    descripcion: "Novedades del hockey sobre césped",
  },
  {
    id: "patin",
    nombre: "Patín",
    emoji: "⛸️",
    color: "#7c3aed",
    colorBg: "bg-[#7c3aed]/10",
    colorText: "text-[#7c3aed]",
    gradient: "from-[#7c3aed] to-[#a78bfa]",
    miembros: 19,
    profes: ["Sofía Carrizo"],
    descripcion: "Novedades de patín artístico",
  },
  {
    id: "gimnasia",
    nombre: "Gimnasia",
    emoji: "🤸",
    color: "#059669",
    colorBg: "bg-[#059669]/10",
    colorText: "text-[#059669]",
    gradient: "from-[#059669] to-[#34d399]",
    miembros: 41,
    profes: ["Marina Torres"],
    descripcion: "Novedades de gimnasia para todas las edades",
  },
];

export const mockNoticias = [
  {
    id: "1",
    title: "Gran victoria del equipo de fútbol mayor",
    excerpt: "El plantel de primera división logró una importante victoria de 3-1 ante Deportivo Norte en el torneo regional.",
    content: "...",
    image: null,
    category: "Fútbol",
    date: "2026-06-10",
    pinned: true,
  },
  {
    id: "2",
    title: "Cuotas junio disponibles",
    excerpt: "Ya están disponibles las cuotas de junio. El vencimiento es el día 15. Recordamos que pueden abonar online.",
    content: "...",
    image: null,
    category: "Cuotas",
    date: "2026-06-08",
    pinned: false,
  },
  {
    id: "3",
    title: "Torneo de básquet infantil este sábado",
    excerpt: "El sábado 14 de junio se realizará el torneo interno de básquet categorías sub-12 y sub-14 en el gimnasio del club.",
    content: "...",
    image: null,
    category: "Básquet",
    date: "2026-06-07",
    pinned: false,
  },
  {
    id: "4",
    title: "Renovación del campo de hockey",
    excerpt: "Se inician las obras de renovación del campo de hockey. Durante el período de obra los entrenamientos se realizarán en el campo auxiliar.",
    content: "...",
    image: null,
    category: "Hockey",
    date: "2026-06-05",
    pinned: false,
  },
  {
    id: "5",
    title: "Asamblea anual de socios",
    excerpt: "Se convoca a todos los socios a la asamblea anual ordinaria que tendrá lugar el próximo 20 de junio a las 19:00 hs.",
    content: "...",
    image: null,
    category: "Institucional",
    date: "2026-06-03",
    pinned: false,
  },
];

export const mockEventos = [
  {
    id: "1",
    title: "Torneo de Fútbol Infantil",
    date: "2026-06-14",
    time: "09:00",
    location: "Cancha Principal",
    description: "Torneo interno de fútbol categorías sub-10 y sub-12",
    category: "Fútbol",
    cupos: 40,
    inscriptos: 35,
    confirmed: false,
  },
  {
    id: "2",
    title: "Cena Anual del Club",
    date: "2026-06-20",
    time: "21:00",
    location: "Salón Social",
    description: "Cena de fin de temporada con premios y reconocimientos",
    category: "Eventos",
    cupos: 200,
    inscriptos: 148,
    confirmed: true,
  },
  {
    id: "3",
    title: "Asamblea Anual de Socios",
    date: "2026-06-20",
    time: "19:00",
    location: "Sala de Reuniones",
    description: "Asamblea anual ordinaria de socios",
    category: "Institucional",
    cupos: null,
    inscriptos: null,
    confirmed: false,
  },
  {
    id: "4",
    title: "Torneo de Básquet Sub-14",
    date: "2026-06-28",
    time: "10:00",
    location: "Gimnasio",
    description: "Torneo interclubs categoría sub-14",
    category: "Básquet",
    cupos: 60,
    inscriptos: 22,
    confirmed: false,
  },
];

type CuotaItem =
  | { id: string; mes: string; monto: number; estado: "pendiente"; vencimiento: string; deporte?: string }
  | { id: string; mes: string; monto: number; estado: "pagado"; fechaPago: string; comprobante: string; deporte?: string }
  | { id: string; mes: string; monto: number; estado: "vencida"; deporte?: string };

export const mockCuotas: {
  status: "al-dia" | "por-vencer" | "deuda";
  balance: number;
  proxVencimiento: string;
  historial: CuotaItem[];
} = {
  status: "al-dia",
  balance: 0,
  proxVencimiento: "2026-07-15",
  historial: [
    { id: "1", mes: "Junio 2026",    monto: 8500, estado: "pendiente", vencimiento: "2026-06-15", deporte: "Fútbol"  },
    { id: "2", mes: "Mayo 2026",     monto: 8500, estado: "pagado", fechaPago: "2026-05-12", comprobante: "REC-0485", deporte: "Fútbol"  },
    { id: "3", mes: "Abril 2026",    monto: 8000, estado: "pagado", fechaPago: "2026-04-09", comprobante: "REC-0421", deporte: "Básquet" },
    { id: "4", mes: "Marzo 2026",    monto: 8000, estado: "pagado", fechaPago: "2026-03-11", comprobante: "REC-0378", deporte: "Fútbol"  },
    { id: "5", mes: "Febrero 2026",  monto: 7500, estado: "pagado", fechaPago: "2026-02-14", comprobante: "REC-0320", deporte: "Básquet" },
    { id: "6", mes: "Enero 2026",    monto: 7500, estado: "pagado", fechaPago: "2026-01-10", comprobante: "REC-0265", deporte: "Fútbol"  },
  ],
};

export const mockHorarios = [
  { id: "1", deporte: "Fútbol", categoria: "Infantil (Sub-10)", profesor: "Carlos Medina", dias: ["Martes", "Jueves"], horario: "16:00 - 17:30", lugar: "Cancha de fútbol 1" },
  { id: "2", deporte: "Fútbol", categoria: "Pre-infante (Sub-8)", profesor: "Lucas Ferreyra", dias: ["Lunes", "Miércoles"], horario: "15:30 - 17:00", lugar: "Cancha de fútbol 2" },
  { id: "3", deporte: "Fútbol", categoria: "Juvenil (Sub-17)", profesor: "Diego Paredes", dias: ["Lunes", "Miércoles", "Viernes"], horario: "18:00 - 19:30", lugar: "Cancha de fútbol 1" },
  { id: "4", deporte: "Fútbol", categoria: "Primera División", profesor: "Diego Paredes", dias: ["Martes", "Jueves", "Sábado"], horario: "19:30 - 21:00", lugar: "Cancha de fútbol 1" },
  { id: "5", deporte: "Básquet", categoria: "Infantil (Sub-12)", profesor: "Alejandro Ruiz", dias: ["Lunes", "Miércoles"], horario: "16:00 - 17:30", lugar: "Gimnasio" },
  { id: "6", deporte: "Básquet", categoria: "Juvenil (Sub-16)", profesor: "Alejandro Ruiz", dias: ["Martes", "Jueves"], horario: "17:30 - 19:00", lugar: "Gimnasio" },
  { id: "7", deporte: "Hockey", categoria: "Damas (todas)", profesor: "Valentina Sosa", dias: ["Lunes", "Miércoles", "Viernes"], horario: "17:00 - 18:30", lugar: "Campo de hockey" },
  { id: "8", deporte: "Patín", categoria: "Niñas/os", profesor: "Sofía Carrizo", dias: ["Martes", "Sábado"], horario: "10:00 - 11:30", lugar: "Pista de patín" },
  { id: "9", deporte: "Gimnasia", categoria: "Adultos", profesor: "Marina Torres", dias: ["Lunes", "Miércoles", "Viernes"], horario: "08:00 - 09:00", lugar: "Salón polivalente" },
];

export const mockPartidos = [
  { id: "1", deporte: "Fútbol", categoria: "Primera División", local: "Deportivo Patagones", visitante: "Deportivo Norte", fecha: "2026-06-15", hora: "16:00", lugar: "Cancha Principal", resultado: null },
  { id: "2", deporte: "Básquet", categoria: "Sub-16", local: "Deportivo Patagones", visitante: "Club Roca", fecha: "2026-06-14", hora: "10:00", lugar: "Gimnasio", resultado: null },
  { id: "3", deporte: "Hockey", categoria: "Damas", local: "Deportivo Patagones", visitante: "Atlético Viedma", fecha: "2026-06-21", hora: "11:00", lugar: "Campo de hockey", resultado: null },
];

export const mockProfesores = [
  { id: "1", name: "Carlos Medina", deporte: "Fútbol", categorias: ["Infantil (Sub-10)"], initials: "CM" },
  { id: "2", name: "Lucas Ferreyra", deporte: "Fútbol", categorias: ["Pre-infante (Sub-8)"], initials: "LF" },
  { id: "3", name: "Diego Paredes", deporte: "Fútbol", categorias: ["Juvenil (Sub-17)", "Primera División"], initials: "DP" },
  { id: "4", name: "Alejandro Ruiz", deporte: "Básquet", categorias: ["Infantil (Sub-12)", "Juvenil (Sub-16)"], initials: "AR" },
  { id: "5", name: "Valentina Sosa", deporte: "Hockey", categorias: ["Damas (todas)"], initials: "VS" },
  { id: "6", name: "Sofía Carrizo", deporte: "Patín", categorias: ["Niñas/os"], initials: "SC" },
  { id: "7", name: "Marina Torres", deporte: "Gimnasia", categorias: ["Adultos"], initials: "MT" },
];

export type AvisoTipo = "general" | "suspensión" | "recordatorio" | "resultado" | "convocatoria";

export const mockAvisos: {
  id: string;
  profesorId: string;
  profesorName: string;
  comunidadId: ComunidadId;
  deporte: string;
  categoria: string;
  tipo: AvisoTipo;
  titulo: string;
  contenido: string;
  fecha: string;
  fijado: boolean;
  adjunto: null;
}[] = [
  /* ── FÚTBOL ─────────────────────────────────────── */
  {
    id: "1",
    profesorId: "3",
    profesorName: "Diego Paredes",
    comunidadId: "futbol",
    deporte: "Fútbol",
    categoria: "Primera División",
    tipo: "convocatoria",
    titulo: "Convocatoria para el partido del domingo",
    contenido: "Chicos, el domingo jugamos contra Deportivo Norte. Concentración a las 14:30 en el vestuario. Traigan botines de campo, medias negras y camiseta blanca. Confirmen presencia por acá o por WhatsApp antes del viernes.",
    fecha: "2026-06-11T10:30:00",
    fijado: true,
    adjunto: null,
  },
  {
    id: "3",
    profesorId: "1",
    profesorName: "Carlos Medina",
    comunidadId: "futbol",
    deporte: "Fútbol",
    categoria: "Infantil Sub-10",
    tipo: "recordatorio",
    titulo: "Torneo este sábado — recordatorio",
    contenido: "El sábado 14 es el torneo interno. Encuentro a las 8:45 en la puerta del club. Cada chico tiene que traer botines, canilleras y agua. Los papás que puedan colaborar con la logística que avisen.",
    fecha: "2026-06-10T09:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "7",
    profesorId: "3",
    profesorName: "Diego Paredes",
    comunidadId: "futbol",
    deporte: "Fútbol",
    categoria: "Juvenil Sub-17",
    tipo: "general",
    titulo: "Planificación del segundo semestre",
    contenido: "Chicos, a partir de julio arrancamos con la preparación para el torneo regional. Vamos a sumar un entrenamiento táctico los sábados de 10 a 11:30. Obligatorio para los que quieran estar en la lista.",
    fecha: "2026-06-06T11:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "8",
    profesorId: "2",
    profesorName: "Lucas Ferreyra",
    comunidadId: "futbol",
    deporte: "Fútbol",
    categoria: "Pre-infante Sub-8",
    tipo: "resultado",
    titulo: "¡Los chicos ganaron el amistoso!",
    contenido: "Los peques estuvieron increíbles hoy. Ganamos 4 a 2 en el amistoso del sábado. Todos jugaron, todos aprendieron. ¡Felicitaciones a los jugadores y a las familias que los acompañaron!",
    fecha: "2026-06-05T18:30:00",
    fijado: false,
    adjunto: null,
  },
  /* ── BÁSQUET ─────────────────────────────────────── */
  {
    id: "4",
    profesorId: "4",
    profesorName: "Alejandro Ruiz",
    comunidadId: "basquet",
    deporte: "Básquet",
    categoria: "Juvenil Sub-16",
    tipo: "resultado",
    titulo: "¡Ganamos! — 58 a 44 contra Club Cipolletti",
    contenido: "Gran partido del equipo! Estuvieron increíbles de principio a fin. El sábado vienen Club Roca. Entrenamiento doble el jueves, 17:30 a 19:30. Que no falte nadie.",
    fecha: "2026-06-09T21:00:00",
    fijado: true,
    adjunto: null,
  },
  {
    id: "9",
    profesorId: "4",
    profesorName: "Alejandro Ruiz",
    comunidadId: "basquet",
    deporte: "Básquet",
    categoria: "Infantil Sub-12",
    tipo: "convocatoria",
    titulo: "Torneo interclubs Sub-12 — 28 de junio",
    contenido: "El 28 de junio jugamos el torneo interclubs Sub-12 en el gimnasio. Necesitamos que los chicos estén a las 9:30. Los padres que quieran colaborar como asistentes de mesa pueden anotarse con el profe.",
    fecha: "2026-06-08T16:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "10",
    profesorId: "4",
    profesorName: "Alejandro Ruiz",
    comunidadId: "basquet",
    deporte: "Básquet",
    categoria: "Todas las categorías",
    tipo: "general",
    titulo: "Renovación de inscripciones julio",
    contenido: "Recordamos que las inscripciones para el segundo semestre ya están abiertas. Los que quieran sumarse a básquet pueden hacerlo en secretaría o enviando un mensaje al club. Cupos limitados en Sub-12.",
    fecha: "2026-06-04T10:00:00",
    fijado: false,
    adjunto: null,
  },
  /* ── HOCKEY ─────────────────────────────────────── */
  {
    id: "2",
    profesorId: "5",
    profesorName: "Valentina Sosa",
    comunidadId: "hockey",
    deporte: "Hockey",
    categoria: "Damas (todas)",
    tipo: "suspensión",
    titulo: "Entrenamiento del miércoles suspendido",
    contenido: "Por las obras en el campo de hockey, el entrenamiento del miércoles 11 queda suspendido. Retomamos el viernes en el campo auxiliar. Lamentamos las molestias.",
    fecha: "2026-06-10T18:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "11",
    profesorId: "5",
    profesorName: "Valentina Sosa",
    comunidadId: "hockey",
    deporte: "Hockey",
    categoria: "Damas (todas)",
    tipo: "general",
    titulo: "Inicio de obras en el campo — cronograma",
    contenido: "Las obras de renovación del campo durarán aproximadamente 3 semanas. Durante ese período entrenaremos en el campo auxiliar y los sábados en la cancha de césped sintético del club vecino. Adjuntamos el mapa de acceso.",
    fecha: "2026-06-07T09:00:00",
    fijado: true,
    adjunto: null,
  },
  /* ── PATÍN ─────────────────────────────────────── */
  {
    id: "6",
    profesorId: "6",
    profesorName: "Sofía Carrizo",
    comunidadId: "patin",
    deporte: "Patín",
    categoria: "Niñas/os",
    tipo: "recordatorio",
    titulo: "Traigan las patinas afiladas el sábado",
    contenido: "Importante: el próximo sábado vamos a trabajar con ejercicios en velocidad, así que necesitamos que vengan con los patines bien afilados. El que precise, puede llevarlos a afilar en la ferretería de la calle Brown.",
    fecha: "2026-06-07T16:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "12",
    profesorId: "6",
    profesorName: "Sofía Carrizo",
    comunidadId: "patin",
    deporte: "Patín",
    categoria: "Niñas/os",
    tipo: "general",
    titulo: "Exhibición de fin de año — ¡ya se viene!",
    contenido: "Ya empezamos a preparar la coreografía para la exhibición de diciembre. Este sábado comenzamos con la música nueva. ¡Que vengan con ganas y energía!",
    fecha: "2026-06-03T11:00:00",
    fijado: false,
    adjunto: null,
  },
  /* ── GIMNASIA ─────────────────────────────────────── */
  {
    id: "5",
    profesorId: "7",
    profesorName: "Marina Torres",
    comunidadId: "gimnasia",
    deporte: "Gimnasia",
    categoria: "Adultos",
    tipo: "general",
    titulo: "Nuevo horario de verano desde julio",
    contenido: "A partir del 1° de julio el horario de la clase de adultos pasa a ser de 8:30 a 9:30 (antes de 8:00 a 9:00). También sumamos el viernes para quienes quieran clase adicional. Anoten el cambio.",
    fecha: "2026-06-08T12:00:00",
    fijado: false,
    adjunto: null,
  },
  {
    id: "13",
    profesorId: "7",
    profesorName: "Marina Torres",
    comunidadId: "gimnasia",
    deporte: "Gimnasia",
    categoria: "Adultos",
    tipo: "recordatorio",
    titulo: "Esta semana clase de yoga integrativa",
    contenido: "El miércoles reemplazamos la clase habitual por una sesión de yoga integrativa a cargo de una especialista invitada. La misma dinámica, sin implementos adicionales. ¡Los espero a todos!",
    fecha: "2026-06-02T08:00:00",
    fijado: false,
    adjunto: null,
  },
];

export const mockAdminStats = {
  totalSocios: 1248,
  sociosActivos: 1102,
  cuotasEstesMes: 847,
  montoCobrado: 7199500,
  eventosProximos: 4,
  actividadesActivas: 9,
};
