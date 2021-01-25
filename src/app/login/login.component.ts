import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './loginstyle.css'],
  providers: [AuthService]
})
export class LoginComponent {
  msg = '';
  staticAlertClosedLogin= true;
  constructor(private authService: AuthService, private routes: Router) {
    this.alertLogin = {
      id: 1,
      type: 'danger',
      message: 'Se requiere seleccionar todos los campos..'
    };
   }

  loginform = true;
  recoverform = false;
  ennableInputs = false;
  ennableSpinner = true;
  alertLogin:IAlert;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  check(uname: string, p: string) {
    sessionStorage.setItem("user_name_show", uname);
    //Validar
    this.ennableInputs = true;
    this.ennableSpinner = false;
    if(uname.length > 0 && p.length > 0) {
          const output = this.authService.login(uname, p).subscribe( (res: any) => {
            if (res.code === undefined){
              this.ennableSpinner = true;
              this.staticAlertClosedLogin = false;
              this.alertLogin.type = 'danger';
              this.alertLogin.message = 'Error de usuario o contraseña.';
              this.resetLogin();

              this.ennableInputs = false;
            }
            if (res.code  != '200') {
              this.ennableSpinner = true;
              this.staticAlertClosedLogin = false;
              this.alertLogin.type = 'danger';
              this.alertLogin.message = 'Error de usuario o contraseña.';
              this.resetLogin();

              this.ennableInputs = false;
            }
          },
          (err: any) => {
            this.staticAlertClosedLogin = false;
            this.alertLogin.type = 'danger';
            this.alertLogin.message = 'Usuario o contraseña incorrecto.';
            this.ennableSpinner = true;
            this.ennableInputs = false;
            this.resetLogin();
          }
        );
    } else {
      this.staticAlertClosedLogin = false;
      this.alertLogin.type = 'danger';
      this.alertLogin.message = 'Se requiere usuario y contraseña.';
      this.resetLogin();
      this.ennableSpinner = true;
      this.ennableInputs = false;
    }
  }
  resetLogin(){
    setTimeout(() => {this.staticAlertClosedLogin = true}, 1500);
  }
}


export interface IAlert {
  id: number;
  type: string;
  message: string;
}
