import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StatesService {

  constructor(private httpClient: HttpClient) { }

  getStatesByCountry(country_id) {

    return this.httpClient.get(environment.urlMedical + '/v1/ema-medical/catalogs/states/'+country_id).map(data => data);
  }
}

