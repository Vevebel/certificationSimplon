import { Injectable } from '@angular/core';
import { Article } from '../modelSRS/Articles';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private articles: Article[] = [];

  addArticle(titre: string, description: string, image: File) {
      const newArticle: Article = {
        nomArticle: titre,
        description: description,
        image: image,
        id: '',
        details: '',
        estArchive: false,
        createdAt: '',
        updatedAt: '',
        createdBy: '',
        updatedBy: ''
      };
      this.articles.push(newArticle);
  }

  getAllArticles() {
      return this.articles;
  }
}
