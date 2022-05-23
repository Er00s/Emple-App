import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient ) {this.getJobs() }

  //al realizar la peticion no devuelve datos, por lo que busque en internet el problema es de los CORS del back por no tener el allow-origin
   getJobs(){
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    
    return this.http.get(`https://ibillboard.com/api/positions`, httpOptions)
    
  }
}
