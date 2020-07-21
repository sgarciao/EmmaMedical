import {Component, Input, OnInit} from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {Router} from "@angular/router";
import { UserClientService } from 'src/app/services/userclient.service';

import { userModel } from 'src/app/model/userModel';
import { customerModel } from 'src/app/model/customerModel';
import { customerBranchModel } from 'src/app/model/customerBranchModel';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBranchService } from 'src/app/services/customerbranch.service';

import * as tableData from './smart-data-table';

@Component({
  selector: 'app-ngbd-accordion-basic',
  templateUrl: 'listuser.component.html',
  providers: [UserClientService, 
              CustomerService,
              CustomerBranchService ] 
})

export class ListUserComponent implements OnInit{

  bButtonNewUser: boolean;
  
  comboCliente  = {} as customerModel;
  comboSucursal = {} as customerBranchModel;

  users:                  userModel[] = [];
  dataUser:               userModel[] = [];
  datosConEstiloUsuario:  userModel[] = [];

  //Combo Clientes
  clientes:[{
    client_identity: number,
    commercial_name: string,
    status: number
  }];
  //Combo Sucursales
  sucursales:[{
    branch_client_id: number,
    business_name: string,
    status: number
  }];

  constructor(
    private routes: Router, 
    private http: HttpClient, 
    private userClient: UserClientService,
    private customer: CustomerService,
    private customerbranch: CustomerBranchService
  ){}
  
  newUser(cliente,sucursal){
    localStorage.setItem('cliente',cliente);
    localStorage.setItem('sucursal',sucursal);
    this.routes.navigate(['/user']);
  }
  document(){
    this.routes.navigate(['/document']);
  }

  ngOnInit(){
    this.customer.obtenerClientes().subscribe( (res: any) => {
      this.clientes = res.data;
    }); 
  }
  
  cambioCliente(clienteId){
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {       
        this.sucursales =  res.data;         
    }); 
  }

  cambioSucursal(sucursalId){ 

    this.bButtonNewUser = true;
    this.userClient.obtenerUsuarios(this.comboCliente.client_identity,sucursalId).subscribe( (res: any) => {

      res.data.map((r) => {
        const dato = {} as userModel;

        dato.name = '<div class="d-flex no-block align-items-center"><div class="m-r-10"><img src="assets/images/users/d1.jpg" alt="user" class="rounded-circle" width="45" /></div><div class=""><h5 class="m-b-0 font-16 font-medium" >' + r.name + '</h5></div></div>';
        dato.middlename     = r.middlename;
        dato.position       = r.position;
        dato.creation_date  = r.creation_date;
        dato.status         = r.status;
        if(dato.status == '1') {
          dato.status = '<i class="fa fa-circle text-success" data-toggle="tooltip" data-placement="top" title="In Progress"></i>';
        }else {
          dato.status = '<i class="fa fa-circle text-danger" data-toggle="tooltip" data-placement="top" title="In Progress"></i>';
        }
        this.datosConEstiloUsuario.push(dato);
      });

      //this.users =  res.data;
      this.users = this.datosConEstiloUsuario;
      this.dataUser = this.datosConEstiloUsuario;
      
    }); 
  }

  settingsUsers = tableData.settingsUsers;  
  tempUsers: userModel[] = [];
  
  //Filtro Lista Usuarios
  updateFilter(event) {
    const val = event.toLowerCase();
    
    this.tempUsers = this.users.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || d.position.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if(event == '') {
      this.tempUsers = this.dataUser;
    }
    this.users = this.tempUsers;
  }

}