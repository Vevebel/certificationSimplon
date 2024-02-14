import { Component } from '@angular/core';
import { MedecinService } from '../servicesSRNRV/medecin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-medecins',
  templateUrl: './detail-medecins.component.html',
  styleUrls: ['./detail-medecins.component.css']
})
export class DetailMedecinsComponent {
  medecin: any;
  filterValue: string = '';
  medecinChoisi: any;
  // errorMessage: string = "Ce médecin n'existe pas.";

  constructor(
    private medecinService: MedecinService,
    private router : Router,
    private route:ActivatedRoute
  ) {}
  idMedecinChoisi=this.route.snapshot.params['id']

  ngOnInit(): void {
    this.listerDesMedecins();
  }

  listerDesMedecins(): void {
    this.medecinService.getAllMedecin().subscribe(
      (medecins) => {
        this.medecin = medecins.medecins;
        console.log(this.medecin);
        this.medecinChoisi=this.medecin.find((element: any) => element.id==this.idMedecinChoisi)
        console.log(this.medecinChoisi)
      }
      // (error) => {
      //   console.log('Erreur lors de la récupération des médecins :', error);
      // }
    );

    // listerDesMedecin(): void {
      //     this.medecinService.getAllMedecin()
      //     .subscribe(medecin => {
      //       this.medecins = medecin;
      //       console.log(this.medecins);
      //       });
  }

}
