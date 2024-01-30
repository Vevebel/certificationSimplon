import { AuthentificationComponent } from './authentification/authentification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { LitesArticleComponent } from './lites-article/lites-article.component';
import { ContactComponent } from './contact/contact.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
// import { AuthentificationComponent } from './AuthentificationComponent/authentification.component';

const routes: Routes = [
  {path : '',redirectTo : 'accueil', pathMatch :'full' ,},
  {path : 'accueil', component : AccueilComponent,},
  {path : 'apropos', component : AproposComponent ,},
  {path : 'medecin', component : ListeMedecinsComponent,},
  {path : 'article', component : LitesArticleComponent,},
  {path : 'contact', component : ContactComponent,},
  {path : 'confidentialite', component : PolitiqueConfidentialiteComponent,},
  {path : 'login', component : AuthentificationComponent,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
  // {path : '', component : ,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
