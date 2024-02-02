import { AuthentificationService } from './../servicesSRNRV/authentification.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicesSRNRV/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit{



  nom: string = '';
  email: string = '';
  password: string = '';
  passwordConf: string = '';
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
  villes: any;
  hopitaux: any;
  secteursSpecialistes: any;
   // Variable booléenne pour contrôler l'affichage du pop-up
  //  showRolePopup: boolean = false;


  // Inscription du patient ou du medecin
  // Les variables
  isPatient:boolean = false;
  isMedecin:boolean = false;
  // idLastUser: number | undefined;
  tabUsers: any;
  router: any;




  // Les fonctions
  inscriptionMedecin(){
    this.isPatient = false;
    this.isMedecin = true;
  }

  inscriptionPatient(){
    this.isPatient = true;
    this.isMedecin = false;
  }
  // Variables pour faire la vérifications
  verifNom : string  =  "";
  verifPrenom : string = "";
  verifEmail : string = "";
  verifPassword : string = "";
  verifPasswordConf : string = "";
  verifAge: string ="";
  // verifAdresse : string = "";
  verifTelephone : string = "";
  verifImage : string = "";
  // verifRole : string = "";

  // Variables si les champs sont exacts
  exactNom : boolean = false;
  exactPrenom : boolean = false;
  exactEmail : boolean = false;
  exactPassword : boolean = false;
  exactPasswordConf : boolean = false;
  exactAge: boolean = false;
  // exactAdresse : boolean = false;
  exactTelephone : boolean = false;
  exactImage : boolean = false;
  exactRole : boolean = false;

  // titleFrm:string="Inscrivez-vous";
  // Variable pour la connexion
  emailCon : String = "";
  passwordCon: String = "";

  // Pour vérifier les champs pour la connexion
  verifEmailCon : String = "";
  verifPasswordCon: String = "";

  // Variables Si les valeurs sont exactes
  exactEmailCon : boolean = false;
  exactPasswordCon : boolean = false;
  constructor(private dataService: DataService , private authservice:AuthentificationService, private route:Router) {}

  ngOnInit(): void {
    console.log(this.dataService)
    if(!localStorage.getItem("userDAta")){
      // const userDataJSON = JSON.stringify(userData);
      localStorage.setItem('userData', JSON.stringify(this.dataService));
    }
    // this.resetFields();
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


  // Méthode pour sélectionner le rôle (médecin ou patient)
  roleSelected(role: string): void {
    console.log('Role sélectionné :', role);

    // Vous pouvez implémenter des actions en fonction du rôle sélectionné ici
  }
  inscription() {
    // Implémentez la logique d'inscription ici
    console.log('Méthode inscription() appelée.');

    // inscription() {
      // Création de l'objet représentant l'utilisateur à inscrire
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
        age: this.age,
      };

      // Appel du service d'authentification pour l'inscription
      this.authservice.inscriptionMedecin(userData).subscribe(
        (response: any) => {
          console.log(response);
          // Gérer la réponse réussie, par exemple, afficher un message de succès
          // Réinitialiser les champs du formulaire après une inscription réussie
          this.verifierChamps("Inscription réussie!", "", "success");
          this.resetFields();
        },
        (error: any) => {
          console.log(error);
          // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
          this.verifierChamps("Erreur lors de l'inscription", "Veuillez réessayer plus tard", "error");
        }
      );
      this.authservice.inscriptionPatient(userData).subscribe(
        (response: any) => {
          console.log(response);
          // Gérer la réponse réussie, par exemple, afficher un message de succès
          // Réinitialiser les champs du formulaire après une inscription réussie
          this.verifierChamps("Inscription réussie!", "", "success");
          this.resetFields();
        },
        (error: any) => {
          console.log(error);
          // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
          this.verifierChamps("Erreur lors de l'inscription", "Veuillez réessayer plus tard", "error");
        }
      );
    // }


    // const userdataI

  }


  connexion() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);

    const userData = {

      email: this.email,
      password: this.password,
      // telephone: this.telephone,
      // genre: this.genre,
      // role_id: this.role_id,
      // ville: this.ville,
      // secteur_activite: this.secteur_activite,
      // hopital: this.hopital,
      // poids: this.poids,
      // age: this.age,

    };
    this.authservice.connexion(userData).subscribe(
      (response:any) => {
        console.log( response);
        const userDataJSON = JSON.stringify(response);
        localStorage.setItem('userData', userDataJSON);
        this.resetFields();
        if(response.access_token.user.role_id===1){
          this.route.navigate(['dashboardAdmin']);
        }else if(response.access_token.user.role_id===2){
          this.route.navigate(['dashboardMed']);

        }else if(response.access_token.user.role_id===3){
          this.route.navigate(['dashboardPatient']);
        } else {
          // Redirection par défaut
          this.router.navigate(['/default-page']);
        }
      },
      (error:any) =>{
        console.log(error)
        console.error('Erreur de connexion : ', error);
      }
    )
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

  // inscription() {
  //   // Logique d'inscription
  // }

  annulerInscription() {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez annuler votre inscription",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'annule!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierChamps("Inscription annulée!", "", "success");
        this.resetFields();
      }
    });
  }

  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  verifNomFonction() {
    // Logique de vérification du nom
    this.exactNom = false;
    if(this.nom == ""){
      this.verifNom = "Veuillez renseigner votre nom";
    }
    else if (this.nom.length < 2 ){
      this.verifNom = "Le nom est trop court";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }

  // verifPrenomFonction() {
  //   // Logique de vérification du prénom
  // }

  verifEmailFonction() {
    // Logique de vérification de l'email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;

    if(this.email == ""){
      this.verifEmail = "Veuillez renseigner votre email";
    }
    else if (!this.email.match(emailPattern) ){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
  }

  verifEmailConFonction() {
    // Logique de vérification de l'email pour la connexion
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;

    if(this.email == ""){
      this.verifEmail = "Veuillez renseigner votre email";
    }
    else if (!this.email.match(emailPattern) ){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
  }
  verifAgeFonction() {
    if (this.age === null || this.age === undefined || isNaN(this.age)) {
      this.verifAge = "Veuillez entrer un âge valide";
      this.exactAge = false;
    } else if (this.age < 0 || this.age > 150) { // C'est un exemple arbitraire, ajustez selon vos besoins
      this.verifAge = "Veuillez entrer un âge valide (entre 0 et 150 ans)";
      this.exactAge = false;
    } else {
      this.verifAge = "";
      this.exactAge = true;
    }
  }

  verifAllEmailFonction(email: any, verifEmail: any, exactEmail: any) {
    // Logique de vérification de l'email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    exactEmail = false;

    if(email == ""){
      verifEmail = "Veuillez renseigner votre email";
    }
    else if (!email.match(emailPattern) ){
      verifEmail = "Veuillez donner un email valide";
    }
    else {
      verifEmail = "";
      exactEmail = true;
    }
  }

  verifPasswordFonction() {
    // Logique de vérification du mot de passe

    this.exactPassword = false;
    if(this.password == ""){
      this.verifPassword = "Veuillez renseigner votre mot de passe";
    }
    else if (this.password.length < 5 ){
      this.verifPassword = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPassword = "";
      this.exactPassword = true;
    }
  }

  verifPasswordConFonction() {
    // Logique de vérification du mot de passe pour la connexion
    this.exactPassword = false;
    if(this.password == ""){
      this.verifPassword = "Veuillez renseigner votre mot de passe";
    }
    else if (this.password.length < 5 ){
      this.verifPassword = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPassword = "";
      this.exactPassword = true;
    }
  }
  verifTelephoneFonction() {
    const phonePattern = /^\d{10}$/; // Cette expression régulière suppose que le numéro de téléphone doit avoir exactement 10 chiffres

    if (this.telephone === '') {
      this.verifTelephone = "Veuillez renseigner votre numéro de téléphone";
      this.exactTelephone = false;
    } else if (!phonePattern.test(this.telephone)) {
      this.verifTelephone = "Veuillez entrer un numéro de téléphone valide (10 chiffres)";
      this.exactTelephone = false;
    } else {
      this.verifTelephone = "";
      this.exactTelephone = true;
    }
  }

  validerInscription() {
    // Logique de validation et d'inscription
    this.verifEmailFonction();
    this.verifNomFonction();
    // this.verifPrenomFonction();
    this.verifPasswordFonction();
    // this.verifPasswordConfFonction();

    // Si les champs sont exacts, on ajoute le compte dans le tableau localStorage
    if(this.exactNom && this.exactPrenom && this.exactEmail && this.exactPassword ){
      let user = {
        // idUser:  this.idLastUser + 1,
        nom: this.nom,
        // prenom: this.prenom,
        email: this.email,
        password:  this.password,
        contacts: []
      }
      let userExist = this.tabUsers.find((elemt:any)=> elemt.email == this.email);

      if (userExist){
        // Est executé que si l'on trouve un compte avce le meme email que celui qui a été renseigné
        this.verifierChamps('Erreur!', 'Cet email est déjà utilisé', 'error');
      }
      else {
        // On crée le compte
        this.tabUsers.push(user);
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps('Felicitation!', 'Inscription reuissie', 'success');
        this.resetFields() ;
      }
      }
  }

  // connexion() {
  //   // Logique de connexion
  // }

  // resetFields() {
  //   // Réinitialisation des champs
  // }

}


