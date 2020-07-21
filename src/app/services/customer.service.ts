import { Injectable } from '@angular/core'; 
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map' 

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { finalize } from 'rxjs/operators/finalize';
import { timeout } from 'rxjs/operators/timeout';
import { catchError } from 'rxjs/operators/catchError';
import { _throw } from 'rxjs/observable/throw';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';

@Injectable() 
export class CustomerService { 

  constructor(private httpClient : HttpClient) { } 

  obtenerClientes() {
    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/portal/customers/0?from=1&per_page=1000').
    map(data => data);
  }

  guardarArchivo(filesUpload) {
   // console.log('Guardar-->',filesUpload);
  return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/documents',filesUpload,{
        headers: new HttpHeaders({ 
            'Content-Type':  'application/json'
        }) 
      }).pipe(timeout(600000),
      retry(2),
      catchError((e, c) => { 
        return _throw(e) 
      }),
      switchMap(f => { 
        console.log('do something with ' + JSON.stringify(f)
        ); 
        return of(f) }),
      finalize(() => { 
        console.log('finilize') 
      })).map(data=> 
        data);  
  }

  guardarArchivoRechazado(filesUpload) {
    return this.httpClient.put('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/documents/exist',filesUpload,{
          headers: new HttpHeaders({ 
              'Content-Type':  'application/json',
          }) 
        }).map(data=> 
          data);  
  }

} 