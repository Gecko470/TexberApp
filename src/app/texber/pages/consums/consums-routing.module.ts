import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumsBisComponent } from './consums-bis/consums-bis.component';
import { ConsumsComponent } from './consums/consums.component';

const routes: Routes = [  {
  path: '',
  children: [
    {path: 'consums', component: ConsumsComponent},
    {path: 'consumsbis', component: ConsumsBisComponent},
    {path: '**', redirectTo: 'consums'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumsRoutingModule { }
