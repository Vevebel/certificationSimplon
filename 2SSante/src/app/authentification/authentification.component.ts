import { Component } from '@angular/core';
import { DataService } from '../servicesSRNRV/data.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  nom: string = '';
  email: string = '';
  password: string = '';
  telephone: string = '';
  genre: string = '';
  role_id: number = 0;
  ville: string = '';
  secteur_activite: string = '';
  hopital: string = '';
  poids: number = 0;
  age: number = 0;
  showConnexion: boolean = true;
  titleFrm: string = ''; // Ajout de la propriété titleFrm
  // villes: any[] = [];
  // hopitaux: any[] = [];
  // secteursSpecialistes: any[] = [];

  // constructor(private dataService: DataService) {}

  // ngOnInit(): void {
  //   this.getVilles();
  //   this.getHopitaux();
  //   this.getSecteursSpecialistes();
  // }
  // getVilles(): void {
  //   this.dataService.getVilles().subscribe(villes => this.villes = villes);
  // }

  // getHopitaux(): void {
  //   this.dataService.getHopitaux().subscribe(hopitaux => this.hopitaux = hopitaux);
  // }

  // getSecteursSpecialistes(): void {
  //   this.dataService.getSecteursSpecialistes().subscribe(secteurs => this.secteursSpecialistes = secteurs);
  // }
  villes: any;
  hopitaux: any;
  secteursSpecialistes: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getVilles().subscribe((villes: any) => {
      this.villes = villes;
    });

    this.dataService.getHopitaux().subscribe((hopitaux: any) => {
      this.hopitaux = hopitaux;
    });

    this.dataService.getSecteursSpecialistes().subscribe((secteurs: any) => {
      this.secteursSpecialistes = secteurs;
    });
  }
  afficherFrmConnexion() {
    this.showConnexion = !this.showConnexion;
    this.titleFrm = this.showConnexion ? "" : ""; // Vous devez définir la logique ici
  }
  inscription() {
    // Implémentez la logique d'inscription ici
    console.log('Méthode inscription() appelée.');
  }


  connexion() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);

    const userData = {
      nom: this.nom,
      email: this.email,
      password: this.password,
      telephone: this.telephone,
      genre: this.genre,
      role_id: this.role_id,
      ville: this.ville,
      secteur_activite: this.secteur_activite,
      hopital: this.hopital,
      poids: this.poids,
      age: this.age
    };

    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem('userData', userDataJSON);
    this.resetFields();
  }

  resetFields() {
    this.nom = '';
    this.email = '';
    this.password = '';
    this.telephone = '';
    this.genre = '';
    this.role_id = 0;
    this.ville = '';
    this.secteur_activite = '';
    this.hopital = '';
    this.poids = 0;
    this.age = 0;
  }

  onProfilePicSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Do something with the selected profile picture
    }
  }
}
