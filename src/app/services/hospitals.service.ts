import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http'; 
import 'rxjs/add/operator/map' 

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {
  constructor(private httpClient : HttpClient) { } 
   
  getHospitalsList(role_id, entity_id) { 
    return this.httpClient
    .get(environment.urlMedical + '/v1/ema-medical/pages-options/hospitals/'
    + role_id+"/"+entity_id)
    .map(data => data);
  }
}
