import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduccioComponent } from './produccio/produccio.component';

const routes: Routes = [ {
  path: '',
  children: [
    {path: 'produccio', component: ProduccioComponent},
    {path: '**', redirectTo: 'produccio'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccioRoutingModule { }
