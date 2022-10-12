import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeureStockComponent } from './veure-stock/veure-stock.component';

const routes: Routes = [  {
  path: '',
  children: [
    {path: 'stock', component: VeureStockComponent},
    {path: '**', redirectTo: 'stock'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeureStockRoutingModule { }