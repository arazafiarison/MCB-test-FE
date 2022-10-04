import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRestServiceProvider } from './authentication/authentication-rest.service.provider';
import { RegionRestServiceProvider } from './region/region-rest.service.provider';
import { TransactionRestServiceProvider } from './transaction/transaction-rest.service.provider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...AuthenticationRestServiceProvider,
    ...RegionRestServiceProvider,
    ...TransactionRestServiceProvider
  ]
})
export class ServiceRestModule { }
