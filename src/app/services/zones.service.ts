import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private httpClient: HttpClient) { }

  obtenerZonas(customer_branch_id) {
    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/zones/'
    + customer_branch_id
    ).map(data => 
    data);
  }
}
