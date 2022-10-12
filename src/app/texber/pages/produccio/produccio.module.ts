import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProduccioRoutingModule } from './produccio-routing.module';
import { ProduccioComponent } from './produccio/produccio.component';


@NgModule({
  declarations: [
    ProduccioComponent
  ],
  imports: [
    CommonModule,
    ProduccioRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProduccioModule { }
