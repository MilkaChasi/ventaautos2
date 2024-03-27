import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientesService } from '../../servicios/Clientes.service';

@Component({
  selector: 'app-PgClientes',
  templateUrl: './PgClientes.component.html',
  styleUrls: ['./PgClientes.component.css']
})
export class PgClientesComponent implements OnInit {

  formularioCliente: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private _router: Router,
  ) {


    this.formularioCliente = this.formBuilder.group({
      "nombre": ['', [Validators.required]],
      "apellido": [],
      "password": ['', [Validators.required]],
      "telefono": [],
      "email": [],
      "quiereContacto": [false]


    });
  }

  ngOnInit(): void { }


  goInicio(): void {
    this._router.navigate(['/home']);
  }

  registra(): void {
    if (this.formularioCliente.valid) {
      this.clienteService.addUser({ ...this.formularioCliente.value }).subscribe(
        respuesta => {
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Se guardo con exito!",
              icon: "info"
            });
            this._router.navigate(["/home"]);
            console.log(this.formularioCliente.value);

          } else {

            Swal.fire({
              title: "Mensaje",
              text: `No se guardo con exito!` + respuesta.mensaje,
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

  toggleContacto() {
    const quiereContacto = this.formularioCliente.get('quiereContacto');
    if (quiereContacto) {
      this.formularioCliente.get('email')?.enable();
      this.formularioCliente.get('telefono')?.enable();
      this.formularioCliente.get('email')?.setValidators([Validators.required]);
      this.formularioCliente.get('telefono')?.setValidators([Validators.required]);
    } else {
      this.formularioCliente.get('email')?.disable();
      this.formularioCliente.get('telefono')?.disable();
      this.formularioCliente.get('email')?.clearValidators();
      this.formularioCliente.get('telefono')?.clearValidators();
    }
  }



}
