import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { Router } from '@angular/router';
import { nashTratment, nashTratmentHeader, nashTreatmentData } from 'src/app/model/nashTreatment';
import { NashtreatmentService } from 'src/app/services/nashtreatment.service';

import { NotifierService } from 'angular-notifier';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { hospitalsModel } from 'src/app/model/hospitalsModel';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css','./tratamientos.component.scss']
})
export class TratamientosComponent implements OnInit {
  ////////////////////////
  role_id:number;
  hospital_id:number;
  entity_id:number;
  hidden_controls = true;
  hidden_maximize = true;
  hidden_minimize = false;
  treatment_global: any;
  alert_2: IAlert;
  hidden_update_btn = false;
  staticAlertClosed2 = true;
  progres_spinner_refresh_nash_treatment= true;
  save_enabled = true;///not visible
  save_disabled = false;/////button visible

  //////combos
  comboHospital = {} as hospitalsModel;
  todosComboHospital = {
    hospital_id: 0,
	  hospital_name: 'Todos'
  };
  //////////////////////////
  settingsExample = tableData.settingsExample;

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

  comboHospital    = {} as hospitalModel;
  //////////////////////TABLE
  
  
  /////////////////////////////
  optionsValues = [
    { name: "Opción 1", value: 1, column_name: "1" },
    { name: "Opción 2", value: 2, column_name: "1"}
  ]
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


  data_ =  {} as nashTreatmentData;
  NAHSRecord: nashTratment[] = [];
  NAHSRecordEstilo: nashTratment[] = [];
  NAHSRecordEstiloExcel: nashTratment[] = [];
  
  NAHSRecordCreate: nashTratment[] = [];
  NAHSRecordUpdate: nashTratment[] = [];
  create_flag: boolean;
  update_flag: boolean;

  NAHSRecordExcel: nashTratment[] = [];
  NAHSRecordHeader = {} as nashTratmentHeader;
  
  indiceNash: number;
  
  constructor( 
      private router:         Router,
      private nashTreatmentService: NashtreatmentService,
      private hospitalsService: HospitalsService
      ) {
          this.alert_2 = {
            id: 1,
            type: 'success',
            message: 'This is an success alert'
          };
       }

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
  ///////////////////////////GET VALUES
  getValuesForColumns(){
    
  }
  editRow(){

  }
  /////////////////////////////////////
  ///////////////////////////EVENTS IN TABLE
  /*
  onCreateConfirm(event): any {
    
    //if (window.confirm('Are you sure you want to save?')) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
      console.log("Event in creation  " + event.newData.short_name);
    /*} else {
      event.confirm.reject();
    }*/
/*
  }  
  onEditConfirm(event){
    
    event.confirm.resolve(event.newData);
    console.log("Event in edit  " + event.newData.short_name);
  }  
  onDeleteConfirm($event: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log("Event in Delete  " + $event.data.short_name);
      $event.confirm.resolve();
    } else {
      $event.confirm.reject();
    }
  }*/
  ///////////////////////////////////////////////
  maximizeScreen(){
    this.hidden_controls = true;
    this.hidden_maximize = true;
    this.hidden_minimize = false;
    
  }
  minimizeScreen(){

    this.hidden_controls = false;
    this.hidden_maximize = false;
    this.hidden_minimize = true;
  }
  ///////////////////////////////////ADD NEW RECORD
  exportCSVFile(headers, items, fileTitle) {
    console.log("--------------headers");
    console.log(headers);
      if (headers) {
          items.unshift(headers);
      }

      // Convert Object to JSON
      
      var jsonObject = JSON.stringify(items);

      var csv = this.convertToCSV(jsonObject);

      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", exportedFilenmae);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }
  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

  exportExcel(){
    this.createHeader();
    this.exportCSVFile(this.NAHSRecordHeader, this.NAHSRecordExcel, "Nash Treatment");
  }
  createHeader(){
    this.NAHSRecordHeader = {}  as nashTratmentHeader;
    const nashData = {} as nashTratmentHeader;
          //nashData.date_begin = "Fecha de inicio";
          //nashData.date_end = "Fecha Fin";
          //nashData.research_nash_id = "ID";
          //nashData.month_execution = "Mes de ejecución";
          nashData.short_name = "Iniciales";
          nashData.birth_date = "Fecha de Nacimiento";
          nashData.gender = "Género";
          nashData.child_stadium = "Estadio de Child";
          nashData.mellitus_diabetes = "Diabetes Mellitus";
          nashData.hypertension = "Hipertensión";
          nashData.HIPERCOLESTEROLEMIA = "HIPERCOLESTEROLEMIA";
          nashData.HIPERTRIGLICERIDEMIA = "HIPERTRIGLICERIDEMIA";
          nashData.weight = "Peso (KG)";
          nashData.size = "Talla (cm)";
          nashData.fibroscan = "FIBROSCAN";
          nashData.fribrotest = "FIBROTEST";
          nashData.sw = "SW (kPa)";
          nashData.fin_4 = "FIN-4";
          nashData.Hb1A1c = "Hb1A1c";
          nashData.i_homma = "I. de HOMMA";
          nashData.imc = "IMC";
          nashData.waist = "CINTURA (cm)";
          nashData.hip = "CADERA (cm)";
          nashData.hg = "HG";
          nashData.leukocytes = "LEUCOCITOS";
          nashData.platelets = "PLAQUETAS";
          nashData.alt_tgp = "ALT / TGP";
          nashData.ast_tgo = "AST / TGO";
          nashData.fa = "FA";
          nashData.ggt = "GGT";
          nashData.albu = "ALBU";
          nashData.tp_irn = "TP / INR";
          nashData.bt = "BT";
          nashData.bd = "BD";
          nashData.bi = "BI";
          nashData.ascitis = "ASCITIS";
          nashData.encephalopathy = "ENCEFALOPATIA";
          nashData.varicose_veins = "VARICES";
          nashData.hepatocarcinoma = "HEPATOCARCINOMA";
          nashData.treatment = "TRATAMIENTO";
          ///nashData.creation_user_id = ;
          //nashData.creation_user_name = ;
        //  nashData.creation_date = "Fecha de registro";
         // nashData.creation_time = "Hora de registro";
          //nashData.modification_user_name = r.modification_user_name;
          //nashData.modification_date = r.modification_date;
          //nashData.modification_time = r.modification_time;
          //nashData.status = r.status;
          this.NAHSRecordHeader = nashData;
  }
  agregarNuevoRegistro(event){
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn  = true;
    this.indiceNash = (Number(this.indiceNash) + 1);
    const nashData = {} as nashTratment;
    console.log("Evento crear ");
    console.log(event);
    nashData.date_begin = "2020-08-28";
    nashData.date_end = "2020-08-28";
    //nashData.research_nash_id = this.indiceNash;
    nashData.month_execution = 9;
    /*nashData.short_name = "AMH";
    nashData.birth_date = "1988-03-29";
    nashData.gender = 1;
    nashData.child_stadium = 1;
    nashData.mellitus_diabetes = 1;
    nashData.hypertension = 1;
    nashData.HIPERCOLESTEROLEMIA = 1;
    nashData.HIPERTRIGLICERIDEMIA = 1;
    nashData.weight = 0.0;
    nashData.size = 0.0;
    nashData.fibroscan = 0.0;
    nashData.fribrotest = 0.0;
    nashData.sw = 0;
    nashData.fin_4 = 1;
    nashData.Hb1A1c = 1;
    nashData.i_homma = 1;
    nashData.imc = 1;
    nashData.waist = 1;
    nashData.hip = 1;
    nashData.hg = 1;
    nashData.leukocytes = 1;
    nashData.platelets = 1;
    nashData.alt_tgp = 1;
    nashData.fa = 1;
    nashData.ggt = 1;
    nashData.albu = 1;
    nashData.tp_irn = 1;
    nashData.bt = 1;
    nashData.bd = 1;
    nashData.bi = 1;
    nashData.ascitis = 1;
    nashData.encephalopathy = 1;
    nashData.varicose_veins = 1;
    nashData.hepatocarcinoma = 1;
    nashData.treatment = 1;
    nashData.creation_user_id = 1;
    nashData.creation_user_name = "pemex";
    nashData.creation_date = "2020-09-16";
    nashData.creation_time = "16:57:00";
    nashData.modification_user_name = "";
    nashData.modification_date = "";
    nashData.modification_time = "";*/
    nashData.row_color = "row_new";
    nashData.status = 1;
    nashData.active_red_sem = "row_sem_red_visible";
    nashData.active_green_sem = "row_sem_green_hidden";

    this.NAHSRecord.push(nashData);
    this.progres_spinner_refresh_nash_treatment = true;
    this.hidden_update_btn  = false;
    this.save_disabled = true;
    this.save_enabled = false;
  }
  changeHospital(){
    
  }
  getDataNASH(){
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn  = true;
    this.hospital_id = 0;
    this.nashTreatmentService.getNASHTreatment(this.hospital_id).subscribe((resp_data_get:any) => {
      
      this.NAHSRecordEstilo = [];
      this.NAHSRecordEstiloExcel = [];
      if (resp_data_get.code == 200){
        console.log(">> " + resp_data_get.data.data);
        resp_data_get.data.data.map((r) => {

          const nashData = {} as nashTratment;
          const nashDataExcel = {} as nashTratment;
          nashData.entity_id = r.entity_id;
          nashData.hospital_id = r.hospital_id;
          nashData.active_green_sem = "row_sem_green_visible";

          nashData.active_red_sem = "row_sem_red";///initial value

          nashData.date_begin = r.date_begin;
          nashData.date_end = r.date_end;
          nashData.research_nash_id = r.research_nash_id;
          nashData.month_execution = r.month_execution;
          nashData.short_name = r.short_name;
          nashData.birth_date = r.birth_date;
          nashData.gender = r.gender;
          if (r.gender=="" || r.gender == null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }

          nashData.child_stadium = r.child_stadium;
          if (r.child_stadium=="" || r.child_stadium==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.mellitus_diabetes = r.mellitus_diabetes;
          if (r.mellitus_diabetes=="" || r.mellitus_diabetes==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.hypertension = r.hypertension;
          if (r.hypertension=="" || r.hypertension==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.HIPERCOLESTEROLEMIA = r.HIPERCOLESTEROLEMIA;
          if (r.HIPERCOLESTEROLEMIA=="" || r.HIPERCOLESTEROLEMIA==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.HIPERTRIGLICERIDEMIA = r.HIPERTRIGLICERIDEMIA;
          if (r.HIPERTRIGLICERIDEMIA=="" || r.HIPERTRIGLICERIDEMIA==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.weight = r.weight;
          if (r.weight=="" || r.weight==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.size = r.size;
          if (r.size=="" || r.size==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.fibroscan = r.fibroscan;
          if (r.fibroscan=="" || r.fibroscan==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.fribrotest = r.fribrotest;
          if (r.fribrotest=="" || r.fribrotest==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.sw = r.sw;
          if (r.sw=="" || r.sw==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.fin_4 = r.fin_4;
          if (r.fin_4=="" || r.fin_4==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.Hb1A1c = r.Hb1A1c;
          if (r.Hb1A1c=="" || r.Hb1A1c==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.i_homma = r.i_homma;
          if(r.i_homma=="" || r.i_homma==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.imc = r.imc;
          if (r.imc=="" || r.imc==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.waist = r.waist;
          if (r.waist=="" || r.waist==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.hip = r.hip;
          if (r.hip=="" || r.hip==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.hg = r.hg;
          if (r.hg=="" || r.hg==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.leukocytes = r.leukocytes;
          if (r.leukocytes=="" || r.leukocytes==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.platelets = r.platelets;
          if (r.platelets=="" || r.platelets==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.alt_tgp = r.alt_tgp;
          if (r.alt_tgp=="" || r.alt_tgp==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.ast_tgo = r.ast_tgo;
          if (r.ast_tgo=="" || r.ast_tgo==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.fa = r.fa;
          if (r.fa=="" || r.fa==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.ggt = r.ggt;
          if (r.ggt=="" || r.ggt==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.albu = r.albu;
          if (r.albu=="" || r.albu==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.tp_irn = r.tp_irn;
          if (r.tp_irn=="" || r.tp_irn==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.bt = r.bt;
          if (r.bt=="" || r.bt==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.bd = r.bd;
          if (r.bd=="" || r.bd==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.bi = r.bi;
          if (r.bi=="" ||  r.bi==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.ascitis = r.ascitis;
          if (r.ascitis=="" || r.ascitis==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.encephalopathy = r.encephalopathy;
          if (r.encephalopathy=="" || r.encephalopathy==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.varicose_veins = r.varicose_veins;
          if (r.varicose_veins=="" || r.varicose_veins==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.hepatocarcinoma = r.hepatocarcinoma;
          if (r.hepatocarcinoma=="" || r.hepatocarcinoma==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          nashData.treatment = r.treatment;
          if (r.treatment=="" || r.treatment==null){
            nashData.active_red_sem = "row_sem_red_visible";
            nashData.active_green_sem = "row_sem_green_hidden";
          }
          
          nashData.creation_user_id = r.creation_user_id;
          nashData.creation_user_name = r.creation_user_name;
          nashData.creation_date = r.creation_date;
          nashData.creation_time = r.creation_time;
          nashData.modification_user_name = r.modification_user_name;
          nashData.modification_date = r.modification_date;
          nashData.modification_time = r.modification_time;
          nashData.status = r.status;
          
          nashData.row_color = "row_get";// Nuevos" treatment.row_color;"
          this.NAHSRecordEstilo.push(nashData);
          
          this.NAHSRecordEstiloExcel.push(this.getExcelData(nashData));
          this.hidden_update_btn  = false;
          this.progres_spinner_refresh_nash_treatment = true;
          
        });
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al obtener la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn  = false;  
      }
      this.NAHSRecordExcel = this.NAHSRecordEstiloExcel;
      this.NAHSRecord = this.NAHSRecordEstilo;
      
    }, err=>{
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al obtener la información.';
      this.reset();
      this.progres_spinner_refresh_nash_treatment = true;
      this.hidden_update_btn  = false;
    });
  }
  getExcelData(nashData: nashTratment){
    const nashDataExcel = {} as nashTratment;

    nashDataExcel.research_nash_id = nashData.research_nash_id;
    nashDataExcel.birth_date = nashData.birth_date;
    nashDataExcel.gender = nashData.gender;
    nashDataExcel.child_stadium = nashData.child_stadium;
    nashDataExcel.mellitus_diabetes = nashData.mellitus_diabetes;
    nashDataExcel.hypertension = nashData.hypertension;
    nashDataExcel.HIPERCOLESTEROLEMIA = nashData.HIPERCOLESTEROLEMIA;
    nashDataExcel.HIPERTRIGLICERIDEMIA = nashData.HIPERTRIGLICERIDEMIA;
    nashDataExcel.weight = nashData.weight;
    nashDataExcel.size = nashData.size;
    nashDataExcel.fibroscan = nashData.fibroscan;
    nashDataExcel.fribrotest = nashData.fribrotest;
    nashDataExcel.sw = nashData.sw;
    nashDataExcel.fin_4 = nashData.fin_4;
    nashDataExcel.Hb1A1c = nashData.Hb1A1c;
    nashDataExcel.i_homma = nashData.i_homma;
    nashDataExcel.imc = nashData.imc;
    nashDataExcel.waist = nashData.waist;
    nashDataExcel.hip = nashData.hip;
    nashDataExcel.hg = nashData.hg;
    nashDataExcel.leukocytes = nashData.leukocytes;
    nashDataExcel.platelets = nashData.platelets;
    nashDataExcel.alt_tgp = nashData.alt_tgp;
    nashDataExcel.ast_tgo = (nashData.ast_tgo==null?0:nashData.ast_tgo);
    nashDataExcel.fa = nashData.fa;
    nashDataExcel.ggt = nashData.ggt;
    nashDataExcel.albu = nashData.albu;
    nashDataExcel.tp_irn = nashData.tp_irn;
    nashDataExcel.bt = nashData.bt;
    nashDataExcel.bd = nashData.bd;
    nashDataExcel.bi = nashData.bi;
    nashDataExcel.ascitis = nashData.ascitis;
    nashDataExcel.encephalopathy = nashData.encephalopathy;
    nashDataExcel.varicose_veins = nashData.varicose_veins;
    nashDataExcel.hepatocarcinoma = nashData.hepatocarcinoma;
    nashDataExcel.treatment = nashData.treatment;

    return nashDataExcel;
  }
  guardarRegistro(){
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn  = true;
    
    if (this.create_flag){
      console.log("Guardando...");
      this.data_.data = this.NAHSRecordCreate.filter(function(e1){
        return e1 != null;
      });
      console.log(this.data_);
      this.nashTreatmentService.saveNASHTreatment(this.data_).subscribe((resp_data:any)=>{
        console.log(resp_data);
        if(resp_data.code == 200){
          this.NAHSRecord = [];
          this.NAHSRecordCreate = [];
          this.create_flag = false;
          this.progres_spinner_refresh_nash_treatment = true;
          
          this.getDataNASH();
          
          this.save_enabled = true;
          this.save_disabled = false;

          this.staticAlertClosed2 = false;
          this.alert_2.type = 'success';
          this.alert_2.message = 'Datos guardados correctamente.';
          this.reset();
          this.hidden_update_btn  = false;
        }else{
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'No se pudo guardar la información, intente nuevamente.';
          this.reset();
          this.progres_spinner_refresh_nash_treatment = true;
          this.hidden_update_btn  = false;
        }
      }, err=>{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar guardar la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn  = false;
      });
    }
    if (this.update_flag){
      console.log("Guardando...");
      this.data_.data = this.NAHSRecordUpdate.filter(function(e1){
        return e1 != null;
      });

      console.log(this.data_);
      this.nashTreatmentService.updateNASHTreatment(this.data_).subscribe((resp_data:any)=>{
      console.log(resp_data);
      
      if (resp_data.code == 200){
        this.NAHSRecord = [];
        this.NAHSRecordUpdate = [];
        this.update_flag = false;
        this.progres_spinner_refresh_nash_treatment = true;
        this.getDataNASH();
        this.hidden_update_btn  = false;

        this.staticAlertClosed2 = false;
        this.alert_2.type = 'success';
        this.alert_2.message = 'Datos actualizados correctamente.';
        this.reset();
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al actualizar la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn  = false;  
      }
    }, err=>{
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al intentar actualizar la información.';
      this.reset();
      this.progres_spinner_refresh_nash_treatment = true;
      this.hidden_update_btn  = false;
    });
    }
    
  }
  updateTableRecordsNash(){
    this.getDataNASH();
  }

  updateRecordNASH(id, column_name, treatment, i){
    console.log("Hospital id " + treatment.hospital_id);
    if (id != null){
      this.update_flag = true;
      const nashData = {} as nashTratment;
      
      nashData.hospital_id = treatment.hospital_id;
      nashData.entity_id = this.entity_id;
      nashData.research_nash_id = id;
      
      nashData.date_begin = treatment.date_begin;
      nashData.date_end = treatment.date_end;
      nashData.research_nash_id = treatment.research_nash_id;
      nashData.month_execution = treatment.month_execution;
      nashData.short_name = treatment.short_name;
      
      
      if (treatment.birth_date === "null" || treatment.birth_date === null || treatment.birth_date === '' ){
        console.log("birthday nulo: " + nashData.birth_date);
      }else{
        nashData.birth_date = treatment.birth_date;
        console.log("birthday no nulo: " + nashData.birth_date);
        
      }
      nashData.gender = treatment.gender;
      nashData.child_stadium = treatment.child_stadium;
      nashData.mellitus_diabetes = treatment.mellitus_diabetes;
      nashData.hypertension = treatment.hypertension;
      nashData.HIPERCOLESTEROLEMIA = treatment.HIPERCOLESTEROLEMIA;
      nashData.HIPERTRIGLICERIDEMIA = treatment.HIPERTRIGLICERIDEMIA;
      nashData.weight = treatment.weight;
      nashData.size = treatment.size;
      nashData.fibroscan = treatment.fibroscan;
      nashData.fribrotest = treatment.fribrotest;
      nashData.sw = treatment.sw;
      nashData.fin_4 = treatment.fin_4;
      nashData.Hb1A1c = treatment.Hb1A1c;
      nashData.i_homma = treatment.i_homma;
      nashData.imc = treatment.imc;
      nashData.waist = treatment.waist;
      nashData.hip = treatment.hip;
      nashData.hg = treatment.hg;
      nashData.leukocytes = treatment.leukocytes;
      nashData.platelets = treatment.platelets;
      nashData.alt_tgp = treatment.alt_tgp;
      nashData.ast_tgo = treatment.ast_tgo;
      nashData.fa = treatment.fa;
      nashData.ggt = treatment.ggt;
      nashData.albu = treatment.albu;
      nashData.tp_irn = treatment.tp_irn;
      nashData.bt = treatment.bt;
      nashData.bd = treatment.bd;
      nashData.bi = treatment.bi;
      nashData.ascitis = treatment.ascitis;
      nashData.encephalopathy = treatment.encephalopathy;
      nashData.varicose_veins = treatment.varicose_veins;
      nashData.hepatocarcinoma = treatment.hepatocarcinoma;
      nashData.treatment = treatment.treatment;
      nashData.creation_user_id = treatment.creation_user_id;
      nashData.creation_user_name = treatment.creation_user_name;
      nashData.creation_date = treatment.creation_date;
      nashData.creation_time = treatment.creation_time;
      nashData.modification_user_name = treatment.modification_user_name;
      nashData.modification_date = treatment.modification_date;
      nashData.modification_time = treatment.modification_time;
      nashData.status = treatment.status;
      nashData.row_color = "row_update";// Nuevos" treatment.row_color;"
      this.NAHSRecordUpdate[id] = nashData;
          //this.NAHSRecord[i] = nashData;
      treatment.row_color = nashData.row_color; 
          //console.log(this.NAHSRecord[i]); 
          //console.log(this.NAHSRecordUpdate);
          //console.log("Actualizando.." + id + " " + column_name);
      this.save_disabled = true;
      this.save_enabled = false;
    }else{
      this.create_flag = true;
      console.log(this.NAHSRecord[i]);
      console.log("Guardando..... " + i);
      const nashData = {} as nashTratment;
          nashData.date_begin = treatment.date_begin;
          nashData.date_end = treatment.date_end;
          nashData.research_nash_id = treatment.research_nash_id;
          nashData.month_execution = treatment.month_execution;
          nashData.short_name = treatment.short_name;
          nashData.birth_date = treatment.birth_date;
          nashData.gender = treatment.gender;
          nashData.child_stadium = treatment.child_stadium;
          nashData.mellitus_diabetes = treatment.mellitus_diabetes;
          nashData.hypertension = treatment.hypertension;
          nashData.HIPERCOLESTEROLEMIA = treatment.HIPERCOLESTEROLEMIA;
          nashData.HIPERTRIGLICERIDEMIA = treatment.HIPERTRIGLICERIDEMIA;
          nashData.weight = treatment.weight;
          nashData.size = treatment.size;
          nashData.fibroscan = treatment.fibroscan;
          nashData.fribrotest = treatment.fribrotest;
          nashData.sw = treatment.sw;
          nashData.fin_4 = treatment.fin_4;
          nashData.Hb1A1c = treatment.Hb1A1c;
          nashData.i_homma = treatment.i_homma;
          nashData.imc = treatment.imc;
          nashData.waist = treatment.waist;
          nashData.hip = treatment.hip;
          nashData.hg = treatment.hg;
          nashData.leukocytes = treatment.leukocytes;
          nashData.platelets = treatment.platelets;
          nashData.alt_tgp = treatment.alt_tgp;
          nashData.ast_tgo = treatment.ast_tgo;
          nashData.fa = treatment.fa;
          nashData.ggt = treatment.ggt;
          nashData.albu = treatment.albu;
          nashData.tp_irn = treatment.tp_irn;
          nashData.bt = treatment.bt;
          nashData.bd = treatment.bd;
          nashData.bi = treatment.bi;
          nashData.ascitis = treatment.ascitis;
          nashData.encephalopathy = treatment.encephalopathy;
          nashData.varicose_veins = treatment.varicose_veins;
          nashData.hepatocarcinoma = treatment.hepatocarcinoma;
          nashData.treatment = treatment.treatment;
          nashData.creation_user_id = treatment.creation_user_id;
          nashData.creation_user_name = treatment.creation_user_name;
          nashData.creation_date = treatment.creation_date;
          nashData.creation_time = treatment.creation_time;
          nashData.modification_user_name = treatment.modification_user_name;
          nashData.modification_date = treatment.modification_date;
          nashData.modification_time = treatment.modification_time;
          nashData.status = treatment.status;
          nashData.row_color = "row_new";// Nuevos" treatment.row_color;"
          this.NAHSRecordCreate[i] = this.NAHSRecord[i]; 
          console.log(this.NAHSRecordCreate);
    }
  }

  getHospitalsListApi(entity_id){
    this.hospitalsService.getHospitalsList(this.role_id, entity_id).subscribe((res_data:any)=>{
      if (res_data.code==200){
        this.optionsHospitals = res_data.data.map((r)=>{
          const dato = {} as hospitalsModel;
          dato.hospital_id = r.hospital_id;
          dato.hospital_name = r.hospital_name;
          return dato;
        });
        this.optionsHospitals.unshift(this.todosComboHospital);
      }else{

      }
    });
  }
  getHospitalsList(entity_id){
    console.log("Id de entidad " + entity_id);
    if (entity_id == 1){
      this.optionsHospitals = this.optionsHospitalesPEMEX;
    }else if (entity_id == 2){
      this.optionsHospitals = this.optionsHospitalesIMSS;
    }else if (entity_id == 3){
      this.optionsHospitals = this.optionsHospitalesISSSTE;
    }else if (entity_id == 4){
      this.optionsHospitals = this.optionsHospitalesSEDENA;
    }else if (entity_id == 5){
      this.optionsHospitals = this.optionsHospitalesSSA;
    }else if (entity_id == 6){
      this.optionsHospitals = this.optionsHospitalesISSEMYM;
    }else if (entity_id == 7){
      this.optionsHospitals = this.optionsHospitalesISSSTEP;
    }else if (entity_id == 8){
      this.optionsHospitals = this.optionsHospitalesPRIVADAS;
    }else if (entity_id == 9){
      this.optionsHospitals = this.optionsHospitalesGuadalajara;
    }
    
  }
  //////////////////////////////////////////////////
  ngOnInit() {
    ///////
    this.role_id = Number(localStorage.getItem('role_id'));
    this.create_flag = false;
    this.update_flag = false;
    /////////////////////////////

    this.indiceNash = 0;
    this.getDataNASH();
    let entity_id = localStorage.getItem("entidad_id");
    this.getHospitalsListApi(entity_id);
    ///////////////
    this.title_tab = localStorage.getItem('treatment_code');
    if (localStorage.getItem('treatment_type') == '4'){
      this.nashTableVisible = false; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '5'){
      this.nashTableVisible = true; 
      this.ashTableVisible = false;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '6'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = false;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '7'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = false;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '1'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = false;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '2'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = false;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '3'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = false;
    }
    if (localStorage.getItem('treatment_type') == '8'){
      this.nashTableVisible = true; 
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.tohTableVisible = false;
    }
  }
  regresar(){
    console.log("back page");
    this.router.navigate(['/treatments-types']);
  }

  reset(){
    setTimeout(() => (this.staticAlertClosed2 = true), 1000);
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
