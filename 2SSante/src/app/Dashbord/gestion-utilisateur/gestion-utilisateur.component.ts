import { UsersService } from 'src/app/servicesSRNRV/users.service';
import { Users } from './../../modelSRS/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css']
})
export class GestionUtilisateurComponent implements OnInit {

  constructor(private userService: UsersService) { }

  dtOptions: DataTables.Settings = {};
  // users: any[] = [];
  user: Users = new Users();
  Users:any[] = [];
  listeUsers:any[]=[];

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
    // this.getUsers();
    this.listerDesUtilisateurs();
  }


  listerDesUtilisateurs() {
    // console.log(this.tabListProduit);
    this.userService.getUsers().subscribe((response) => {
      console.log('listeUsers',response );
      this.Users= response.users;
      console.log("new data",this.Users);
    });
  }
}
