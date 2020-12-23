import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private httpClient : HttpClient) { }

  getEntitiesOptionsInPage(role_id) {
    return this.httpClient
    .get(environment.urlMedical + '/v1/ema-medical/pages-options/entities/'
    + role_id)
    .map(data => data);
  }

  getStatesByCountry(country_id) {

    return this.httpClient
    .get(environment.urlMedical + '/v1/ema-medical/catalogs/states/'
    +country_id
    ).map(data =>
    data);
  }
}
