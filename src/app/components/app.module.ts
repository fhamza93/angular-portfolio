import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../../environment/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PasswordModule } from 'primeng/password';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './features/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { CatalogComponent } from './features/dashboard-content/catalog/catalog.component';
import { BestsellerComponent } from './features/dashboard-content/bestseller/bestseller.component';
import { OffersComponent } from './features/dashboard-content/offers/offers.component';
import { WhoWeAreComponent } from './features/dashboard-content/who-we-are/who-we-are.component';
import { ContactsComponent } from './features/dashboard-content/contacts/contacts.component';
import { MatButtonModule } from '@angular/material/button';
import { BooksTableComponent } from './common/books-table/books-table.component';
import { NewBookComponent } from './features/dashboard-content/new-book/new-book.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoadingComponent } from './common/loading/loading.component';
import { BookDetailsComponent } from './common/book-details/book-details.component';
import { PersonalComponent } from './features/dashboard-content/personal/personal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { PersonalSellerComponent } from './features/dashboard-content/personal/personal-seller/personal-seller.component';
import { PersonalBuyerComponent } from './features/dashboard-content/personal/personal-buyer/personal-buyer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    CatalogComponent,
    BestsellerComponent,
    OffersComponent,
    WhoWeAreComponent,
    ContactsComponent,
    BooksTableComponent,
    NewBookComponent,
    LoadingComponent,
    BookDetailsComponent,
    PersonalComponent,
    PersonalSellerComponent,
    PersonalBuyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    InputNumberModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
