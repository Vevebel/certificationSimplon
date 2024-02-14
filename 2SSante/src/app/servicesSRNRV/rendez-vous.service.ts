// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { baseUrl } from './api-url.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RendezVousService {
//   rendezVous(formData: any) {
//     throw new Error('Method not implemented.');
//   }
//   getMedecinsDisponibles() {
//     throw new Error('Method not implemented.');
//   }

//   // constructor() { }
//   rendezVousList = [
//     { id: 1, patientName: 'John Doe', date: '2024-02-05', heure: '10:00' },
//     { id: 2, patientName: 'Jane Smith', date: '2024-02-06', heure: '11:30' },
//     // Vous pouvez ajouter plus de rendez-vous ici
//   ];

//   constructor(private http: HttpClient) { }

//   // Méthode pour récupérer la liste des rendez-vous
//   getRendezVousList(): Observable<any[]> {
//     // Simulation d'un appel HTTP pour récupérer les données
//     return of(this.rendezVousList);
//   }
//   getRendezVous(): Observable<any> {
//     // Implémentez la logique pour récupérer les rendez-vous depuis votre API ou autre source de données
//     return this.http.get<Rendez-vous[]>(`${baseUrl}/consulter-docteur/`);
//   }


//   // Méthode pour accepter un rendez-vous
//   acceptRendezVous(id: number): Observable<any> {
//     // Implémentez ici la logique pour accepter le rendez-vous (peut être un appel HTTP)
//     console.log("Rendez-vous accepté : ", id);
//     // Ici, vous pouvez retourner un Observable avec la réponse de l'appel HTTP ou un message de confirmation
//     return of({ message: 'Rendez-vous accepté avec succès' });
//   }

//   // Méthode pour refuser un rendez-vous
//   refuseRendezVous(id: number): Observable<any> {
//     // Implémentez ici la logique pour refuser le rendez-vous (peut être un appel HTTP)
//     console.log("Rendez-vous refusé : ", id);
//     // Ici, vous pouvez retourner un Observable avec la réponse de l'appel HTTP ou un message de confirmation
//     return of({ message: 'Rendez-vous refusé avec succès' });
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { baseUrl } from './api-url.service';
import { RendezVous } from '../modelSRS/rendezVous';
// import { RendezVous } from '../chemin/vers/le/modele/RendezVous'; // Assurez-vous d'importer correctement le modèle RendezVous

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  rendezVousList = [
    // { id: 1, patientName: 'John Doe', date: '2024-02-05', heure: '10:00' },
    // { id: 2, patientName: 'Jane Smith', date: '2024-02-06', heure: '11:30' },
    // Vous pouvez ajouter plus de rendez-vous ici
  ];

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des rendez-vous
  getRendezVousList(): Observable<any[]> {
    // Simulation d'un appel HTTP pour récupérer les données
    return of(this.rendezVousList);
  }

  // Méthode pour récupérer les rendez-vous depuis votre API ou autre source de données
  getRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${baseUrl}/consulter-docteur/`);
  }

  // Méthode pour accepter un rendez-vous
  acceptRendezVous(id: number): Observable<any> {
    console.log("Rendez-vous accepté : ", id);
    return of({ message: 'Rendez-vous accepté avec succès' });
  }

  // Méthode pour refuser un rendez-vous
  refuseRendezVous(id: number): Observable<any> {
    console.log("Rendez-vous refusé : ", id);
    return of({ message: 'Rendez-vous refusé avec succès' });
  }
}
