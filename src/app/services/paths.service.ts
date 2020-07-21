import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map';


@Injectable()
export class PathsService {

  constructor(private httpClient: HttpClient) { }

  obtenerFolders(fatherid, headerid) {

    return this.httpClient
    .get('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customers/path-list/'
    + fatherid + '/'
    + headerid + '?from=1&per_page=1000'
    ).map(data => 
    data);
  }
}

