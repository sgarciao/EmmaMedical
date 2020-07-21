import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent implements OnInit {
  title_tab:  string;
  ashTableVisible = true;
  nashTableVisible = true;
  vhbTableVisible = true;
  vhcTableVisible = true;
  haiTableVisible = true;
  hccTableVisible = true;
  alfTableVisible = true;
  tohTableVisible = true;

  countries: string;
  states: string;
  hospitals: string;
  title_entity: string;

  optionsCOuntries = [
    { name: "México", value: 1 },
    { name: "Estados Unidos", value: 2 }
  ]
  optionsStates=[
    { name: "Aguascalientes", value: 1 },
    { name: "Baja California", value: 2 },
    { name: "Baja California Sur", value: 3 },
    { name: "Campeche", value: 4 },
    { name: "Coahuila de Zaragoza", value: 5 },
    { name: "Colima", value: 6 },
    { name: "Chiapas", value: 7 },
    { name: "Chihuahua", value: 8 },
    { name: "Ciudad de México", value: 9 }, 
    { name: "Durango", value: 10 },
    { name: "Guanajuato", value: 11 }, 
    { name: "Guerrero", value: 12 }, 
    { name: "Hidalgo", value: 13 }, 
    { name: "Jalisco", value: 14 }, 
    { name: "Estado de México", value: 15 }, 
    { name: "Michoacán de Ocampo", value: 16 }, 
    { name: "Morelos", value: 17 }, 
    { name: "Nayarit", value: 18 }, 
    { name: "Nuevo León", value: 19 }, 
    { name: "Oaxaca", value: 20 }, 
    { name: "Puebla", value: 21 }, 
    { name: "Querétaro", value: 22 }, 
    { name: "	Quintana Roo", value: 23 }, 
    { name: "San Luis Potosí", value: 24 }, 
    { name: "Sinaloa", value: 25 }, 
    { name: "Sonora", value: 26 }, 
    { name: "Tabasco", value: 27 }, 
    { name: "Tamaulipas", value: 28 }, 
    { name: "Tlaxcala", value: 29 }, 
    { name: "Veracruz de Ignacio de la Llave", value: 30 }, 
    { name: "Yucatán", value: 31 }, 
    { name: "Zacatecas", value: 32 } 

  ]
  optionsHospitals = [];
  optionsHospitalesPEMEX = [
    { name: "Hospital Central Nacional Pemex Norte", value: 1 },
    { name: "Hospital Central Nacional Sur de Alta Especialidad Pemex Picacho", value: 2 }
  ]

  optionsHospitalesIMSS = [
    { name: "Centro Médico Nacional Siglo XXI", value: 1 },
    { name: "Centro Médico Nacional La Raza", value: 2 },
    { name: "Centro Médico Nacional de Occidente", value: 3 }, 
    { name: "Unidad Médica de Alta Especialidad Puebla", value: 4 }, 
    { name: "Unidad Médica de Alta Especialidad No. 25", value: 5 }
  ]

  optionsHospitalesISSSTE = [
    { name: 'ISSSTE - Centro Médico Nacional "20 de Noviembre"', value: 1 },
    { name: "ISSSTE - Hospital General Dr. Fernando Quiroz Gutierrez", value: 2 },
    { name: "ISSSTE - Hospital Regional Dr. Valentín Gómez Farías", value: 2 },
    { name: "ISSSTE - Hospital Regional Adolfo López Mateos", value: 2 }
  ]
  
  optionsHospitalesSEDENA = [
    { name: "SEDENA - Hospital Central Militar", value: 1 },
    { name: "SEDENA - Universidad del Ejército y Fuerzas Aéreas (Colegio Militar)", value: 2 }
  ]
  optionsHospitalesSSA = [
    { name: "SSA - Instituto Nacional de Ciencias Médicas y Nutrición - Salvador Zubirán", value: 1 },
    { name: "SSA - Hospital General Dr. Manuel Gea González", value: 2 },
    { name: "SSA - Hospital Juárez de México", value: 3 },
    { name: "SSA - Hospital Universitario Dr. José Eleuterio Gonzalez", value: 3 }
  ]

  optionsHospitalesISSEMYM = [
    { name: "Centro Médico ISSEMYM", value: 1 }
  ]

  optionsHospitalesISSSTEP = [
    { name: "Instituto de Seguridad y Servicios Sociales de los Trabajadores al Servicio de los Poderes del Estad", value: 1 },
  ]
  optionsHospitalesPRIVADAS = [
    { name: "Médica Sur", value: 1 },
    { name: "Hospital Español", value: 2 }, 
    { name: "Hospital Angeles del Carmen", value: 3 }, 
    { name: "Hospital San José Tec Salud", value: 4 }
  ]

  optionsHospitalesGuadalajara = [
    { name: "Hospital Civil de Guadalajara", value: 1 },
  ]

  alert_2: IAlert;
  alert: IAlert;
  alertBuscar: IAlert;
  visiblebuttons=true;

  staticAlertClosed2 = true;
  constructor( private router:         Router) { }

  settingsListTreatmentsNASH = tableData.settingsListTreatmentsNASH;
  settingsListTreatmentsASH = tableData.settingsListTreatmentsASH;
  settingsListTreatmentsVHC = tableData.settingsListTreatmentsVHC;
  settingsListTreatmentsVHB = tableData.settingsListTreatmentsVHB;
  settingsListTreatmentsHAI = tableData.settingsListTreatmentsHAI;
  settingsListTreatmentsHCC = tableData.settingsListTreatmentsHCC;
  settingsListTreatmentsALF = tableData.settingsListTreatmentsALF;

  dataNash:[{
    short_name:     string;
    birth_date:     string;
    gender:         string;
    child_stadium:  string;
    mellitus_diabetes:string;
    hypertension:   string;
    HIPERCOLESTEROLEMIA:string;
    HIPERTRIGLISERIDEMIA:string;
    weight:         string;
    size:           string;
    fibroscan:      string;
    fribrotest:     string;
    sw:             string;
    fin_4:          string;
    Hb1A1c:         string;
    i_homma:        string;
    imc:            string;
    waist:          string;
    hip:            string;
    hg:             string;
    leukocytes:     string;
    platelets:      string;
    alt_tgp:        string;
    fa:             string;
    ggt:            string;
    albu:           string;
    tp_irn:         string;
    bi:             string;
    ascitis:        string;
    encephalopathy: string;

  }];
  ngOnInit() {
    if (localStorage.getItem('user_type_medical')=='user_0'){
      this.visiblebuttons=true;
    }else{
      this.visiblebuttons=false;
    }
    console.log(localStorage.getItem('entidad_id') +  "  " + localStorage.getItem('entidad_name'));
    if (localStorage.getItem('entidad_id') == '1'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesPEMEX;
    }
    if (localStorage.getItem('entidad_id') == '2'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesIMSS;
    }
    if (localStorage.getItem('entidad_id') == '3'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesISSSTE;
    }
    if (localStorage.getItem('entidad_id') == '4'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesSEDENA;
    }
    if (localStorage.getItem('entidad_id') == '5'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesSSA;
    }
    if (localStorage.getItem('entidad_id') == '6'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesISSEMYM;
    }
    if (localStorage.getItem('entidad_id') == '7'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesISSSTEP;
    }
    if (localStorage.getItem('entidad_id') == '8'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesPRIVADAS;
    }
    if (localStorage.getItem('entidad_id') == '9'){
      this.title_entity = localStorage.getItem('entidad_name');
      console.log('name--- ' + this.title_entity);
      this.optionsHospitals = this.optionsHospitalesGuadalajara;
    }
    if (localStorage.getItem('treatment_type') == '1'){
      this.title_tab = 'NASH';
      this.nashTableVisible = false; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '2'){
      this.title_tab = 'ASH';
      this.nashTableVisible = true; 
      this.ashTableVisible = false;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '3'){
      this.title_tab = 'VHB';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = false;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '4'){
      this.title_tab = 'VHC';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = false;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '5'){
      this.title_tab = 'HAI';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = false;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '6'){
      this.title_tab = 'HCC';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = false;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '7'){
      this.title_tab = 'ALF';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = false;
    }
    if (localStorage.getItem('treatment_type') == '8'){
      this.title_tab = 'TOH';
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.tohTableVisible = false;
    }
    console.log("Item " + localStorage.getItem('treatment_type'));
  }
  regresar(){
    console.log("back page");
    this.router.navigate(['/treatments-types']);
  }

}

export class country{
  id: number;
  country: string;
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
