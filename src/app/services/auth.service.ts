import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { environment } from '../../environments/environment';

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
    return this.httpClient.post(environment.urlMedical + '/v1/ema-medical/medical/login',
    params,
    {
      headers: new HttpHeaders({
           'Content-Type':  'application/x-www-form-urlencoded',
         })
    }).do((authResult: any) => {
      sessionStorage.setItem('access_token', authResult.data.access_token);
      sessionStorage.setItem('refresh_token', authResult.data.refresh_token);
      sessionStorage.setItem('user_id', authResult.data.user_data.user_id);
      localStorage.setItem('role_id', authResult.data.user_data.user_detail.role);

      if (authResult.code == '200') {
        let i = '';
        this.router.navigate(['/home']);
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
    return this.httpClient.post(environment.urlMedical + '/v1/ema-medical/medical/refresh-token',
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

  logout(user_id_) {
     // remove user from local storage to log user out

     const params = new HttpParams({
      fromObject: {
        user_id: user_id_//localStorage.getItem('user')
      }
    });
    return this.httpClient.post(environment.urlMedical + '/v1/ema-medical/medical/logout',
              params,
              {
               headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded',
              })}).do((data) => {
                  sessionStorage.removeItem('access_token');
                  sessionStorage.removeItem('refresh_token');
                  localStorage.removeItem('user');
                  localStorage.removeItem('menu');
                  localStorage.removeItem('submenu');
                  //Se elimina menu
                  localStorage.removeItem('titleMenu');
                  this.router.navigate(['/login']);
              } );
  }
}
