import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GenericCatalogService {

  constructor(private httpClient: HttpClient) { }

/*

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
*/


/*
    rechazarArchivo(documento){
      console.log(documento);
      return this.httpClient.put
      (
          environment.url + '/v1/ema-system/customers/documents/reject',documento,
          { headers: new HttpHeaders({'Content-Type':  'application/json', 'token':sessionStorage.getItem('access_token') }) }
      )
      .map(data=>data);
    }
*/
  getDataCatalogGeneric(param1, param2, param3){
    var ligaCatalogo = environment.urlMedical + '/v1/ema-medical/catalogs-generic/' + param1 + '/' + param2 + '/' + param3;
    console.log('Liga resultante: ' + ligaCatalogo);

    return this.httpClient.get(environment.urlMedical + '/v1/ema-medical/catalogs-generic/'
      + param1
      + '/'
      + param2
      + '/'
      + param3).map(data => data);
  }

  getDataCatalogGeneric2(param1, param2, param3){
    return this.httpClient.get(environment.urlMedical + '/v1/ema-medical/catalogs-generic/'
      + param1
      + '/'
      + param2
      + '/'
      + param3,
      { headers: new HttpHeaders({'Content-Type':  'application/json', 'token':sessionStorage.getItem('access_token') }) }
      ).map(data => data);
  }

}

