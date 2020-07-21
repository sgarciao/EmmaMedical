import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private httpClient: HttpClient) { }

  obtenerZonas(customer_branch_id) {
    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/zones/'
    + customer_branch_id
    ).map(data => 
    data);
  }
}
