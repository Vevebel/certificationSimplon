import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = 'http://votre-api.com/auth'; // Mettez à jour avec l'URL de votre API

  constructor(private http: HttpClient) { }

  inscription(userData: any): Observable<any> {
    const url = `${this.baseUrl}/inscription`;
    return this.http.post(url, userData);
  }
}




