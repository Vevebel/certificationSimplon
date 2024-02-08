import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  rendezVous(formData: any) {
    throw new Error('Method not implemented.');
  }
  getMedecinsDisponibles() {
    throw new Error('Method not implemented.');
  }

  // constructor() { }
  rendezVousList = [
    { id: 1, patientName: 'John Doe', date: '2024-02-05', heure: '10:00' },
    { id: 2, patientName: 'Jane Smith', date: '2024-02-06', heure: '11:30' },
    // Vous pouvez ajouter plus de rendez-vous ici
  ];

  constructor() { }

  // Méthode pour récupérer la liste des rendez-vous
  getRendezVousList(): Observable<any[]> {
    // Simulation d'un appel HTTP pour récupérer les données
    return of(this.rendezVousList);
  }

  // Méthode pour accepter un rendez-vous
  acceptRendezVous(id: number): Observable<any> {
    // Implémentez ici la logique pour accepter le rendez-vous (peut être un appel HTTP)
    console.log("Rendez-vous accepté : ", id);
    // Ici, vous pouvez retourner un Observable avec la réponse de l'appel HTTP ou un message de confirmation
    return of({ message: 'Rendez-vous accepté avec succès' });
  }

  // Méthode pour refuser un rendez-vous
  refuseRendezVous(id: number): Observable<any> {
    // Implémentez ici la logique pour refuser le rendez-vous (peut être un appel HTTP)
    console.log("Rendez-vous refusé : ", id);
    // Ici, vous pouvez retourner un Observable avec la réponse de l'appel HTTP ou un message de confirmation
    return of({ message: 'Rendez-vous refusé avec succès' });
  }
  
}
