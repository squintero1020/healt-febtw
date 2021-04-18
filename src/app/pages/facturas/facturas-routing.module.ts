import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'EnviarFacturas',
        loadChildren:()=>import('./enviar-facturas/enviar-facturas.module').then(m=>m.EnviarFacturasModule)
      },
      {
        path:'FacturasTimbradas',
        loadChildren:()=>import('./facturas-timbradas/facturas-timbradas.module').then(m=>m.FacturasTimbradasModule)
      },
      {
        path:'AsociarAdjunto',
        loadChildren:()=>import('./asociar-adjunto/asociar-adjunto.module').then(m=>m.AsociarAdjuntoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
