import type { MembershipPlan } from "./types";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "free",
    nombre: "Comunidad",
    precioMensual: 0,
    precioAnual: 0,
    descripcion: "Todo lo necesario para empezar a jugar mejor y encontrar dónde competir.",
    destacado: false,
    beneficios: [
      { texto: "Artículos y tutoriales abiertos", incluido: true },
      { texto: "Calendario de torneos y ligas", incluido: true },
      { texto: "Directorio de boliches y equipos", incluido: true },
      { texto: "Calculadora de promedio y hándicap", incluido: true },
      { texto: "Ranking general de la comunidad", incluido: true },
      { texto: "Artículos y análisis premium", incluido: false },
      { texto: "Anotador con análisis de serie", incluido: false },
      { texto: "Banco de patrones de aceite", incluido: false },
      { texto: "Guía completa de repuestos", incluido: false },
      { texto: "Descuento en inscripciones a torneos", incluido: false },
    ],
  },
  {
    id: "premium",
    nombre: "Premium",
    precioMensual: 149,
    precioAnual: 1490,
    descripcion: "Las herramientas de análisis, el contenido completo y beneficios en torneos.",
    destacado: true,
    beneficios: [
      { texto: "Todo lo del plan Comunidad", incluido: true },
      { texto: "Biblioteca completa de artículos y análisis", incluido: true },
      { texto: "Anotador con análisis de serie y tendencias", incluido: true },
      { texto: "Banco de patrones de aceite con líneas sugeridas", incluido: true },
      { texto: "Guía completa de repuestos, splits incluidos", incluido: true },
      { texto: "Historial ilimitado y comparativa contra la liga", incluido: true },
      { texto: "10% de descuento en torneos Pista300", incluido: true },
      { texto: "Acceso anticipado a inscripciones", incluido: true },
      { texto: "Planes de entrenamiento por nivel", incluido: true },
      { texto: "Soporte directo por WhatsApp", incluido: true },
    ],
  },
];

export const premiumFaq = [
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. La suscripción es mensual sin permanencia y puedes cancelarla desde tu cuenta; conservas el acceso hasta que termine el periodo pagado." },
  { q: "¿El descuento en torneos aplica a todos?", a: "Aplica a los torneos organizados u avalados por Pista300. En los torneos de terceros publicamos las condiciones de cada organizador en la ficha del evento." },
  { q: "¿Necesito estar en una liga para registrar mi promedio?", a: "No. Puedes capturar tus series por tu cuenta con el anotador. Si además juegas liga, puedes vincular tu promedio oficial para que aparezca en el ranking." },
  { q: "¿Qué pasa con mis datos si cancelo?", a: "Tu historial se conserva y sigues viendo tus últimas 10 series. Al reactivar recuperas el acceso completo sin perder nada." },
  { q: "¿Hay plan para clubes o equipos?", a: "Sí, a partir de 5 miembros hay precio de club. Escríbenos y armamos el plan según el tamaño del equipo." },
];
