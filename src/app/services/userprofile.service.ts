import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import 'rxjs/add/operator/map'

import { switchMap } from 'rxjs/operators/switchMap';
import { finalize } from 'rxjs/operators/finalize';
import { timeout } from 'rxjs/operators/timeout';
import { catchError } from 'rxjs/operators/catchError';
import { _throw } from 'rxjs/observable/throw';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private httpClient: HttpClient) { }

  obtenerDetallesDeUsuario(user_id) {
    return this.httpClient
    .get(environment.urlMedical + '/v1/ema-medical/users-administration/' + user_id
    ).map(data =>
    data);
  }

  actualizarUsuario(company_id, company_branch_id, user_id, userDetails){
    return this.httpClient.post(environment.urlMedical + '/v1/ema-medical/users-administration/'+ user_id, userDetails,{
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
      })
    }).pipe(timeout(600000),
    retry(2),
    catchError((e, c) => {
      return _throw(e)
    }),
    switchMap(f => {
      //console.log('do something with ' + JSON.stringify(f));
      return of(f) }),
    finalize(() => {
      //console.log('finilize')
    })).map(data=>
      data);
  }

}
