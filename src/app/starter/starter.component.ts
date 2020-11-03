import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { folderModel } from '../model/folderModel';
import { PathsService } from '../services/paths.service';
import { documentsListModel } from '../model/documentsListModel';
import { DocumentsService } from '../services/documents.service';
import { EntitiesService } from '../services/entities.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as tableData from './smart-data-table';
import * as AWS from 'aws-sdk';
import { DatePipe } from '@angular/common';
import { StarterService } from '../services/starter.service';
import { dataObject } from '../model/dataObject';
import { entitiesModel } from '../model/entitiesOptionsModel';

@Component({
  templateUrl: './starter.component.html',
  styleUrls:['./starter.component.css'],
  providers:  [
                PathsService,
                DocumentsService,
                StarterService, 
                EntitiesService
              ] 
})

export class StarterComponent implements OnInit {
////////////////////////////////////////////////////////////////////////
displayHTMLCard: string;
role_id: string;
entitesOptions: entitiesModel[]=[];
entitiesContent: [{
 entitie_id: number,
 entitie_name: string,
 entitie_icon: string,
 entitie_desfription:string
}];
entitiesMatrix:[]=[];

entitiesList = [
  { name: "PEMEX", value: 1 },
  { name: "IMSS", value: 2 }, 
  { name: "ISSSTE", value: 3 }, 
  { name: "SEDENA", value: 4 },
  { name: "SALUD", value: 5 },
  { name: "ISSEMYM", value: 6 },
  { name: "ISSSTEP", value: 7 },
  { name: "INST. PRIVADAS", value: 8 },
  { name: "HOSPITAL CIVIL DE GUADALAJARA", value: 8 }
]

/**////////////////////////////////////////////////////////////////// */
 
  readEntities(){
    this.entitiesService.getEntitiesOptionsInPage(this.role_id).subscribe((res_data:any)=>{
      if (res_data.code==200){
        this.entitesOptions = [];
        res_data.data.map((r)=>{
          const dato = {} as entitiesModel;
          dato.entity_id = r.entity_id;
          dato.entity_name = r.entity_name;
          dato.address_1 = r.address_1;
          dato.country_identity = r.country_identity;
          dato.state_identity = r.state_identity;
          dato.city_identity = r.city_identity;
          dato.creation_user_id = r.creation_user_id;
          dato.creation_date = r.creation_date;
          dato.creation_time = r.creation_time;
          dato.modification_user_id = r.modification_user_id;
          dato.modification_date = r.modification_date;
          dato.modification_time = r.modification_time;
          dato.status = r.status;
          dato.color = r.color;
          dato.icon = r.icon;
          this.entitesOptions.push(dato);
        });
      }else{

      }
      
    });
    
  }

  constructor(
    private modalService:   NgbModal,
    private router:         Router,
    private starterService: StarterService,
    private route: ActivatedRoute, 
    private entitiesService: EntitiesService
    ) {
      // set default input dates
  
    }
    ngOnInit(){
      
      this.displayHTMLCard = '';
      
      this.printDiv();
      this.role_id = localStorage.getItem('role_id');
      this.readEntities();
    }
    OpenPage(page, entity_id, entity_desc){
      localStorage.setItem('entidad_name', entity_desc);
      localStorage.setItem('entidad_id', entity_id);
      this.router.navigate(['/options']);
      console.log("Navegando hacia hospitales... " + entity_id+ " " + entity_desc);
     /* if (page == 1){
        console.log("Navegando hacia hospitales... " + entity_id);
        localStorage.setItem('test_variable', 'testing variable...');
        
        if (entity_id == 1){
          localStorage.setItem('entidad_name', 'PEMEX');  
        }
        if (entity_id == 2){
          localStorage.setItem('entidad_name', 'IMSS');  
          console.log("IMSS");
        }
        if (entity_id == 3){
          localStorage.setItem('entidad_name', 'ISSSTE');  
        }
        if (entity_id == 4){
          localStorage.setItem('entidad_name', 'SEDENA');  
        }
        if (entity_id == 5){
          localStorage.setItem('entidad_name', 'SSA');  
        }
        if (entity_id == 6){
          localStorage.setItem('entidad_name', 'ISSEMYM');  
        }
        if (entity_id == 7){
          localStorage.setItem('entidad_name', 'ISSSTEP');  
        }
        if (entity_id == 8){
          localStorage.setItem('entidad_name', 'INTS. PRIVADAS');  
        }
        if (entity_id == 9){
          localStorage.setItem('entidad_name', 'Hospital Civil de Guadalajara');  
        }

       
      }*/
      
    }
  printDiv(){
  /*  var divContents = document.getElementById("contnetdyn"); 
    divContents.innerHTML = '<div style="color:red;">value</div>';*/
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  hideColumn(){
    
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
