import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from '../../interceptores/UserInterceptor.service';
import { PagListaClientesComponent } from '../../paginas/PagListaClientes/PagListaClientes.component';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports:[]
 
})
export class ClientesModule { }
