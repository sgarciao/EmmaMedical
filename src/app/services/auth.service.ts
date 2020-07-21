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
    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customer-portal/login',
    params,
    {
      headers: new HttpHeaders({
           'Content-Type':  'application/x-www-form-urlencoded',
         })
    }).do((authResult: any) => {
      sessionStorage.setItem('access_token', authResult.data.access_token);
      sessionStorage.setItem('refresh_token', authResult.data.refresh_token);
     
      localStorage.setItem('customer', authResult.data.user_data.user_id);
      
      localStorage.setItem('esEmpleado', authResult.data.user_data.is_employee);
      localStorage.setItem('company1_id', authResult.data.branch_office.company1_id);
      localStorage.setItem('company_branch_id', authResult.data.branch_office.company_branch_id);
      localStorage.setItem('user_name_prof', username);
      console.log(username + ">>>>>>>>> ");
      if (authResult.code == '200') {
        let i = '';
        if(authResult.data.user_data.is_employee == 1){
          localStorage.setItem('user', authResult.data.user_data.user_detail.name 
          + ' '
          + authResult.data.user_data.user_detail.middle_name
          + ' '
          + authResult.data.user_data.user_detail.last_name);
          console.log(i);
          i = '/home';
          localStorage.setItem('branch_office_name', 'Asociación Mexicana de Hepatología');
          localStorage.setItem('user_type_medical', 'user_1');
        } else if (authResult.data.user_data.is_employee == 0 ) {
          console.log(i);
          i = '/options';
          if (username=='pemex'){
            localStorage.setItem('branch_office_name', 'PEMEX');
            localStorage.setItem('entidad_name', 'PEMEX');  
            localStorage.setItem('entidad_id', '1');

            
            localStorage.setItem('customerBranchId', authResult.data.branch_office.id);
            localStorage.setItem('customerBranch', 'Pemex');
            localStorage.setItem('user', 'PEMEX');
            localStorage.setItem('user_type_medical', 'user_0');
          }
        } else {
          console.log('No tiene permisos');
          i = '/login';
        }
        this.router.navigate([i]);
      }
    })
    .shareReplay();
  }

  refreshToken(access_token: string, refresh_token: string) {
    const params = new HttpParams({
      fromObject: {
        token: access_token,
        refresh_token: refresh_token,
        company_id: localStorage.getItem('company1_id'),
        company_branch_id: localStorage.getItem('company_branch_id'),
        customer_id: localStorage.getItem('customerBranchId'),
        customer_branch_id: localStorage.getItem('customerBranch')
      }
    });
    return this.httpClient.post('http://adec-authorization.us-east-2.elasticbeanstalk.com/v1/ema-system/customer-portal/refresh-token',
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
