import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trim } from 'jquery';
import { menuModelList } from 'src/app/model/menuModel';
import { MenuService } from 'src/app/services/menu.service';




@Component({
  selector: 'app-entitieoptions',
  templateUrl: './entitieoptions.component.html',
  styleUrls: ['./entitieoptions.component.css'],
  providers: [MenuService]
})

export class EntitieoptionsComponent implements OnInit {
  title_entity: string;
  menuListd: menuModelList[] = [];

  constructor( private router:         Router,
               private menu: MenuService) { 

                this.menu.obtenerMenus().subscribe( (e: any) => {
                  console.log("menu");
                  console.log(e);                

                  e.data.map( (e: any) => {

                   const menu = new menuModelList;

                   menu.module_id = e.module_id;
                   menu.module = e.module;
                   menu.module_icon = trim(e.icon);

                   this.menuListd.push(menu);

                  });

                });

                console.log(this.menuListd)

  }
  
  

  hiddeRegresar = false;
  visibleBUttons = false;

  OpenTreatments(options){
    if (options == 1){
      this.router.navigate(['/treatments-types']);
    }
  }
  ngOnInit() {
    if (localStorage.getItem('user_type_medical') == 'user_0'){
       this.visibleBUttons=true;
    }else{
      this.visibleBUttons=false;
    }
    
    this.title_entity = localStorage.getItem('entidad_name');
    if (localStorage.getItem('user_type_medical') == 'user_0'){
      this.hiddeRegresar=true;
    }
  }

  regresar(){
    
    
    this.router.navigate(['/home']);
  }

}
