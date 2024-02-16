import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RendezVous } from 'src/app/modelSRS/rendezVous';
import { PatientService } from 'src/app/servicesSRNRV/patient.service';
import { PlanningService } from 'src/app/servicesSRNRV/planning.service';
import { RendezVousService } from 'src/app/servicesSRNRV/rendez-vous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rendez-vous-patient',
  templateUrl: './rendez-vous-patient.component.html',
  styleUrls: ['./rendez-vous-patient.component.css']
})
export class RendezVousPatientComponent {
  rendezVous = new RendezVous(); // Initialisez une instance du modèle
  emailPatient: string = '';

  constructor(private rendezVousService: RendezVousService,
     private patientService:PatientService,
     private http: HttpClient,
     private planningService: PlanningService ) {}
  plannings: any[] = [];
  // rendezVous: any = {
  //   date: '',
  //   heureRv: ''
  // };

  // constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.getPlannings();
  }

  getPlannings(): void {
    this.planningService.getPlannings().subscribe(
      (plannings) => {
        this.plannings = plannings;
      },
      (error) => {
        console.error('Erreur lors de la récupération des plannings :', error);
      }
    );
  }
  verifierExistenceEmail(): void {
    if (this.rendezVous.email) {
      this.patientService.verifierExistencePatient(this.rendezVous.email).subscribe(
        (existe: boolean) => {
          if (existe) {
            console.log('L\'email existe dans la base de données.');
            // Si l'e-mail existe, continuez la validation du rendez-vous
            this.validerRendezVous();
          } else {
            console.log('L\'email n\'existe pas dans la base de données.');
            // Si l'e-mail n'existe pas, affichez un message demandant à l'utilisateur de s'inscrire d'abord
            Swal.fire({
              icon: 'info',
              title: 'Inscription nécessaire',
              text: 'Vous devez d\'abord vous inscrire pour pouvoir prendre un rendez-vous.'
            });
          }
        },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de la vérification de l\'existence de l\'email : ', error);
        }
      );
    }
  }


  validerRendezVous(): void {
    if (this.rendezVous.nom && this.rendezVous.email && this.rendezVous.telephone && this.rendezVous.typeRendezVous && this.rendezVous.date && this.rendezVous.heureRv) {
      // Vérifiez d'abord si l'e-mail existe dans la base de données
      this.verifierExistenceEmail();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs du formulaire.'
      });
    }
  }
}
