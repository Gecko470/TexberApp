import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LliuramentsComponent } from './lliuraments/lliuraments.component';
import { DomiciliosEntregaComponent } from './domiciliosEntrega/domicilios-entrega/domicilios-entrega.component';
import { HistoricoEntregasComponent } from './historico-entregas/historico-entregas.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: 'lliuraments/:resp', component: LliuramentsComponent},
    {path: 'domiciliosEntrega/:codCliente', component: DomiciliosEntregaComponent},
    {path: 'histEntregas/:codArticulo', component: HistoricoEntregasComponent},
    {path: '**', redirectTo: 'lliuraments'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LliuramentsRoutingModule { }
