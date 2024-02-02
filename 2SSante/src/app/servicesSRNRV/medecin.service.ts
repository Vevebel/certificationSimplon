import { Injectable } from '@angular/core';
import { Article } from '../modelSRS/Articles';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  ajouterArticle(articleData: FormData) {
    throw new Error('Method not implemented.');
  }

  private articles: Article[] = [];

  addArticle(titre: string, description: string, image: File) {
      this.articles.push({
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
        });
  }

  getAllArticles() {
      return this.articles;
  }
}
