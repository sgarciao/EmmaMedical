import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { Router } from '@angular/router';
import { nashTratment, nashTratmentHeader, nashTreatmentData } from 'src/app/model/nashTreatment';
import { NashtreatmentService } from 'src/app/services/nashtreatment.service';

import { NotifierService } from 'angular-notifier';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { hospitalsModel } from 'src/app/model/hospitalsModel';
import { vhcTreatmentData, vhcTreatmentModel, vhcTreatmentModelHeader } from 'src/app/model/vhcTreatmentsModel';
import { VhctreatmentService } from 'src/app/services/vhctreatment.service';
import { DatePipe } from '@angular/common';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { StatesService } from 'src/app/services/states.service';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css','./tratamientos.component.scss'],
  providers:[StatesService]
})
export class TratamientosComponent implements OnInit {
  ////////////////////////
  pipe = new DatePipe('en-US');
  today = new Date();
  strDate = '';
  start_date  : string;
  end_date    : string;

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
  //////////////////////VHC
  progres_spinner_refresh_vhc_treatment= true;
  save_enabled_vhc = true;///not visible
  save_disabled_vhc = false;/////button visible

  comboHospital = {} as hospitalsModel;
  status_id = 1;
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
  optionsHospitalsSelected = [];
  statesList = [];
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
  ////////////
  data_vhc_ =  {} as vhcTreatmentData;
  VHCRecord: vhcTreatmentModel[] = [];
  VHCRecordEstilo: vhcTreatmentModel[] = [];
  VHCRecordEstiloExcel: vhcTreatmentModel[] = [];

  VHCRecordCreate: vhcTreatmentModel[] = [];
  VHCRecordUpdate: vhcTreatmentModel[] = [];

  VHCRecordExcel: vhcTreatmentModel[]=[];
  VHCRecordHeader = {} as vhcTreatmentModelHeader;

  create_flag: boolean;
  update_flag: boolean;

  NAHSRecordExcel: nashTratment[] = [];
  NAHSRecordHeader = {} as nashTratmentHeader;




  indiceNash: number;

  constructor(
      private router:         Router,
      private nashTreatmentService: NashtreatmentService,
      private vhcTreatmentService: VhctreatmentService,
      private hospitalsService: HospitalsService,
      private statesService: EntitiesService
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

  getStates(){
    let country_id=1;
    this.statesService.getStatesByCountry(country_id).subscribe((resp_data_get:any) => {
      console.log("----------States");
      console.log(resp_data_get);
      if (resp_data_get.code==200){
        this.statesList = resp_data_get.data;
      }
    });
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
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.start_date = this.strDate;
    this.end_date = this.strDate;
    nashData.date_begin = this.strDate;
    nashData.date_end = this.strDate;
    if (this.comboHospital.hospital_id == 0){
      this.minimizeScreen();
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'warning';
      this.alert_2.message = 'Debe seleccionar un hospital';
      this.reset();
    }else{
      this.maximizeScreen();
      nashData.hospital_id = this.comboHospital.hospital_id;
      //nashData.research_nash_id = this.indiceNash;
      nashData.month_execution = 9;
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
  }
  changeHospital(){

  }
  getDataNASH(){
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn  = true;
    this.hospital_id = (this.comboHospital.hospital_id != undefined)?this.comboHospital.hospital_id:0;
    //hospital_id, role_id,entity_id,treatment_id,status_id, start_date, end_date
    this.nashTreatmentService.getNASHTreatment(this.hospital_id, this.role_id, this.entity_id, 4, this.status_id, this.start_date, this.end_date).subscribe((resp_data_get:any) => {

      this.NAHSRecordEstilo = [];
      this.NAHSRecordEstiloExcel = [];
      if (resp_data_get.code == 200){
        console.log(">> " + resp_data_get.data.data.length);
        if (resp_data_get.data.data.length > 0){
          resp_data_get.data.data.map((r) => {

            const nashData = {} as nashTratment;
            const nashDataExcel = {} as nashTratment;
            nashData.entity_id = r.entity_id;
            console.log("-----------------" + r.hospital_id);
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

          console.log("NO se encontraron datos.");
          this.minimizeScreen();
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'warning';
          this.alert_2.message = 'No se encontraron datos. Intente incrementando el rango de fechas o cambiando parámetros de busqueda.';
          this.reset();
          this.hidden_update_btn  = false;
          this.progres_spinner_refresh_nash_treatment = true;

        }
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
          this.save_disabled = false;
          this.save_enabled = true;
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
        this.save_disabled = false;
          this.save_enabled = true;
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
    console.log("Get hospitals... ");
    this.hospitalsService.getHospitalsList(this.role_id, entity_id).subscribe((res_data:any)=>{
      if (res_data.code == 200){
        let hosp = res_data.data.map((r)=>{
          const dato = {} as hospitalsModel;
          dato.hospital_id = r.hospital_id;
          dato.hospital_name = r.hospital_name;
          return dato;
        });

        this.optionsHospitalsSelected = res_data.data;
        this.optionsHospitals = hosp;

       if (res_data.data.length > 1 ){
        const dato = {} as hospitalsModel;
        dato.hospital_id = 0;
        dato.hospital_name = 'Todos';
        this.optionsHospitals.unshift(dato);
        this.comboHospital = dato;
       }else{
//<<<<<<< HEAD
        this.comboHospital = hosp;
//=======
  //      this.comboHospital = hosp[0];
//>>>>>>> 3c823d24a38d39f4cdadc423b6bff1f7b45b6360
       }
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
  /////////////////////Searcher
  serchByHospitalIDAndDate(){
    if (localStorage.getItem('treatment_type') == '4'){
      this.getDataNASH();
    }else if(localStorage.getItem('treatment_type') == '5'){

    }else if(localStorage.getItem('treatment_type') == '6'){

    }else if(localStorage.getItem('treatment_type') == '7'){
      this.getVHCData();
    }else if(localStorage.getItem('treatment_type') == '8'){

    }
  }
  //////////////////////////////////////////////////
  ngOnInit() {
    this.getStates();
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.start_date = this.strDate;
    this.end_date = this.strDate;
    console.log("date " + this.strDate);
    ///////
    this.role_id = Number(localStorage.getItem('role_id'));
    this.create_flag = false;
    this.update_flag = false;
    /////////////////////////////

    let entity_id_ = localStorage.getItem("entidad_id");
    this.entity_id = Number(entity_id_);
    this.getHospitalsListApi(entity_id_);
    ///////////////
    this.title_tab = localStorage.getItem('treatment_code');
    if (localStorage.getItem('treatment_type') == '4'){
      this.indiceNash = 0;
      this.getDataNASH();

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
      this.indiceNash = 0;
      this.getVHCData();

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
    setTimeout(() => (this.staticAlertClosed2 = true), 2000);
  }
  //////////////////////////////////////_____________________________________VHC
  exportCSVFileVHC(headers, items, fileTitle) {
      if (headers) {
          items.unshift(headers);
      }
      // Convert Object to JSON

      var jsonObject = JSON.stringify(items);
      var csv = this.convertToCSV(jsonObject);
      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
      var blob = new Blob([csv], { type: 'text/csv;charset=unicode;' });
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
  convertToCSVVHC(objArray) {
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
  exportExcelVHC(){
    this.createHeaderVHC();
    this.exportCSVFileVHC(this.VHCRecordHeader, this.VHCRecordExcel, "VHC Treatment");
  }
  createHeaderVHC(){
    this.VHCRecordHeader = {}  as vhcTreatmentModelHeader;
    const vhcData = {} as vhcTreatmentModelHeader;
          //vhcData.date_begin = "Fecha de inicio";
          //vhcData.date_end = "Fecha Fin";
          //vhcData.research_vhc_id = "ID";
          //vhcData.month_execution = "Mes de ejecución";
          vhcData.research_vhc_id = "INICIALES";//relacionar iniciales
          vhcData.birthdate = "F. DE NACIMIENTO";
          vhcData.age = "EDAD";
          vhcData.gender = "GENERO";
          vhcData.state = "ESTADO DE LA REPÚBLICA";
          vhcData.year = "AÑO DE DX DE VHC";
          vhcData.transmission_mechanism = "MECANISMO DE TRANSMISIÓN";
          vhcData.comorbilidades = "COMORBILIDADES"
          vhcData.manif_extrahepaticas = "MANIFESTACIONES EXTRAHEPATICAS";
          vhcData.grado_fibrosis_hepatica="GRADO DE FIBROSIS HEPATICA";
          vhcData.cirrosis = "CIRROSIS";
          vhcData.estado_cirrosis_compensada = "ESTADO DE CIRROSIS COMPENSADA O DESCOMPENSADA";
          vhcData.cirrosis_descompensada = "CIRROSIS DESCOMPENSADA";
          vhcData.child_inicial = "ESTADIO CHILD INICIAL (PUNTAJE)";
          vhcData.meld_inicial = "MELD (INICIAL)";
          vhcData.esofagicas = "V. ESOFÁGICAS";
          vhcData.estado_inicial= "ESTADO INICIAL";
          vhcData.tipo_tx_previo = "TIPO DE TX PREVIO";
          vhcData.year_inicio_tx_add = "AÑO DE INICIO DE TX DE ADD";
          vhcData.esquema_tratamiento = "ESQUEMA DE TRATAMIENTO";
          vhcData.tiempo_tratamiento_meses = "TIEMPO DE TRATAMIENTO EN MESES";
          vhcData.rvs = "RVS";
          vhcData.cv_inicial  = "CV INICIAL";
          vhcData.log_inicial = "LOG INICIAL";
          vhcData.cv_rvs12 = "CV RVS12";
          vhcData.log_rvs12 = "LOG RVS12";
          vhcData.funcion_renal = "FUNCIÓN RENAL (FILTRACIÓN GLOMERULAR) PRETRATAMIENTO";
          vhcData.hb_inicial = "HB INICIAL";
          vhcData.hb_final = "HB FINAL";
          vhcData.leucocitos_inicial = "LEUCOCITOS INICIAL";
          vhcData.leucocitos_final = "LEUCOCITOS FINAL";
          vhcData.plaquetas_inicial = "PLAQUETAS INICIAL";
          vhcData.plaquetas_final = "PLAQUETAS FINAL";
          vhcData.creatinina_inicial = "CREATINA INICIAL";
          vhcData.creatinina_final = "CREATINA FINAL";
          vhcData.tgo_inicial = "TGO INICIAL";
          vhcData.tgo_final = "TGO FINAL";
          vhcData.tgp_inicial = "TGP INICIAL";
          vhcData.tgp_final = "TGP FINAL";
          vhcData.alumina_inicial = "ALUMINA INICIAL";
          vhcData.alumina_final = "ALUMINA FINAL";
          vhcData.inr_inicial = "INR INICIAL";
          vhcData.inr_final = "INR FINAL";
          vhcData.bt_inicial = "BT INICIAL";
          vhcData.bt_final = "BT FINAL";
          vhcData.efecto_adverso = "EFECTO ADVERSO";
          vhcData.descripcion_adverso = "CUAL/DESCRIBIR";
          vhcData.accion_tomada = "ACCIÓN TOMADA";
          vhcData.child_final = "CHILD FINAL";
          vhcData.meld_final = "MELD FINAL";
          vhcData.comentarios = "COMENTARIOS";
          ///vhcData.creation_user_id = ;
          //vhcData.creation_user_name = ;
        //  vhcData.creation_date = "Fecha de registro";
         // vhcData.creation_time = "Hora de registro";
          //vhcData.modification_user_name = r.modification_user_name;
          //vhcData.modification_date = r.modification_date;
          //vhcData.modification_time = r.modification_time;
          //vhcData.status = r.status;
          this.VHCRecordHeader = vhcData;
  }
  getExcelDataVHC(vhcData: vhcTreatmentModel){
    const vhcDataExcel = {} as vhcTreatmentModel;

    vhcDataExcel.research_vhc_id = vhcData.research_vhc_id;//relacionar iniciales
    let birt_D = "";
    if (vhcData.birthdate!=null){
      birt_D = vhcData.birthdate;
    }
    vhcDataExcel.birthdate = birt_D;
    vhcDataExcel.age = vhcData.age == null ? 0: vhcData.age; //Edad
    vhcDataExcel.gender = vhcData.gender == null ? 0: vhcData.gender;//Género
    vhcDataExcel.state = vhcData.state == null ? 0: vhcData.state;//estado de la republica
    vhcDataExcel.year = vhcData.year == null ? 0: vhcData.year;//Año de dx de vhc
    vhcDataExcel.transmission_mechanism = vhcData.transmission_mechanism==null ? 0:vhcData.transmission_mechanism; //mecanismo de trasmision
    vhcDataExcel.comorbilidades = vhcData.comorbilidades==null ? 0: vhcData.comorbilidades;//Comorbilidades
    vhcDataExcel.manif_extrahepaticas = vhcData.manif_extrahepaticas == null? 0: vhcData.manif_extrahepaticas;//manifesaciones extrahepaticas
    vhcDataExcel.grado_fibrosis_hepatica =  vhcData.grado_fibrosis_hepatica == null ? 0: vhcData.grado_fibrosis_hepatica;//grado de fibrosis hepatica
    vhcDataExcel.cirrosis = vhcData.cirrosis == null ? 0: vhcData.cirrosis;//Cirrosis (Si o No)
    vhcDataExcel.estado_cirrosis_compensada = vhcData.estado_cirrosis_compensada == null ? 0: vhcData.estado_cirrosis_compensada;//Estado de la cirrosis compensada o descompensadabgt5-
    vhcDataExcel.cirrosis_descompensada = vhcData.cirrosis_descompensada == null ?0: vhcData.cirrosis_descompensada;//Cirrosis Descompensada
    vhcDataExcel.child_inicial = vhcData.child_inicial == null ? 0: vhcData.child_inicial;//Estadio Child Inicial(Puntaje)
    vhcDataExcel.meld_inicial = vhcData.meld_inicial==null ?0: vhcData.meld_inicial;//MELD ( Inicial)
    vhcDataExcel.esofagicas = vhcData.esofagicas==null? 0: vhcData.esofagicas;//V. Esofágicas (Si o No)
    vhcDataExcel.estado_inicial = vhcData.estado_inicial==null ? 0: vhcData.estado_inicial;//Estado inicial
    vhcDataExcel.tipo_tx_previo = vhcData.tipo_tx_previo==null ? 0: vhcData.tipo_tx_previo;//Tipo de tx previo
    vhcDataExcel.year_inicio_tx_add = vhcData.year_inicio_tx_add == null ? 0: vhcData.year_inicio_tx_add;//Año de Inicio de tx de ADD
    vhcDataExcel.esquema_tratamiento = vhcData.esquema_tratamiento==null ? 0: vhcData.esquema_tratamiento;//Esquema de-tratamientot5
    vhcDataExcel.tiempo_tratamiento_meses = vhcData.tiempo_tratamiento_meses==null ? 0: vhcData.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
    vhcDataExcel.rvs = vhcData.rvs == null ? 0: vhcData.rvs;//RVS (si o no)
    vhcDataExcel.cv_inicial = vhcData.cv_inicial==null ? 0: vhcData.cv_inicial;//CV Inicial
    vhcDataExcel.log_inicial = vhcData.log_inicial==null? 0: vhcData.log_inicial;//Log Inicial
    vhcDataExcel.cv_rvs12 = vhcData.cv_rvs12==null ? 0: vhcData.cv_rvs12;//CV RVS12
    vhcDataExcel.log_rvs12 = vhcData.log_rvs12 == null? 0: vhcData.log_rvs12;//Log RVS 12
    vhcDataExcel.funcion_renal = vhcData.funcion_renal== null?0: vhcData.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
    vhcDataExcel.hb_inicial = vhcData.hb_inicial == null ?0: vhcData.hb_inicial;//HB Inicial
    vhcDataExcel.hb_final = vhcData.hb_final == null ? 0: vhcData.hb_final;//Hb final
    vhcDataExcel.leucocitos_inicial = vhcData.leucocitos_inicial == null ? 0: vhcData.leucocitos_inicial;//leucocios inicial
    vhcDataExcel.leucocitos_final = vhcData.leucocitos_final==null ? 0:vhcData.leucocitos_final;//leucocitos final
    vhcDataExcel.plaquetas_inicial = vhcData.plaquetas_inicial == null? 0: vhcData.plaquetas_inicial;//Plaq Inicial
    vhcDataExcel.plaquetas_final = vhcData.plaquetas_final == null ? 0: vhcData.plaquetas_final;//Plaq Final
    vhcDataExcel.creatinina_inicial = vhcData.creatinina_inicial==null? 0: vhcData.creatinina_inicial;//creatinia inicial
    vhcDataExcel.creatinina_final = vhcData.creatinina_final==null? 0: vhcData.creatinina_final;//Creatinina final
    vhcDataExcel.tgo_inicial = vhcData.tgo_inicial==null? 0: vhcData.tgo_inicial;//TGO Inicial
    vhcDataExcel.tgo_final = vhcData.tgo_final==null ? 0: vhcData.tgo_final;//TGO Final
    vhcDataExcel.tgp_inicial = vhcData.tgp_inicial==null ? 0: vhcData.tgp_inicial;//TGP Inicial
    vhcDataExcel.tgp_final = vhcData.tgp_final==null ? 0: vhcData.tgp_final;//TGP Final
    vhcDataExcel.alumina_inicial = vhcData.alumina_inicial==null ? 0: vhcData.alumina_inicial;//alumina inicial
    vhcDataExcel.alumina_final = vhcData.alumina_final==null? 0: vhcData.alumina_final;//albumina final
    vhcDataExcel.inr_inicial = vhcData.inr_inicial==null?0: vhcData.inr_inicial;//INR Inicial
    vhcDataExcel.inr_final = vhcData.inr_final==null ? 0: vhcData.inr_final;  //INR Final
    vhcDataExcel.bt_inicial = vhcData.bt_inicial == null? 0: vhcData.bt_inicial;//BT inicial
    vhcDataExcel.bt_final = vhcData.bt_final == null ? 0: vhcData.bt_final;//BT final
    vhcDataExcel.efecto_adverso = vhcData.efecto_adverso==null?0: vhcData.efecto_adverso;//Efecto Adverso Si/No
    vhcDataExcel.descripcion_adverso = vhcData.descripcion_adverso==null?0: vhcData.descripcion_adverso;//Cual/describir
    vhcDataExcel.accion_tomada = vhcData.accion_tomada == null ? 0: vhcData.accion_tomada;//Acción Tomada
    vhcDataExcel.child_final = vhcData.child_final==null?0: vhcData.child_final;//Child Final
    vhcDataExcel.meld_final = vhcData.meld_final== null? 0: vhcData.meld_final;//MELD finall
    vhcDataExcel.comentarios = vhcData.comentarios ==null? "" : vhcData.comentarios;//Comentarios

    return vhcDataExcel;
  }
  guardarRegistroVHC(){
    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn  = true;

    if (this.create_flag){
      console.log("Guardando...");
      this.data_vhc_.data = this.VHCRecordCreate.filter(function(e1){
        return e1 != null;
      });
      this.vhcTreatmentService.saveVHCTreatment(this.data_vhc_).subscribe((resp_data:any)=>{
        if (resp_data.http_code == null){
        if(resp_data.code == 200){
          this.VHCRecord = [];
          this.VHCRecordCreate = [];
          this.create_flag = false;
          this.progres_spinner_refresh_vhc_treatment = true;

          this.getVHCData();

          this.staticAlertClosed2 = false;
          this.alert_2.type = 'success';
          this.alert_2.message = 'Datos guardados correctamente.';
          this.reset();
          this.hidden_update_btn  = false;
          console.log("Disable button for save...");
          this.save_disabled_vhc = false;
          this.save_enabled_vhc = true;
        }else{
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'No se pudo guardar la información, intente nuevamente.';
          this.reset();
          this.progres_spinner_refresh_vhc_treatment = true;
          this.hidden_update_btn  = false;

          this.save_disabled_vhc = false;
          this.save_enabled_vhc = true;
        }
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar guardar la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn  = false;
      }
      }, err=>{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar guardar la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn  = false;
      });
    }
    if (this.update_flag){
      console.log("Guardando...");
      this.data_vhc_.data = this.VHCRecordUpdate.filter(function(e1){
        return e1 != null;
      });

      console.log(this.data_);
      this.vhcTreatmentService.updateVHCTreatment(this.data_vhc_).subscribe((resp_data:any)=>{
      console.log(resp_data);

      if (resp_data.code == 200){
        this.NAHSRecord = [];
        this.NAHSRecordUpdate = [];
        this.update_flag = false;
        this.progres_spinner_refresh_vhc_treatment = true;
        this.getVHCData();
        this.hidden_update_btn  = false;

        this.staticAlertClosed2 = false;
        this.alert_2.type = 'success';
        this.alert_2.message = 'Datos actualizados correctamente.';
        this.reset();

        this.save_disabled_vhc = false;
        this.save_enabled_vhc = true;
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al actualizar la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn  = false;
      }
    }, err=>{
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al intentar actualizar la información.';
      this.reset();
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn  = false;
    });
    }
  }
  agregarNuevoRegistroVHC(event){
    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn  = true;
    //this.indiceNash = (Number(this.indiceNash) + 1);
    const vhcData = {} as vhcTreatmentModel;

    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.start_date = this.strDate;
    this.end_date = this.strDate;
    if (this.comboHospital.hospital_id == 0){
      this.minimizeScreen();
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'warning';
      this.alert_2.message = 'Debe seleccionar un hospital';
      this.reset();
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn  = false;

    }else{
      this.maximizeScreen();
      vhcData.MD_hospital_id = this.comboHospital.hospital_id;
      vhcData.MD_entity_id = this.entity_id;
      vhcData.research_date_begin = this.strDate;
      vhcData.research_date_end = this.strDate;
      //nashData.research_nash_id = this.indiceNash;
      vhcData.month_execution = 9;
      vhcData.row_color = "row_new";
      vhcData.status = 1;
      vhcData.active_red_sem = "row_sem_red_visible";
      vhcData.active_green_sem = "row_sem_green_hidden";

      this.VHCRecord.push(vhcData);
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn  = false;
      this.save_disabled_vhc = true;
      this.save_enabled_vhc = false;
    }
  }

  updateRecordVHC(id, column_name, treatment, i){
    console.log("Actualizando " + id);
    if (id != null){
      this.update_flag = true;
      const vhcData = {} as vhcTreatmentModel;

      vhcData.MD_hospital_id = treatment.MD_hospital_id;
      vhcData.MD_entity_id = this.entity_id;
      vhcData.research_vhc_id = id;

      vhcData.month_execution = treatment.month_execution;
      vhcData.initials = treatment.initials;


      if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '' ){
        console.log("birthday nulo: " + vhcData.birthdate);
      }else{
        vhcData.birthdate = treatment.birthdate;
        console.log("birthday no nulo: " + vhcData.birthdate);

      }
      vhcData.age = treatment.age; //Edad
      vhcData.gender = treatment.gender;//Género
      vhcData.state = treatment.state;//estado de la republica
      vhcData.year = treatment.year;//Año de dx de vhc
      vhcData.transmission_mechanism = treatment.transmission_mechanism; //mecanismo de trasmision
      vhcData.comorbilidades = treatment.comorbilidades;//Comorbilidades
      vhcData.manif_extrahepaticas = treatment.manif_extrahepaticas;//manifesaciones extrahepaticas
      vhcData.grado_fibrosis_hepatica =  treatment.grado_fibrosis_hepatica;//grado de fibrosis hepatica
      vhcData.cirrosis = treatment.cirrosis;//Cirrosis (Si o No)
      vhcData.estado_cirrosis_compensada = treatment.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-
      vhcData.cirrosis_descompensada = treatment.cirrosis_descompensada;//Cirrosis Descompensada
      vhcData.child_inicial = treatment.child_inicial;//Estadio Child Inicial(Puntaje)
      vhcData.meld_inicial = treatment.meld_inicial;//MELD ( Inicial)
      vhcData.esofagicas = treatment.esofagicas;//V. Esofágicas (Si o No)
      vhcData.estado_inicial = treatment.estado_inicial;//Estado inicial
      vhcData.tipo_tx_previo = treatment.tipo_tx_previo;//Tipo de tx previo
      vhcData.year_inicio_tx_add = treatment.year_inicio_tx_add;//Año de Inicio de tx de ADD
      vhcData.esquema_tratamiento = treatment.esquema_tratamiento;//Esquema de-tratamientot5
      vhcData.tiempo_tratamiento_meses = treatment.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
      vhcData.rvs = treatment.rvs;//RVS (si o no)
      vhcData.cv_inicial = treatment.cv_inicial;//CV Inicial
      vhcData.log_inicial = treatment.log_inicial;//Log Inicial
      vhcData.cv_rvs12 = treatment.cv_rvs12;//CV RVS12
      vhcData.log_rvs12 = treatment.log_rvs12;//Log RVS 12
      vhcData.funcion_renal = treatment.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
      vhcData.hb_inicial = treatment.hb_inicial;//HB Inicial
      vhcData.hb_final = treatment.hb_final;//Hb final
      vhcData.leucocitos_inicial = treatment.leucocitos_inicial;//leucocios inicial
      vhcData.leucocitos_final = treatment.leucocitos_final;//leucocitos final
      vhcData.plaquetas_inicial = treatment.plaquetas_inicial;//Plaq Inicial
      vhcData.plaquetas_final = treatment.plaquetas_final;//Plaq Final
      vhcData.creatinina_inicial = treatment.creatinina_inicial;//creatinia inicial
      vhcData.creatinina_final = treatment.creatinina_final;//Creatinina final
      vhcData.creatinina_final = treatment.creatinina_final;//Creatinina final
      vhcData.tgo_inicial = treatment.tgo_inicial;//TGO Inicial
      vhcData.tgo_final = treatment.tgo_final;//TGO Final
      vhcData.tgp_inicial = treatment.tgp_inicial;//TGP Inicial
      vhcData.tgp_final = treatment.tgp_final;//TGP Final
      vhcData.alumina_inicial = treatment.alumina_inicial;//alumina inicial
      vhcData.alumina_final = treatment.alumina_final;//albumina final
      vhcData.inr_inicial = treatment.inr_inicial;//INR Inicial
      vhcData.inr_final = treatment.inr_final;  //INR Final
      vhcData.bt_inicial = treatment.bt_inicial;//BT inicial
      vhcData.bt_final = treatment.bt_final;//BT final
      vhcData.efecto_adverso = treatment.efecto_adverso;//Efecto Adverso Si/No
      vhcData.descripcion_adverso = treatment.descripcion_adverso;//Cual/describir
      vhcData.accion_tomada = treatment.accion_tomada;//Acción Tomada
      vhcData.child_final = treatment.child_final;//Child Final
      vhcData.meld_final = treatment.meld_final;//MELD finall
      vhcData.comentarios = treatment.comentarios;//Comentarios

      vhcData.creation_userid = treatment.creation_userid;
      vhcData.creation_username = treatment.creation_username;
      vhcData.creation_date = treatment.creation_date;
      vhcData.creation_time = treatment.creation_time;
      vhcData.modification_userid = treatment.modification_userid;
      vhcData.modification_username = treatment.modification_username;
      vhcData.modification_date = treatment.modification_date;
      vhcData.modification_time = treatment.modification_time;

      vhcData.status = treatment.status;
      vhcData.row_color = "row_update";// Nuevos" treatment.row_color;"

      console.log("COlor: " + vhcData.row_color);
      this.VHCRecordUpdate[id] = vhcData;
          //this.NAHSRecord[i] = vhcData;
      treatment.row_color = vhcData.row_color;
          //console.log(this.NAHSRecord[i]);
          //console.log(this.NAHSRecordUpdate);
          //console.log("Actualizando.." + id + " " + column_name);
      this.save_disabled_vhc = true;
      this.save_enabled_vhc = false;
    }else{
      this.create_flag = true;
      const vhcData = {} as vhcTreatmentModel;


      vhcData.age = treatment.age; //Edad
      vhcData.gender = treatment.gender;//Género
      vhcData.state = treatment.state;//estado de la republica
      vhcData.year = treatment.year;//Año de dx de vhc
      vhcData.transmission_mechanism = treatment.transmission_mechanism; //mecanismo de trasmision
      vhcData.comorbilidades = treatment.comorbilidades;//Comorbilidades
      vhcData.manif_extrahepaticas = treatment.manif_extrahepaticas;//manifesaciones extrahepaticas
      vhcData.grado_fibrosis_hepatica =  treatment.grado_fibrosis_hepatica;//grado de fibrosis hepatica
      vhcData.cirrosis = treatment.cirrosis;//Cirrosis (Si o No)
      vhcData.estado_cirrosis_compensada = treatment.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-
      vhcData.cirrosis_descompensada = treatment.cirrosis_descompensada;//Cirrosis Descompensada
      vhcData.child_inicial = treatment.child_inicial;//Estadio Child Inicial(Puntaje)
      vhcData.meld_inicial = treatment.meld_inicial;//MELD ( Inicial)
      vhcData.esofagicas = treatment.esofagicas;//V. Esofágicas (Si o No)
      vhcData.estado_inicial = treatment.estado_inicial;//Estado inicial
      vhcData.tipo_tx_previo = treatment.tipo_tx_previo;//Tipo de tx previo
      vhcData.year_inicio_tx_add = treatment.year_inicio_tx_add;//Año de Inicio de tx de ADD
      vhcData.esquema_tratamiento = treatment.esquema_tratamiento;//Esquema de-tratamientot5
      vhcData.tiempo_tratamiento_meses = treatment.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
      vhcData.rvs = treatment.rvs;//RVS (si o no)
      vhcData.cv_inicial = treatment.cv_inicial;//CV Inicial
      vhcData.log_inicial = treatment.log_inicial;//Log Inicial
      vhcData.cv_rvs12 = treatment.cv_rvs12;//CV RVS12
      vhcData.log_rvs12 = treatment.log_rvs12;//Log RVS 12
      vhcData.funcion_renal = treatment.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
      vhcData.hb_inicial = treatment.hb_inicial;//HB Inicial
      vhcData.hb_final = treatment.hb_final;//Hb final
      vhcData.leucocitos_inicial = treatment.leucocitos_inicial;//leucocios inicial
      vhcData.leucocitos_final = treatment.leucocitos_final;//leucocitos final
      vhcData.plaquetas_inicial = treatment.plaquetas_inicial;//Plaq Inicial
      vhcData.plaquetas_final = treatment.plaquetas_final;//Plaq Final
      vhcData.creatinina_inicial = treatment.creatinina_inicial;//creatinia inicial
      vhcData.creatinina_final = treatment.creatinina_final;//Creatinina final
      vhcData.creatinina_final = treatment.creatinina_final;//Creatinina final
      vhcData.tgo_inicial = treatment.tgo_inicial;//TGO Inicial
      vhcData.tgo_final = treatment.tgo_final;//TGO Final
      vhcData.tgp_inicial = treatment.tgp_inicial;//TGP Inicial
      vhcData.tgp_final = treatment.tgp_final;//TGP Final
      vhcData.alumina_inicial = treatment.alumina_inicial;//alumina inicial
      vhcData.alumina_final = treatment.alumina_final;//albumina final
      vhcData.inr_inicial = treatment.inr_inicial;//INR Inicial
      vhcData.inr_final = treatment.inr_final;  //INR Final
      vhcData.bt_inicial = treatment.bt_inicial;//BT inicial
      vhcData.bt_final = treatment.bt_final;//BT final
      vhcData.efecto_adverso = treatment.efecto_adverso;//Efecto Adverso Si/No
      vhcData.descripcion_adverso = treatment.descripcion_adverso;//Cual/describir
      vhcData.accion_tomada = treatment.accion_tomada;//Acción Tomada
      vhcData.child_final = treatment.child_final;//Child Final
      vhcData.meld_final = treatment.meld_final;//MELD finall
      vhcData.comentarios = treatment.comentarios;//Comentarios

      vhcData.creation_userid = treatment.creation_userid;
      vhcData.creation_username = treatment.creation_username;
      vhcData.creation_date = treatment.creation_date;
      vhcData.creation_time = treatment.creation_time;
      vhcData.modification_userid = treatment.modification_userid;
      vhcData.modification_username = treatment.modification_username;
      vhcData.modification_date = treatment.modification_date;
      vhcData.modification_time = treatment.modification_time;
      vhcData.status = treatment.status;
      vhcData.row_color = "row_new";// Nuevos" treatment.row_color;"
      this.VHCRecordCreate[i] = this.VHCRecord[i];
    }
  }

  getVHCData(){
    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn  = true;

    this.hospital_id = (this.comboHospital.hospital_id != undefined)?this.comboHospital.hospital_id:0;
    //hospital_id, role_id,entity_id,treatment_id,status_id, start_date, end_date
    this.vhcTreatmentService.getVHCTreatment(this.hospital_id, this.role_id, this.entity_id, 7, this.status_id,this.start_date, this.end_date).subscribe((resp_data_get:any) => {

      this.VHCRecordEstilo = [];
      this.VHCRecordEstiloExcel = [];
      if (resp_data_get.code == 200){
        if (resp_data_get.data.data.length >0){
          resp_data_get.data.data.map((r) => {

            const vhcData = {} as vhcTreatmentModel;
            const vhcDataExcel = {} as vhcTreatmentModel;

            vhcData.MD_entity_id = r.MD_entity_id;
            vhcData.MD_hospital_id = r.MD_hospital_id;
            vhcData.active_green_sem = "row_sem_green_visible";

            vhcData.active_red_sem = "row_sem_red";///initial value

            vhcData.research_date_begin = r.research_date_begin;
            vhcData.research_date_end = r.research_date_end;
            vhcData.research_vhc_id = r.research_vhc_id;
            vhcData.month_execution = r.month_execution;

            vhcData.initials = r.initials; //Iniciales
            if (r.initials=="" || r.initials==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.age = r.age; //Edad
            if (r.age=="" || r.age==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.gender = r.gender;//Género
            if (r.gender=="" || r.gender==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.state = r.state;//estado de la republica
            if (r.state=="" || r.state==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.year = r.year;//Año de dx de vhc
            if (r.year=="" || r.year==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.transmission_mechanism = r.transmission_mechanism; //mecanismo de trasmision
            if (r.transmission_mechanism =="" || r.transmission_mechanism==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.comorbilidades = r.comorbilidades;//Comorbilidades
            if (r.comorbilidades =="" || r.comorbilidades==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.manif_extrahepaticas = r.manif_extrahepaticas;//manifesaciones extrahepaticas
            if (r.manif_extrahepaticas =="" || r.manif_extrahepaticas==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.grado_fibrosis_hepatica =  r.grado_fibrosis_hepatica;//grado de fibrosis hepatica
            if (r.grado_fibrosis_hepatica =="" || r.grado_fibrosis_hepatica==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cirrosis = r.cirrosis;//Cirrosis (Si o No)
            if (r.cirrosis =="" || r.cirrosis==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.estado_cirrosis_compensada = r.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-
            if (r.estado_cirrosis_compensada =="" || r.estado_cirrosis_compensada==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cirrosis_descompensada = r.cirrosis_descompensada;//Cirrosis Descompensada
            if (r.cirrosis_descompensada =="" || r.cirrosis_descompensada==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.child_inicial = r.child_inicial;//Estadio Child Inicial(Puntaje)
            if (r.child_inicial =="" || r.child_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.meld_inicial = r.meld_inicial;//MELD ( Inicial)
            if (r.meld_inicial =="" || r.meld_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.esofagicas = r.esofagicas;//V. Esofágicas (Si o No)
            if (r.esofagicas =="" || r.esofagicas==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.estado_inicial = r.estado_inicial;//Estado inicial
            if (r.estado_inicial =="" || r.estado_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tipo_tx_previo = r.tipo_tx_previo;//Tipo de tx previo
            if (r.tipo_tx_previo =="" || r.tipo_tx_previo==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.year_inicio_tx_add = r.year_inicio_tx_add;//Año de Inicio de tx de ADD
            if (r.year_inicio_tx_add =="" || r.year_inicio_tx_add==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.esquema_tratamiento = r.esquema_tratamiento;//Esquema de-tratamientot5
            if (r.esquema_tratamiento =="" || r.esquema_tratamiento==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tiempo_tratamiento_meses = r.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
            if (r.tiempo_tratamiento_meses =="" || r.tiempo_tratamiento_meses==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.rvs = r.rvs;//RVS (si o no)
            if (r.rvs =="" || r.rvs==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cv_inicial = r.cv_inicial;//CV Inicial
            if (r.cv_inicial =="" || r.cv_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.log_inicial = r.log_inicial;//Log Inicial
            if (r.log_inicial =="" || r.log_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cv_rvs12 = r.cv_rvs12;//CV RVS12
            if (r.cv_rvs12 =="" || r.cv_rvs12==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.log_rvs12 = r.log_rvs12;//Log RVS 12
            if (r.log_rvs12 =="" || r.log_rvs12==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.funcion_renal = r.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
            if (r.funcion_renal =="" || r.funcion_renal==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hb_inicial = r.hb_inicial;//HB Inicial
            if (r.hb_inicial =="" || r.hb_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hb_final = r.hb_final;//Hb final
            if (r.hb_final =="" || r.hb_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.leucocitos_inicial = r.leucocitos_inicial;//leucocios inicial
            if (r.leucocitos_inicial =="" || r.leucocitos_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.leucocitos_final = r.leucocitos_final;//leucocitos final
            if (r.leucocitos_final =="" || r.leucocitos_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.plaquetas_inicial = r.plaquetas_inicial;//Plaq Inicial
            if (r.plaquetas_inicial =="" || r.plaquetas_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.plaquetas_final = r.plaquetas_final;//Plaq Final
            if (r.plaquetas_final =="" || r.plaquetas_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.creatinina_inicial = r.creatinina_inicial;//creatinia inicial
            if (r.creatinina_inicial =="" || r.creatinina_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.creatinina_final = r.creatinina_final;//Creatinina final
            if (r.creatinina_final =="" || r.creatinina_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgo_inicial = r.tgo_inicial;//TGO Inicial
            if (r.tgo_inicial =="" || r.tgo_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgo_final = r.tgo_final;//TGO Final
            if (r.tgo_final =="" || r.tgo_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgp_inicial = r.tgp_inicial;//TGP Inicial
            if (r.tgp_inicial =="" || r.tgp_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgp_final = r.tgp_final;//TGP Final
            if (r.tgp_final =="" || r.tgp_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.alumina_inicial = r.alumina_inicial;//alumina inicial
            if (r.alumina_inicial =="" || r.alumina_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.alumina_final = r.alumina_final;//albumina final
            if (r.alumina_final =="" || r.alumina_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.inr_inicial = r.inr_inicial;//INR Inicial
            if (r.inr_inicial =="" || r.inr_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.inr_final = r.inr_final;  //INR Final
            if (r.inr_final =="" || r.inr_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.bt_inicial = r.bt_inicial;//BT inicial
            if (r.bt_inicial =="" || r.bt_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.bt_final = r.bt_final;//BT final
            if (r.bt_final =="" || r.bt_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.efecto_adverso = r.efecto_adverso;//Efecto Adverso Si/No
            if (r.efecto_adverso =="" || r.efecto_adverso==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.descripcion_adverso = r.descripcion_adverso;//Cual/describir
            if (r.descripcion_adverso =="" || r.descripcion_adverso==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.accion_tomada = r.accion_tomada;//Acción Tomada
            if (r.accion_tomada =="" || r.accion_tomada==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.child_final = r.child_final;//Child Final
            if (r.child_final =="" || r.child_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.meld_final = r.meld_final;//MELD finall
            if (r.meld_final =="" || r.meld_final==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.comentarios = r.comentarios;//Comentarios
            if (r.comentarios =="" || r.comentarios==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.creation_userid = r.creation_userid;
            vhcData.creation_username = r.creation_username;
            vhcData.creation_date = r.creation_date;
            vhcData.creation_time = r.creation_time;
            vhcData.modification_username = r.modification_username;
            vhcData.modification_date = r.modification_date;
            vhcData.modification_time = r.modification_time;
            vhcData.status = r.status;

            vhcData.row_color = "row_get";// Nuevos" treatment.row_color;"
            this.VHCRecordEstilo.push(vhcData);
            this.VHCRecord = this.VHCRecordEstilo;
            this.VHCRecordEstiloExcel.push(this.getExcelDataVHC(vhcData));
            this.hidden_update_btn  = false;
            this.progres_spinner_refresh_vhc_treatment = true;
          });
        }else{
          console.log("Minimizar");
          this.minimizeScreen();
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'Warning';
          this.alert_2.message = 'No se encontraron datos. Intente aumentando el rango de fechas o cambiando los parámetros de búsqueda';
          this.reset();
          this.progres_spinner_refresh_vhc_treatment = true;
          this.hidden_update_btn  = false;
        }
      }else{
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al obtener la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn  = false;
      }
      this.VHCRecordExcel = this.VHCRecordEstiloExcel;
      this.VHCRecord = this.VHCRecordEstilo;

    }, err=>{
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al obtener la información.';
      this.reset();
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn  = false;
    });
  }
  updateTableRecordsVHC(){
      this.getVHCData();
  }
  ///////////////////////////////////////____________________________________END VHC
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
