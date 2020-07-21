import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private httpClient: HttpClient) { }
  obtenerRutas( customer_branch_id, zone_id) {
    console.log(customer_branch_id + " " + zone_id);
    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/routes/'
    + customer_branch_id + "/" + zone_id  
    ).map(data => 
    data);
  }
}
