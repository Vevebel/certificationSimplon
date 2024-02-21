import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleCalendarServiceService } from 'src/app/servicesSRNRV/google-calendar-service.service';
import { PlanningService } from 'src/app/servicesSRNRV/planning.service';

@Component({
  selector: 'app-planning-du-medecin',
  templateUrl: './planning-du-medecin.component.html',
  styleUrls: ['./planning-du-medecin.component.css']
})

export class PlanningDuMedecinComponent implements OnInit {
  // Déclaration des variables
  newPlanning: any = {};
  plannings: any[] = [];
  selectedPlanning: any = {};
  listePlanning: any[]=[];

  constructor(private planningService: PlanningService,
    private googleCalendarService: GoogleCalendarServiceService,
     private route: Router,
    ) { }

  ngOnInit(): void {
    this.listerPlanning(); // Appel de la méthode pour récupérer les plannings lors de l'initialisation
  }

  // Méthode pour récupérer la liste des plannings
   // lister  produits
   listerPlanning() {
    // console.log(this.tabListProduit);
    this.planningService.getPlannings().subscribe((response) => {
      console.log('listez',response );
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

  addEvent() {
    const eventData = {
      summary: 'Titre de lévénement',
      startDateTime: '2024-02-04T10:00:00',
      endDateTime: '2024-02-04T12:00:00'
    };

    this.googleCalendarService.addEventToCalendar(eventData).subscribe(
      (response: any) => {
        console.log('Événement ajouté avec succès', response);
      },
      (error: any) => {
        console.log('Erreur lors de lajout de lévénement', error);
      }
    );
}
}

