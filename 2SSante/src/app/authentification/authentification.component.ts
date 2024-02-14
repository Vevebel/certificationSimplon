import { secteur_activite } from './../modelSRS/typesVHS';
import { hopital } from './../modelSRS/hopital';
import { ville } from './../modelSRS/ville';
import { AuthentificationService } from './../servicesSRNRV/authentification.service';
import { Component, OnInit } from '@angular/core';
// import { DataService } from '../servicesSRNRV/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataService } from '../servicesSRNRV/data.service';

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
  ville: Number = 0;
  secteur_activites: string = '';
  hopital: string = '';
  poids: number = 0;
  age: number = 0;
  showConnexion: boolean = true;
  titleFrm: string = ''; // Ajout de la propriété titleFrm
  // villes: any;
  // hopitaux: any;
  // secteur_actives: any;


  // villes: any[];
  // hopitals: any[];
  // secteurs_activites:
  // any[];
  villes: any;
  hopitals: any;
  secteur_activite: any;

  // Inscription du patient ou du medecin
  // Les variables
  isPatient:boolean = false;
  isMedecin:boolean = false;
  // idLastUser: number | undefined;
  tabUsers: any;
  router: any;

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

  userConnected: string = ""


  // constructor(private dataService: DataService, private authservice: AuthentificationService, private route: Router) {}
constructor( private dataservice:DataService, private authservice: AuthentificationService, private route: Router) {}

  // constructor(private dataService: DataService , private authservice:AuthentificationService, private route:Router) {}

  ngOnInit(): void {
    console.log(this.dataservice)
    if(!localStorage.getItem("userDAta")){
      // const userDataJSON = JSON.stringify(userData);
      localStorage.setItem('userData', JSON.stringify(this.userConnected));
    }
    this.resetFields();
    this.dataservice.getVilles().subscribe((villes: any) => {
      this.villes = villes;
    });

    this.dataservice.getHopitaux().subscribe((hopitaux: any) => {
      this.hopitals = hopitaux;
    });

    console.log("Les spécialistes")
    // this.loadSpecialites();
    this.loadVilles();
    this.loadHopitaux();
    this.loadSecteursActivites();
   }

  loadVilles(): void {
    this.authservice.getVilles().subscribe((ville: any[]) => {
      this.villes = ville;
      this.villes = this.villes.villes;
      console.log("Les villes");
      console.log(ville);

    });
  }

  loadHopitaux(): void {
    this.authservice.getHopitaux().subscribe((hopitaux: any[]) => {
      this.hopitals = hopitaux;
      this.hopitals=this.hopitals.hopitals;
      console.log(this.hopitals);

    });
  }

  loadSecteursActivites():void {
    this.authservice.getSecteurs_actives().subscribe((secteurs: any[]) => {
      this.secteur_activite = secteurs;
      this.secteur_activite=this.secteur_activite.secteur_actives;
      console.log(this.secteur_activite);

    });
    // });
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


  inscriptionMedecin() {
    // Création de l'objet représentant l'utilisateur à inscrire
    const userData = {
        nom: this.nom,
        email: this.email,
        password: this.password,
        password_confirmation:this.passwordConf,
        telephone: this.telephone,
        genre: this.genre,
        role_id: this.role_id,
        ville_id: this.ville,
        secteur_activite_id: this.secteur_activite,
        hopital_id: this.hopital,
        // poids: this.poids,
        // age: this.age,
        statut: 'en_attente',
    };
    // inscriptionMedecin(){
      this.isPatient = false;
      this.isMedecin = true;

    // Appel du service d'authentification pour l'inscription du médecin
    this.authservice.inscriptionMedecin(userData).subscribe(
        (response: any) => {
            console.log(response);
            if (response.success) {
                // Gérer l'inscription réussie du médecin
                this.verifierChamps("Inscription réussie! , Votre compte sera actif dans 24H", "", "success");
                this.resetFields();
            } else {
                // Gérer les cas où l'inscription du médecin a échoué
                this.verifierChamps("Inscription réussie! , Votre compte sera actif dans 24H", "", "success",);
                this.resetFields();
            }
        },
        (error: any) => {
            console.error("Erreur lors de l'inscription du médecin :", error);
           this.resetFields();
          }
    );
}

inscriptionPatient() {
    // Création de l'objet représentant l'utilisateur à inscrire
    const userData = {
        nom: this.nom,
        email: this.email,
        password: this.password,
        password_confirmation:this.passwordConf,
        telephone: this.telephone,
        genre: this.genre,
        role_id: this.role_id,
        ville_id: this.ville,
        // secteur_active_id: this.secteur_activite,
        // hopital_id: this.hopital,
        // poids: this.poids,
        // age: this.age,
        // statut: 'en_attente',
    };


    // inscriptionPatient(){
      this.isPatient = true;
      this.isMedecin = false;
    // }
    // Appel du service d'authentification pour l'inscription du patient
    this.authservice.inscriptionPatient(userData).subscribe(
        (response: any) => {
            console.log(response);
            if (response.success) {
                // Gérer l'inscription réussie du patient
                this.verifierChamps("Inscription réussie!", "", "success");
                this.resetFields();
            } else {
                // Gérer les cas où l'inscription du patient a échoué
                this.verifierChamps("Inscription réussie!", "", "success");
                this.resetFields();
            }
        },
        (error: any) => {
            console.error("Erreur lors de l'inscription du patient :", error);
        }
    );
}

inscription() {
    // Déterminer si l'inscription est pour un médecin ou un patient
    if (this.isMedecin) {
        this.inscriptionMedecin();
    } else if (this.isPatient) {
        this.inscriptionPatient();
    }
}

  connexion() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);

    const userData = {

      email: this.email,
      password: this.password,

    };
    this.authservice.connexion(userData).subscribe(
      (response:any) => {
        console.log( response);
        const userDataJSON = JSON.stringify(response);
        let tokenC = response.access_token.token;
        let user = response.access_token.user;
        this.authservice.setToken(tokenC);
        // localStorage.setItem('token', response.acces_token.token)
        // On met à jour le localstorage en lui donnant les infos de l'utilisateur connecté
        localStorage.setItem('userData', JSON.stringify(user));
        // console.log(response.access_token.token
        //   );

        // localStorage.setItem('userData', userDataJSON);
        // this.resetFields();
        // this.authservice.setToken(response.access_token.access_token.token)
        if(user.role=='admin'){
          // alert('admin')
          this.route.navigate(['/dashboardAdmin']);
           this.verifierChamps("Connexion réussie!", "", "success");
                this.resetFields();
        }else if(user.role=='medecin'){
          this.route.navigate(['/dashboardMed']);
          this.verifierChamps("Connexion réussie!", "", "success");
          this.resetFields();
          // alert('medecin')

        }else if(user.role=='patient'){
          this.route.navigate(['/dashboardPatient']);
          this.verifierChamps("Connexion réussie!", "", "success");
          this.resetFields();
          // alert('patient')
        } else {
          // Redirection par défaut
          this.route.navigate(['/accueil']);
          // alert('aucun')
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
    this.ville = 0;
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
    else if (this.nom.length < 4 ){
      this.verifNom = "Le nom est trop court";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }

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
  verifPasswordConfFonction() {
    // Logique de vérification de la confirmation du mot de passe
    this.exactPasswordConf = false;
    if(this.passwordConf === "") {
      this.verifPasswordConf = "Veuillez confirmer votre mot de passe";
    } else if (this.password !== this.passwordConf) {
      this.verifPasswordConf = "La confirmation du mot de passe ne correspond pas";
    } else {
      this.verifPasswordConf = "";
      this.exactPasswordConf = true;
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
    this.verifPasswordConfFonction();

    // Si les champs sont exacts, on ajoute le compte dans le tableau localStorage
    if(this.exactNom && this.exactPrenom && this.exactEmail && this.exactPassword && this.exactPasswordConf ){
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



}



