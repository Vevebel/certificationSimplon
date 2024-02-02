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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  ajouterArticle(nouvelArticle: { nomarticle: string; description: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getArticle(): Observable<any> {
    return this.http.get<any>('votre-url-article');
  }
}
