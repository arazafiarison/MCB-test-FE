import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './config/guard/authenticated.guard';
import { AuthenticationGuard } from './config/guard/authentication.guard';
import { CoreComponent } from './view/core/core.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { TransactionFormComponent } from './view/transaction/transaction-form/transaction-form.component';
import { TransactionListComponent } from './view/transaction/transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { 
        path: '', component: CoreComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'transaction/list', component: TransactionListComponent },
          { path: 'transaction/form', component: TransactionFormComponent }
        ]
      }
    ],
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'signIn',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
