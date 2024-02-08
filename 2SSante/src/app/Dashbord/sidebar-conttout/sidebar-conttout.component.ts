import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-conttout',
  templateUrl: './sidebar-conttout.component.html',
  styleUrls: ['./sidebar-conttout.component.css']
})
export class SidebarConttoutComponent  implements OnInit {
 // Inscription du patient ou du medecin
  // Les variables

  isPatient:boolean = false;
  isMedecin:boolean = false;
  isAdmin:boolean=false;
  // idLastUser: number | undefined;
  tabUsers: any;



  // Les fonctions
  ConnexionMedecin(){
    this.isPatient = false;
    this.isMedecin = true;
    this.isAdmin=false;
  }

  ConnexionPatient(){
    this.isPatient = true;
    this.isMedecin = false;
    this.isAdmin=false;
  }
  ConnexionAdmin(){
    this.isPatient = false;
    this.isMedecin = false;
    this.isAdmin=true;
  }
  userConnecte:any;
  user:any;


    ngOnInit(): void {
      this.userConnecte=JSON.parse(localStorage.getItem('userData') || "");
      this.user = this.userConnecte.access_token.user;
      if(this.user.role_id === 1){
        this.ConnexionAdmin();
      }else if(this.user.role_id ===2){
        this.ConnexionMedecin();
      }else if(this.user.role_id ===3){
        this.ConnexionPatient();
      }
    }

}
