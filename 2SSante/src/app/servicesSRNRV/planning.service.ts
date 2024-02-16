import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private apiUrl = `${baseUrl}/planning`;

  constructor(private http: HttpClient) { }

  // Récupérer la liste des plannings depuis le backend
  getPlannings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getALLPlannings(medecinId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/home/planning-medecin/${medecinId}`);

    // return this.http.get<any[]>(this.apiUrl);
    // // planning-medecin  getALLPlannings(id: number): Observable<any> {
  }
  // Ajouter un nouveau planning
  ajouterPlanning(planning: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, planning);
  }

  // Mettre à jour un planning existant
  mettreAJourPlanning(planningId: string, updatedPlanning: any): Observable<any> {
    const url = `${this.apiUrl}/${planningId}`;
    return this.http.put<any>(url, updatedPlanning);
  }

  // Supprimer un planning existant
  supprimerPlanning(planningId: string): Observable<any> {
    const url = `${this.apiUrl}/${planningId}`;
    return this.http.delete<any>(url);
  }
}
