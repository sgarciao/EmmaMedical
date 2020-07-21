import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { loginModel } from '../model/loginModel';

@Injectable()
export class MyserviceService {

  constructor(private httpClient : HttpClient) { }

  checkusernameandpassword(uname: string, pwd: string) {
    const datos = {} as loginModel; 

    datos.user_email = uname; 
    datos.user_password = pwd;

    const params = new HttpParams({
      fromObject: {
        user_email: uname,
        user_password: pwd,
        language_id: '1'
      } 
    });

    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customer-portal/login',params, { 
      headers: new HttpHeaders({ 
           'Content-Type':  'application/x-www-form-urlencoded', 
         }) 
    }).map(data => data);
  }

  refreshtoken(access_token: string, refresh_token: string) {
    const params = new HttpParams({
      fromObject: {
        token: access_token,
        refresh_token: refresh_token
      }
    });

    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/both/refresh-token', params, {
      headers: new HttpHeaders({
           'Content-Type':  'application/x-www-form-urlencoded',
         })
    }).map(data =>
     data);
  }

  logout() {
    // remove user from local storage to log user out
    const params = new HttpParams({
      fromObject: {
        user_id: localStorage.getItem('customer')
      }
    });
    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/both/logout', 
              params,
              {
               headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded',
              })}).do((data) => {
                  sessionStorage.removeItem('access_token');
                  sessionStorage.removeItem('refresh_token');
                  localStorage.removeItem('customer');
                  localStorage.removeItem('customerBranch');
                  localStorage.removeItem('user');
                  localStorage.removeItem('email');
              } );
	}
}