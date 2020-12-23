import { Injectable } from '@angular/core'; 
import { HttpClient,HttpHeaders} from '@angular/common/http'; 
import 'rxjs/add/operator/map' 
import { environment } from '../../environments/environment';

@Injectable() 
export class DocumentsService { 
 
  constructor(private httpClient : HttpClient) { } 
   
  obtenerArchivosPorZonaRuta(company_branch_id, zone_id, route_id, file_track_id) { 
    
    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/documents/zones/routes/'
    + company_branch_id + '/' + zone_id + '/' + route_id+'/'+file_track_id)
    .map(data => data);
  }

  obtenerArchivos(documentos) { 
    //console.log(">>>> folder id " + documentos.folderId);
    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/documents-list/'
    + localStorage.getItem('customerBranchId') + '/'
    + localStorage.getItem('customerBranch') + '/'
    + documentos.start_date + '/' + documentos.end_date + '/' + documentos.company_id + '/' 
    + documentos.company_branch_id + '/' + documentos.folderId + '?from=1&per_page=1000', 
    {
      headers: {'language_id':'1'}
   })
    .map(data => data);

  }

  obtenerClienteArchivos(documentos,estatus) { 
    return this.httpClient.get(environment.url + '/v1/ema-system/customers/documents-list/'
     + documentos.start_date + '/'
     + documentos.end_date + '/'
     + documentos.folderId + '/'
     + estatus + '?from=1&per_page=1000',{ 
      headers: {'token':sessionStorage.getItem('access_token') , 'language_id': '1'} 
   }).map(data=> 
    data); 
  }

  obtenerArchivosAprobados(documentos) {
    /**/  
    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/documents-list/approved/'
    + localStorage.getItem('customerBranchId') + '/'
    + localStorage.getItem('customerBranch') + '/'
    + documentos.start_date+ '/' + documentos.end_date + '/' + documentos.company_id 
    + '/' + documentos.company_branch_id + '/' + documentos.folderId + '?from=1&per_page=1000')
    .map(data => data);
  }

  obtenerArchivosPendientes(documentos) { 
    return this.httpClient
    .get(environment.url + '/v1/ema-system/customers/documents-list/pending/'
    + localStorage.getItem('customerBranchId') + '/'
    + localStorage.getItem('customerBranch') + '/'
    + documentos.start_date + '/' + documentos.end_date + '/' + documentos.company_id 
    + '/' + documentos.company_branch_id + '/' + documentos.folderId + '?from=1&per_page=1000')
    .map(data => data);
  }

  obtenerArchivosRechazados(documentos) { 
    return this.httpClient.get(environment.url + '/v1/ema-system/customers/documents-list/rejected/'
    + localStorage.getItem('customerBranchId') + '/'
    + localStorage.getItem('customerBranch') + '/'
    + documentos.start_date + '/' + documentos.end_date + '/' + documentos.company_id + '/' 
    + documentos.company_branch_id + '/' + documentos.folderId + '?from=1&per_page=1000')
    .map(data => data);
  }

  borrarArchivo(documento){
    console.log("Ejecutando api borrar" + documento.data.document_id);
    const options = {
      headers: {},
      body: {
        data:[{
          document_id:  documento.data.document_id,
          key:          documento.data.key,
          bucket_name:  documento.data.bucket_name
        }]
      },
    };
    this.httpClient.delete(environment.url + '/v1/ema-system/customers/documents',
     options).subscribe((s) => {
    });
  }
}