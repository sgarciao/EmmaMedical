
import {TooltipComponent } from './TooltipComponent'

export let settingsDocuments = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    original_file_name: {
      title: 'Archivo',
      filter: true,
      width: '15%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creación',
      filter: true,
      width: '7%',
      type: 'html'
    },
    creation_time: {
      title: 'Hora de creación',
      filter: true,
      width: '7%',
      type: 'html'
    },
    folder_name: {
      title: 'Folder',
      filter: true,
      width: '10%',
      type: 'html'
    },
    customer_name: {
      title: 'Cliente',
      filter: true,
      width: '10%',
      type: 'html'
    },
    customer_branch_name: {
      title: 'Sucursal',
      filter: true,
      width: '10%',
      type: 'html'
    },
    zone_name: {
      title: 'Zona',
      filter: true,
      width: '10%',
      type: 'html'
    },
    route_name: {
      title: 'Ruta',
      filter: true,
      width: '15%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    width: '15%',
    columnTitle: "",      
    custom: [
      { name: 'deleteFile', title: '<img src="https://img.icons8.com/color/48/000000/delete-forever.png" (click)="delete($event)" width="25px" height="25px" /> |', width: '100px',},
      { name: 'viewFile', title: ' <img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
        position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  
};

export let settingsDocumentsA = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {

    original_file_name: {
      title: 'Archivo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    file_type: {
      title: 'Tipo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    last_version: {
      title: 'Version',
      filter: true,
      width: '20%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creacion',
      filter: true,
      width: '20%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",
    custom: [
              { name: 'viewFileA', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  
};

export let settingsDocumentsP = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {

    original_file_name: {
      title: 'Archivo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    file_type: {
      title: 'Tipo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    last_version: {
      title: 'Version',
      filter: true,
      width: '20%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creacion',
      filter: true,
      width: '20%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",
    custom: [
              { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  
};

export let settingsDocumentsR = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {

    original_file_name: {
      title: 'Archivo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    file_type: {
      title: 'Tipo',
      filter: true,
      width: '20%',
      type: 'html'
    },
    last_version: {
      title: 'Version',
      filter: true,
      width: '20%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creacion',
      filter: true,
      width: '20%',
      type: 'html'
    },
    document_id:{
      title: 'document_id',
      show:false,
      editable:false,
      addable: false,
    }
  },
  
  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",
    custom: [
              { name: 'viewError', title: '<i class="ti-file text-warning2 m-r-10"> Motivo</i>', width: '100px'},
              { name: 'uploadFile', title: '<i class="ti-cloud-up text-warning2 m-r-10"> Upload</i>', width: '100px'}
            ],      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  
};


export let settingsDocumentsZoneRoute = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    original_file_name:{
      title: 'Archivo',
      filter: true,
      width: '15%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creación',
      filter: true,
      width: '7%',
      type: 'html'
    },
    creation_time: {
      title: 'Hora de creación',
      filter: true,
      width: '7%',
      type: 'html'
    },
    folder_name: {
      title: 'Folder',
      filter: true,
      width: '10%',
      type: 'html'
    },
    customer_name: {
      title: 'Cliente',
      filter: true,
      width: '10%',
      type: 'html'
    },
    customer_branch_name: {
      title: 'Sucursal',
      filter: true,
      width: '10%',
      type: 'html'
    },  
    zone_name: {
      title: 'Zona',
      filter: true,
      width: '10%',
      type: 'html'
    },
    route_name: {
      title: 'Ruta',
      filter: true,
      width: '10%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    width: '15%',
    columnTitle: "",      
    custom: [
      { name: 'deleteFile', title: '<img src="https://img.icons8.com/color/48/000000/delete-forever.png" width="22px" height="22px" /> |', width: '100px',},
      { name: 'viewFile', title: ' <img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
       position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage:10, totalKey: 100, float: 'right;' }
  
};

export let settingsDocumentsByZoneAndRoute = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    customer_branch_id: {
      title: 'Id',
      filter: true,
      width: '30%',
      type: 'html'
    },
    commercial_name: {
      title: 'Sucursal',
      filter: true,
      width: '70%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    width: '10%',
    columnTitle: "Seleccionar",      
    custom: [
      { name: 'deleteFile', title: '<nb-checkbox [ngModel]="selected"></nb-checkbox>', width: '100px',}],      
       position:  'left',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage:10, totalKey: 100, float: 'right;' }
  
};