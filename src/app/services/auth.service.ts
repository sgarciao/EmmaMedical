import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string) {
   
    sessionStorage.setItem('access_token' , 'temporal');
    const params = new HttpParams({
      fromObject: {
        user_email: username,
        user_password: password,
        language_id: '1'
      }
    });
    return this.httpClient.post('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/medical/login',
    params,
    {
      headers: new HttpHeaders({
           'Content-Type':  'application/x-www-form-urlencoded',
         })
    }).do((authResult: any) => {
      sessionStorage.setItem('access_token', authResult.data.access_token);
      sessionStorage.setItem('refresh_token', authResult.data.refresh_token);
     
      if (authResult.code == '200') {
        let i = '';
        this.router.navigate(['/options']);
      }
    })
    .shareReplay();
  }

  refreshToken(access_token: string, refresh_token: string) {
    const params = new HttpParams({
      fromObject: {
        token: access_token,
        refresh_token: refresh_token
      }
    });
    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-medical/medical/refresh-token',
    params,
    {
      headers: new HttpHeaders({
           'Content-Type':  'application/x-www-form-urlencoded',
         })
    }).do((authResult: any) => {
      sessionStorage.setItem('access_token', authResult.data.access_token);
      sessionStorage.setItem('refresh_token', authResult.data.refresh_token);
    })
    .shareReplay();
  }

  logout() {
     // remove user from local storage to log user out
     const params = new HttpParams({
      fromObject: {
        user_id: localStorage.getItem('customer')
      }
    });
    return this.httpClient.post('http://emamedical-dev.us-east-2.elasticbeanstalk.com/v1/ema-medical/medical/logout', 
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
                  localStorage.removeItem('branch_office_name');
                  localStorage.removeItem('menu');
                  localStorage.removeItem('submenu');
                  localStorage.removeItem('esEmpleado');
                  localStorage.removeItem('company1_id');
                  localStorage.removeItem('company_branch_id');
                  localStorage.removeItem('customerBranchId');
                  //Se elimina menu
                  localStorage.removeItem('titleMenu');
                  this.router.navigate(['/login']);
              } );
  }
}
