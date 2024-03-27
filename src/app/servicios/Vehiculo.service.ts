import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/pipes/modelos/Vehiculo';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";


  getVehiculos(filtro?: string, rows?: number, page?: number): Observable<Respuesta> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;

    /*return this.http.get<Respuesta>(this.baseUrl + "vehiculos/", { params: body }).pipe(
      map(respuesta => respuesta.data)
    );*/

    return this.http.get<Respuesta>(this.baseUrl + "vehiculos/", { params: body });
  }

  insertVehiculo(vehiculo: Vehiculo) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<Respuesta>(this.baseUrl + "vehiculo/", vehiculo, httpOptions)
  }


  getVehiculo(codigo: string) {
    return this.http.get<Respuesta>(this.baseUrl + "vehiculo/" + codigo)
  }

  actualizarVehiculo(vehiculo: Vehiculo, codigo: string) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put<Respuesta>(this.baseUrl + "vehiculo/" + codigo, vehiculo, httpOptions)
  }

  eliminarVehiculo(codigo: string) {
    return this.http.delete<Respuesta>(this.baseUrl + "vehiculo/" + codigo)
  }



  private ListaVehiculos: Array<Vehiculo> = [
    { "codigo": "A001", "marca": "CHEVROLET", "modelo": "ONIX-6", "color": "AZUL", "kilometraje": "20500", "precio": 17000, "foto": "https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/cars/2024-onix/colorizer/01-images/azul-cobalto-metalico.jpg?imwidth=600", "anio": 2024, "calificacion": 5 },
    { "codigo": "A002", "marca": "KIA", "modelo": "RIO-2", "color": "ROJO", "kilometraje": "700", "precio": 14000, "foto": "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/2381111107137181600x1060.jpg?itok=ggvBN3_E", "anio": 2024, "calificacion": 4 },
    { "codigo": "A003", "marca": "CHERY", "modelo": "ARRIZO-5", "color": "PLATA", "kilometraje": "40500", "precio": 16000, "foto": "https://www.chery.com.ec/hubfs/CHERY/WEB%202023/Arrizo%205%20Pro/arrizo-5-pro-front_webp.webp", "anio": 2023, "calificacion": 3 },
    { "codigo": "A004", "marca": "TOYOTA", "modelo": "AGYA", "color": "GRIS", "kilometraje": "0", "precio": 15000, "foto": "https://www.toyota.com.ec//admin/sites/default/files/2023-09/agya-home-toyota.png", "anio": 2023, "calificacion": 5 },
    { "codigo": "A005", "marca": "HYUNDAI", "modelo": "ACCENT", "color": "VERDE OLIVO", "kilometraje": "50000", "precio": 18000, "foto": "https://www.hyundai.com.ec/static/media/rendimiento1.83996f9ee669ddf96a8b.webp", "anio": 2024, "calificacion": 2 },
    { "codigo": "A006", "marca": "HYUNDAI", "modelo": "ACCENT", "color": "AZUL ELECTRICO", "kilometraje": "20000", "precio": 15000, "foto": "https://www.hyundai.com.ec/static/media/2.369e9d5ecfca528a990d.webp", "anio": 2024, "calificacion": 3 },

  ];


}


export interface Respuesta {

  codigo: string;
  mensaje: string;
  data: any;
  rows: number;
  pages: number;
  records: number;
  page: number;

}

