import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { finalize } from 'rxjs/operators/finalize';
import { timeout } from 'rxjs/operators/timeout';
import { catchError } from 'rxjs/operators/catchError';
import { _throw } from 'rxjs/observable/throw';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';


@Injectable({
  providedIn: 'root'
})
export class VhctreatmentService {

  constructor(private httpClient : HttpClient) { }

  getVHCTreatment(hospital_id, role_id,entity_id,treatment_id,status_id, start_date, end_date) {
    return this.httpClient.get(environment.urlMedical + '/v1/ema-medical/treatment/vhc/'
    + hospital_id
    + '/' + role_id
    + '/' + entity_id
    + '/' + treatment_id
    + '/' + status_id
    + '/' + start_date
    + '/' + end_date).map(data => data);
  }

  saveVHCTreatment(treatment) {
    return this.httpClient.post(environment.urlMedical + '/v1/ema-medical/treatment/vhc',
      treatment,{
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
          })
        }).map(data=>
          data);
  }


  updateVHCTreatment(treatment) {
    return this.httpClient.put(environment.urlMedical + '/v1/ema-medical/treatment/vhc',
      treatment,{
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
          })
        }).map(data=>
          data);
  }
}
