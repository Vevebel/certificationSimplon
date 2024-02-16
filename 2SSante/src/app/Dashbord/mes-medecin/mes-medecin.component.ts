import { PlanningService } from 'src/app/servicesSRNRV/planning.service';
import { secteur_activite } from './../../modelSRS/typesVHS';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedecinService } from 'src/app/servicesSRNRV/medecin.service';

@Component({
  selector: 'app-mes-medecin',
  templateUrl: './mes-medecin.component.html',
  styleUrls: ['./mes-medecin.component.css']
})
export class MesMedecinComponent {
  medecin: any;
  filterValue: string = '';
  planningMedecin: any[] = [];
  plannings: any[] = [];
  medecinId: number = 0;

  // Variable pour switcher entre la liste des medecins et leurs détails
  isListeMedecin:boolean = true;
  isDetailsMedecin:boolean = false;
  // errorMessage: string = "Ce médecin n'existe pas.";

  constructor(
    private medecinService: MedecinService,
    private router : Router,
    private planningService: PlanningService,
    private route: ActivatedRoute,
  ) {}

  showListeMedecin(){
    this.isListeMedecin = true;
    this.isDetailsMedecin = false;
    this.listerDesMedecins();
  }

  showDetailsMedecin(medecinItem:any){
    this.isListeMedecin = false;
    this.isDetailsMedecin = true;
    this.medecin = medecinItem;
    alert(this.medecin.id);
    this.planningDuMedecin();

  }

  // fontion de recuperation des planning du medecin
  planningDuMedecin(){
    // getALLPlannings.planningService()
    this.planningService.getALLPlannings(this.medecin.id).subscribe(
      (response:any)=>{
        console.log(response.plannings );
        this.planningMedecin=response.plannings;
      }
    )

  }





//   created_at
// :
// "2024-02-15T14:51:13.000000Z"
// date
// :
// "2024-02-19"
// heure_debut
// :
// "08:31:00"
// heure_fin
// :
// "17:54:00"
// id
// :
// 3
// is_deleted
// :
// 0
// status
// :
// "disponible"
// updated_at
// :
// "2024-02-15T14:51:13.000000Z"
// user_id
// :
// 4


  ngOnInit(): void {
    // this.listerDesMedecins(medecinId);
    // this.route.paramMap.subscribe(params => {
      // Convertir l'ID du médecin en nombre
      // this.medecinId = Number(params.get('id'));
      // Appeler la méthode pour récupérer les plannings du médecin
      // });
      this.listerDesMedecins();
  }

  listerDesMedecins( ): void {
    this.medecinService.getAllMedecin().subscribe(
      (medecins) => {
        this.medecin = medecins.medecins;
        console.log(this.medecin);
      }
      // (error) => {
      //   console.log('Erreur lors de la récupération des médecins :', error);
      // }
    );
    // this.planningService.getALLPlannings(medecinId).subscribe(
    //       (response) => {
    //         console.log('listePlanning', response);
    //         this.plannings = response;
    //         console.log("new data", this.plannings);
    //       },


    //       );
    // this.planningService.getALLPlannings(medecinId).subscribe(
    //   (response) => {
    //     console.log('listePlanning', response);
    //     this.plannings = response;
    //     console.log("new data", this.plannings);
    //   },
    //   (error) => {
    //     console.error('Une erreur est survenue : ', error);
    //   }
    // );

  }

  // ListAllPlannings(): void {
  //   this.planningService.getALLPlannings().subscribe(
  //     (response) => {
  //       console.log('listePlanning', response);
  //       this.plannings = response.plannings;
  //       console.log("new data", this.plannings);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des plannings :', error);
  //     }
  //

  // }
}
