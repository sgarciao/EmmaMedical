import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'; 
import 'rxjs/add/operator/map' 

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private httpClient : HttpClient) { } 
   
  getEntitiesOptionsInPage(role_id) { 
    return this.httpClient
    .get('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/pages-options/entities/'
    + role_id)
    .map(data => data);
  }
}
