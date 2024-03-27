import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/pipes/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagDetalleVehiculo',
  templateUrl: './PagDetalleVehiculo.component.html',
  styleUrls: ['./PagDetalleVehiculo.component.css']
})
export class PagDetalleVehiculoComponent implements OnInit {

  vehiculo?: Vehiculo;

  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": [],
      "marca": [],
      "color": [],
      "modelo": [],
      "kilometraje": [],
      "precio": [],
      "foto": [],
      "anio": [],
      "calificacion": []
    });
    this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        if (data.codigo == '1') {
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['foto'].setValue(this.vehiculo?.foto);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['color'].setValue(this.vehiculo?.color);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        } else {
          Swal.fire({
            title: "Mensaje",
            text: "No se pudo cargar la informacion!",
            icon: "error"
          });
        }

      });
    });

  }

  guardar1() {

    //this.vehiculoService.addVehiculo(vehiculo);
    if (this.formulario.valid) {

      this.vehiculoService.actualizarVehiculo({ ...this.formulario.value }, this.formulario.controls['codigo'].value).subscribe(
        data => {
          if (data.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Se actualizo con exito!",
              icon: "info"
            });
            this._router.navigate(["/vehiculos"]);
          }
        }
      );

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "FALTAN CAMPOS POR REGISTRAR!",
      });
    };
  }

}
