import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraspasMagatzemRoutingModule } from './traspas-magatzem-routing.module';
import { TraspasMagatzemComponent } from './traspas-magatzem/traspas-magatzem.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TraspasMagatzemBisComponent } from './traspas-magatzem-bis/traspas-magatzem-bis.component';


@NgModule({
  declarations: [
    TraspasMagatzemComponent,
    TraspasMagatzemBisComponent
  ],
  imports: [
    CommonModule,
    TraspasMagatzemRoutingModule,
    ReactiveFormsModule
  ]
})
export class TraspasMagatzemModule { }
