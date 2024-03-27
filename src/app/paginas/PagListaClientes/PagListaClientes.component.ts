import { Component, OnInit } from '@angular/core';
import { Clientet } from '../../utilitarios/pipes/modelos/Cliente';
import { Cliente, ClientesService } from '../../servicios/Clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagListaClientes',
  templateUrl: './PagListaClientes.component.html',
  styleUrls: ['./PagListaClientes.component.css']
})
export class PagListaClientesComponent implements OnInit {

  public ListaClientes: Array<Clientet> = [];
  Clientet: any;

  public rows: number = 10;
  public page: number = 1;
  public pages: number = 0;
  public filtro: string = "";


  constructor(
    private _router: Router,
   
    private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.consultaClientes();
    //this.clienteService.getUsers(this.filtro,this.rows,this.page ).subscribe(respuesta => {
    //  console.log(respuesta);
     // this.ListaClientes= respuesta.data;})
  }

  consultaClientes() {
    this.clienteService.getUsers(this.filtro,this.rows,this.page).subscribe(cliente => {
      if (cliente.codigo == '1') {
        this.ListaClientes = cliente.data;
        this.pages = cliente.pages;
        this.paginar(cliente.pages);
      }
    });
  };

 /* eliminar(codigo: string) {
     Swal.fire({
       title: "Estas seguro que deseas eliminar este registro?",
       showCancelButton: true,
       confirmButtonText: "Si",
       cancelButtonText: "No",
       icon: "question"
     }).then((res) => {
       if (res.isConfirmed) {
         this.clienteService.eliminarusuario(codigo).subscribe(cliente => {
           if (cliente.codigo == '1') {
             Swal.fire({
               title: "Mensaje",
               text: "Se elimino el vehículo con exito!",
               icon: "info"
             });
             this._router.navigate(["/listaclientes"]);
           }
         })
 
       }
     })
  }*/

  editar(id: string) {

    this._router.navigate(["listaclientes/"+id]);

  }

  cambiarpagina(pagina: number) {
    this.page = pagina;
    this.consultaClientes();
  }


  listadePagina: Array<number> = [];

  paginar(pages: number) {
    this.listadePagina = [];
    for (let i = 1; i <= pages; i++) {
      this.listadePagina.push(i);
    }
  }

  siguiente() {
    if (this.page < this.pages) {
      this.page++;
     this.consultaClientes();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultaClientes();
    }
  }

}
