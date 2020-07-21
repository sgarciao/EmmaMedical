import {Component, Input, ViewChild, OnInit} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { AngularFileUploaderModule, AngularFileUploaderComponent } from 'angular-file-uploader';
import { userModel } from 'src/app/model/userModel';
import { userDetailModel } from 'src/app/model/userDetailModel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserClientService } from 'src/app/services/userclient.service';

@ViewChild('fileUpload1', {static: true})

@Component({
  selector: 'app-ngbd-accordion-basic',
  templateUrl: 'user.component.html',
  providers: [UserClientService]
})

export class UserComponent implements OnInit{

  //user
  nameUser:       string;
  middlenameUser: string;
  lastnameUser:   string;
  positionUser:   string;
  //userDetail
  usernameUser:     string;
  passwordUser:     string;
  emailUser:        string;
  notificationUser: number;
  activeUser:       number;
  
  //FileUpload
  private fileUpload1: AngularFileUploaderComponent;
  resetUpload1: boolean;
  resetUpload2: boolean;
  resetUpload3: boolean;
  
  afuConfig1 = {
    multiple: true,
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    }
  };

  afuConfig2 = {
    theme: 'attachPin',
    hideProgressBar: 'true',
    hideResetBtn: 'true',
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    formatsAllowed: '.jpg,.png',
    multiple: 'true'
  };
  afuConfig3 = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    },
    formatsAllowed: '.jpg,.png',
    multiple: true
  };

  constructor(  
    private routes: Router,  
    private user: UserClientService, 
    private http: HttpClient) {   
} 

  DocUpload(env) {
    console.log(env);
  }

  resetfu(id) {
    this[`afuref${id}`].resetFileUpload();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() { 

  }

  save(){
    console.log("guardar");
    const user = {} as userModel;
    const users_data = {} as userDetailModel;
    //User
    user.name               = this.nameUser;
    user.middlename         = this.middlenameUser;
    user.lastname           = this.lastnameUser;
    user.position           = this.positionUser;
    user.company_id         = +localStorage.getItem('customer');
    //user.company_branch_id  = +localStorage.getItem('customerBranch');
    user.company_branch_id  = 9;
    user.customer_id        = +localStorage.getItem('cliente');
    user.customer_branch_id = +localStorage.getItem('sucursal');
    /*
    user.tax_reference = ;
    user.phone = ;
    user.phone_2 = ;
    user.cellphone = ;
    */

    //User Detail 
    users_data.user_name   = this.usernameUser;
    users_data.password    = this.passwordUser;
    users_data.email       = this.emailUser;
    users_data.is_active   = 1;
    users_data.is_receiving_notification = 1;
    //Set Details
    user.users_data = users_data;
    
    this.user.saveUser(user).subscribe( (res: any) => {     
      if(res.app_code = 200) { 
          this.routes.navigate(['/starter']); 
      } 
     }); 
  }

}
