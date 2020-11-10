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

@Injectable({
  providedIn: 'root'
})
export class NashtreatmentService {

  constructor(private httpClient : HttpClient) { }
  getNASHTreatment(hospital_id, start_date, end_date) {
    return this.httpClient
    .get('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/treatment/nash/' 
    + hospital_id 
    + '/' + start_date 
    + '/' + end_date).
    map(data => data);
  }

  saveNASHTreatment(treatment) {
    return this.httpClient.post('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/treatment/nash',
      treatment,{
          headers: new HttpHeaders({ 
              'Content-Type':  'application/json',
          }) 
        }).map(data=> 
          data);  
  }

  
  updateNASHTreatment(treatment) {
    return this.httpClient.put('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/treatment/nash',
      treatment,{
          headers: new HttpHeaders({ 
              'Content-Type':  'application/json',
          }) 
        }).map(data=> 
          data);  
  }
}
