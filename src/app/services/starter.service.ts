import { Injectable } from '@angular/core'; 
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map' 

@Injectable() 
export class StarterService{
  
  constructor(private httpClient : HttpClient){}
  
  autorizarArchivo(documento){
    console.log(documento);
    return this.httpClient.put('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/documents/approved',documento,{
      headers: new HttpHeaders({ 
          'Content-Type':  'application/json', 
          'token':sessionStorage.getItem('access_token') 
      }) 
    }).map(data=> 
      data);  
  }

    rechazarArchivo(documento){
      console.log(documento);
      return this.httpClient.put('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/documents/reject',documento,{
        headers: new HttpHeaders({ 
            'Content-Type':  'application/json', 
            'token':sessionStorage.getItem('access_token') 
        }) 
      }).map(data=> 
        data);  
    }
}