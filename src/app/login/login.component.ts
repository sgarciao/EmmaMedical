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
  constructor(private authService: AuthService, private routes: Router) { }

  loginform = true;
  recoverform = false;
  ennableInputs = false;
  ennableSpinner = true;

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
            if (res.code  != '200') {

              this.msg = 'Usuario o contraseña incorrecto';
              this.ennableSpinner = true;
              this.ennableInputs = false;
            }
          },
          (err: any) => {
            this.msg = 'Usuario o contraseña incorrecto';
            this.ennableSpinner = true;
            this.ennableInputs = false;
            console.error(err);
          }
        );
    } else {
      this.msg = 'Se requiere usuario y contraseña';
      this.ennableSpinner = true;
      this.ennableInputs = false;
    }
  }
}
