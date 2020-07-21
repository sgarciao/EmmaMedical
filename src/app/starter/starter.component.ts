import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { folderModel } from '../model/folderModel';
import { PathsService } from '../services/paths.service';
import { documentsListModel } from '../model/documentsListModel';
import { DocumentsService } from '../services/documents.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as tableData from './smart-data-table';
import * as AWS from 'aws-sdk';
import { DatePipe } from '@angular/common';
import { StarterService } from '../services/starter.service';
import { dataObject } from '../model/dataObject';

@Component({
  templateUrl: './starter.component.html',
  styleUrls:['./starter.component.css'],
  providers:  [
                PathsService,
                DocumentsService,
                StarterService
              ] 
})

export class StarterComponent implements OnInit {
////////////////////////////////////////////////////////////////////////
displayHTMLCard: string;

entitiesContent: [{
 entitie_id: number,
 entitie_name: string,
 entitie_icon: string,
 entitie_desfription:string
}];
entitiesMatrix:[]=[];


/**////////////////////////////////////////////////////////////////// */
 
  

  constructor(
    private modalService:   NgbModal,
    private router:         Router,
    private paths:          PathsService,
    private documentslist:  DocumentsService,
    private sanitizer:      DomSanitizer,
    private starterService: StarterService,
    private route: ActivatedRoute 
    ) {
      // set default input dates
  
    }
    ngOnInit(){
      this.displayHTMLCard = '';
      
      this.printDiv();
    }
    OpenPage(page, entity_id){
      if (page == 1){
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

        localStorage.setItem('entidad_id', entity_id);
        this.router.navigate(['/options']);
      }
      
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
