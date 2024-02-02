// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ArticleService {
//   getArticle() {
//     throw new Error('Method not implemented.');
//   }

//   constructor() { }
// }

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  ajouterArticle(nouvelArticle: { nomarticle: string; description: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  // modification et la suppression d'articles
  ajoutArticle(formData: FormData): Observable<any> {
    const httpOptions = {       headers: new HttpHeaders({         Authorization: "Bearer" + JSON.parse(localStorage.getItem("userData") ?? '{}').access_token.token       })     };
    return this.http.post(`${baseUrl}/article`, formData,httpOptions);
  }

  updateArticle(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${baseUrl}/articles/${id}`, formData);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/articles/${id}`);
  }
  getArticle(): Observable<any> {
    const httpOptions = {       headers: new HttpHeaders({         Authorization: "Bearer" + JSON.parse(localStorage.getItem("userData") ?? '{}').access_token.token   })     };
    return this.http.get<any>(`${baseUrl}/article`, httpOptions);
  }
}
