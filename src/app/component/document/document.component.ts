import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgbPanelChangeEvent, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
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
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import * as tableData from './smart-data-table';
import * as AWS from 'aws-sdk';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
///////MAT MATERIAL
import {FormControl} from '@angular/forms';
import { Observable, of, Subject, merge } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, filter, toArray } from 'rxjs/operators';

@Component({
  selector:     'app-ngbd-accordion-basic',
  templateUrl:  'document.component.html',
  providers: [ 
              CustomerService,
              CustomerBranchService,
              DocumentsService,
              PathsService] 
})

export class DocumentComponent implements OnInit {
  model_customers: {client_identity: number, comercial_name: string}[]=[];

  
  
  nombreFile          : string;
  nombreFileRechazados: string;
  
  comboCliente    = {} as customerModel;
  comboClienteA   = {} as customerModel;
  comboClienteR   = {} as customerModel;
  comboClienteP   = {} as customerModel;

  comboSucursal   = {} as customerBranchModel;
  comboSucursalA  = {} as customerBranchModel;
  comboSucursalR  = {} as customerBranchModel;
  comboSucursalP  = {} as customerBranchModel;
  
  comboFolder     = {} as folderModel;
  comboFolderA    = {} as folderModel;
  comboFolderR    = {} as folderModel;
  comboFolderP    = {} as folderModel;

  listUploadFile            = {} as listUploadFile;
  listUploadFileRechazados  = {} as listUploadFile;
  comboBusqueda: any;

  documents:  documentsListModel[] = [];
  documentsA: documentsListModel[] = [];
  documentsR: documentsListModel[] = [];
  documentsP: documentsListModel[] = [];
  clientes_ :customerModel[]=[];

  documentsEstilo:        documentsListModel[] = [];
  filesUpload:            uploadFileModel[] = [];
  filesUploadRechazados:  uploadFileModel[] = [];
  tempDocumentoBorrar = {data: {document_id: 0, key: '', bucket_name: ''}};

  urlFile:        string;
  rechazoMotivo:  string;
  document_id:    number;
  esEmpleado;
  comboClientesBusqueda:
    {client_identity:  number,
    commercial_name:  string}[];
  //Combo Clientes
  clientes:[{
    client_identity:  number,
    commercial_name:  string,
    status:           number
  }];
  
  clientesA:[{
    client_identity:  number,
    commercial_name:  string,
    status:           number
  }];
  clientesR:[{
    client_identity:  number,
    commercial_name:  string,
    status:           number
  }];
  clientesP:[{
    client_identity:  number,
    commercial_name:  string,
    status:           number
  }];
  //Combo Sucursales
  sucursales:[{
    branch_client_id: number,
    business_name:    string,
    status:           number
  }];
 
  sucursalesA:[{
    branch_client_id: number,
    business_name:    string,
    status:           number
  }];
  sucursalesR:[{
    branch_client_id: number,
    business_name:    string,
    status:           number
  }];
  sucursalesP:[{
    branch_client_id: number,
    business_name:    string,
    status:           number
  }];
  //Combo Folders
  folders:[{
    id:                 number,
    description:        string,
    brief_description:  string
  }];
  
  foldersA:[{
    id:                 number,
    description:        string,
    brief_description:  string
  }];
  foldersR:[{
    id:                 number,
    description:        string,
    brief_description:  string
  }];
  foldersP:[{
    id:                 number,
    description:        string,
    brief_description:  string
  }];
  defaultCombosFolder = {
    id: 0,
    description: 'Seleccione...',
    brief_description: 'Seleccione...'
  };
  defaultCombosClientes = {
    client_identity:  0,
    commercial_name:  'Seleccione...',
    status: 0
  };
  defaultCombosSucursal = {
    branch_client_id: 0,
    business_name:    'Seleccione...',
    status:           0
  };
  disabledComboSucursal = true;
  disabledComboSucursalA = true;
  disabledComboSucursalR = true;
  disabledComboSucursalP = true;
  //Buscar Documentos Nuevos
  start_date  : string;
  end_date    : string;
  //Buscar Documentos Aprobados
  start_dateA : string;
  end_dateA   : string;
  //Buscar Documentos Rechazados
  start_dateR : string;
  end_dateR   : string;
  //Buscar Documentos Pendientes
  start_dateP : string;
  end_dateP   : string;
  // Fechas por defualt
  pipe = new DatePipe('en-US');
  today = new Date();
  toSevenDay = this.today;
  strDate = '';
  

  resetUpload1: boolean;
  resetUpload2: boolean;
  resetUpload3: boolean;
  alert: IAlert;
  alertBuscar: IAlert;
  alertPendientes: IAlert;
  alertAprobados: IAlert;
  alertRechazados: IAlert;
  staticAlertClosed = true;
  staticAlertClosedR = true;
  staticAlertClosedBuscar = true;
  staticAlertClosedPendientes = true;
  staticAlertClosedAprobados = true;
  staticAlertClosedRechazados = true;
  staticAlertClosedRButton = true;

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

  progressBarR = {
    type: 'success',
    value: 10,
    max: 100,
    height:  '20px',
    visible: false,
    showValue: true,
    striped: true,
    animated: true
  };

  closeResult: string;
  constructor(
    private customer:       CustomerService,
    private customerbranch: CustomerBranchService,
    private paths:          PathsService,
    private documentslist:  DocumentsService,
    private modalService:   NgbModal,
    private sanitizer:      DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.esEmpleado = localStorage.getItem('esEmpleado');
    // set default input dates
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.end_date = this.strDate;
    this.end_dateA = this.strDate;
    this.end_dateP = this.strDate;
    this.end_dateR = this.strDate;
    this.toSevenDay.setDate( this.toSevenDay.getDate() - 7 );
    this.strDate = this.pipe.transform(this.toSevenDay, 'yyyy-MM-dd');
    this.start_date = this.strDate;
    this.start_dateP = this.strDate;
    this.start_dateA = this.strDate;
    this.start_dateR = this.strDate;
    this.sanitizer = sanitizer;
    this.alert = {
      id: 1,
      type: 'success',
      message: 'This is an success alert'
    };
    this.alertAprobados =
    this.alertPendientes =
    this.alertRechazados =
    this.alertBuscar = {
      id: 1,
      type: 'danger',
      message: 'Se requiere seleccionar todos los campos'
    };
  }
  //////////////////////////SEARCH customer
  public cliente_busqueda_id: any;
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public model: any;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.clientes.filter(v => v.commercial_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    /* search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => this.instance && !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? []
        : this.clientes.filter(v => v.commercial_name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }*/
  formatter = (x: {commercial_name: string}) => x.commercial_name;
  /////////////////////////////////
  ngOnInit(){
  
    this.hideColumn();
    //carga combo folders
    this.route.paramMap.subscribe(params => {
      this.setDefaultCombosFolder();
      let fatherId = params.get('fatherId');
      let headerId = params.get('headerId');
      //validar localStorage
      if(fatherId == null){
        fatherId = localStorage.getItem('menu');
        if(fatherId == null){
          //default
          fatherId = '1';
        }
      }
      if(headerId == null){
        headerId = localStorage.getItem('submenu');
        if( headerId == null){
          //default
          headerId = '1';
        }
      }
       //GET FOLDERS 
       this.paths.obtenerFolders(fatherId,headerId).subscribe( (res: any) => {
        this.cargarCombosFolders(res.data);
        this.setDefaultCombosFolder();
      });

    });
 
    // Validar sesion
    /*if(isNull(sessionStorage.getItem('refresh_token'))){
      this.router.navigate(['/login']);
    } else {*/
      //GET CLIENTES
    this.customer.obtenerClientes().subscribe( (res: any) => {
      this.cargarCombosClientes(res.data);
      this.setDefaultCombosCliente();
    });
    
   

     
    //}
  }
  
  cargarCombosClientes(data) {
    data.unshift(this.defaultCombosClientes);
    this.clientes  = data;
    this.clientesA = data;
    this.clientesR = data;
    this.clientesP = data;
  }

  cargarCombosFolders(data) {
      data.unshift(this.defaultCombosFolder);
      
      
      this.folders  = data;
      this.foldersA = data;
      this.foldersR = data;
      this.foldersP = data;
  }

  setDefaultCombosFolder() {
    //folders
    this.comboFolderA  = this.defaultCombosFolder;
    this.comboFolder = this.defaultCombosFolder;
    this.comboFolderP = this.defaultCombosFolder;
    this.comboFolderR = this.defaultCombosFolder;
  }

  setDefaultCombosCliente() {
    //clientes
    this.comboCliente = this.defaultCombosClientes;
    this.comboClienteA = this.defaultCombosClientes;
    this.comboClienteP = this.defaultCombosClientes;
    this.comboClienteR = this.defaultCombosClientes;
  }

  setDefaultCombosSucursal() {
    //Sucursal
    this.comboSucursal = this.defaultCombosSucursal;
    this.comboSucursalA = this.defaultCombosSucursal;
    this.comboSucursalP = this.defaultCombosSucursal;
    this.comboSucursalR = this.defaultCombosSucursal;
    this.disabledComboSucursal = true;
    this.disabledComboSucursalR = true;
    this.disabledComboSucursalA = true;
    this.disabledComboSucursalP = true;
  }
  clickedItem:string;
  cambioCliente2(event) {

    this.clickedItem = event.item.client_identity;
    const  clienteId = this.clickedItem;
    this.cliente_busqueda_id = clienteId ;
    console.log("buscando sucursales.... " + clienteId);
    if (clienteId != null && clienteId != ""){
      this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
          res.data.unshift(this.defaultCombosSucursal);
          this.sucursales =  res.data;
          this.setDefaultCombosSucursal();
          this.disabledComboSucursal = false;
      });
    }
  }
  cambioCliente(clienteId) {
    console.log("buscando sucursales.... " + clienteId);
    if (clienteId != null && clienteId != 0){
      this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
          res.data.unshift(this.defaultCombosSucursal);
          this.sucursales =  res.data;
          this.setDefaultCombosSucursal();
          this.disabledComboSucursal = false;
      });
    }
  }

  cambioClienteA(clienteId) {
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
      res.data.unshift(this.defaultCombosSucursal);
        this.sucursalesA =  res.data;
        this.setDefaultCombosSucursal();
        this.disabledComboSucursalA = false;
    });
  }

  cambioClienteR(clienteId) {
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
      res.data.unshift(this.defaultCombosSucursal);
        this.sucursalesR =  res.data;
        this.setDefaultCombosSucursal();
        this.disabledComboSucursalR = false;
    });
  }

  cambioClienteP(clienteId){
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
      res.data.unshift(this.defaultCombosSucursal);
      this.sucursalesP =  res.data;
      this.setDefaultCombosSucursal();
      this.disabledComboSucursalP = false;
    }); 
  }

  buscar(clienteId, sucursalId, folderId){
   // clienteId = this.cliente_busqueda_id;
    //console.log(">> buscando cliente id " + clienteId + " sucursal id " +sucursalId+" folder id"+ folderId);
    clienteId = this.comboCliente.client_identity;
    sucursalId = this.comboSucursal.branch_client_id;
    folderId = this.comboFolder.id;
    console.log("combos cliente id " + this.comboCliente.client_identity + " sucursal id "+ this.comboSucursal.branch_client_id + " folder id " + this.comboFolder.id);
    if( (clienteId === 0
        || sucursalId === 0
        || folderId === 0)) {
          this.staticAlertClosedBuscar = false;
          this.alertBuscar.type = 'danger';
          this.alertBuscar.message = 'Se requiere seleccionar todos los campos';
          this.resetNuevos();
          return;
      }
    const documentos = {} as documentsListModel;
    
    documentos.start_date         = this.start_date.replace('/','-'); 
    documentos.end_date           = this.end_date.replace('/','-');
    documentos.company_id         = clienteId;
    documentos.company_branch_id  = sucursalId;
    documentos.folderId           = folderId;
      console.log("-------- " + folderId);
    this.documentslist.obtenerArchivos(documentos).subscribe( (res: any) => {

      this.documentsEstilo = [];
      console.log(">>>>>>>>>>>> " + res.data.length);
      if(res.data.length < 1){
        this.staticAlertClosedBuscar = false;
        this.alertBuscar.type = 'info';
        this.alertBuscar.message = 'No se encontraron resultados';
        this.resetNuevos();
      } else {
        res.data.map((r) => {
          
          const dato = {} as documentsListModel;

          dato.original_file_name =  r.original_file_name ;
          if(r.file_type == 'pdf') {
            dato.file_type = 'pdf';//'<span (ng-click)="{{printConsole}}" ><img src="https://img.icons8.com/officel/40/000000/pdf.png" /> </span>';
          }else if(r.file_type == 'png'){
            dato.file_type = '<span (click)="this.printConsole()" ><img src="https://img.icons8.com/officel/40/000000/pdf.png" /> </span>';
          }
          dato.last_version   = r.last_version;
          dato.creation_date  = r.creation_date;
          dato.file_track_id  = r.file_track_id;
          dato.year           = r.month + ' / ' + r.year;
          dato.filename_path  = r.filename_path;
          dato.document_id    = r.document_id;
          dato.key            = r.key;
          dato.bucket_name    = r.bucket_name; 
          
          this.documentsEstilo.push(dato);
        });
      }
      this.documents = this.documentsEstilo;
    });
  }
  settingsDocuments = tableData.settingsDocuments;

  buscarAprobados(clienteId, sucursalId, folderId){
    clienteId = this.comboClienteA.client_identity;
    sucursalId = this.comboSucursalA.branch_client_id;
    folderId = this.comboFolderA.id;

    if( (clienteId === 0
      || sucursalId === 0
      || folderId === 0)) {
          this.staticAlertClosedAprobados = false;
          this.alertAprobados.type = 'danger';
          this.alertAprobados.message = 'Se requiere seleccionar todos los campos';
          this.resetAprobados();
          return;
      }
    const documentos = {} as documentsListModel;

    documentos.start_date         = this.start_dateA.replace('/', '-');
    documentos.end_date           = this.end_dateA.replace('/', '-');
    documentos.company_id         = clienteId;
    documentos.company_branch_id  = sucursalId;
    documentos.folderId           = folderId;

    this.documentslist.obtenerArchivosAprobados(documentos).subscribe( (res: any) => {
      
      this.documentsEstilo = [];
      if(res.data.length < 1){
        this.staticAlertClosedAprobados = false;
        this.alertAprobados.type = 'info';
        this.alertAprobados.message = 'No se encontraron resultados';
        this.resetAprobados();
      } else {
        res.data.map((r) => {
          
          const dato = {} as documentsListModel;

          dato.original_file_name =  r.original_file_name ;
          if(r.file_type == 'pdf') {
            dato.file_type = 'pdf';//'<img src="https://img.icons8.com/officel/40/000000/pdf.png"/>';
          }else if(r.file_type == 'png'){
            dato.file_type = 'ong';//'<img src="https://img.icons8.com/office/40/000000/png.png"/>';
          }
          dato.last_version  = r.last_version;
          dato.creation_date = r.creation_date;
          dato.filename_path = r.filename_path;
          dato.document_id   = r.document_id;
          dato.key           = r.key;
          dato.bucket_name   = r.bucket_name; 
          
          this.documentsEstilo.push(dato);
        });
      }
      this.documentsA = this.documentsEstilo;
    });
  }
  settingsDocumentsA = tableData.settingsDocumentsA;

  buscarRechazados(clienteId, sucursalId, folderId){
    if( (clienteId === 0
      || sucursalId === 0
      || folderId === 0)) {
          this.staticAlertClosedRechazados = false;
          this.alertRechazados.type = 'danger';
          this.alertRechazados.message = 'Se requiere seleccionar todos los campos';
          this.resetRechazados();
          return;
      }
    const documentos = {} as documentsListModel;

    documentos.start_date         = this.start_dateR.replace('/','-'); 
    documentos.end_date           = this.end_dateR.replace('/','-');
    documentos.company_id         = clienteId;
    documentos.company_branch_id  = sucursalId;
    documentos.folderId           = folderId;

    this.documentslist.obtenerArchivosRechazados(documentos).subscribe( (res: any) => {
      this.documentsEstilo = [];
      if(res.data.length < 1) {
        this.staticAlertClosedRechazados = false;
        this.alertRechazados.type = 'info';
        this.alertRechazados.message = 'No se encontraron resultados';
        this.resetRechazados();
      } else {
        res.data.map((r) => {
          const dato = {} as documentsListModel;

          dato.original_file_name =  r.original_file_name ;
          if(r.file_type == 'pdf') {
            dato.file_type = '<img src="https://img.icons8.com/officel/40/000000/pdf.png"/>';
          }else if(r.file_type == 'png'){
            dato.file_type = '<img src="https://img.icons8.com/office/40/000000/png.png"/>';
          }
          dato.document_id   = r.document_id;
          dato.last_version  = r.last_version;
          dato.creation_date = r.creation_date;
          dato.filename_path = r.filename_path;
          dato.bucket_name   = r.bucket_name;
          dato.reject_reason = r.reject_reason;
          dato.last_version  = r.last_version;
          this.documentsEstilo.push(dato);
        });
      }
      this.documentsR = this.documentsEstilo;
    });
  }
  settingsDocumentsR = tableData.settingsDocumentsR;

  buscarPendientes(clienteId, sucursalId, folderId){
    if( (clienteId === 0
      || sucursalId === 0
      || folderId === 0)) {
          this.staticAlertClosedPendientes = false;
          this.alertPendientes.type = 'danger';
          this.alertPendientes.message = 'Se requiere seleccionar todos los campos';
          this.resetPendientes();
          return;
      }
    const documentos = {} as documentsListModel;

    documentos.start_date         = this.start_dateP.replace('/','-'); 
    documentos.end_date           = this.end_dateP.replace('/','-');
    documentos.company_id         = clienteId;
    documentos.company_branch_id  = sucursalId;
    documentos.folderId           = folderId;

    this.documentslist.obtenerArchivosPendientes(documentos).subscribe( (res: any) => {
      
      this.documentsEstilo = [];
      if(res.data.length < 1){
        this.staticAlertClosedPendientes = false;
        this.alertPendientes.type = 'info';
        this.alertPendientes.message = 'No se encontraron resultados';
        this.resetPendientes();
      } else {
        res.data.map((r) => {
          
          const dato = {} as documentsListModel;

          dato.original_file_name =  r.original_file_name ;
          if(r.file_type == 'pdf') {
            dato.file_type = 'pdf';//'<img src="https://img.icons8.com/officel/40/000000/pdf.png"/>';
          }else if(r.file_type == 'png'){
            dato.file_type = 'png';//'<img src="https://img.icons8.com/office/40/000000/png.png"/>';
          }
          dato.last_version  = r.last_version;
          dato.creation_date = r.creation_date;
          dato.filename_path = r.filename_path;
          dato.document_id   = r.document_id;
          dato.key           = r.key;
          dato.bucket_name   = r.bucket_name; 
          
          this.documentsEstilo.push(dato);
        });
      }
      this.documentsP = this.documentsEstilo;
    });

  }
  settingsDocumentsP = tableData.settingsDocumentsP;
  
 
  OnSelectedFileRechazados(event){

    for(let x = 0; x<event.target.files.length; x++){

      let file      = event.target.files[x];
      let reader    = new FileReader();
      const fileU   = {} as uploadFileModel;
      let fileName  = file.name.split(/[.]+/).pop();
      
      reader.readAsDataURL(file);
      reader.onload = function () {

        let v = "";

        if (fileName = 'pdf') {
          v = "data:application/pdf;base64,";
        } 
        else if (fileName = 'png'){
          v = "data:image/png;base64,";
        }   
        let archivo = reader.result.toString().replace(v, "");
        fileU.file  = archivo;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      fileU.document_id         = this.document_id;
      fileU.compamny_id         = localStorage.getItem('customerBranchId');
      fileU.company_branch_id   = localStorage.getItem('customerBranch');
      fileU.customer_id         = this.comboClienteR.client_identity;
      fileU.customer_branch_id  = this.comboSucursalR.branch_client_id;
      fileU.file_track_id       = this.comboFolderR.id;
      fileU.year                = new Date().getFullYear();
      fileU.month               = new Date().getMonth();
      fileU.bucket_name         = "emaclnstore";
      fileU.original_file_name  = file.name;
      fileU.file_name_in_bucket = file.name;
      fileU.file_type           = fileName;
      fileU.filename_path       = this.comboFolderR.description;
      fileU.last_version        = 1;
      
      
      this.filesUploadRechazados.push(fileU);
    }
    this.listUploadFileRechazados.data = this.filesUploadRechazados;
  }

  onUploadRechazados(){
    this.progressBarR.visible = true;
    setTimeout(() => (this.progressBarR.value = 50), 200);
    console.log(this.listUploadFileRechazados);
    this.customer.guardarArchivoRechazado(JSON.stringify(this.listUploadFileRechazados)).subscribe( (res: any) => {
      this.staticAlertClosedR = false;
      if ( res.code === 200 ) {
        this.alert.type = 'success';
        setTimeout(() => (this.progressBarR.value = 100), 500);
        this.alert.message = 'Archivo se subio correctamente';
        this.staticAlertClosedRButton = false;
      } else {
        this.progressBar.value = 0;
        this.progressBar.type = 'danger';
        this.alert.type = 'danger';
        this.alert.message = 'Error al intentar subir el archivo';
      }
      this.resetRechazados();
    });
  }

  cerrarModalRechazados() {
    this.staticAlertClosedRButton = true;
    this.modalService.dismissAll();
  }

  tempDocument: documentsListModel[] = [];
  borrarDocumento(){
      var index = this.documents.findIndex(x=>x.document_id === this.tempDocumentoBorrar.data.document_id);
      this.documentslist.borrarArchivo(this.tempDocumentoBorrar);
      this.documents.splice(index,1);
      this.documents.map( (e) => {  this.tempDocument.push(e);  });
      this.documents = this.tempDocument;
      this.tempDocument = [];
      this.modalService.dismissAll();
  }

  onCustomActionArchivos(contenedor, contenedor2, contenedor3, modalConfirmarBorrar ,event) {
    
    if(event.action == 'deleteFile'){
      this.tempDocumentoBorrar.data.document_id =  event.data.document_id;
      this.tempDocumentoBorrar.data.key = event.data.key;
      this.tempDocumentoBorrar.data.bucket_name = event.data.bucket_name;
      this.openLg(modalConfirmarBorrar);
    }
    else if(event.action == 'viewFile'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openDiv(contenedor,event);
    }
    else if(event.action == 'viewFileA'){
      console.log("Key aprobados  " + event.data.key);
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openDiv(contenedor,event);
    } 
    else if(event.action == 'viewFileP'){
      this.urlFile = this.getSignedUrlAWS(event.data.bucket_name,event.data.key);
      this.openDiv(contenedor,event);
    } 
    else if(event.action == 'viewError'){
      this.rechazoMotivo = event.data.reject_reason;
      this.openDiv(contenedor2,event);
    }
    else if(event.action == 'uploadFile'){
      this.document_id = event.data.document_id;
      this.openDiv(contenedor3,event);
    }  
  }

  hideColumn(){
    delete this.settingsDocumentsR.columns.document_id;
  }
  resetAprobados(){
    setTimeout(() => (this.staticAlertClosedAprobados = true), 2000);
  }
  resetPendientes(){
    setTimeout(() => (this.staticAlertClosedPendientes=true), 2000);
    setTimeout(() => (this.staticAlertClosed = true), 2000);
    setTimeout(() => this.progressBar.visible = false, 3000);
    setTimeout(() => this.progressBar.value = 10, 3000);
    setTimeout(() => this.progressBar.type = 'success', 3000);
  }
  resetNuevos(){
    setTimeout(() => (this.staticAlertClosedBuscar = true), 2000);
    setTimeout(() => (this.staticAlertClosed = true), 2000);
    setTimeout(() => this.progressBar.visible = false, 3000);
    setTimeout(() => this.progressBar.value = 10, 3000);
    setTimeout(() => this.progressBar.type = 'success', 3000);
    setTimeout(() => this.staticAlertClosedRButton = false, 2000);
  }

  resetRechazados() {
    setTimeout(() => (this.staticAlertClosedRechazados = true), 2000);
    setTimeout(() => this.progressBarR.visible = false, 3000);
    setTimeout(() => this.progressBarR.value = 10, 3000);
    setTimeout(() => this.progressBarR.type = 'success', 3000);
    setTimeout(() => this.staticAlertClosedRButton = false, 3000);
    
    this.filesUploadRechazados  = [];
    this.nombreFileRechazados   = '';
  }

  getSignedUrlAWS(bucket, pathFile) : string{
    const aws = require('aws-sdk');
    let s3 = new AWS.S3({
      accessKeyId: 'AKIAZI5VJPNY4HKDNAEK',
      secretAccessKey: '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',
      region:'us-east-2'
    });

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: pathFile
    })
    return url;
  }

  cleanURL(oldURL): SafeUrl {
    return   this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
 
  openDiv(content, event) {
    this.modalService.open(content, { size: 'lg' });
    var x = document.getElementById("mypdf");
    x.setAttribute("type", "application/pdf");
    x.setAttribute("src", this.getSignedUrlAWS(event.data.bucket_name, event.data.key));
    x.setAttribute("width", "100%");
    x.setAttribute("height", "600");
  }

  openLg(content2) {
    this.modalService.open(content2, { size: 'lg' });
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}