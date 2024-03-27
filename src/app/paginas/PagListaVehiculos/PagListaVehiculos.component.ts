import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Vehiculo } from '../../utilitarios/pipes/modelos/Vehiculo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-PagListaVehiculos',
  templateUrl: './PagListaVehiculos.component.html',
  styleUrls: ['./PagListaVehiculos.component.css']
})
export class PagListaVehiculosComponent implements OnInit {

  public mostrarImagen = true;
  public ListaVehiculos: Array<Vehiculo> = [];


  //private _filtro: string = "";
  public rows: number = 10;
  public page: number = 1;
  public pages: number = 0;
  public filtro: string = "";

  /* get filtro() {
     return this._filtro
   }
 
   set filtro(data: string) {
     this._filtro = data;
   };
 */

  constructor(
    private _router: Router,
    private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.consultaVehiculos();
    /* this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(respuesta => {
       console.log(respuesta);
       this.ListaVehiculos = respuesta.data;
     })*/
  }


  mostrar() {
    this.mostrarImagen = !this.mostrarImagen
  }

  consultaVehiculos() {
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(respuesta => {
      if (respuesta.codigo == '1') {
        this.ListaVehiculos = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);
      }
    });
  };


  recepcion(dato: number) {
    console.log('Dato:', dato)
  }

  eliminar(codigo: string) {
    Swal.fire({
      title: "Estas seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then((res) => {
      if (res.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(data => {
          if (data.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Se elimino el vehículo con exito!",
              icon: "info"
            });
            //this._router.navigate(["/vehiculos"]);
            this.consultaVehiculos();
          }
        })

      }
    })
  }

  editar(codigo: string) {

    this._router.navigate(["detalle/"+codigo]);

  }

  cambiarpagina(pagina: number) {
    this.page = pagina;
    this.consultaVehiculos();
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
      this.consultaVehiculos();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultaVehiculos();
    }
  }

}
