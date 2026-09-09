export const genericAssistantResponse =
  "Gracias por tu consulta. En el sitio final podrás recibir respuestas personalizadas al instante gracias a nuestro asistente inteligente.";

const responsesByQuestionId: Record<string, string> = {
  "kids-activities":
    "En ExpoJuy 2026 vas a encontrar espacios pensados especialmente para los más chicos: talleres, juegos y actividades recreativas durante los 10 días de feria. Consultá la agenda para ver horarios específicos.",
  "ticket-price":
    "Las entradas para ExpoJuy 2026 estarán disponibles próximamente desde nuestro sitio. Habrá tarifas diferenciadas y días con entrada gratuita para instituciones educativas.",
  directions:
    "ExpoJuy 2026 se realizará en Ciudad Cultural, San Salvador de Jujuy, del 10 al 19 de octubre. Contamos con estacionamiento propio y acceso en transporte público desde el centro de la ciudad.",
  "saturday-talks":
    "Los sábados son los días de mayor actividad. Vas a encontrar charlas de innovación, tecnología, emprendedurismo y economía regional. Consultá la agenda completa para ver el detalle por horario.",
};

export function getMockedResponse(questionId?: string): string {
  if (!questionId) {
    return genericAssistantResponse;
  }
  return responsesByQuestionId[questionId] ?? genericAssistantResponse;
}
