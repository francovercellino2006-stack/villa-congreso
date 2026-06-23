export const mockUser = {
  id: "1",
  name: "",
  email: "",
  avatarUrl: null,
  socioNumber: "",
  category: "",
  sports: [] as string[],
  comunidades: [] as string[],
  joinedAt: "",
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
    miembros: 0,
    profes: [],
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
    miembros: 0,
    profes: [],
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
    miembros: 0,
    profes: [],
    descripcion: "Novedades del hockey femenino y mixto",
  },
  {
    id: "patin",
    nombre: "Patín",
    emoji: "⛸️",
    color: "#7c3aed",
    colorBg: "bg-[#7c3aed]/10",
    colorText: "text-[#7c3aed]",
    gradient: "from-[#7c3aed] to-[#a78bfa]",
    miembros: 0,
    profes: [],
    descripcion: "Novedades de patín artístico y velocidad",
  },
  {
    id: "gimnasia",
    nombre: "Gimnasia",
    emoji: "🤸",
    color: "#db2777",
    colorBg: "bg-[#db2777]/10",
    colorText: "text-[#db2777]",
    gradient: "from-[#db2777] to-[#f472b6]",
    miembros: 0,
    profes: [],
    descripcion: "Novedades de gimnasia para todas las edades",
  },
];

export const mockNoticias: {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  date: string;
  pinned: boolean;
}[] = [];

export const mockEventos: {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  cupos: number | null;
  inscriptos: number | null;
  confirmed: boolean;
}[] = [];

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
  proxVencimiento: "",
  historial: [],
};

export const mockHorarios: {
  id: string;
  deporte: string;
  categoria: string;
  profesor: string;
  dias: string[];
  horario: string;
  lugar: string;
}[] = [];

export const mockPartidos: {
  id: string;
  deporte: string;
  categoria: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  lugar: string;
  resultado: string | null;
}[] = [];

export const mockProfesores: {
  id: string;
  name: string;
  deporte: string;
  categorias: string[];
  initials: string;
}[] = [];

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
}[] = [];

export const mockAdminStats = {
  totalSocios: 0,
  sociosActivos: 0,
  cuotasEstesMes: 0,
  montoCobrado: 0,
  eventosProximos: 0,
  actividadesActivas: 0,
};
