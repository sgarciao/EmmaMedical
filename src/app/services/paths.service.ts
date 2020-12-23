import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class PathsService {

  constructor(private httpClient: HttpClient) { }

  obtenerFolders(fatherid, headerid) {

    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/path-list/'
    + fatherid + '/'
    + headerid + '?from=1&per_page=1000'
    ).map(data => 
    data);
  }
}

