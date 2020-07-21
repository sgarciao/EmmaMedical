import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entitieoptions',
  templateUrl: './entitieoptions.component.html',
  styleUrls: ['./entitieoptions.component.css']
})
export class EntitieoptionsComponent implements OnInit {
  title_entity: string;
  constructor( private router:         Router) { }
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
