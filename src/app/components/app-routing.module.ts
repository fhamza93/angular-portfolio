import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component'; 
import { AuthGuard } from '../guard/auth/auth.guard';
import { CatalogComponent } from './features/dashboard-content/catalog/catalog.component';
import { BestsellerComponent } from './features/dashboard-content/bestseller/bestseller.component';
import { OffersComponent } from './features/dashboard-content/offers/offers.component';
import { WhoWeAreComponent } from './features/dashboard-content/who-we-are/who-we-are.component';
import { ContactsComponent } from './features/dashboard-content/contacts/contacts.component';
import { NewBookComponent } from './features/dashboard-content/new-book/new-book.component';
import { BookDetailsComponent } from './common/book-details/book-details.component';
import { PersonalComponent } from './features/dashboard-content/personal/personal.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
    children: [
    { path: 'catalogo', component: CatalogComponent, canActivate: [AuthGuard] },
    { path: 'nuovo_libro', component: NewBookComponent, canActivate: [AuthGuard] },
    { path: 'bestseller', component: BestsellerComponent, canActivate: [AuthGuard] },
    { path: 'offerte', component: OffersComponent, canActivate: [AuthGuard] },
    { path: 'personale', component: PersonalComponent, canActivate: [AuthGuard] },
    { path: 'chi_siamo', component: WhoWeAreComponent, canActivate: [AuthGuard] },
    { path: 'contatti', component: ContactsComponent, canActivate: [AuthGuard] }]
  },
  { path: 'libro/:isbn', component: BookDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
