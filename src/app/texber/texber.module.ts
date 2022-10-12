import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TexberRoutingModule } from './texber-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { EntradasModule } from './pages/entradas/entradas.module';
import { LliuramentsModule } from './pages/lliuraments/lliuraments.module';
import { VeureStockModule } from './pages/veure-stock/veure-stock.module';
import { ConsumsModule } from './pages/consums/consums.module';
import { ProduccioModule } from './pages/produccio/produccio.module';
import { TraspasMagatzemModule } from './pages/traspas-magatzem/traspas-magatzem.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TexberRoutingModule,
    EntradasModule,
    LliuramentsModule,
    VeureStockModule,
    ConsumsModule,
    ProduccioModule,
    TraspasMagatzemModule
  ]
})
export class TexberModule { }
