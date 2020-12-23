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

@Injectable() 
export class MenuService { 

  constructor(private httpClient : HttpClient) { } 

  obtenerMenus() {
    return this.httpClient.get(environment.urlMedical + '/v1/ema-medical/administration/menu2/1').map(data => data);
  }

} 