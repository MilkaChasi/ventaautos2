import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListaVehiculosComponent } from './paginas/PagListaVehiculos/PagListaVehiculos.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { PgVehiculoRegistroComponent } from './paginas/PgVehiculoRegistro/PgVehiculoRegistro.component';
import { PgClientesComponent } from './paginas/PgClientes/PgClientes.component';
import { PagDetalleVehiculoComponent } from './paginas/PagDetalleVehiculo/PagDetalleVehiculo.component';
import { PagListaClientesComponent } from './paginas/PagListaClientes/PagListaClientes.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "vehiculos",
    component: PagListaVehiculosComponent
  },
  {
    path: "listaclientes",
    component: PagListaClientesComponent
  },
  {
    path: "vehiculo",
    component: PgVehiculoRegistroComponent
  },
  {
    path: "vehiculo/:codigo",
    component: PagVehiculoComponent
  },
  {
    path: "detalle/:codigo",
    component: PagDetalleVehiculoComponent
  },
  {
    path: "clientes",
    component: PgClientesComponent
  },
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: HomeComponent,
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
