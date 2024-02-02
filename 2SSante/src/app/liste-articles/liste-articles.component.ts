import { Component } from '@angular/core';
import { Article } from '../modelSRS/Articles';
import { ArticleService } from '../servicesSRNRV/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css']
})
export class ListeArticlesComponent {
  articles: Article[] = [];
  filterValue: string = '';
  originalarticles: Article[] = [];
  errorMessage: string = "Ce article n'existe pas.";
  location: any;

  constructor(
    private articleService: ArticleService,
    private router : Router,
    ) {}
  ngOnInit(): void {
    this.loadarticles();
  }
    loadarticles(): void {
    this.articleService.getArticle().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.originalarticles = [...this.articles];
      },
      (error: any) => {
        console.error('Erreur lors du chargement des articles depuis l\'API :', error);
      }
    );
  }
  onSearch() {
    if (this.filterValue.trim() === '') {
      this.articles = [...this.originalarticles];
    } else {
      this.articles = this.originalarticles.filter(element =>
        element.nomArticle.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }
    if (this.articles.length === 0) {
      this.errorMessage = "Ce article n'existe pas.";
    } else {
      this.errorMessage = '';
    }
  }
  // showMentors() {
  //   this.router.navigate(['/listes-mentor']);
  //   this.location.reload();
  // }
}
