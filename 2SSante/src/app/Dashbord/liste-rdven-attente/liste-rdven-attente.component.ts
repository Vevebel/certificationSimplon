import { Component, OnInit } from '@angular/core';
import { RendezVousService } from 'src/app/servicesSRNRV/rendez-vous.service';

@Component({
  selector: 'app-liste-rdven-attente',
  templateUrl: './liste-rdven-attente.component.html',
  styleUrls: ['./liste-rdven-attente.component.css']
})
export class ListeRDVEnAttenteComponent implements OnInit {
  // export class RendezVousComponent implements OnInit {
    rendezVousList: any[] = [];

    constructor(private rendezVousService: RendezVousService) { }

    ngOnInit(): void {
      this.loadRendezVous();
    }

    loadRendezVous() {
      this.rendezVousService.getRendezVousList().subscribe((data: any[]) => {
        this.rendezVousList = data;
      });
    }

    acceptRendezVous(id: number) {
      // Vous pouvez implémenter ici la logique pour accepter le rendez-vous
      console.log("Rendez-vous accepté : ", id);
    }

    refuseRendezVous(id: number) {
      // Vous pouvez implémenter ici la logique pour refuser le rendez-vous
      console.log("Rendez-vous refusé : ", id);
    }

    showDetails(id: number) {
      // Vous pouvez implémenter ici la logique pour afficher les détails du rendez-vous
      console.log("Détails du rendez-vous : ", id);
    }
}
