import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { optionsModel } from 'src/app/model/optionsModel';
import { OptionspageService } from 'src/app/services/optionspage.service';
import { trim } from 'jquery';
import { menuModelList } from 'src/app/model/menuModel';
import { MenuService } from 'src/app/services/menu.service';



@Component({
  selector: 'app-entitieoptions',
  templateUrl: './entitieoptions.component.html',
  styleUrls: ['./entitieoptions.component.css'],
  providers:[OptionspageService]

})

export class EntitieoptionsComponent implements OnInit {
  title_entity: string;
  role_id: number;
  entity_id: number;
  optionsList: optionsModel[] = [];

  constructor(
    private router:         Router,
    private optionsService: OptionspageService,
    ) { }

  menuListd: menuModelList[] = [];



  hiddeRegresar = false;
  visibleBUttons = false;
 /* optionsList = [
    { name: "Hospitales", value: 1 },
    { name: "Especialistas", value: 2 },
    { name: "Tratamientos", value: 3 }
  ]*/

  getOptionsForPage(){
    this.optionsService.getOptionsInPage(this.role_id,this.entity_id).subscribe((res_data:any)=>{
      if (res_data.code==200){
        this.optionsList = [];
        res_data.data.map((r)=>{
          const dato = {} as  optionsModel;
          dato.options_id = r.options_id;
          dato.option_id = r.option_id;
          dato.option_id = r.option_id;
          dato.description = r.description;
          dato.brief_description = r.brief_description;
          dato.language_id = r.language_id;
          dato.icon = r.icon;
          dato.color = r.color;
          dato.status = r.status;
          dato.role_id = r.role_id;
          dato.entity_id = r.entity_id;
          dato.opt_id = r.opt_id;
          this.optionsList.push(dato);
        });
      }else{

      }
    });
  }
  OpenTreatments(options){
    if (options == 3){
      this.router.navigate(['/treatments-types']);
    }else{

    }
  }
  ngOnInit() {
    this.entity_id = Number(localStorage.getItem('entidad_id'));
    this.role_id = Number(localStorage.getItem('role_id'));
    if (localStorage.getItem('user_type_medical') == 'user_0'){
       this.visibleBUttons=true;
    }else{
      this.visibleBUttons=false;
    }
    this.getOptionsForPage();
    this.title_entity = localStorage.getItem('entidad_name');
    if (localStorage.getItem('user_type_medical') == 'user_0'){
      this.hiddeRegresar = true;
    }
  }

  regresar(){
    this.router.navigate(['/home']);
  }

}
