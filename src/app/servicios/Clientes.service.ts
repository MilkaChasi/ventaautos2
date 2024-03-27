import { HttpClient } from '@angular/common/http';
import { Injectable, importProvidersFrom } from '@angular/core';
import { Clientet } from '../utilitarios/pipes/modelos/Cliente';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";


  getUsers(filtro?: string, rows?: number, page?: number): Observable<Cliente> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;


    return this.http.get<Cliente>(this.baseUrl + "clientes/", { params: body });
  }

  getUserById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseUrl + id)
  }


  addUser(id: Clientet) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<Cliente>(this.baseUrl + "cliente/", id, httpOptions)
  }


  updateUser(id: Clientet, nuevosdatos: any): Observable<Cliente> {
    return this.http.put<Cliente>(this.baseUrl + "cliente/" + id, nuevosdatos)
  }

  eliminarusuario(id: Clientet): Observable<Cliente> {
    return this.http.delete<Cliente>(this.baseUrl + "cliente/" + id)
  }


  private ListaClientes: Array<Clientet> = [
    { "id": "A001", "nombre": "MERCEDES LOPEZ", "apellido": "ONIX", "password": "AZUL15", "telefono": "20500", "email": "user@gmail.com" },
    { "id": "A002", "nombre": "KIARA SANTANA", "apellido": "RIO", "password": "ROJO245", "telefono": "700", "email": "user@gmail.com" },
    { "id": "A003", "nombre": "CHELSY RODRIGUES", "apellido": "ARRIZO", "password": "PLATA458", "telefono": "40500", "email": "user@gmail.com" },
    { "id": "A004", "nombre": "TAMARA YEPES", "apellido": "AGYA", "password": "GRIS2421", "telefono": "0", "email": "user@gmail.com" },
    { "id": "A005", "nombre": "HILDA GOMES", "apellido": "ACCENT", "password": "VERDE78OLIVO", "telefono": "50000", "email": "user@gmail.com" },
    { "id": "A006", "nombre": "HUGO TAYLOR", "apellido": "ACCENT", "password": "AZUL26ELECTRICO", "telefono": "20000", "email": "user@gmail.com" },

  ];
}

export interface Cliente {
  codigo: string,
  mensaje: string,
  data: any,
  rows: number,
  pages: number,
  records: number,
  page: number,
}
