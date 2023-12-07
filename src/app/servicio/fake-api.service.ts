import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }
 

  apiUrl = 'https://fake-api-puce.vercel.app/users'; // Asegúrate de que la URL sea la correcta

  constructor(private http: HttpClient) { }

  agregarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}`; // Ajusta la ruta según tu API falsa
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.post<any>(url, usuario, httpOptions)
      .pipe(
        retry(1), // Intento de reenvío en caso de error
        catchError(this.handleError) // Manejo de errores
      );
  }

  obtenerUsuarios(): Observable<any[]> {
    const url = `${this.apiUrl}`; // Ajusta la ruta según tu API falsa

    return this.http.get<any[]>(url)
      .pipe(
        retry(1), // Intento de reenvío en caso de error
        catchError(this.handleError) // Manejo de errores
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend retornó un código de error.
      console.error(`Código de error: ${error.status}, ` + `Mensaje: ${error.error}`);
    }
  
    // Devuelve un mensaje de error observable con detalles
    return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
  }
}
