import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/servicesSRNRV/planning.service';

@Component({
  selector: 'app-planning-du-medecin',
  templateUrl: './planning-du-medecin.component.html',
  styleUrls: ['./planning-du-medecin.component.css']
})
// export class PlanningDuMedecinComponent {
//   newPlanning: any = {}; // Nouveau planning à ajouter
//   plannings: any[] = []; // Liste des plannings
//   selectedPlanning: any = {}; // Planning sélectionné

//   constructor(private planningService: PlanningService) { }

//   ngOnInit(): void {
//     this.getPlannings();
//   }

//   // Récupérer la liste des plannings depuis le service
//   getPlannings(): void {
//     this.planningService.getPlannings().subscribe(plannings => {
//       this.plannings = plannings;
//     });
//   }

//   // Ajouter un nouveau planning
//   ajouterPlanning(): void {
//     this.planningService.ajouterPlanning(this.newPlanning).subscribe(() => {
//       this.getPlannings(); // Rafraîchir la liste des plannings après l'ajout
//       this.newPlanning = {}; // Réinitialiser le formulaire
//       console.log('plannig', this.newPlanning);

//     });
//   }

//   // Sélectionner un planning pour afficher ses détails
//   selectionnerPlanning(planning: any): void {
//     this.selectedPlanning = planning;
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { PlanningService } from 'chemin-vers-le-service-planning.service'; // Assurez-vous d'importer le bon chemin

// @Component({
//   selector: 'app-planning-du-medecin',
//   templateUrl: './planning-du-medecin.component.html',
//   styleUrls: ['./planning-du-medecin.component.css']
// })
// export class PlanningDuMedecinComponent implements OnInit {
//   newPlanning: any = {}; // Nouveau planning à ajouter
//   planning: any[] = []; // Liste des plannings
//   selectedPlanning: any = {}; // Planning sélectionné

//   constructor(private planningService: PlanningService) { }

//   ngOnInit(): void {
//     this.getPlannings();
//   }

//   // Récupérer la liste des plannings depuis le service
//   getPlannings(): void {
//     this.planningService.getPlannings().subscribe(
//       (plannings) => {
//         this.planning = plannings;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des plannings :', error);
//       }
//     );
//   }

//   // Ajouter un nouveau planning
//   // ajouterPlanning(): void {
//   //   this.planningService.ajouterPlanning(this.newPlanning).subscribe(
//   //     () => {
//   //       console.log('Planning ajouté avec succès.');
//   //       this.getPlannings(); // Rafraîchir la liste des plannings après l'ajout
//   //       this.newPlanning = {}; // Réinitialiser le formulaire
//   //     },
//   //     (error) => {
//   //       console.error('Erreur lors de l\'ajout du planning :', error);
//   //     }
//   //   );
//   // }
//   // ajouterPlanning(): void {
//   //       this.planningService.ajouterPlanning(this.newPlanning).subscribe(() => {
//   //         this.getPlannings(); // Rafraîchir la liste des plannings après l'ajout
//   //         this.newPlanning = {}; // Réinitialiser le formulaire
//   //         console.log('plannig', this.newPlanning);

//   //       });
//   // }
//   // Sélectionner un planning pour afficher ses détails
//   selectionnerPlanning(planning: any): void {
//     this.selectedPlanning = planning;
//   }


//     //methode pour ajouter des prduits
//     ajouterPlanning(): void {
//       {
//         let formData = new FormData();
//         formData.append('date', this.newPlanning.date);
//         formData.append('ouverture', this.newPlanning.heureDebut);
//         formData.append('fermeture', this.newPlanning.heureFin);
//         console.log('article', formData);

//         this.planningService.ajouterPlanning(formData).subscribe(
//           (rep) => {
//             console.log('réussi POOOOOOOO', rep);
//             localStorage.setItem('userConnect', rep.token);
//             this.listerPlanning();
//           },
//           (error) => {
//             console.error('erreur', error);
//           }
//         );
//       }
//       // this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');

//       this.viderChamps();
//     }

//     /** fonction pour lister les produits */



//     // lister  produits
//     listerPlanning() {
//       // // console.log(this.tabListProduit);
//       // this.articleService.getArticle().subscribe((response) => {
//       //   console.log('listeArticle',response );
//       //   this.articles= response.Articles;
//       //   console.log("new data",this.articles);
//       // });
//     }
//     viderChamps() {
//       // this.titre= '';
//       // // this.prix = '';
//       // // this.quantiteTotale = '';
//       // this.description = '';
//       // this.image = '';
//     }
// }
export class PlanningDuMedecinComponent implements OnInit {
  // Déclaration des variables
  newPlanning: any = {};
  plannings: any[] = [];
  selectedPlanning: any = {};
  listePlanning: any[]=[];

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.listerPlanning(); // Appel de la méthode pour récupérer les plannings lors de l'initialisation
  }

  // Méthode pour récupérer la liste des plannings
   // lister  produits
   listerPlanning() {
    // console.log(this.tabListProduit);
    this.planningService.getPlannings().subscribe((response) => {
      console.log('listePlanning',response );
      this.plannings= response.plannings;
      console.log("new data",this.plannings);
    });
  }
  // getPlannings(): void {
  //   this.planningService.getPlannings().subscribe(
  //     (plannings) => {
  //       this.plannings = plannings;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des plannings :', error);
  //     }
  //   );
  // }

  // Méthode pour ajouter un nouveau planning
  ajouterPlanning(): void {
    this.planningService.ajouterPlanning(this.newPlanning).subscribe(
      (response) => {
        console.log('Planning ajouté avec succès:', response);
        this.listerPlanning(); // Rafraîchir la liste des plannings après l'ajout
        this.newPlanning = {}; // Réinitialiser le formulaire après l'ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du planning :', error);
      }
    );
  }

  // Méthode pour sélectionner un planning
  selectionnerPlanning(planning: any): void {
    this.selectedPlanning = planning;
  }
}


