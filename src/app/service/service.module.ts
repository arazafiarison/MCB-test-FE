import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationServiceProvider } from './authentication/authentication.service.provider';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { RegionServiceProvider } from './region/region.service.provider';
import { TransactionServiceProvider } from './transaction/transaction.service.provider';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.restApiUrl],
        disallowedRoutes: [environment.signInUrl],
      },
    }),
  ],
  providers: [
    ...AuthenticationServiceProvider,
    ...RegionServiceProvider,
    ...TransactionServiceProvider
  ]
})
export class ServiceModule { }
