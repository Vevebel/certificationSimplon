import { RendezVous } from './../modelSRS/rendezVous';
import { Component } from '@angular/core';
// import { RendezVous } from '../servicesSRNRV/rendezVous'; // Assurez-vous que le chemin vers le modèle est correct

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css']
})
export class PriseRdvComponent {
  // rendezVous: RendezVous = new RendezVous(); // Initialisez une instance du modèle

  constructor() {}

  onSubmit(): void {
    // Ici, vous pouvez soumettre les données du rendez-vous à votre service ou effectuer d'autres actions nécessaires
    // console.log('Rendez-vous soumis : ', this.rendezVous);
  }
}
