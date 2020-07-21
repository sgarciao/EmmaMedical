import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class CustomerBranchService {

  constructor(private httpClient: HttpClient) { }

  obtenerSucursalByCliente(clienteid) {
    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/portal/customers-branches/'
    + clienteid + '/0?from=1&per_page=1000')
    .map(data => data);
  }
  obtenerSucursalByRouteID(company_branch_id, zone_id, route_id) {
    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/branches/zones/routes/'
    + company_branch_id+ '/' + zone_id + "/" + route_id )
    .map(data => data);
  }
}