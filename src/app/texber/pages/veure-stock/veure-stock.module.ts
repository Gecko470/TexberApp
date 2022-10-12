import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { VeureStockComponent } from './veure-stock/veure-stock.component';
import { VeureStockRoutingModule } from './veure-stock-routing.module';


@NgModule({
  declarations: [
    VeureStockComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VeureStockRoutingModule
  ]
})
export class VeureStockModule { }
