import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './api-url.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  // private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) { }

  inscriptionMedecin(userData: any): Observable<any> {
    return this.http.post(`${baseUrl}/register-medecin`, userData);
  }
  inscriptionPatient(userData: any): Observable<any> {
    return this.http.post(`${baseUrl}/register-patient`, userData);
  }
  connexion(userData: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, userData);
}



}
