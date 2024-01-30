// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   constructor() {private http: HttpClient };
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getHopitaux: any;
  // getSecteursSpecialistes: any;
  constructor(private http: HttpClient) {}
    // Méthode pour récupérer les villes depuis une source de données
    getVilles(): Observable<any[]> {
      // Remplacez 'url_villes' par l'URL réelle pour récupérer les villes depuis votre API
      const url_villes = 'https://example.com/api/villes';
      return this.http.get<any[]>(url_villes);
    }
    getSecteursSpecialistes(): Observable<any[]> {
      // Remplacez 'url_secteurs' par l'URL réelle pour récupérer les secteurs spécialistes depuis votre API
      const url_secteurs = 'https://example.com/api/secteurs';
      return this.http.get<any[]>(url_secteurs);
    }


}

