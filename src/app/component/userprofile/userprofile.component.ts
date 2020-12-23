import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioPerfilModel } from 'src/app/model/usuarioPerfilModel';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  providers:[UserprofileService]
})
export class UserprofileComponent implements OnInit {
  staticAlertClosed2 = true;
  alert_2: IAlert;
  progres_spinner_refresh_customer_branch = true;
  refresh_files_button = false;
  datosUsuario={} as usuarioPerfilModel;
  change_password:boolean;
  password_1:string;
  password_2:string;
  password_validation:string;
  password_validation_style:string;
  disable_guardar:boolean;
  validation_check:boolean;
  progres_spinner_save_password:boolean;
  user_name:string;
  //////////////////////VARIABLE USUARIO

  ////////////////////////////////////////
  constructor(
    private router:         Router,
    private userProfileService: UserprofileService) {
    this.alert_2 = {
      id: 1,
      type: 'success',
      message: 'This is an success alert'
    };

   }

  ngOnInit() {
    this.datosUsuario.users_id = Number(sessionStorage.getItem('user_id'));
    console.log("Datos de user: " + this.datosUsuario.users_id);
    this.getUserData();
    this.change_password = true;
    this.disable_guardar = true;
    this.validation_check = true;
    this.password_validation = "";
    this.progres_spinner_save_password = true;
  }
  cancelarCambios(){
    this.password_1 = "";
    this.password_2 = "";
    this.change_password = true;
    this.validation_check = true;
    this.password_validation = "";
  }
  validationPassword(){
    if (this.password_1 != this.password_2){
      this.password_validation = "Error";
      this.password_validation_style = "validation-error";
      this.disable_guardar = true;
      this.validation_check = true;
    }else{
      this.password_validation = "Ok.";
      this.password_validation_style = "validation-success";
      this.disable_guardar = false;
      this.validation_check = false;
    }
  }
  changePasswordEnable(){
    this.change_password = false;
  }

  getUserData(){
    this.userProfileService.obtenerDetallesDeUsuario(this.datosUsuario.users_id ).subscribe((res_data:any)=>{
      if (res_data.code==200){
        console.log(res_data);
        this.datosUsuario.password = res_data.data.password;
        this.datosUsuario.user_name = res_data.data.user_name;
        this.datosUsuario.name = res_data.data.name;
        this.datosUsuario.email = res_data.data.email;
        this.datosUsuario.keywords = res_data.data.keywords;
        this.datosUsuario.initials = res_data.data.initials;
        this.user_name = res_data.data.name;
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'NO se pudieron obtener datos del usuario, intente de nuevo.';
        this.reset();
      }
    });
  }

  saveNewPssword(){
    this.progres_spinner_save_password=false;
    this.datosUsuario.password = this.password_2;
    this.userProfileService.actualizarUsuario(1, 1, this.datosUsuario.users_id, this.datosUsuario).subscribe((res_s:any)=>{
      if (res_s.code==200){
        this.progres_spinner_save_password = true;

        this.staticAlertClosed2 = false;
        this.alert_2.type = 'success';
        this.alert_2.message = 'Contraseña actualizada correctamente.';
        this.reset();
        this.cancelarCambios();
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Error al actualizar la contraseña.';
        this.reset();
      }
    }, err => {
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Error al actualizar la contraseña.';
      this.reset();
    });
  }
  reset(){
    setTimeout(() => (this.staticAlertClosed2 = true), 1000);
  }
  regresar(){
    console.log("back page");
    this.router.navigate(['/home']);
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
