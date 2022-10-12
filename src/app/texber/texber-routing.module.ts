import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { VeureStockComponent } from './pages/veure-stock/veure-stock/veure-stock.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'entradas', loadChildren: () => import('./pages/entradas/entradas.module').then(m => m.EntradasModule)},
      { path: 'consums', loadChildren: () => import('./pages/consums/consums.module').then(m => m.ConsumsModule) },
      { path: 'lliuraments', loadChildren: () => import('./pages/lliuraments/lliuraments.module').then(m => m.LliuramentsModule) },
      { path: 'produccio', loadChildren: () => import('./pages/produccio/produccio.module').then(m => m.ProduccioModule) },
      { path: 'traspasmagatzem', loadChildren: () => import('./pages/traspas-magatzem/traspas-magatzem.module').then(m => m.TraspasMagatzemModule) },
      { path: 'stock', loadChildren: () => import('./pages/veure-stock/veure-stock.module').then(m => m.VeureStockModule) },
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TexberRoutingModule { }
