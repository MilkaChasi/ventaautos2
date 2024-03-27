import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/pipes/modelos/Vehiculo';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-PagVehiculo',
  templateUrl: './PagVehiculo.component.html',
  styleUrls: ['./PagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {


  formulario: FormGroup;

  vehiculo?: Vehiculo = {
    codigo: "",
    color: "",
    marca: "",
    modelo: "" 
  };

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
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
          this.formulario.controls['Kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        }

      });
    });
  }

  goRegresar(): void {
    this._router.navigate(['/vehiculos']);
  }

  imprimir(data: number) {
    console.log('Calificacion:', data)
  }
}
