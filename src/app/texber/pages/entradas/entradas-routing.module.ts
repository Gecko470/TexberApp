import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionNotaComponent } from './gestion-nota/gestion-nota.component';
import { LineaNotaComponent } from './linea-nota/linea-nota.component';
import { ListaProveedoresComponent } from './listaProveedores/listaProveedores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'listaProveedores', component: ListaProveedoresComponent},
      {path: 'gestionNota', component: GestionNotaComponent},
      {path: 'lineaNota', component: LineaNotaComponent},
      {path: '**', redirectTo: 'listaProveedores'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { 

}
