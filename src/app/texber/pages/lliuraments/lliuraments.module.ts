import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LliuramentsRoutingModule } from './lliuraments-routing.module';
import { DomiciliosEntregaComponent } from './domiciliosEntrega/domicilios-entrega/domicilios-entrega.component';
import { LliuramentsComponent } from './lliuraments/lliuraments.component';
import { HistoricoEntregasComponent } from './historico-entregas/historico-entregas.component';


@NgModule({
  declarations: [
    DomiciliosEntregaComponent,
    LliuramentsComponent,
    HistoricoEntregasComponent
  ],
  imports: [
    CommonModule,
    LliuramentsRoutingModule,
    ReactiveFormsModule
  ]
})
export class LliuramentsModule { }
