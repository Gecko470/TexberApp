import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumsRoutingModule } from './consums-routing.module';
import { ConsumsComponent } from './consums/consums.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsumsBisComponent } from './consums-bis/consums-bis.component';


@NgModule({
  declarations: [
    ConsumsComponent,
    ConsumsBisComponent
  ],
  imports: [
    CommonModule,
    ConsumsRoutingModule,
    ReactiveFormsModule,
  
  ]
})
export class ConsumsModule { }
