import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Injectable()
export class CalendarioService {

  constructor(private httpClient : HttpClient) { }
  
  obtenerConfiguracionCalendario(sucursalId) {
    return this.httpClient.get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/calendar/'
    + sucursalId
    ).map(data=>
    data);
  }

}