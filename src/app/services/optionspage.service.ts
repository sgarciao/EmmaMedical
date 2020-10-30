import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'; 
import 'rxjs/add/operator/map' 

@Injectable({
  providedIn: 'root'
})
export class OptionspageService {
  constructor(private httpClient : HttpClient) { } 
   
  getOptionsInPage(role_id, entity_id) { 
    return this.httpClient
    .get('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/pages-options/options/'
    + role_id+"/"+entity_id)
    .map(data => data);
  }


}
