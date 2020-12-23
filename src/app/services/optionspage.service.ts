import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionspageService {
  constructor(private httpClient : HttpClient) { } 
   
  getOptionsInPage(role_id, entity_id) { 
    return this.httpClient
    .get(environment.urlMedical + '/v1/ema-medical/pages-options/options/'
    + role_id+"/"+entity_id)
    .map(data => data);
  }


}
