import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { treatmentsOptionsModel } from 'src/app/model/tratmentsOptionsPageModel';
import { TreatmentsoptionsService } from 'src/app/services/treatmentsoptions.service';

@Component({
  selector: 'app-tratamientostipos',
  templateUrl: './tratamientostipos.component.html',
  styleUrls: ['./tratamientostipos.component.css'], 
  providers:[TreatmentsoptionsService]
})
export class TratamientostiposComponent implements OnInit {
  title_entity:string;
  treatmentsOptions: treatmentsOptionsModel[]=[];

  constructor(
    private router:         Router,
    private treatmentsOptService: TreatmentsoptionsService) { }
  
  selectTreatment(type_id, treatments_code){
    localStorage.setItem('treatment_type', type_id);
    localStorage.setItem('treatment_code', treatments_code);
    this.router.navigate(['/treatments']);
  }
  backPage(){
    
  }
  treatmentsList = [
    { name: "NASH", description: "Tratamientos NASH", value: 1 },
    { name: "ASH", description: "Tratamientos ASH", value: 2 },
    { name: "VHB", description: "Tratamientos VHB", value: 3 },
    { name: "VHC", description: "Tratamientos VHC", value: 4 },
    { name: "HAI", description: "Tratamientos HAI", value: 5 },
    { name: "HCC", description: "Tratamientos HCC", value: 6 },
    { name: "ALF", description: "Tratamientos ALF", value: 7 },
    { name: "TOH", description: "Tratamientos TOH", value: 8 }
  ]

  regresar(){
    this.router.navigate(['/options']);
  }

  getTreatmentsOptionsFnct(){
    this.treatmentsOptService.getTreatmentsOptionsInPage(1,1).subscribe((res_data:any)=>{
      if (res_data.code==200){
        this.treatmentsOptions = [];
        res_data.data.map((r)=>{
          const dato= {} as treatmentsOptionsModel;
          dato.treatment_id = r.treatment_id;
          dato.treatment_code = r.treatment_code;
          dato.icon = r.icon;
	        dato.color = r.color;
	        dato.status = r.status;
	        dato.language_id = r.language_id;
	        dato.description = r.description;
	        dato.brief_description = r.brief_description;
	        dato.role_id = r.role_id;
	        dato.entity_id = r.entity_id;
          dato.hospital_id = r.hospital_id;
          this.treatmentsOptions.push(dato);
        });
      }else{

      }
    });
  }
  ngOnInit() {
    
    this.title_entity = localStorage.getItem('entidad_name');
    this.getTreatmentsOptionsFnct();
  }

}
