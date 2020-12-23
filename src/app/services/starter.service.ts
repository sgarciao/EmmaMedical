import { Injectable } from '@angular/core'; 
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map' 
import { environment } from '../../environments/environment';

@Injectable() 
export class StarterService{
  
  constructor(private httpClient : HttpClient){}
  
  autorizarArchivo(documento){
    console.log(documento);
    return this.httpClient.put(environment.url + '/v1/ema-system/customers/documents/approved',documento,{
      headers: new HttpHeaders({ 
          'Content-Type':  'application/json', 
          'token':sessionStorage.getItem('access_token') 
      }) 
    }).map(data=> 
      data);  
  }

    rechazarArchivo(documento){
      console.log(documento);
      return this.httpClient.put(environment.url + '/v1/ema-system/customers/documents/reject',documento,{
        headers: new HttpHeaders({ 
            'Content-Type':  'application/json', 
            'token':sessionStorage.getItem('access_token') 
        }) 
      }).map(data=> 
        data);  
    }
}