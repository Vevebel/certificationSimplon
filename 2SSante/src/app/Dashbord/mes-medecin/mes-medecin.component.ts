import { PlanningService } from 'src/app/servicesSRNRV/planning.service';
import { secteur_activite } from './../../modelSRS/typesVHS';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedecinService } from 'src/app/servicesSRNRV/medecin.service';

@Component({
  selector: 'app-mes-medecin',
  templateUrl: './mes-medecin.component.html',
  styleUrls: ['./mes-medecin.component.css']
})
export class MesMedecinComponent implements OnInit{
  medecin: any;
  filterValue: string = '';
  planningMedecin: any[] = [];
  plannings: any[] = [];
  medecinId: number = 0;
  planning: any[] =[];

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
    // alert(this.medecin.id);
    this.planningDuMedecin();
    console.log(this.planningDuMedecin);


  }

  // fontion de recuperation des planning du medecin
  // LISTE PLANNIG
  planningDuMedecin(){
    // getALLPlannings.planningService()
    this.planningService.getALLPlannings(this.medecin.id).subscribe(
      (response:any)=>{
        console.log(response.plannings );
        this.planningMedecin=response.plannings;
        localStorage.setItem('PlanningMedecin', JSON.stringify(this.planningMedecin));
      }
    )

  }
  // planningDetail(){
  //   // getALLPlannings.planningService()
  //   this.planningService.getALLPlannings(this.medecin.id).subscribe(
  //     (response:any)=>{
  //       console.log(response.plannings.planning_id );
  //       this.planning=response.plannings.planning_id;
  //     }
  //   )

  // }





  ngOnInit(): void {

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


  }


}
