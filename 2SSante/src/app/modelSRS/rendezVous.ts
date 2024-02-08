export interface RendezVous {
  id: number;
  date: Date;
  time: string;
  doctorId: number; // Ajout d'une propriété pour l'ID du médecin associé
}
