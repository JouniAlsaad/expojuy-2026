export interface SuggestedQuestion {
  id: string;
  label: string;
}

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: "kids-activities", label: "¿Qué actividades hay para chicos?" },
  { id: "ticket-price", label: "¿Cuánto sale la entrada?" },
  { id: "directions", label: "¿Cómo llego al predio?" },
  { id: "saturday-talks", label: "¿Qué charlas hay el sábado?" },
];
