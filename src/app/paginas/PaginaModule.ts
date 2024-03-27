import { NgModule } from "@angular/core";
import { PagListaVehiculosComponent } from './PagListaVehiculos/PagListaVehiculos.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/pipes/UtilitariosModule";
import { PagVehiculoComponent } from "./PagVehiculo/PagVehiculo.component";
import { RouterModule } from "@angular/router";
import { PgVehiculoRegistroComponent } from "./PgVehiculoRegistro/PgVehiculoRegistro.component";
import { PgClientesComponent } from "./PgClientes/PgClientes.component";
import { PagDetalleVehiculoComponent } from "./PagDetalleVehiculo/PagDetalleVehiculo.component";
import { PagListaClientesComponent } from "./PagListaClientes/PagListaClientes.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UtilitariosModule,
        RouterModule,
        ReactiveFormsModule,
       
    ],
    declarations: [
        PagListaVehiculosComponent,
        PagListaClientesComponent,
        PagVehiculoComponent,
        PagDetalleVehiculoComponent,
        PgVehiculoRegistroComponent,
        PgClientesComponent,
        
    ],
    exports: [
        PagListaVehiculosComponent,
        PagListaClientesComponent,
        PagDetalleVehiculoComponent,
        PagVehiculoComponent,
        PgVehiculoRegistroComponent,
        PgClientesComponent
    ]
})

export class PaginaModule { }