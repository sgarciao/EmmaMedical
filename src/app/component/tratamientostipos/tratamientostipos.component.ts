import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tratamientostipos',
  templateUrl: './tratamientostipos.component.html',
  styleUrls: ['./tratamientostipos.component.css']
})
export class TratamientostiposComponent implements OnInit {
  title_entity:string;
  constructor(private router:         Router) { }
  selectTreatment(type){
    if (type == 1){
      localStorage.setItem('treatment_type', '1');
    }
    if (type == 2){
      localStorage.setItem('treatment_type', '2');
    }
    if (type == 3){
      localStorage.setItem('treatment_type', '3');
    }
    if (type == 4){
      localStorage.setItem('treatment_type', '4');
    }
    if (type == 5){
      localStorage.setItem('treatment_type', '5');
    }
    if (type == 6){
      localStorage.setItem('treatment_type', '6');
    }
    if (type == 7){
      localStorage.setItem('treatment_type', '7');
    }
    if (type == 8){
      localStorage.setItem('treatment_type', '8');
    }
    this.router.navigate(['/treatments']);
  }
  backPage(){
    
  }

  regresar(){
    this.router.navigate(['/options']);
  }
  ngOnInit() {
    this.title_entity = localStorage.getItem('entidad_name');
    
  }

}
