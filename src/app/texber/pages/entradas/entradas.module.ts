import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaProveedoresComponent } from './listaProveedores/listaProveedores.component'
import { EntradasRoutingModule } from './entradas-routing.module';
import { LineaNotaComponent } from './linea-nota/linea-nota.component';
import { GestionNotaComponent } from './gestion-nota/gestion-nota.component';


@NgModule({
  declarations: [
    ListaProveedoresComponent,
    LineaNotaComponent,
    GestionNotaComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule
  ]
})
export class EntradasModule { }
