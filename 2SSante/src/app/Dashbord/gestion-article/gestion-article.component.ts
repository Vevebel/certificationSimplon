import { Medecin } from './../../modelSRS/medecin';
import { ArticleService } from 'src/app/servicesSRNRV/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/modelSRS/Articles';
import Swal from 'sweetalert2';
import { AuthentificationService } from 'src/app/servicesSRNRV/authentification.service';
import { MedecinService } from 'src/app/servicesSRNRV/medecin.service';

@Component({
  selector: 'app-gestion-article',
  templateUrl: './gestion-article.component.html',
  styleUrls: ['./gestion-article.component.css']
})
export class GestionArticleComponent  implements OnInit {
  // variables pour les noms des variables
  article: Article = new Article();

  titre: string = '';
  description: string = '';
  image: any = '';
  creatAt = '';
  updateAt = '';

  // liste article
  articles:any;

  // le tableau
  tabListArticle: any[] = [];

  // // variables choix de produits
  // tabProduits: boolean = true;
  // tabPacks: boolean = false;
  // tabClients: boolean = false;

  // //choix de produits pour tableau produits
  // afficheProduits() {
  //   this.tabProduits = true;
  //   this.tabPacks = false;
  //   this.tabClients = false;
  // }

  //choix de produits pour tableau packs
  // affichePacks() {
  //   this.tabProduits = false;
  //   this.tabPacks = true;
  //   this.tabClients = false;
  // }

  //choix de produits pour tableau clients
  // afficheClients() {
  //   this.tabProduits = false;
  //   this.tabPacks = false;
  //   this.tabClients = true;
  // }

  constructor(
     private authentification : AuthentificationService,
    private MedecinService: MedecinService,
    private articleService : ArticleService,
  ) {}

  // inserer l'image
  getFile(event: any) {
    console.log('img', this.image);
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  ngOnInit(): void {
    this.listerDesArticles();
    let user = JSON.parse(localStorage.getItem("userData") || "")
    console.log(user);
    console.log(JSON.parse(localStorage.getItem("userData") ?? '{}').access_token.token )
    // this.filteredProduit=this.tabListProduit
    // this.modifierArticle();
    // this.ajout();
    this.getArticle();
  }
  modifierArticle() {
    throw new Error('Method not implemented.');
  }

  //methode pour ajouter des prduits
  ajout(): void {
    {
      let formData = new FormData();
      formData.append('titre', this.titre);
      formData.append('description', this.description);
      formData.append('image', this.image);
      console.log('article', formData);

      this.articleService.ajoutArticle(formData).subscribe(
        (rep) => {
          console.log('réussi POOOOOOOO', rep);
          localStorage.setItem('userConnect', rep.token);
        },
        (error) => {
          console.error('erreur', error);
        }
      );
    }
    this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');

    this.viderChamps();
  }

  /** fonction pour lister les produits */



  // lister  produits
  listerDesArticles() {
    // console.log(this.tabListProduit);
    this.articleService.getArticle().subscribe((data) => {
      console.log('listeArticle', data);
      console.log(this.listerDesArticles);
    });
  }

  // categorie_id: this.categorie_id,

  //  pour recuperer un produit
  articleSelectionner: any = {};

  getArticle() {
    this.articleService.getArticle().subscribe((reponse:any)=>{
      console.log(reponse.Articles.data);
      this.articles=reponse.Articles.data;
      console.log(this.articles)
    })
  }

  // fonction pour modifier
  //  variable
  // modifarticle: any;

  modifierarticle() {
    let formData = new FormData();
      formData.append('nomArticle', this.titre,);
      formData.append('image', this.image,);
      formData.append('description', this.description,);
    this.articleService.updateArticle(this.id, formData).subscribe((response) => {
        console.log('modifArticle', response);
      });
  }
  // declare id
  id: number = 0;
  chargerInfosArticle(article: any) {
    console.log(article);
    this.id = article.id;
    console.warn('lid de marigo', this.id);
    this.titre = article.titre;
    this.description = article.description;
    this.image = article.image;
    console.log('changer', this.chargerInfosArticle);
  }

  // methode pour supprimer

  supprimerArticle(id:number){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le article",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe((response) => {
          console.log('suparticle', response);
        });
      }
    });
}
  //Pour faire la recherche
  filterValue = '';
  filteredArticle: any;

  // onSearch() {
  //   // Recherche se fait selon le nom ou le prenom
  //   this.filteredarticle = this.tabListArticle.filter((elt: any) =>
  //     elt?.nomProduit.toLowerCase().includes(this.filterValue.toLowerCase())
  //   );
  // }


  // Pagination
    //  Attribut pour la pagination
     itemsParPage = 3;
    //  Nombre d'articles par page
     pageActuelle = 1;
      // Page actuelle
     tabMessages: any[] = [];
     tabMessagesFilter: any[] = [];
  // Méthode pour déterminer les articles à afficher sur la page actuelle
    getItemsPage(): any[] {
      console.log('pagi',this.getItemsPage)
      if (Array.isArray(this.tabMessagesFilter)) {
      const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
      const indexFin = indexDebut + this.itemsParPage;
      return this.tabMessagesFilter.slice(indexDebut, indexFin);
    } else {
      return [];
    }
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
  }

  // Methode pour vider les champs
  viderChamps() {
    this.titre= '';
    // this.prix = '';
    // this.quantiteTotale = '';
    this.description = '';
    this.image = '';
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

// bienSelectionner:any = "";
// console.log(this.bienSelectionner);
// console.log(data)

// this.getAllBiens();

