import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './api-url.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

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

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token))
  }
  getToken() {
    return localStorage.getItem('token');
  }

  // // Implémentez les méthodes suivantes pour gérer l'ajout, la modification et la suppression d'articles
  // ajoutArticle(formData: FormData): Observable<any> {
  //   const httpOptions = {       headers: new HttpHeaders({         Authorization: "Bearer" + JSON.parse(localStorage.getItem("userData") ?? '{}').access_token.token       })     };
  //   return this.http.post(`${baseUrl}/article`, formData,httpOptions);
  // }

  // updateArticle(id: number, formData: FormData): Observable<any> {
  //   return this.http.put(`${baseUrl}/articles/${id}`, formData);
  // }

  // deleteArticle(id: number): Observable<any> {
  //   return this.http.delete(`${baseUrl}/articles/${id}`);
  // }
}
