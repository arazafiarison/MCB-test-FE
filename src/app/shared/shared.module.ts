import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRestServiceProvider } from './service/http-rest/http-rest.service.provider';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ...HttpRestServiceProvider
  ]
})
export class SharedModule { }
