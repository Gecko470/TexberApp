import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraspasMagatzemComponent } from './traspas-magatzem/traspas-magatzem.component';
import { TraspasMagatzemBisComponent } from './traspas-magatzem-bis/traspas-magatzem-bis.component';

const routes: Routes = [ {
  path: '',
  children: [
    {path: 'traspasmagatzem', component: TraspasMagatzemComponent},
    {path: 'traspasmagatzembis', component: TraspasMagatzemBisComponent},
    {path: '**', redirectTo: 'traspasmagatzem'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraspasMagatzemRoutingModule { }
