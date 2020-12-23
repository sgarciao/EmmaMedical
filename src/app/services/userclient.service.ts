import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class UserClientService {

    constructor(private httpClient : HttpClient) { }

    obtenerUsuarios(cliente, sucursal){
        return this.httpClient.get(environment.url + '/v1/ema-system/portal/customers/users/'+1+'/'+localStorage.getItem('customerBranch')+'/'+cliente+'/'+sucursal+'?from=1&per_page=3000').map(data=> 
    data); 
    }

    saveUser(user){
        return this.httpClient.post(environment.url + '/v1/ema-system/customers/users', user, { 
            headers: new HttpHeaders({ 
                 'Content-Type':  'application/x-www-form-urlencoded', 
                 'token':sessionStorage.getItem('access_token') , 'language_id': '1' 
               }) 
          }).map(data=> 
           data); 
    }
}