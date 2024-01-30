import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './headerFooter/header/header.component';
import { FooterComponent } from './headerFooter/footer/footer.component';
// import { AuthentificationComponent } from './authentification/authentification.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { DetailMedecinsComponent } from './detail-medecins/detail-medecins.component';
import { AproposComponent } from './apropos/apropos.component';
import { DashboardPrincipalComponent } from './dashboard-principal/dashboard-principal.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { LitesArticleComponent } from './lites-article/lites-article.component';
import { ContactComponent } from './contact/contact.component';
import { PriseRdvComponent } from './prise-rdv/prise-rdv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationComponent } from './authentification/authentification.component';
import { DataService } from './servicesSRNRV/data.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    // AuthentificationComponent
    // AuthentificationComponent,
    PolitiqueConfidentialiteComponent,
    ListeMedecinsComponent,
    DetailMedecinsComponent,
    AproposComponent,
    DashboardPrincipalComponent,
    DetailsArticleComponent,
    LitesArticleComponent,
    ContactComponent,
    PriseRdvComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
