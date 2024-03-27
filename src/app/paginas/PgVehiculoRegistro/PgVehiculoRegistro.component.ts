import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgVehiculoRegistro',
  templateUrl: './PgVehiculoRegistro.component.html',
  styleUrls: ['./PgVehiculoRegistro.component.css']
})
export class PgVehiculoRegistroComponent implements OnInit {


  formulario: FormGroup;

  constructor(
    private _router: Router,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) {



    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required]],
      "marca": ['', [Validators.required]],
      "color": [], //Muestra de funcionamiento sin requerimiento
      "modelo": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": ['', [Validators.required]],
      "foto": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "calificacion": ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.insertVehiculo({ ...this.formulario.value }).subscribe(
        respuesta => {
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Se guardo con exito!",
              icon: "info"
            });
            this._router.navigate(["/vehiculos"]);
          } else {

            Swal.fire({
              title: "Mensaje",
              text: "No se guardo con exito!" + respuesta.mensaje,
              icon: "error"
            });

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
