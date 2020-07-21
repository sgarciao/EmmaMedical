import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { customerModel } from 'src/app/model/customerModel';
import { customerBranchModel } from 'src/app/model/customerBranchModel';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBranchService } from 'src/app/services/customerbranch.service';
import { PathsService } from 'src/app/services/paths.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { documentsListModel } from 'src/app/model/documentsListModel';
import { uploadFileModel } from 'src/app/model/uploadFileModel';
import { listUploadFile } from 'src/app/model/listUploadFile';
import { folderModel } from 'src/app/model/folderModel';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as tableData from '../smart-data-table';
import * as AWS from 'aws-sdk';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
import { ZonesModule } from 'src/app/model/zones.module';
import { RoutesModel } from 'src/app/model/routesModel';
import { ZonesService } from 'src/app/services/zones.service';
import { RoutesService } from 'src/app/services/routes.service';
import { customerBranchZonesRoutesModel } from 'src/app/model/customerBranchesModel';
import { documentsDataByZonesModel } from 'src/app/model/documentsDataByZonesModel';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { completeCustomerBranchModel } from 'src/app/model/completeCutomersBranchesModel';

@Component({
  selector: 'app-publishdocument',
  templateUrl: './publishdocument.component.html',
  styleUrls: ['./publishdocument.component.css', './publishdocument_style.scss'],
  providers: [
    CustomerService,
    CustomerBranchService,
    DocumentsService,
    PathsService]
})
export class PublishdocumentComponent implements OnInit {
 
  nombre_archivo = 'Seleccione los archivos...';
  progres_spinner_refresh_files = true;////spineer de refresh files list
  refresh_files_button = true;
  
  disabledBUttonSubir = true;
  disableSelectFile = true;
  disableReiniciar = true;
  disableSucursalCombo = true; 
  disableFoldersCombo = true;
  
  disableRutasCombo = true;
  disableSucursalesVista = true;
  numSucursales = 0;
  nombreFile: string;
  comboClienteU   = {} as customerModel;
  comboSucursalU  = {} as customerBranchModel;
  comboFolderU = {} as folderModel;
  comboZonasU = {} as ZonesModule;
  comboRutasU = {} as RoutesModel;


  documents:  documentsListModel[] = [];
  tempDocument: documentsListModel[] = [];
  tempDucumentZonasRutas: documentsDataByZonesModel[] = []; 
  filesUpload:            uploadFileModel[] = [];
  documentsEstilo:        documentsListModel[] = [];

  tempSucursalesTable:   completeCustomerBranchModel[]=[];
  sucursalesTable: completeCustomerBranchModel[] = [];
  sucursalesTableEstilo:completeCustomerBranchModel[]=[];

  sucursales:        documentsDataByZonesModel[] = [];
  documentosZonasRutasEstilo:  documentsDataByZonesModel[] = [];
  
  listUploadFile            = {} as listUploadFile;
  listUploadFile2            = {} as listUploadFile;
  listUploadFileIndividualFile = {} as listUploadFile;

  tempDocumentoBorrar = {data: {document_id: 0, key: '', bucket_name: ''}};


  pipe = new DatePipe('en-US');
  today = new Date();
  strDate = '';

  urlFile:        string;
  rechazoMotivo:  string;
  document_id:    number;
  company_branch:string;
  checkbox_value = false;
  checkbox_status = true;
  visibleCombosCustomerAndbranches = false;
  visibleCombosZonesAndRoutes = true;
 
  ////////////////////CONTROL FOR FILES
  counter_files:number;
  //////////////////////////////////////////
  rutasU:[{
    route_id:number;
    status:number;
    description:string;
  }];

  zonesU:[{
    zone_id:number;
    description:string;
    status:number;
    company_branch_name:string;
  }];

  clientesU: [{
    client_identity:  number,
    commercial_name:  string,
    status:           number
  }];

  sucursalesU: [{
    branch_client_id: number,
    business_name:    string,
    customer_branch_name: string;
    status:           number
  }];

  foldersU: [{
    id:                 number,
    description:        string,
    brief_description:  number
  }];
  
  alert_2: IAlert;
  alert: IAlert;
  alertBuscar: IAlert;

  staticAlertClosed2 = true;
  staticAlertClosed = true;
  staticAlertClosedBuscar = true;
  progres_spinner = true;
  progressBar = {
    type: 'success',
    value: 10,
    max: 100,
    height:  '20px',
    visible: false,
    showValue: true,
    striped: true,
    animated: true
  };

  settingsDocuments = tableData.settingsDocuments;
  settingsDocumentsZoneRoute = tableData.settingsDocumentsZoneRoute;
  settingsDocumentsByZoneAndRoute = tableData.settingsDocumentsByZoneAndRoute;
  constructor(
    private customer:       CustomerService,
    private customerbranch: CustomerBranchService,
    private paths:          PathsService,
    private documentslist:  DocumentsService,
    private modalService:   NgbModal,
    private sanitizer:      DomSanitizer,
    private zoneService: ZonesService,
    private rutasService: RoutesService,
    private router: Router
    ) {
      this.alert = {
        id: 1,
        type: 'success',
        message: 'This is an success alert'
      };
      this.alert_2={
        id: 1,
        type: 'success',
        message: 'This is an success alert'
      };
     }

     /*__________________________DEFAULT VALUE */
     defaultCombosClientes = {
      client_identity: 0,
      commercial_name: 'Seleccione un cliente...',
      status: 1
    };
    defaultCombosClientesSucursales = {
      branch_client_id: 0,
      business_name: 'Seleccione sucursal del cliente...',
      status: 1
    };
    defaultCombosFolders = {
      id:                 0,
      description:        'Seleccione un folder...',
      brief_description:  'Seleccione un folder...'
    }
    defaultComboZonas={
      zone_id:0,
      company_branch_id:0,
      company_branch_name:'',
      status:1,
      description:'Seleccione una zona...',
      brief_description:'Seleccione una zona...'
    }
    defaultComboRutas={
      route_id: 0,
      company_branch_id: 0,
      company_branch_name:'',
      status:1,
      description:'Seleccione una ruta...',
      brief_description:'Seleccione una ruta...'
    }

    
    setDefaultValuesClientes(){
      this.comboClienteU = this.defaultCombosClientes;
    }
    setDefaultValuesSucursales(){
      this.comboSucursalU = this.defaultCombosClientesSucursales;
    }
    setDefaultValuesFolders(){
      this.comboFolderU = this.defaultCombosFolders;
    }
    setDefaultValuesZonas(){
      this.comboZonasU = this.defaultComboZonas;
    }
    setDefaultValueRutas(){
      this.comboRutasU = this.defaultComboRutas;
    }
    cargarComboClientes(data){
      data.unshift(this.defaultCombosClientes);
      this.clientesU = data;
    }
    cargarComboSucursales(data){
      data.unshift(this.defaultCombosClientesSucursales);
      this.sucursalesU = data;
    }

    cargarComboFolders(data){
      data.unshift(this.defaultCombosFolders);
      this.foldersU=data;
    }
    cargarComboZonas(data){
      data.unshift(this.defaultComboZonas);
      this.zonesU = data;
    }
    cargarComboRutas(data){
      data.unshift(this.defaultComboRutas);
      this.rutasU = data;
    }
  ////////////////////////////////////////////
  ngOnInit() {
    this.zoneService.obtenerZonas(1).subscribe((res:any)=>{
      this.cargarComboZonas(res.data);
      this.setDefaultValuesZonas();
    });
    this.customer.obtenerClientes().subscribe( (res: any) => {
      this.cargarComboClientes(res.data);
      this.setDefaultValuesClientes();
    });
    this.paths.obtenerFolders(0,2).subscribe( (res: any) => {
      //this.foldersU = res.data;
      this.cargarComboFolders(res.data);
      this.setDefaultValuesFolders();
    });
  }
////////////////////REFRESH FILES LIST
refreshFileList(){
    this.refresh_files_button = true;
    this.progres_spinner_refresh_files=false;
    console.log("Refresh button...");
    const documentos = {} as documentsListModel;
    //obtener fecha actual, para la búsqueda
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');

    documentos.start_date         = this.strDate//this.start_date.replace('/','-'); 
    documentos.end_date           = this.strDate//this.end_date.replace('/','-');;
    documentos.company_id         = this.comboClienteU.client_identity;
    documentos.company_branch_id  = this.comboSucursalU.branch_client_id;
    documentos.folderId           = this.comboFolderU.id;

    if (this.comboFolderU.id != null && this.comboFolderU.id != 0){
      this.documentslist.obtenerArchivos(documentos).subscribe( (res: any) => {
        this.documentsEstilo = [];
        console.log('http code ' + res.code);
        let i = 0;
        if (res.code == 200){
          res.data.map((r) => {
            const dato = {} as documentsListModel;
            dato.original_file_name =  r.original_file_name ;
            dato.folder_name = this.comboFolderU.description;
            dato.last_version   = r.last_version;
            dato.creation_date  = r.creation_date;
            dato.creation_time  = r.creation_time;
            dato.customer_name  = r.customer_name;
            dato.customer_branch_name = r.customer_branch_name; 
    
            dato.file_track_id  = r.file_track_id;
            dato.year           = r.month + ' / ' + r.year;
            dato.filename_path  = r.filename_path;
            dato.document_id    = r.document_id;
            dato.key            = r.key;
            dato.bucket_name    = r.bucket_name;
            dato.zone_name      = r.zone_name;
            dato.route_name     = r.route_name;
            
            this.documentsEstilo.push(dato);
            i = 1;
          });
          if (i == 0){
            console.log("Alert 2... ");
            this.staticAlertClosed2 = false;
            this.alert_2.type = 'danger';
            this.alert_2.message = 'No se encontraron archivos para el día de hoy.';
            this.reset();
          }
          this.refresh_files_button = false;
          this.progres_spinner_refresh_files = true;
        }else{
          this.refresh_files_button = false;
          this.progres_spinner_refresh_files = true;
        }
        this.documents = this.documentsEstilo;
      });
    }
}
  checkUploadFilesByZonesAndRoutes(){
    if (this.checkbox_value){
      this.visibleCombosCustomerAndbranches = false;
      this.visibleCombosZonesAndRoutes = true;
      this.checkbox_value = false;
      this.checkbox_status = true;
    }else{
      this.visibleCombosCustomerAndbranches=true;
      this.visibleCombosZonesAndRoutes = false;
      this.checkbox_value = true;
      this.checkbox_status = false;
    }
    
  }
  cambioSucursal(){
    this.paths.obtenerFolders(0,2).subscribe( (res: any) => {
      this.comboFolderU = res.data;
      this.disableFoldersCombo = false;
      this.refresh_files_button = true;
        this.progres_spinner_refresh_files = true;
    });
  }
  cambioClienteU(clienteId) {
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
      //  this.sucursalesU =  res.data;
        this.cargarComboSucursales(res.data);
        this.setDefaultValuesSucursales();
        this.disableSucursalCombo=false;
        this.refresh_files_button = true;
        this.progres_spinner_refresh_files = true;
    });
  }
  cambioZonas(customer_branch_id, zone_id){
    if (customer_branch_id != null && zone_id != null){
      this.rutasService.obtenerRutas(customer_branch_id, zone_id).subscribe((res:any)=>{
        //this.rutasU = res.data;
        this.cargarComboRutas(res.data);
        this.setDefaultValueRutas();
        this.disableRutasCombo = false;
        if (this.comboRutasU.route_id != null){
          this.cambioRutasU(zone_id, this.comboRutasU.route_id);
        }
      });
    }
  }
  cambioFolders(event){
    if (event.folderId != 0 || this.comboFolderU.id != 0){
      this.disableSelectFile = false;
      this.refresh_files_button = false;
      //this.progres_spinner_refresh_files=false;
    }
    if (this.comboFolderU.id == 0 || event.folderId){
      this.disableSelectFile = true;
      this.refresh_files_button = true;
    }
  }
  cambioRutasU(zone_id, route_id){
    if (route_id != null){
      this.customerbranch.obtenerSucursalByRouteID(1 ,zone_id, route_id).subscribe((res:any)=>{
        this.sucursalesU = res.data;
        this.numSucursales = this.sucursalesU.length;
        this.disableFoldersCombo=false;
        this.sucursalesTableEstilo = [];
     //   this.cargarComboFolders(res.data);
        res.data.map((r) => {
          const dato = {} as completeCustomerBranchModel;
          dato.customer_branch_id = r.customer_branch_id;
          dato.commercial_name = r.commercial_name;
          dato.customer_branch_name = r.customer_branch_name;
          this.sucursalesTableEstilo.push(dato);
         
        });
        this.sucursalesTable = this.sucursalesTableEstilo;
        this.setDefaultValuesFolders();
      });
    }
  }
  ////////////////////////////// GET DOCUMENTS BY ROUTES
  buscarPorZonaRuta(zone_id, route_id){
    if (zone_id == null || route_id == null){
      this.staticAlertClosedBuscar = false;
      return;
    }
    const branches_by_zones ={} as documentsDataByZonesModel;
    if (zone_id != 0 && route_id != 0 && this.comboFolderU.id != 0){
      this.documentslist.obtenerArchivosPorZonaRuta(1, zone_id, route_id, this.comboFolderU.id).subscribe((res:any)=>{
        this.documentosZonasRutasEstilo = [];
        res.data.map((r) => {
          const dato = {} as documentsDataByZonesModel;
          let dato_documents ={} as documentsListModel;
          dato.customer_name = r.commercial_name;
          dato.customer_branch_name = r.customer_branch_name;
          dato.original_file_name = r.document_data.original_file_name;
          dato.file_type = 'pdf';
          dato.document_id = r.document_data.document_id;
          dato.key = r.document_data.key;
          dato.bucket_name =  r.document_data.bucket_name;  
          this.documentosZonasRutasEstilo.push(dato);
        });
        this.sucursales = this.documentosZonasRutasEstilo;
      });
    }else{

    }
  }
  buscar(clienteId, sucursalId, folderId){
    
    if( (clienteId == null
        || sucursalId == null
        || folderId == null)) {
          this.staticAlertClosedBuscar = false;
          return;
      }
    const documentos = {} as documentsListModel;
    //obtener fecha actual, para la búsqueda
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');

    documentos.start_date         = this.strDate//this.start_date.replace('/','-'); 
    documentos.end_date           = this.strDate//this.end_date.replace('/','-');;
    documentos.company_id         = clienteId;
    documentos.company_branch_id  = sucursalId;
    documentos.folderId           = folderId;
    
    
    
    //////////////////////////////////////////////////////
    this.documentslist.obtenerArchivos(documentos).subscribe( (res: any) => {

      this.documentsEstilo = [];
      res.data.map((r) => {

        const dato = {} as documentsListModel;

        dato.original_file_name =  r.original_file_name ;
        if(r.file_type == 'pdf') {
          //getSignedUrlAWS(r.bucket_name,r.key)
          dato.file_type = 'pdf';//'<i class="mdi mdi-file-pdf display-5""></i>';
        } else if (r.file_type == 'png') {
          dato.file_type = 'png';//'<i class="mdi mdi-file-image display-5"></i>'
        }
        dato.folder_name = this.comboFolderU.description;
        dato.last_version   = r.last_version;
        dato.creation_date  = r.creation_date;
        dato.creation_time  = r.creation_time;
        dato.customer_name  = r.customer_name;
        dato.customer_branch_name = r.customer_branch_name; 

        dato.file_track_id  = r.file_track_id;
        dato.year           = r.month + ' / ' + r.year;
        dato.filename_path  = r.filename_path;
        dato.document_id    = r.document_id;
        dato.key            = r.key;
        dato.bucket_name    = r.bucket_name;
        dato.zone_name      = r.zone_name;
        dato.route_name     = r.route_name;
        
        this.documentsEstilo.push(dato);
      });
      
      this.documents = this.documentsEstilo;
    });
  }
 
  OnSelectedFile(event) {
    if (this.comboFolderU.id != 0 || this.comboFolderU.id != null){
      this.nombre_archivo='';
      this.counter_files = event.target.files.length; 
      for (let x = 0; x < event.target.files.length; x++){
        let file      = event.target.files[x];
        let reader    = new FileReader();
        const fileU   = {} as uploadFileModel;
        let fileName  = file.name.split(/[.]+/).pop();

        reader.readAsDataURL(file);
        reader.onload = function () {

          let v = '';

          if (fileName = 'pdf') {
            v = 'data:application/pdf;base64,';
          } else if (fileName = 'png') {
            v = 'data:image/png;base64,';
          }
          let archivo = reader.result.toString().replace(v, '');
          fileU.file  = archivo;
         
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      
        this.nombre_archivo += file.name;
        fileU.compamny_id         = localStorage.getItem('customerBranchId');
        fileU.company_branch_id   = localStorage.getItem('customerBranch');
        fileU.customer_id         = this.comboClienteU.client_identity;
        fileU.customer_branch_id  = this.comboSucursalU.branch_client_id;
        fileU.file_track_id       = this.comboFolderU.id;
        fileU.year                = (new Date().getFullYear());
        fileU.month               = new Date().getMonth();
        fileU.bucket_name         = 'emaclnstore';
        fileU.original_file_name  = file.name;
        fileU.file_name_in_bucket = file.name;
        fileU.file_type           = fileName;
        fileU.filename_path       = this.comboFolderU.description;
        if (this.checkbox_value){
          fileU.zone_id             = this.comboZonasU.zone_id;
          fileU.route_id            = this.comboRutasU.route_id;
          fileU.customer_id         = 0;
          fileU.customer_branch_id  = 0;
        }else{
          fileU.zone_id             = 0;
          fileU.route_id            = 0;
          
        }
        
        this.filesUpload.push(fileU);
      }
      
      this.listUploadFile.data = this.filesUpload;
    }else{
      this.alert.message = 'Seleccione el folder..';
    }
  }
  validaInputDocumento(e) {
    if (!this.checkbox_value){
      if( this.comboClienteU.client_identity == null
        || this.comboSucursalU.branch_client_id == null
      || this.comboFolderU.id == null ) {
        e.preventDefault() ;
        this.staticAlertClosed = false;
        this.alert.type = 'danger';
        this.alert.message = 'Seleccione cliente, sucursal y folder';
        return false;
      } else {
        this.staticAlertClosed = true;
        this.disabledBUttonSubir = false;
        this.disableReiniciar = false;
      }
    }else{
      if( this.comboZonasU.zone_id == null
        || this.comboRutasU.route_id == null
      || this.comboFolderU.id == null ) {
        e.preventDefault() ;
        this.staticAlertClosed = false;
        this.alert.type = 'danger';
        this.alert.message = 'Seleccione la zona, la ruta y folder';
        return false;
      } else {
        this.staticAlertClosed = true;
        this.disabledBUttonSubir=false;
        this.disableReiniciar = false;
      }
    }
  }
  onUpload() {
    /////_______________________Si el documento se sube por zona/ruta
    if (this.checkbox_value){
      if( this.filesUpload.length < 1 ) {
        this.staticAlertClosed = false;
        this.alert.type = 'danger';
        this.alert.message = 'Seleccione un archivo';
        return false;
      } else {
        if (!this.checkbox_value){
          if( (this.filesUpload[0].customer_id == null
            || this.filesUpload[0].customer_branch_id == null
            || this.filesUpload[0].file_track_id == null)) {
              this.staticAlertClosed = false;
              this.alert.type = 'danger';
              this.alert.message = 'Seleccione cliente, sucursal y folder';
              return false;
          }
        }else{
          if( (this.filesUpload[0].route_id == null
            || this.filesUpload[0].zone_id == null
            || this.filesUpload[0].file_track_id == null)) {
              this.staticAlertClosed = false;
              this.alert.type = 'danger';
              this.alert.message = 'Seleccione la zona, la ruta y el folder';
              return false;
          }
        }
      }

      this.progressBar.visible = true;
      this.disabledBUttonSubir = true;
      setTimeout(() => (this.progressBar.value = 50), 200);
      console.log(this.counter_files);
      this.customer.guardarArchivo(JSON.stringify(this.listUploadFile)).subscribe( (res: any) => {
        this.staticAlertClosed = false;
        //console.log("Body--- " + JSON.stringify(res) + " || " +   + " " + res.message);
        if (res.app_code == null){
          //if ( res.code == 200 ) {
            this.alert.type = 'success';
            this.alert.message = 'Archivo se subio correctamente';
            this.progres_spinner = false;
            this.disabledBUttonSubir = true;
            setTimeout(() => (this.progressBar.value = 100), 500);
            if (this.checkbox_value){
              this.buscarPorZonaRuta(this.comboZonasU.zone_id, this.comboRutasU.route_id);
            }else{
              this.buscar(this.comboClienteU.client_identity, this.comboSucursalU.branch_client_id, this.comboFolderU.id);
            }
          } else {
            //console.log(res.message);
            this.progressBar.value = 0;
            this.progressBar.type = 'danger';
            this.alert.type = 'danger';
            this.alert.message = 'Error al intentar subir el archivo. Intente de nuevo';
            this.disabledBUttonSubir = false;
          }
          this.reset();
        }, err => {
          console.log('Error al subir archivo....');
          console.log("------------" +  JSON.stringify(err) + " || " + err.http_code + " || " + err.message + " || " + err.code);
          this.disabledBUttonSubir = false;
          this.progressBar.value = 0;
            this.progressBar.type = 'danger';
            this.alert.type = 'danger';
            this.alert.message = 'Error al intentar subir el archivo';
            this.reset();
        });
    }else{
      ////////////////////////////////_________________Subir el archivo por cliente 
      if( this.filesUpload.length < 1 ) {
        this.staticAlertClosed = false;
        this.alert.type = 'danger';
        this.alert.message = 'Seleccione un archivo';
        return false;
      } else {
        if( (this.filesUpload[0].customer_id == null
          || this.filesUpload[0].customer_branch_id == null
          || this.filesUpload[0].file_track_id == null)) {
            this.staticAlertClosed = false;
            this.alert.type = 'danger';
            this.alert.message = 'Seleccione cliente, sucursal y folder';
            return false;
        }
      }
      this.progres_spinner = false;
      this.progressBar.visible = true;
      setTimeout(() => (this.progressBar.value = 50), 200);
      //console.log("ruta_id " + this.comboRutasU.route_id);
      this.disabledBUttonSubir = true;
      
      let continue_uploading = true;
      let j = 0;
   //   for (let i = 0; i < this.counter_files; i++){
       /* var dTemp = new Array();
        dTemp[0] = JSON.parse(JSON.stringify(this.listUploadFile.data[i]));
        this.listUploadFile2.data = dTemp; 
        this.listUploadFileIndividualFile =  this.listUploadFile2;
        console.log(i + " | " + JSON.stringify(this.listUploadFileIndividualFile));
      */
      this.customer.guardarArchivo(JSON.stringify(this.listUploadFile)).subscribe( (res: any) => {
          this.staticAlertClosed = false;
          if ( res.code == 200 ) {
            this.alert.type = 'success';
            this.alert.message = 'Archivo se subio correctamente';
            this.progres_spinner = true;

            setTimeout(() => ( this.progressBar.value = 100), 500);
            this.disabledBUttonSubir = false;
            this.buscar(this.comboClienteU.client_identity, this.comboSucursalU.branch_client_id, this.comboFolderU.id);
          } else {
            this.progres_spinner = true;
            this.progressBar.value = 0;
            this.progressBar.type = 'danger';
            this.alert.type = 'danger';
            this.alert.message = 'Error al intentar subir el archivo';
            this.disabledBUttonSubir = false;
          }
          this.reset();
        }, err => {
          this.staticAlertClosed = false;
          console.log('Error al subir archivo...');
          //console.log(JSON.stringify(err) + " || " + err.http_code + " || " + err.message + " || " + err.code);
          this.alert.type = 'danger';
          this.alert.message = 'Error al intentar subir el archivo. Revise el estatus del archivo e intente nuevamente.';
            this.disabledBUttonSubir = false;
            this.progres_spinner = true;
            this.progressBar.value = 0;
            this.reset();
        });
     // }
    }
  }
  reset() {
    this.disabledBUttonSubir = true;
    setTimeout(() => (this.staticAlertClosed = true), 15000);
    setTimeout(() => (this.progres_spinner = true, this.progressBar.visible = false), 3000);
    setTimeout(() => (this.progressBar.value = 10), 3000);
    setTimeout(() => this.progressBar.type = 'success', 3000);
    setTimeout(() => (this.staticAlertClosed2 = true), 1300);
    this.filesUpload  = [];
    this.nombreFile   = '';
  }
  borrarDocumento(){
    if (this.checkbox_value){
      var index = this.sucursales.findIndex(x => x.document_id === this.tempDocumentoBorrar.data.document_id);
      this.documentslist.borrarArchivo(this.tempDocumentoBorrar);
      this.sucursales.splice(index, 1);
      this.sucursales.map( (e) => {  this.tempDucumentZonasRutas.push(e); });
      this.sucursales = this.tempDucumentZonasRutas;
      this.tempDucumentZonasRutas = [];
      this.modalService.dismissAll();
    }else{
      var index = this.documents.findIndex(x=>x.document_id === this.tempDocumentoBorrar.data.document_id);
      this.documentslist.borrarArchivo(this.tempDocumentoBorrar);
      this.documents.splice(index,1);
      this.documents.map( (e) => {  this.tempDocument.push(e);  });
      this.documents = this.tempDocument;
      this.tempDocument = [];
      this.modalService.dismissAll();
    }
  }

  onCustomActionArchivos(contenedor, modalConfirmarBorrar, event) {
    if(event.action == 'deleteFile'){
      this.tempDocumentoBorrar.data.document_id =  event.data.document_id;
      this.tempDocumentoBorrar.data.key = event.data.key;
      this.tempDocumentoBorrar.data.bucket_name = event.data.bucket_name;
      this.openLg(modalConfirmarBorrar, event);
    }
    else if(event.action == 'viewFile'){
      console.log("Visualizando archivo: " + event.data.bucket_name + " key " + event.data.key);
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    }
    else if(event.action == 'viewFileA'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    } 
    else if(event.action == 'viewFileP'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    }
  }
  onCustomActionSucursalesUncheck(event){
    console.log(event.action);
  }
  onCustomActionArchivosZonasRutas(contenedor, modalConfirmarBorrar, event) {
    if(event.action == 'deleteFile'){
      this.tempDocumentoBorrar.data.document_id =  event.data.document_id;
      this.tempDocumentoBorrar.data.key = event.data.key;
      this.tempDocumentoBorrar.data.bucket_name = event.data.bucket_name;
      this.openLg(modalConfirmarBorrar, event);
    }
    else if(event.action == 'viewFile'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    }
    else if(event.action == 'viewFileA'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    } 
    else if(event.action == 'viewFileP'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openLg(contenedor, event);
    }
  }
  
  openLg(content2, event) {
    this.modalService.open(content2, { size: 'lg' });
    if ((event.action).search('view')>=0){
      var x = document.getElementById("mypdf");
      x.setAttribute("type", "application/pdf");
      x.setAttribute("src", this.getSignedUrlAWS(event.data.bucket_name, event.data.key));
      x.setAttribute("width", "100%");
      x.setAttribute("height", "600");
    }
  }
  verSucursales(content3){
    this.modalService.open(content3, { size: 'lg' });
  }
  cleanURL(oldURL): SafeUrl {
    return   this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
  getSignedUrlAWS(bucket, pathFile): string{
    const aws = require('aws-sdk');
    let s3 = new AWS.S3({
      accessKeyId: 'AKIAZI5VJPNY4HKDNAEK',
      secretAccessKey: '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',
      region: 'us-east-2'
    });

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: pathFile
    });
    return url;
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
