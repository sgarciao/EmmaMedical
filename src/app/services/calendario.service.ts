import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CalendarioService {

  constructor(private httpClient : HttpClient) { }
  
  obtenerConfiguracionCalendario(sucursalId) {
    return this.httpClient.get(environment.url + '/v1/ema-system/customers/calendar/'
    + sucursalId
    ).map(data=>
    data);
  }

}