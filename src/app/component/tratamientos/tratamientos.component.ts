import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { Router } from '@angular/router';

//Eliminar linea abajo
//import { nashTratment, nashTratmentHeader } from 'src/app/model/nashTreatment';

import { nashTreatmentModel, nashTreatmentModelHeader, nashTreatmentData } from 'src/app/model/nashTreatmentsModel';
import { NashtreatmentService } from 'src/app/services/nashtreatment.service';
import { GenericCatalogService } from 'src/app/services/generic_catalog.service';

import { NotifierService } from 'angular-notifier';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { hospitalsModel } from 'src/app/model/hospitalsModel';

import { vhcTreatmentData, vhcTreatmentModel, vhcTreatmentModelHeader } from 'src/app/model/vhcTreatmentsModel';
import { VhctreatmentService } from 'src/app/services/vhctreatment.service';

import { DatePipe } from '@angular/common';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { StatesService } from 'src/app/services/states.service';
import { EntitiesService } from 'src/app/services/entities.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TreeMapModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css', './tratamientos.component.scss'],
  providers: [StatesService, GenericCatalogService]
})
export class TratamientosComponent implements OnInit {

  ///////////MULTISELECT
  dropdownSettings: IDropdownSettings;

  comorbilidadesU = [];
  /////////////////////////

  ////////////////////////
  pipe = new DatePipe('en-US');
  today = new Date();
  strDate = '';
  start_date: string;
  end_date: string;
  hospital_description: String;

  role_id: number;
  hospital_id: number;
  entity_id: number;
  hidden_controls = true;
  hidden_maximize = true;
  hidden_minimize = false;
  treatment_global: any;
  alert_2: IAlert;
  hidden_update_btn = false;
  staticAlertClosed2 = true;
  progres_spinner_refresh_nash_treatment = true;
  save_enabled_nash = true;///not visible   -    SGO modificado
  save_disabled_nash = false;/////button visible   -  SGO modificado
  //////////////////////VHC
  progres_spinner_refresh_vhc_treatment = true;
  save_enabled_vhc = true;///not visible
  save_disabled_vhc = false;/////button visible

  comboHospital = {} as hospitalsModel;
  status_id = 1;
  //////////////////////////
  settingsExample = tableData.settingsExample;

  title_tab: string;
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


//#region "Combos - Catalogos"

  optionsValues = [
    { name: "Opción 1", value: 1, column_name: "1" },
    { name: "Opción 2", value: 2, column_name: "1" }
  ]
  optionsCOuntries = [
    { name: "México", value: 1 },
    { name: "Estados Unidos", value: 2 }
  ]
  optionsStates = [
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
  listaHipoglucemiantesOrales = [];
  listaClaseAntihipertensivo = [];
  listaClaseEstatina = [];
  listaClaseFibrato = [];


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

  //#endregion


//#region "Arreglos Tratamientos"

  // Tratamiento NASH
  data_nash_ = {} as nashTreatmentData;
  NASHRecord: nashTreatmentModel[] = [];
  NASHRecordEstilo: nashTreatmentModel[] = [];
  NASHRecordEstiloExcel: nashTreatmentModel[] = [];

  NASHRecordCreate: nashTreatmentModel[] = [];
  NASHRecordUpdate: nashTreatmentModel[] = [];

  NASHRecordExcel: nashTreatmentModel[] = [];
  NASHRecordHeader = {} as nashTreatmentModelHeader;

  // Tratamiento VHC
  data_vhc_ = {} as vhcTreatmentData;
  VHCRecord: vhcTreatmentModel[] = [];
  VHCRecordEstilo: vhcTreatmentModel[] = [];
  VHCRecordEstiloExcel: vhcTreatmentModel[] = [];

  VHCRecordCreate: vhcTreatmentModel[] = [];
  VHCRecordUpdate: vhcTreatmentModel[] = [];

  VHCRecordExcel: vhcTreatmentModel[] = [];
  VHCRecordHeader = {} as vhcTreatmentModelHeader;

  create_flag: boolean;
  update_flag: boolean;

  indiceNash: number;

//#endregion



  constructor(
      private router: Router,
      private nashTreatmentService: NashtreatmentService, //REVISAR SERVICIO
      private vhcTreatmentService: VhctreatmentService,
      private hospitalsService: HospitalsService,
      private statesService: EntitiesService,
      private genericCatalogService: GenericCatalogService
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


//#region "Métodos generales"

  getValuesForColumns() {

  }
  editRow() {

  }
  maximizeScreen() {
    this.hidden_controls = true;
    this.hidden_maximize = true;
    this.hidden_minimize = false;
  }
  minimizeScreen() {
    this.hidden_controls = false;
    this.hidden_maximize = false;
    this.hidden_minimize = true;
  }

  getStates() {
    let country_id = 1;
    this.statesService.getStatesByCountry(country_id).subscribe((resp_data_get: any) => {
      console.log("----------States");
      console.log(resp_data_get);
      if (resp_data_get.code == 200) {
        this.statesList = resp_data_get.data;
      }
    });
  }

  //Método para obtener los Hipoglucemiantes orales (1-7) dataCatalogList
  getCatalogosGenericos(param1, param2, param3){

    console.log('Hipoglucemiantes: ' + param1 + ' - ' + param2 + ' - ' + param3);

    // this.genericCatalogService.getDataCatalogGeneric(param1,param2,param3).subscribe((resp_data_get: any) => {
    //   console.log("--- Lista Catalogo Generico ---");
    //   console.log(resp_data_get);
    //   if (resp_data_get.code == 200) {
    //     this.listaHipoglucemiantesOrales = resp_data_get.data;
    //     console.log("Hipoglucemiantes orales: ");
    //     console.log(this.listaHipoglucemiantesOrales);
    //   }
    // });   listaClaseFibrato


    if(param1==4 && param2==1 && param3==3){
      this.listaClaseAntihipertensivo = [
        { description_column: "Calcioantagonista", value_column: 1 },
        { description_column: "Betabloqueador", value_column: 2 },
        { description_column: "Bloqueador Selectivo AT-1", value_column: 3 },
        { description_column: "Bloqueador Selectivo AT-2", value_column: 4 },
        { description_column: "Bloqueador Alfa Adrenergico", value_column: 5 }
      ]
    } else if(param1==4 && param2==1 && param3==4){
        this.listaHipoglucemiantesOrales = [
          { description_column: "Sulfonilureas", value_column: 1 },
          { description_column: "Analogos de Metigldinas", value_column: 2 },
          { description_column: "Biguanidas", value_column: 3 },
          { description_column: "Inhibidor de Alfaglucosilasas", value_column: 4 },
          { description_column: "Glitazonas", value_column: 5 },
          { description_column: "Analogos de Receptores GLP-1", value_column: 6 },
          { description_column: "Inhibidores de SGLT-2", value_column: 7 }
        ]
    } else if(param1==4 && param2==1 && param3==5){
        this.listaClaseEstatina = [
          { description_column: "Atorvastatina", value_column: 1 },
          { description_column: "Fluvastatina", value_column: 2 },
          { description_column: "Lovastatina", value_column: 3 },
          { description_column: "Pravastatina", value_column: 4 },
          { description_column: "Simvastatina", value_column: 5 }
        ]
    } else if(param1==4 && param2==1 && param3==6){
      this.listaClaseFibrato = [
        { description_column: "Gemfibrozilo", value_column: 1 },
        { description_column: "Fenofibrato", value_column: 2 },
        { description_column: "Clofibrate", value_column: 3 }
      ]
    }




  }


  exportCSVFile(headers, items, fileTitle) {
    console.log("--------------headers");
    console.log(headers);
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON

    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.xlsx' || 'export.xlsx';

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

  changeHospital() {
    console.log("Hospital id " + this.comboHospital.hospital_id);
    if (this.comboHospital.hospital_id == 0) {
      this.hospital_description = "Todos los hospitales";
    } else {
      this.hospital_description = this.comboHospital.hospital_name;
    }
    this.serchByHospitalIDAndDate();
  }

  selected_hospital = 0;

  getHospitalsListApi(entity_id) {
    console.log("Get hospitals... ");
    this.hospitalsService.getHospitalsList(this.role_id, entity_id).subscribe((res_data: any) => {
      if (res_data.code == 200) {


        this.optionsHospitalsSelected = res_data.data;
        this.optionsHospitals = this.optionsHospitalsSelected;

        if (res_data.data.length > 1) {
          const dato = {} as hospitalsModel;
          dato.hospital_id = 0;
          dato.hospital_name = 'Todos';
          this.optionsHospitals.unshift(dato);
          this.comboHospital = dato;
        } else {
          //<<<<<<< HEAD
          let hosp = res_data.data;/*.map((r)=>{
          const dato = {} as hospitalsModel;
          dato.hospital_id = r.hospital_id;
          dato.hospital_name = r.hospital_name;
          return dato;
        });*/
          console.log(hosp);
          this.optionsHospitals = hosp;
          console.log(this.optionsHospitals);
          // this.selected_hospital = this.optionsHospitals[0].hospital_id;
          this.comboHospital = this.optionsHospitals[0];

          this.changeHospital();
          //=======
          //      this.comboHospital = hosp[0];
          //>>>>>>> 3c823d24a38d39f4cdadc423b6bff1f7b45b6360
        }

      } else {

      }
    });
  }

  getHospitalsList(entity_id) {
    console.log("Id de entidad " + entity_id);
    if (entity_id == 1) {
      this.optionsHospitals = this.optionsHospitalesPEMEX;
    } else if (entity_id == 2) {
      this.optionsHospitals = this.optionsHospitalesIMSS;
    } else if (entity_id == 3) {
      this.optionsHospitals = this.optionsHospitalesISSSTE;
    } else if (entity_id == 4) {
      this.optionsHospitals = this.optionsHospitalesSEDENA;
    } else if (entity_id == 5) {
      this.optionsHospitals = this.optionsHospitalesSSA;
    } else if (entity_id == 6) {
      this.optionsHospitals = this.optionsHospitalesISSEMYM;
    } else if (entity_id == 7) {
      this.optionsHospitals = this.optionsHospitalesISSSTEP;
    } else if (entity_id == 8) {
      this.optionsHospitals = this.optionsHospitalesPRIVADAS;
    } else if (entity_id == 9) {
      this.optionsHospitals = this.optionsHospitalesGuadalajara;
    }

  }

  /////////////////////Searcher
  serchByHospitalIDAndDate() {
    if (localStorage.getItem('treatment_type') == '4') {
      this.getNASHData();
    } else if (localStorage.getItem('treatment_type') == '5') {

    } else if (localStorage.getItem('treatment_type') == '6') {

    } else if (localStorage.getItem('treatment_type') == '7') {
      //console.log("buscando vhc ");
      this.getVHCData();
    } else if (localStorage.getItem('treatment_type') == '8') {

    }
  }

  //////////////////////////////////MULTISELECT
  onItemDeSelect(deselectedSID: any): void {
    //   this.selectedComboRutasU = this.selectedComboRutasU.filter(
    //   s => s != deselectedSID
    //  );

    // this.selectedComboRutasU.forEach(sid => {
    // this.onItemSelect(sid);
    //      this.selectedComboRutasU.splice(sid.route_id);
    //     this.notificationData = [];
    // });

    //  console.log(this.selectedComboRutasU);
  }

  onDeSelectAll(items: any) {
    console.log("Deselect all");
    //console.log(items); // items is an empty array
    // console.log( this.selectedComboRutasU);
    // this.notificationData=[];
  }

  onItemSelect(item: any) {
    console.log("Item length " + JSON.stringify(item));
    // this.selectedComboRutasU.concat(item);

    console.log("On item select...");
    //console.log( this.selectedComboRutasU);
    //this.notificationData=[];
  }

  onSelectAll(items: any) {
    console.log("Select all");
    // this.notificationData=[];
  }

  regresar() {
    console.log("back page");
    this.router.navigate(['/treatments-types']);
  }

  reset() {
    setTimeout(() => (this.staticAlertClosed2 = true), 2000);
  }

  regexValidation(str) {
    //str = "2021-12-21";
    //console.log(">>> " + str);
    let er = new RegExp('((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])');
    //console.log(str.match(er));
    if (str.match(er) != null) {
      return "OK."
      //console.log("--> Ok.");
    } else {
      //console.log("--> Error en fecha");
      return "ERROR.";
    }

  }


  concatenateComorbilidades(lista) {
    console.log(lista.split(","));
    let d_ = [];
    let d = lista.split(",");
    return d_;
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });   //({block: "end", behavior: "smooth"});
  }


//#endregion



  date_: any;
  ngOnInit() {
    this.getStates();
    this.strDate = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.date_ = new Date(this.today.getFullYear(), -12, 0);
    this.start_date = this.pipe.transform(this.date_, 'yyyy-MM-dd');
    this.end_date = this.strDate;
    //console.log("date " + this.strDate);
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

    //NASH
    if (localStorage.getItem('treatment_type') == '4') {
      this.indiceNash = 0; //Verificar para que se inicializa esta variable
      this.getCatalogosGenericos(4,1,4);
      this.getCatalogosGenericos(4,1,3);
      this.getCatalogosGenericos(4,1,5);
      this.getCatalogosGenericos(4,1,6);
      this.getNASHData();
      ////////////load data
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'comorbilidades',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

      this.nashTableVisible = false; //estaba en true la asigno a false dando seguimiento al tratamiento de vhc que se encuentra en false SGO
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true; //estaba en false la asigno a true
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '5') {
      this.nashTableVisible = true;
      this.ashTableVisible = false;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '6') {
      this.nashTableVisible = true; //estaba en true la asigno a false dando seguimiento al tratamiento de vhc que se encuentra en false SGO
      this.ashTableVisible = true;
      this.vhbTableVisible = false;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    //VHC
    if (localStorage.getItem('treatment_type') == '7') {
      this.indiceNash = 0;
      this.getVHCData();
      ////////////load data
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'comorbilidades',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
      this.comorbilidadesU = [
        { comorbilidades: 1, description: "1 DM" },
        { comorbilidades: 2, description: "2 HTA" },
        { comorbilidades: 3, description: "3 Obesidad" },
        { comorbilidades: 4, description: "4 Hipertiroidismo" },
        { comorbilidades: 5, description: "5 Sindrome metabolico" },
        { comorbilidades: 6, description: "6 Cardiopatia" },
        { comorbilidades: 7, description: "7 IRC en dialisis" },
        { comorbilidades: 8, description: "8 IRC en hemodilaisis" },
        { comorbilidades: 9, description: "9 IRC sin tx sustiututivo" },
        { comorbilidades: 10, description: "10 hipotiroidismo" },
        { comorbilidades: 11, description: "11 dislipidemia" },
        { comorbilidades: 12, description: "12 VIH" },
        { comorbilidades: 13, description: "13  Trasplante hepatico" },
        { comorbilidades: 14, description: "14 Trasplante renal" },
      ];
      this.nashTableVisible = true;  //estaba eb false la asigno a true
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = false;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '1') {
      this.nashTableVisible = true;
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = false;
      this.hccTableVisible = true;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '2') {
      this.nashTableVisible = true;
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = false;
      this.alfTableVisible = true;
    }
    if (localStorage.getItem('treatment_type') == '3') {
      this.nashTableVisible = true;
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.alfTableVisible = false;
    }
    if (localStorage.getItem('treatment_type') == '8') {
      this.nashTableVisible = true;
      this.ashTableVisible = true;
      this.vhbTableVisible = true;
      this.vhcTableVisible = true;
      this.haiTableVisible = true;
      this.hccTableVisible = true;
      this.tohTableVisible = false;
    }

    this.title_entity = localStorage.getItem("entidad_name");
    this.changeHospital();
  }


//#region "Tratamiento VHC"

  //VHC 1 sgo
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

  //VHC 2 sgo
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

  //VHC 3 sgo
  exportExcelVHC() {
    this.createHeaderVHC();
    this.exportCSVFileVHC(this.VHCRecordHeader, this.VHCRecordExcel, "VHC Treatment");
  }

  //VHC 4 sgo
  createHeaderVHC() {
    this.VHCRecordHeader = {} as vhcTreatmentModelHeader;
    const vhcData = {} as vhcTreatmentModelHeader;
    //vhcData.date_begin = "Fecha de inicio";
    //vhcData.date_end = "Fecha Fin";
    //vhcData.research_vhc_id = "ID";
    //vhcData.month_execution = "Mes de ejecución";
    vhcData.expediente_id = "REGISTRO/EXPEDIENTE";//relacionar iniciales
    vhcData.research_vhc_id = "INICIALES";//relacionar iniciales
    vhcData.birthdate = "F. DE NACIMIENTO";
    vhcData.age = "EDAD";
    vhcData.gender = "GENERO";
    vhcData.state = "ESTADO DE LA REPUBLICA";
    vhcData.year = "A. DE DX DE VHC";
    vhcData.transmission_mechanism = "MECANISMO DE TRANSMISION";
    vhcData.dm = "DM";
    vhcData.hta = "HTA";
    vhcData.obesidad = "OBESIDAD";
    vhcData.hipertiroidismo = "HIPERTIROIDISMO";
    vhcData.sindrome_metabolico = "SINDROME METABOLICO";
    vhcData.cardiopatia_isquemica = "CARDIOPATIA ISQUEMICA";
    vhcData.irc_dialisis = "IRC EN DIALISIS";
    vhcData.irc_hemodilaisis = "IRC EN HEMODIALISIS";
    vhcData.irc_sin_tx_sustiututivo = "IRC SIN TX SUSTITUTIVO";
    vhcData.hipotiroidismo = "HIPOTIROIDISMO";
    vhcData.dislipidemia = "DISLIPIDEMIA";
    vhcData.vih = "VIH";
    vhcData.trasplante_hepatico = "TRASPLANTE HEPATICO";
    vhcData.trasplante_renal = "TRASPLANTE RENAL";
    vhcData.sobre_peso = "SOBRE PESO";
    vhcData.hepatitis_b = "HEPATITIS B";
    vhcData.trastorno_consumo_alcohol = "TRASTORNO POR CONSUMO DE ALCOHOL";

    vhcData.manif_extrahepaticas = "MANIFESTACIONES EXTRAHEPATICAS";

    vhcData.fibroscan_sw_basal = "FIBROSCAN/SW BASAL (kPa)";
    vhcData.apri_basal = "APRI BASAL";
    vhcData.fib4_basal = "FIB-4 BASAL";

    vhcData.grado_fibrosis_hepatica = "GRADO DE FIBROSIS HEPATICA";
    vhcData.cirrosis = "CIRROSIS";
    vhcData.estado_cirrosis_compensada = "ESTADO DE CIRROSIS COMPENSADA O DESCOMPENSADA";

    vhcData.varices_esofagicas = "VARICES ESOFAGICAS";
    vhcData.hemorragia_variceal = "HEMORRAGIA VARICEAL";
    vhcData.ascitis = "ASCITIS";
    vhcData.encefalopatia = "ENCEFALOPATIA";
    vhcData.sindrome_hepatorenal = "SINDROME HEPATORENAL";
    vhcData.hepatocarcinoma = "HEPATOCARCINOMA";
    //vhcData.cirrosis_descompensada = "CIRROSIS DESCOMPENSADA";

    vhcData.child_inicial = "ESTADIO CHILD INICIAL (PUNTAJE)";
    vhcData.meld_inicial = "MELD (INICIAL)";
    vhcData.cv_inicial = "CV INICIAL";
    vhcData.genotipo = "GENOTIPO";
    vhcData.tipo_tx_previo = "TIPO DE TX PREVIO";
    //vhcData.esofagicas = "V. ESOFAGICAS";
    //vhcData.estado_inicial= "ESTADO INICIAL";
    vhcData.year_inicio_tx_add = "A. DE INICIO DE TX DE ADD";
    vhcData.esquema_tratamiento = "ESQUEMA DE TRATAMIENTO";
    vhcData.tiempo_tratamiento_meses = "TIEMPO DE TRATAMIENTO EN MESES";
    vhcData.rvs = "RVS";

    vhcData.funcion_renal = "FUNCION RENAL (FILTRACION GLOMERULAR) PRETRATAMIENTO";
    vhcData.funcion_renal_post = "FUNCTION RENAL (FILTRACION GLOMERULAR) POSTRATAMIENTO";
    vhcData.hb_inicial = "HB BASAL";
    vhcData.hb_final = "HB FINAL";
    vhcData.leucocitos_inicial = "LEUCOCITOS BASAL";
    vhcData.leucocitos_final = "LEUCOCITOS FINAL";
    vhcData.plaquetas_inicial = "PLAQUETAS BASAL";
    vhcData.plaquetas_final = "PLAQUETAS FINAL";
    vhcData.glucosa_inicial = "GLUCOSA BASAL";
    vhcData.glucosa_final = "GLUCOSA FINAL";
    vhcData.creatinina_inicial = "CREATININA BASAL";
    vhcData.creatinina_final = "CREATININA FINAL";
    vhcData.tgo_inicial = "TGO BASAL";
    vhcData.tgo_final = "TGO FINAL";
    vhcData.tgp_inicial = "TGP BASAL";
    vhcData.tgp_final = "TGP FINAL";
    vhcData.alumina_inicial = "ALBUMINA BASAL";
    vhcData.alumina_final = "ALBUMINA FINAL";
    vhcData.inr_inicial = "INR BASAL";
    vhcData.inr_final = "INR FINAL";
    vhcData.bt_inicial = "BT BASAL";
    vhcData.bt_final = "BT FINAL";
    vhcData.efecto_adverso = "EFECTO ADVERSO";
    vhcData.descripcion_adverso = "CUAL/DESCRIBIR";
    vhcData.accion_tomada = "ACCION TOMADA";
    vhcData.child_final = "CHILD-PUGH FINAL";
    vhcData.meld_final = "MELD FINAL";
    vhcData.apri_final = "APRI FINAL";
    vhcData.fib4_final = "FIB-4 FINAL";
    vhcData.fibroscan_sw_final = "FIBROSCAN/SW FINAL (kPa)";
    ///vhcData.creation_user_id = ;
    //vhcData.creation_user_name = ;
    //vhcData.creation_date = "Fecha de registro";
    //vhcData.creation_time = "Hora de registro";
    //vhcData.modification_user_name = r.modification_user_name;
    //vhcData.modification_date = r.modification_date;
    //vhcData.modification_time = r.modification_time;
    //vhcData.status = r.status;
    this.VHCRecordHeader = vhcData;
  }

  //VHC 5 sgo
  getExcelDataVHC(vhcData: vhcTreatmentModel) {
    const vhcDataExcel = {} as vhcTreatmentModel;
    vhcDataExcel.expediente_id = vhcData.expediente_id == null ? "" : vhcData.expediente_id;
    vhcDataExcel.research_vhc_id = vhcData.research_vhc_id;//relacionar iniciales
    let birt_D = "";
    if (vhcData.birthdate != null) {
      birt_D = vhcData.birthdate;
    }
    vhcDataExcel.birthdate = birt_D;
    vhcDataExcel.age = vhcData.age == null ? 0 : vhcData.age; //Edad
    vhcDataExcel.gender = vhcData.gender == null ? 0 : vhcData.gender;//Género
    vhcDataExcel.state = vhcData.state == null ? 0 : vhcData.state;//estado de la republica
    vhcDataExcel.year = vhcData.year == null ? 0 : vhcData.year;//Año de dx de vhc
    vhcDataExcel.transmission_mechanism = vhcData.transmission_mechanism == null ? 0 : vhcData.transmission_mechanism; //mecanismo de trasmision
    //vhcDataExcel.comorbilidades = vhcData.comorbilidades==null ? 0: vhcData.comorbilidades;//Comorbilidades
    vhcDataExcel.dm = vhcData.dm == null ? 0 : vhcData.dm;
    vhcDataExcel.hta = vhcData.hta == null ? 0 : vhcData.hta;
    vhcDataExcel.obesidad = vhcData.obesidad == null ? 0 : vhcData.obesidad;
    vhcDataExcel.hipertiroidismo = vhcData.hipertiroidismo == null ? 0 : vhcData.hipertiroidismo;
    vhcDataExcel.sindrome_metabolico = vhcData.sindrome_metabolico == null ? 0 : vhcData.sindrome_metabolico;
    vhcDataExcel.cardiopatia_isquemica = vhcData.cardiopatia_isquemica == null ? 0 : vhcData.cardiopatia_isquemica;
    vhcDataExcel.irc_dialisis = vhcData.irc_dialisis == null ? 0 : vhcData.irc_dialisis;
    vhcDataExcel.irc_hemodilaisis = vhcData.irc_hemodilaisis == null ? 0 : vhcData.irc_hemodilaisis;
    vhcDataExcel.irc_sin_tx_sustiututivo = vhcData.irc_sin_tx_sustiututivo == null ? 0 : vhcData.irc_sin_tx_sustiututivo;
    vhcDataExcel.hipotiroidismo = vhcData.hipotiroidismo == null ? 0 : vhcData.hipotiroidismo;
    vhcDataExcel.dislipidemia = vhcData.dislipidemia == null ? 0 : vhcData.dislipidemia;
    vhcDataExcel.vih = vhcData.vih == null ? 0 : vhcData.vih;
    vhcDataExcel.trasplante_hepatico = vhcData.trasplante_hepatico == null ? 0 : vhcData.trasplante_hepatico;
    vhcDataExcel.trasplante_renal = vhcData.trasplante_renal == null ? 0 : vhcData.trasplante_renal;
    vhcDataExcel.sobre_peso = vhcData.sobre_peso == null ? 0 : vhcData.sobre_peso;
    vhcDataExcel.hepatitis_b = vhcData.hepatitis_b == null ? 0 : vhcData.hepatitis_b;
    vhcDataExcel.trastorno_consumo_alcohol = vhcData.trastorno_consumo_alcohol == null ? 0 : vhcData.trastorno_consumo_alcohol;

    vhcDataExcel.manif_extrahepaticas = vhcData.manif_extrahepaticas == null ? 0 : vhcData.manif_extrahepaticas;//manifesaciones extrahepaticas
    vhcDataExcel.fibroscan_sw_basal = vhcData.fibroscan_sw_basal == null ? 0 : vhcData.fibroscan_sw_basal;
    vhcDataExcel.apri_basal = vhcData.apri_basal == null ? 0 : vhcData.apri_basal;
    vhcDataExcel.fib4_final = vhcData.fib4_final == null ? 0 : vhcData.fib4_final;
    vhcDataExcel.grado_fibrosis_hepatica = vhcData.grado_fibrosis_hepatica == null ? 0 : vhcData.grado_fibrosis_hepatica;//grado de fibrosis hepatica
    vhcDataExcel.cirrosis = vhcData.cirrosis == null ? 0 : vhcData.cirrosis;//Cirrosis (Si o No)
    vhcDataExcel.estado_cirrosis_compensada = vhcData.estado_cirrosis_compensada == null ? 0 : vhcData.estado_cirrosis_compensada;//Estado de la cirrosis compensada o descompensadabgt5-

    vhcDataExcel.varices_esofagicas = vhcData.varices_esofagicas == null ? 0 : vhcData.varices_esofagicas;
    vhcDataExcel.hemorragia_variceal = vhcData.hemorragia_variceal == null ? 0 : vhcData.hemorragia_variceal;
    vhcDataExcel.ascitis = vhcData.ascitis == null ? 0 : vhcData.ascitis;
    vhcDataExcel.encefalopatia = vhcData.encefalopatia == null ? 0 : vhcData.encefalopatia;
    vhcDataExcel.sindrome_hepatorenal = vhcData.sindrome_hepatorenal == null ? 0 : vhcData.sindrome_hepatorenal;
    vhcDataExcel.hepatocarcinoma = vhcData.hepatocarcinoma == null ? 0 : vhcData.hepatocarcinoma;
    //vhcDataExcel.cirrosis_descompensada = vhcData.cirrosis_descompensada == null ?0: vhcData.cirrosis_descompensada;//Cirrosis Descompensada
    vhcDataExcel.child_inicial = vhcData.child_inicial == null ? 0 : vhcData.child_inicial;//Estadio Child Inicial(Puntaje)
    vhcDataExcel.meld_inicial = vhcData.meld_inicial == null ? 0 : vhcData.meld_inicial;//MELD ( Inicial)
    //vhcDataExcel.esofagicas = vhcData.esofagicas==null? 0: vhcData.esofagicas;//V. Esofágicas (Si o No)
    //vhcDataExcel.estado_inicial = vhcData.estado_inicial==null ? 0: vhcData.estado_inicial;//Estado inicial
    vhcDataExcel.cv_inicial = vhcData.cv_inicial == null ? 0 : vhcData.cv_inicial;//CV Inicial
    vhcDataExcel.genotipo = vhcData.genotipo == null ? 0 : vhcData.genotipo;//Log Inicial

    vhcDataExcel.tipo_tx_previo = vhcData.tipo_tx_previo == null ? 0 : vhcData.tipo_tx_previo;//Tipo de tx previo
    vhcDataExcel.year_inicio_tx_add = vhcData.year_inicio_tx_add == null ? 0 : vhcData.year_inicio_tx_add;//Año de Inicio de tx de ADD
    vhcDataExcel.esquema_tratamiento = vhcData.esquema_tratamiento == null ? 0 : vhcData.esquema_tratamiento;//Esquema de-tratamientot5
    vhcDataExcel.tiempo_tratamiento_meses = vhcData.tiempo_tratamiento_meses == null ? 0 : vhcData.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
    vhcDataExcel.rvs = vhcData.rvs == null ? 0 : vhcData.rvs;//RVS (si o no)

    //vhcDataExcel.cv_rvs12 = vhcData.cv_rvs12==null ? 0: vhcData.cv_rvs12;//CV RVS12
    //vhcDataExcel.log_rvs12 = vhcData.log_rvs12 == null? 0: vhcData.log_rvs12;//Log RVS 12
    vhcDataExcel.funcion_renal = vhcData.funcion_renal == null ? 0 : vhcData.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
    vhcDataExcel.funcion_renal_post = vhcData.funcion_renal_post == null ? 0 : vhcData.funcion_renal_post;//Funcion renal (filtracion glomerular) pretratameinto

    vhcDataExcel.hb_inicial = vhcData.hb_inicial == null ? 0 : vhcData.hb_inicial;//HB Inicial
    vhcDataExcel.hb_final = vhcData.hb_final == null ? 0 : vhcData.hb_final;//Hb final
    vhcDataExcel.leucocitos_inicial = vhcData.leucocitos_inicial == null ? 0 : vhcData.leucocitos_inicial;//leucocios inicial
    vhcDataExcel.leucocitos_final = vhcData.leucocitos_final == null ? 0 : vhcData.leucocitos_final;//leucocitos final
    vhcDataExcel.plaquetas_inicial = vhcData.plaquetas_inicial == null ? 0 : vhcData.plaquetas_inicial;//Plaq Inicial
    vhcDataExcel.plaquetas_final = vhcData.plaquetas_final == null ? 0 : vhcData.plaquetas_final;//Plaq Final
    vhcDataExcel.glucosa_inicial = vhcData.glucosa_inicial == null ? 0 : vhcData.glucosa_inicial;//glucosa inicial
    vhcDataExcel.glucosa_final = vhcData.glucosa_final == null ? 0 : vhcData.glucosa_final;//glucosa final
    vhcDataExcel.creatinina_inicial = vhcData.creatinina_inicial == null ? 0 : vhcData.creatinina_inicial;//creatinia inicial
    vhcDataExcel.creatinina_final = vhcData.creatinina_final == null ? 0 : vhcData.creatinina_final;//Creatinina final
    vhcDataExcel.tgo_inicial = vhcData.tgo_inicial == null ? 0 : vhcData.tgo_inicial;//TGO Inicial
    vhcDataExcel.tgo_final = vhcData.tgo_final == null ? 0 : vhcData.tgo_final;//TGO Final
    vhcDataExcel.tgp_inicial = vhcData.tgp_inicial == null ? 0 : vhcData.tgp_inicial;//TGP Inicial
    vhcDataExcel.tgp_final = vhcData.tgp_final == null ? 0 : vhcData.tgp_final;//TGP Final
    vhcDataExcel.alumina_inicial = vhcData.alumina_inicial == null ? 0 : vhcData.alumina_inicial;//alumina inicial
    vhcDataExcel.alumina_final = vhcData.alumina_final == null ? 0 : vhcData.alumina_final;//albumina final
    vhcDataExcel.inr_inicial = vhcData.inr_inicial == null ? 0 : vhcData.inr_inicial;//INR Inicial
    vhcDataExcel.inr_final = vhcData.inr_final == null ? 0 : vhcData.inr_final;  //INR Final
    vhcDataExcel.bt_inicial = vhcData.bt_inicial == null ? 0 : vhcData.bt_inicial;//BT inicial
    vhcDataExcel.bt_final = vhcData.bt_final == null ? 0 : vhcData.bt_final;//BT final
    vhcDataExcel.efecto_adverso = vhcData.efecto_adverso == null ? 0 : vhcData.efecto_adverso;//Efecto Adverso Si/No
    vhcDataExcel.descripcion_adverso = vhcData.descripcion_adverso == null ? 0 : vhcData.descripcion_adverso;//Cual/describir
    vhcDataExcel.accion_tomada = vhcData.accion_tomada == null ? 0 : vhcData.accion_tomada;//Acción Tomada
    vhcDataExcel.child_final = vhcData.child_final == null ? 0 : vhcData.child_final;//Child Final
    vhcDataExcel.meld_final = vhcData.meld_final == null ? 0 : vhcData.meld_final;//MELD finall
    vhcDataExcel.apri_final = vhcData.apri_final == null ? 0 : vhcData.apri_final;//
    vhcDataExcel.fib4_final = vhcData.fib4_final == null ? 0 : vhcData.fib4_final;//
    vhcDataExcel.fibroscan_sw_final = vhcData.fibroscan_sw_final == null ? 0 : vhcData.fibroscan_sw_final;//

    return vhcDataExcel;
  }

  //VHC 6 sgo
  guardarRegistroVHC() {

    // this.minimizeScreen();
    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn = true;

    if (this.create_flag) {
      console.log("Guardando...");
      this.data_vhc_.data = this.VHCRecordCreate.filter(function (e1) {
        return e1 != null;
      });
      this.vhcTreatmentService.saveVHCTreatment(this.data_vhc_).subscribe((resp_data: any) => {
        if (resp_data.http_code == null) {
          if (resp_data.code == 200) {
            this.VHCRecord = [];
            this.VHCRecordCreate = [];
            this.create_flag = false;
            this.progres_spinner_refresh_vhc_treatment = true;

            this.getVHCData();

            this.staticAlertClosed2 = false;
            this.alert_2.type = 'success';
            this.alert_2.message = 'Datos guardados correctamente.';
            this.reset();
            this.hidden_update_btn = false;
            console.log("Disable button for save...");
            this.save_disabled_vhc = false;
            this.save_enabled_vhc = true;
          } else {
            this.staticAlertClosed2 = false;
            this.alert_2.type = 'danger';
            this.alert_2.message = 'No se pudo guardar la información, intente nuevamente.';
            this.reset();
            this.progres_spinner_refresh_vhc_treatment = true;
            this.hidden_update_btn = false;

            this.save_disabled_vhc = false;
            this.save_enabled_vhc = true;
          }
        } else {
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'Hubo un error al intentar guardar la información.';
          this.reset();
          this.progres_spinner_refresh_vhc_treatment = true;
          this.hidden_update_btn = false;
        }
      }, err => {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar guardar la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn = false;
      });
    }
    if (this.update_flag) {

      this.data_vhc_.data = this.VHCRecordUpdate.filter(function (e1) {
        return e1 != null;
      });

      this.vhcTreatmentService.updateVHCTreatment(this.data_vhc_).subscribe((resp_data: any) => {
        console.log(resp_data);

        if (resp_data.code == 200) {
          this.VHCRecord = [];
          this.VHCRecordUpdate = [];
          this.update_flag = false;
          this.progres_spinner_refresh_vhc_treatment = true;
          this.getVHCData();
          this.hidden_update_btn = false;

          this.staticAlertClosed2 = false;
          this.alert_2.type = 'success';
          this.alert_2.message = 'Datos actualizados correctamente.';
          this.reset();

          this.save_disabled_vhc = false;
          this.save_enabled_vhc = true;
        } else {
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'Hubo un error al actualizar la información.';
          this.reset();
          this.progres_spinner_refresh_vhc_treatment = true;
          this.hidden_update_btn = false;
        }
      }, err => {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar actualizar la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn = false;
      });
    }
  }

  //VHC 7 sgo
  agregarNuevoRegistroVHC(event) {
    //this.regexValidation("2019-02-02");
    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn = true;
    //this.indiceNash = (Number(this.indiceNash) + 1);
    const vhcData = {} as vhcTreatmentModel;
    this.date_ = new Date(this.today.getFullYear(), -12, 0);
    //this.start_date = this.pipe.transform(this.date_, 'yyyy-MM-dd');
    //this.strDate = this.pipe.transform(this.date_, 'yyyy-MM-dd');//this.pipe.transform(this.today, 'yyyy-MM-dd');

    this.start_date;// = this.strDate;
    this.end_date;// = this.strDate;

    if (this.comboHospital.hospital_id == 0) {
      this.minimizeScreen();
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'warning';
      this.alert_2.message = 'Debe seleccionar un hospital';
      this.reset();
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn = false;

    } else {
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
      vhcData.checkbox_value = true;
      vhcData.disable_checkbox = true;
      this.VHCRecord.push(vhcData);
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn = false;
      this.save_disabled_vhc = true;
      this.save_enabled_vhc = false;
    }
    this.scroll('body-table');
  }

  message_notification = "";

  //VHC 8 sgo
  updateRecordVHC(id, column_name, treatment, i) {
    ///DATE VALIDATION
    if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

    } else {
      if (this.regexValidation(treatment.birthdate) == "OK.") {
        //   vhcData.birthdate = treatment.birthdate;
        console.log("Fecha de Nacimiento correcta.");
        this.save_disabled_vhc = true;
        this.save_enabled_vhc = false;
        this.message_notification = "";
        treatment.style_input_date = "control-date-ok";

        let element = document.getElementById("gender");


        if (id != null) {

          this.update_flag = true;
          const vhcData = {} as vhcTreatmentModel;

          vhcData.MD_hospital_id = treatment.MD_hospital_id;
          vhcData.MD_entity_id = this.entity_id;
          vhcData.research_vhc_id = id;

          vhcData.month_execution = treatment.month_execution;
          vhcData.initials = treatment.initials;

          vhcData.expediente_id = treatment.expediente_id; //Expediente id

          vhcData.age = treatment.age; //Edad
          vhcData.gender = treatment.gender;//Género
          vhcData.state = treatment.state;//estado de la republica
          vhcData.year = treatment.year;//Año de dx de vhc
          vhcData.transmission_mechanism = treatment.transmission_mechanism; //mecanismo de trasmision
          //vhcData.comorbilidades = treatment.comorbilidades;//Comorbilidades
          //////////////////COMORBILIDADES
          vhcData.dm = treatment.dm;
          vhcData.hta = treatment.hta;
          vhcData.obesidad = treatment.obesidad;
          vhcData.hipertiroidismo = treatment.hipertiroidismo;
          vhcData.sindrome_metabolico = treatment.sindrome_metabolico;
          vhcData.cardiopatia_isquemica = treatment.cardiopatia_isquemica
          vhcData.irc_dialisis = treatment.irc_dialisis;
          vhcData.irc_hemodilaisis = treatment.irc_hemodilaisis;
          vhcData.irc_sin_tx_sustiututivo = treatment.irc_sin_tx_sustiututivo;
          vhcData.hipotiroidismo = treatment.hipotiroidismo;
          vhcData.dislipidemia = treatment.dislipidemia;
          vhcData.vih = treatment.vih;
          vhcData.trasplante_hepatico = treatment.trasplante_hepatico;
          vhcData.trasplante_renal = treatment.trasplante_renal;
          vhcData.sobre_peso = treatment.sobre_peso;
          vhcData.hepatitis_b = treatment.hepatitis_b;
          vhcData.trastorno_consumo_alcohol = treatment.trastorno_consumo_alcohol;
          ///////////////////////////////COM
          vhcData.manif_extrahepaticas = treatment.manif_extrahepaticas;//manifesaciones extrahepaticas

          vhcData.fibroscan_sw_basal = treatment.fibroscan_sw_basal == "" ? -101010101010.0 : treatment.fibroscan_sw_basal;
          vhcData.apri_basal = treatment.apri_basal;
          vhcData.fib4_basal = treatment.fib4_basal;
          vhcData.grado_fibrosis_hepatica = treatment.grado_fibrosis_hepatica;//grado de fibrosis hepatica
          vhcData.cirrosis = treatment.cirrosis;//Cirrosis (Si o No)
          vhcData.estado_cirrosis_compensada = treatment.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-

          vhcData.varices_esofagicas = treatment.varices_esofagicas;
          vhcData.hemorragia_variceal = treatment.hemorragia_variceal;
          vhcData.ascitis = treatment.ascitis;
          vhcData.encefalopatia = treatment.encefalopatia;
          vhcData.sindrome_hepatorenal = treatment.sindrome_hepatorenal;
          vhcData.hepatocarcinoma = treatment.hepatocarcinoma;
          vhcData.child_inicial = treatment.child_inicial;//Estadio Child Inicial(Puntaje)
          vhcData.meld_inicial = treatment.meld_inicial;//MELD ( Inicial)
          vhcData.cv_inicial = treatment.cv_inicial;//CV Inicial
          vhcData.genotipo = treatment.genotipo;//genotipo
          vhcData.tipo_tx_previo = treatment.tipo_tx_previo;//Tipo de tx previo
          vhcData.year_inicio_tx_add = treatment.year_inicio_tx_add;//Año de Inicio de tx de ADD
          //vhcData.cirrosis_descompensada = treatment.cirrosis_descompensada;//Cirrosis Descompensada
          //vhcData.esofagicas = treatment.esofagicas;//V. Esofágicas (Si o No)
          //vhcData.estado_inicial = treatment.estado_inicial;//Estado inicial

          vhcData.esquema_tratamiento = treatment.esquema_tratamiento;//Esquema de-tratamientot5
          vhcData.tiempo_tratamiento_meses = treatment.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
          vhcData.rvs = treatment.rvs;//RVS (si o no)

          //vhcData.cv_rvs12 = treatment.cv_rvs12;//CV RVS12
          //vhcData.log_rvs12 = treatment.log_rvs12;//Log RVS 12
          vhcData.funcion_renal = treatment.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
          vhcData.funcion_renal_post = treatment.funcion_renal_post;
          vhcData.hb_inicial = treatment.hb_inicial;//HB Inicial
          vhcData.hb_final = treatment.hb_final;//Hb final
          vhcData.leucocitos_inicial = treatment.leucocitos_inicial;//leucocios inicial
          vhcData.leucocitos_final = treatment.leucocitos_final;//leucocitos final
          vhcData.plaquetas_inicial = treatment.plaquetas_inicial;//Plaq Inicial
          vhcData.plaquetas_final = treatment.plaquetas_final;//Plaq Final
          vhcData.glucosa_inicial = treatment.glucosa_inicial;//glucosa_inicial
          vhcData.glucosa_final = treatment.glucosa_final; //glucosa_final
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

          vhcData.apri_final = treatment.apri_final;
          vhcData.fib4_final = treatment.fib4_final;
          vhcData.fibroscan_sw_final = treatment.fibroscan_sw_final == "" ? -101010101010.0 : treatment.fibroscan_sw_final;

          //vhcData.comentarios = treatment.comentarios;//Comentarios
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

          // console.log("Color: " + vhcData.row_color);
          this.VHCRecordUpdate[id] = vhcData;
          //
          //this.NASHRecord[i] = vhcData;
          treatment.row_color = vhcData.row_color;
          //console.log(this.NASHRecord[i]);
          //console.log(this.NASHRecordUpdate);
          //console.log("Actualizando.." + id + " " + column_name);
          if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

          } else {
            if (this.regexValidation(treatment.birthdate) == "OK.") {
              vhcData.birthdate = treatment.birthdate;
              //console.log("Fecha correcta.");
              this.save_disabled_vhc = true;
              this.save_enabled_vhc = false;
            } else {
              //console.log("Error en formato de la Fecha de Nacimiento.");
            }
          }

        } else {
          this.create_flag = true;
          const vhcData = {} as vhcTreatmentModel;

          vhcData.month_execution = treatment.month_execution;
          vhcData.initials = treatment.initials;

          vhcData.expediente_id = treatment.expediente_id; //Expediente id
          if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

          } else {
            vhcData.birthdate = treatment.birthdate;
          }

          vhcData.age = treatment.age; //Edad
          vhcData.gender = treatment.gender;//Género
          vhcData.state = treatment.state;//estado de la republica
          vhcData.year = treatment.year;//Año de dx de vhc
          vhcData.transmission_mechanism = treatment.transmission_mechanism; //mecanismo de trasmision
          //vhcData.comorbilidades = treatment.comorbilidades;//Comorbilidades
          //////////////////COMORBILIDADES
          vhcData.dm = treatment.dm;
          vhcData.hta = treatment.hta;
          vhcData.obesidad = treatment.obesidad;
          vhcData.hipertiroidismo = treatment.hipertiroidismo;
          vhcData.sindrome_metabolico = treatment.sindrome_metabolico;
          vhcData.cardiopatia_isquemica = treatment.cardiopatia_isquemica
          vhcData.irc_dialisis = treatment.irc_dialisis;
          vhcData.irc_hemodilaisis = treatment.irc_hemodilaisis;
          vhcData.irc_sin_tx_sustiututivo = treatment.irc_sin_tx_sustiututivo;
          vhcData.hipotiroidismo = treatment.hipotiroidismo;
          vhcData.dislipidemia = treatment.dislipidemia;
          vhcData.vih = treatment.vih;
          vhcData.trasplante_hepatico = treatment.trasplante_hepatico;
          vhcData.trasplante_renal = treatment.trasplante_renal;
          vhcData.sobre_peso = treatment.sobre_peso;
          vhcData.hepatitis_b = treatment.hepatitis_b;
          vhcData.trastorno_consumo_alcohol = treatment.trastorno_consumo_alcohol;
          ///////////////////////////////COM
          vhcData.manif_extrahepaticas = treatment.manif_extrahepaticas;//manifesaciones extrahepaticas

          vhcData.fibroscan_sw_basal = treatment.fibroscan_sw_basal;
          vhcData.apri_basal = treatment.apri_basal;
          vhcData.fib4_basal = treatment.fib4_basal;
          vhcData.grado_fibrosis_hepatica = treatment.grado_fibrosis_hepatica;//grado de fibrosis hepatica
          vhcData.cirrosis = treatment.cirrosis;//Cirrosis (Si o No)
          vhcData.estado_cirrosis_compensada = treatment.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-

          vhcData.varices_esofagicas = treatment.varices_esofagicas;
          vhcData.hemorragia_variceal = treatment.hemorragia_variceal;
          vhcData.ascitis = treatment.ascitis;
          vhcData.encefalopatia = treatment.encefalopatia;
          vhcData.sindrome_hepatorenal = treatment.sindrome_hepatorenal;
          vhcData.hepatocarcinoma = treatment.hepatocarcinoma;
          vhcData.child_inicial = treatment.child_inicial;//Estadio Child Inicial(Puntaje)
          vhcData.meld_inicial = treatment.meld_inicial;//MELD ( Inicial)
          vhcData.cv_inicial = treatment.cv_inicial;//CV Inicial
          vhcData.genotipo = treatment.genotipo;//genotipo
          vhcData.tipo_tx_previo = treatment.tipo_tx_previo;//Tipo de tx previo
          vhcData.year_inicio_tx_add = treatment.year_inicio_tx_add;//Año de Inicio de tx de ADD
          //vhcData.cirrosis_descompensada = treatment.cirrosis_descompensada;//Cirrosis Descompensada
          //vhcData.esofagicas = treatment.esofagicas;//V. Esofágicas (Si o No)
          //vhcData.estado_inicial = treatment.estado_inicial;//Estado inicial

          vhcData.esquema_tratamiento = treatment.esquema_tratamiento;//Esquema de-tratamientot5
          vhcData.tiempo_tratamiento_meses = treatment.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
          vhcData.rvs = treatment.rvs;//RVS (si o no)

          //vhcData.cv_rvs12 = treatment.cv_rvs12;//CV RVS12
          //vhcData.log_rvs12 = treatment.log_rvs12;//Log RVS 12
          vhcData.funcion_renal = treatment.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
          vhcData.funcion_renal_post = treatment.funcion_renal_post;
          vhcData.hb_inicial = treatment.hb_inicial;//HB Inicial
          vhcData.hb_final = treatment.hb_final;//Hb final
          vhcData.leucocitos_inicial = treatment.leucocitos_inicial;//leucocios inicial
          vhcData.leucocitos_final = treatment.leucocitos_final;//leucocitos final
          vhcData.plaquetas_inicial = treatment.plaquetas_inicial;//Plaq Inicial
          vhcData.plaquetas_final = treatment.plaquetas_final;//Plaq Final
          vhcData.glucosa_inicial = treatment.glucosa_inicial;//glucosa_inicial
          vhcData.glucosa_final = treatment.glucosa_final; //glucosa_final
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

          vhcData.apri_final = treatment.apri_final;
          vhcData.fib4_final = treatment.fib4_final;
          vhcData.fibroscan_sw_final = treatment.fibroscan_sw_final;

          //vhcData.comentarios = treatment.comentarios;//Comentarios
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
      } else {
        console.log("Error en formato de la Fecha de Nacimiento.");
        this.message_notification = "Error en el formato de fecha. Formato correcto YYYY-MM-DD";
        treatment.style_input_date = "control-date-error";
        this.save_disabled_vhc = false;
        this.save_enabled_vhc = true;
      }
    }
  }

  //VHC 9 sgo
  updateStatusVHC(id, status, treatment, i) {

    this.update_flag = true;
    const vhcData = {} as vhcTreatmentModel;

    vhcData.MD_hospital_id = treatment.MD_hospital_id;
    vhcData.MD_entity_id = this.entity_id;
    vhcData.research_vhc_id = id;

    vhcData.month_execution = treatment.month_execution;
    if (!treatment.checkbox_value) {
      treatment.checkbox_value = false;
      vhcData.checkbox_value = false;//enabled
      vhcData.status = 0;
      treatment.status = vhcData.status;
      vhcData.row_color = "row_disabled";// Nuevos" treatment.row_color;
      treatment.row_color = vhcData.row_color;
      treatment.disabled_row = true;
      vhcData.active_gray_sem = "row_sem_gray_visible";
    } else {
      treatment.checkbox_value = true;
      vhcData.checkbox_value = true;//disabled
      vhcData.status = 1;
      treatment.status = vhcData.status;
      vhcData.row_color = "row_enabled";// Nuevos" treatment.row_color;"
      treatment.row_color = vhcData.row_color;
      treatment.disabled_row = false;
      vhcData.active_gray_sem = "row_sem_gray_hidden";
    }
    // console.log("Color: " + vhcData.row_color);
    this.VHCRecordUpdate[id] = vhcData;
    this.guardarRegistroVHC();
  }

  //VHC 10 sgo
  getVHCData() {

    console.log("Consulta por hospitales: " + this.comboHospital.hospital_id + " -- " + this.start_date);

    this.progres_spinner_refresh_vhc_treatment = false;
    this.hidden_update_btn = true;

    this.hospital_id = (this.comboHospital.hospital_id != undefined) ? this.comboHospital.hospital_id : 0;
    //hospital_id, role_id,entity_id,treatment_id,status_id, start_date, end_date
    this.vhcTreatmentService.getVHCTreatment(this.hospital_id, this.role_id, this.entity_id, 7, this.status_id, this.start_date, this.end_date).subscribe((resp_data_get: any) => {

      this.VHCRecordEstilo = [];
      this.VHCRecordEstiloExcel = [];
      if (resp_data_get.code == 200) {
        if (resp_data_get.data.data.length > 0) {
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

            vhcData.expediente_id = r.expediente_id; //Iniciales
            if (r.expediente_id == "" || r.expediente_id == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.initials = r.initials; //Iniciales
            if (r.initials == "" || r.initials == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.age = r.age; //Edad
            if (r.age == "" || r.age == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }


            if (r.birthdate == "" || r.birthdate == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            } else {
              vhcData.birthdate = r.birthdate; //Edad
            }
            vhcData.gender = r.gender;//Género
            if (r.gender == "" || r.gender == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.state = r.state;//estado de la republica
            if (r.state == "" || r.state == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.year = r.year;//Año de dx de vhc
            if (r.year == "" || r.year == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.transmission_mechanism = r.transmission_mechanism; //mecanismo de trasmision
            if (r.transmission_mechanism == "" || r.transmission_mechanism == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.dm = r.dm;//Comorbilidades
            if (r.dm == "" || r.dm == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.hta = r.hta;//
            if (r.hta == "" || r.hta == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.obesidad = r.obesidad;//
            if (r.obesidad == "" || r.obesidad == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.hipertiroidismo = r.hipertiroidismo;//
            if (r.hipertiroidismo == "" || r.hipertiroidismo == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.sindrome_metabolico = r.sindrome_metabolico;//
            if (r.sindrome_metabolico == "" || r.sindrome_metabolico == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cardiopatia_isquemica = r.cardiopatia_isquemica;//
            if (r.cardiopatia_isquemica == "" || r.cardiopatia_isquemica == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.irc_dialisis = r.irc_dialisis;//
            if (r.irc_dialisis == "" || r.irc_dialisis == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.irc_hemodilaisis = r.irc_hemodilaisis;//
            if (r.irc_hemodilaisis == "" || r.irc_hemodilaisis == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.irc_sin_tx_sustiututivo = r.irc_sin_tx_sustiututivo;//
            if (r.irc_sin_tx_sustiututivo == "" || r.irc_sin_tx_sustiututivo == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hipotiroidismo = r.hipotiroidismo;//
            if (r.hipotiroidismo == "" || r.hipotiroidismo == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.dislipidemia = r.dislipidemia;//
            if (r.dislipidemia == "" || r.dislipidemia == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.vih = r.vih;//
            if (r.vih == "" || r.vih == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.trasplante_hepatico = r.trasplante_hepatico;//
            if (r.trasplante_hepatico == "" || r.trasplante_hepatico == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.trasplante_renal = r.trasplante_renal;//
            if (r.trasplante_renal == "" || r.trasplante_renal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.sobre_peso = r.sobre_peso;//
            if (r.sobre_peso == "" || r.sobre_peso == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hepatitis_b = r.hepatitis_b;//
            if (r.hepatitis_b == "" || r.hepatitis_b == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.trastorno_consumo_alcohol = r.trastorno_consumo_alcohol;//
            if (r.trastorno_consumo_alcohol == "" || r.trastorno_consumo_alcohol == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.trastorno_consumo_alcohol = r.trastorno_consumo_alcohol;//
            if (r.trastorno_consumo_alcohol == "" || r.trastorno_consumo_alcohol == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.varices_esofagicas = r.varices_esofagicas;//
            if (r.varices_esofagicas == "" || r.varices_esofagicas == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hemorragia_variceal = r.hemorragia_variceal;//
            if (r.hemorragia_variceal == "" || r.hemorragia_variceal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.ascitis = r.ascitis;//
            if (r.ascitis == "" || r.ascitis == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.encefalopatia = r.encefalopatia;//
            if (r.encefalopatia == "" || r.encefalopatia == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.sindrome_hepatorenal = r.sindrome_hepatorenal;//
            if (r.sindrome_hepatorenal == "" || r.sindrome_hepatorenal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hepatocarcinoma = r.hepatocarcinoma;//
            if (r.hepatocarcinoma == "" || r.hepatocarcinoma == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.funcion_renal = r.funcion_renal;//
            if (r.funcion_renal == "" || r.funcion_renal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.funcion_renal_post = r.funcion_renal_post;//
            if (r.funcion_renal_post == "" || r.funcion_renal_post == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            ////////////////////

            vhcData.manif_extrahepaticas = r.manif_extrahepaticas;//manifesaciones extrahepaticas
            if (r.manif_extrahepaticas == "" || r.manif_extrahepaticas == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            //vhcData.fibroscan_sw_basal = r.fibroscan_sw_basal;//manifesaciones extrahepaticas
            vhcData.fibroscan_sw_basal = r.fibroscan_sw_basal == -101010101010 ? "" : r.fibroscan_sw_basal;//Comentarios
            if (r.fibroscan_sw_basal == "" || r.fibroscan_sw_basal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.apri_basal = r.apri_basal;//manifesaciones extrahepaticas
            if (r.apri_basal == "" || r.apri_basal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.fib4_basal = r.fib4_basal;//manifesaciones extrahepaticas
            if (r.fib4_basal == "" || r.fib4_basal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.grado_fibrosis_hepatica = r.grado_fibrosis_hepatica;//grado de fibrosis hepatica
            if (r.grado_fibrosis_hepatica == "" || r.grado_fibrosis_hepatica == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cirrosis = r.cirrosis;//Cirrosis (Si o No)
            if (r.cirrosis == "" || r.cirrosis == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.estado_cirrosis_compensada = r.estado_cirrosis_compensada//Estado de la cirrosis compensada o descompensadabgt5-
            if (r.estado_cirrosis_compensada == "" || r.estado_cirrosis_compensada == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.hemorragia_variceal = r.hemorragia_variceal;//Cirrosis Descompensada
            if (r.hemorragia_variceal == "" || r.hemorragia_variceal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.ascitis = r.ascitis;//Cirrosis Descompensada
            if (r.ascitis == "" || r.ascitis == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.child_inicial = r.child_inicial;//Estadio Child Inicial(Puntaje)
            if (r.child_inicial == "" || r.child_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.meld_inicial = r.meld_inicial;//MELD ( Inicial)
            if (r.meld_inicial == "" || r.meld_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            /*vhcData.esofagicas = r.esofagicas;//V. Esofágicas (Si o No)
            if (r.esofagicas =="" || r.esofagicas==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }*/
            /*vhcData.estado_inicial = r.estado_inicial;//Estado inicial
            if (r.estado_inicial =="" || r.estado_inicial==null){
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }*/
            vhcData.tipo_tx_previo = r.tipo_tx_previo;//Tipo de tx previo
            if (r.tipo_tx_previo == "" || r.tipo_tx_previo == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.year_inicio_tx_add = r.year_inicio_tx_add;//Año de Inicio de tx de ADD
            if (r.year_inicio_tx_add == "" || r.year_inicio_tx_add == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.esquema_tratamiento = r.esquema_tratamiento;//Esquema de-tratamientot5
            if (r.esquema_tratamiento == "" || r.esquema_tratamiento == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tiempo_tratamiento_meses = r.tiempo_tratamiento_meses;//Tiempo de tratamiento en meses
            if (r.tiempo_tratamiento_meses == "" || r.tiempo_tratamiento_meses == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.rvs = r.rvs;//RVS (si o no)
            if (r.rvs == "" || r.rvs == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.cv_inicial = r.cv_inicial;//CV Inicial
            if (r.cv_inicial == "" || r.cv_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.genotipo = r.genotipo;//Log Inicial
            if (r.genotipo == "" || r.genotipo == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            /* vhcData.cv_rvs12 = r.cv_rvs12;//CV RVS12
             if (r.cv_rvs12 =="" || r.cv_rvs12==null){
               vhcData.active_red_sem = "row_sem_red_visible";
               vhcData.active_green_sem = "row_sem_green_hidden";
             }
             vhcData.log_rvs12 = r.log_rvs12;//Log RVS 12
             if (r.log_rvs12 =="" || r.log_rvs12==null){
               vhcData.active_red_sem = "row_sem_red_visible";
               vhcData.active_green_sem = "row_sem_green_hidden";
             }*/
            vhcData.funcion_renal = r.funcion_renal;//Funcion renal (filtracion glomerular) pretratameinto
            if (r.funcion_renal == "" || r.funcion_renal == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hb_inicial = r.hb_inicial;//HB Inicial
            if (r.hb_inicial == "" || r.hb_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.hb_final = r.hb_final;//Hb final
            if (r.hb_final == "" || r.hb_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.leucocitos_inicial = r.leucocitos_inicial;//leucocios inicial
            if (r.leucocitos_inicial == "" || r.leucocitos_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.leucocitos_final = r.leucocitos_final;//leucocitos final
            if (r.leucocitos_final == "" || r.leucocitos_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.plaquetas_inicial = r.plaquetas_inicial;//Plaq Inicial
            if (r.plaquetas_inicial == "" || r.plaquetas_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.plaquetas_final = r.plaquetas_final;//Plaq Final
            if (r.plaquetas_final == "" || r.plaquetas_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.glucosa_inicial = r.glucosa_inicial;//Glucosa Inicial
            if (r.glucosa_inicial == "" || r.glucosa_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.glucosa_final = r.glucosa_final;//Glucosa Final
            if (r.glucosa_final == "" || r.glucosa_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.creatinina_inicial = r.creatinina_inicial;//creatinia inicial
            if (r.creatinina_inicial == "" || r.creatinina_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.creatinina_final = r.creatinina_final;//Creatinina final
            if (r.creatinina_final == "" || r.creatinina_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgo_inicial = r.tgo_inicial;//TGO Inicial
            if (r.tgo_inicial == "" || r.tgo_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgo_final = r.tgo_final;//TGO Final
            if (r.tgo_final == "" || r.tgo_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgp_inicial = r.tgp_inicial;//TGP Inicial
            if (r.tgp_inicial == "" || r.tgp_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.tgp_final = r.tgp_final;//TGP Final
            if (r.tgp_final == "" || r.tgp_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.alumina_inicial = r.alumina_inicial;//alumina inicial
            if (r.alumina_inicial == "" || r.alumina_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.alumina_final = r.alumina_final;//albumina final
            if (r.alumina_final == "" || r.alumina_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.inr_inicial = r.inr_inicial;//INR Inicial
            if (r.inr_inicial == "" || r.inr_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.inr_final = r.inr_final;  //INR Final
            if (r.inr_final == "" || r.inr_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.bt_inicial = r.bt_inicial;//BT inicial
            if (r.bt_inicial == "" || r.bt_inicial == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.bt_final = r.bt_final;//BT final
            if (r.bt_final == "" || r.bt_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.efecto_adverso = r.efecto_adverso;//Efecto Adverso Si/No
            if (r.efecto_adverso == "" || r.efecto_adverso == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.descripcion_adverso = r.descripcion_adverso;//Cual/describir
            if (r.descripcion_adverso == "" || r.descripcion_adverso == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.accion_tomada = r.accion_tomada;//Acción Tomada
            if (r.accion_tomada == "" || r.accion_tomada == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.child_final = r.child_final;//Child Final
            if (r.child_final == "" || r.child_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.meld_final = r.meld_final;//MELD finall
            if (r.meld_final == "" || r.meld_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.apri_final = r.apri_final;//Comentarios
            if (r.apri_final == "" || r.apri_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }
            vhcData.fib4_final = r.fib4_final;//Comentarios
            if (r.fib4_final == "" || r.fib4_final == null) {
              vhcData.active_red_sem = "row_sem_red_visible";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }

            vhcData.fibroscan_sw_final = r.fibroscan_sw_final == -101010101010 ? "" : r.fibroscan_sw_final;//Comentarios
            if (r.fibroscan_sw_final == "" || r.fibroscan_sw_final == null) {
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
            if (vhcData.status == 1) {
              console.log(">> Status: " + vhcData.status);
              vhcData.checkbox_value = true;//enabled
              vhcData.disabled_row = false;
              vhcData.row_color = "row_get";// Nuevos" treatment.row_color;"
              vhcData.active_gray_sem = "row_sem_gray_hidden";
              vhcData.checkbox_status = true;
            } else {
              console.log("Status: " + vhcData.status);
              vhcData.checkbox_value = false;//disabled
              vhcData.disabled_row = true;
              vhcData.checkbox_status = true;
              vhcData.row_color = "row_disabled";// Nuevos" treatment.row_color;"
              vhcData.active_gray_sem = "row_sem_gray_visible";
              vhcData.active_red_sem = "row_sem_red";
              vhcData.active_green_sem = "row_sem_green_hidden";
            }


            this.VHCRecordEstilo.push(vhcData);
            this.VHCRecord = this.VHCRecordEstilo;
            this.VHCRecordEstiloExcel.push(this.getExcelDataVHC(vhcData));
            this.hidden_update_btn = false;
            this.progres_spinner_refresh_vhc_treatment = true;
          });
        } else {
          console.log("Minimizar");
          this.minimizeScreen();
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'Warning';
          this.alert_2.message = 'No se encontraron datos. Intente aumentando el rango de fechas o cambiando los parámetros de búsqueda';
          this.reset();
          this.progres_spinner_refresh_vhc_treatment = true;
          this.hidden_update_btn = false;
        }
      } else {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al obtener la información.';
        this.reset();
        this.progres_spinner_refresh_vhc_treatment = true;
        this.hidden_update_btn = false;
      }
      this.VHCRecordExcel = this.VHCRecordEstiloExcel;
      this.VHCRecord = this.VHCRecordEstilo;

    }, err => {
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al obtener la información.';
      this.reset();
      this.progres_spinner_refresh_vhc_treatment = true;
      this.hidden_update_btn = false;
    });
  }

  //VHC 11 sgo
  updateTableRecordsVHC() {
    this.getVHCData();
  }

  status_filter = 1; //ACOMODAR VARIABLE status_filter YA QUE SE UTILIZA PARA TODOS LOS TRATAMIENTOS ??? CONFIRMAR
  statusFilter() {
    if (this.status_filter == 1) {
      this.status_id = 1;
    }
    if (this.status_filter == 2) {
      this.status_id = 0;
    }
    if (this.status_filter == 3) {
      this.status_id = 3;
    }
    this.getVHCData();
  }

//#endregion


//#region "Tratamiento Nash"

  //NASH 1 sgo REVISAR ESTE METODO AL PARECER SE PUEDE REUTILIZARA PARA TODOS LOS TRATAMIENTOS
  exportCSVFileNASH(headers, items, fileTitle) {
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

  //NASH 2 sgo REVISAR ESTE METODO AL PARECER SE PUEDE REUTILIZARA PARA TODOS LOS TRATAMIENTOS
  convertToCSVNASH(objArray) {
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

  //NASH 3 sgo REVISAR ESTE METODO AL PARECER SE PUEDE REUTILIZARA PARA TODOS LOS TRATAMIENTOS SOLO ENVIANDO COMO PARAMETRO EL NUMERO DE TRATAMIENTO
  exportExcelNASH() {
    this.createHeaderNASH();
    this.exportCSVFileNASH(this.NASHRecordHeader, this.NASHRecordExcel, "NASH Treatment");
  }

  //NASH 4 sgo  REVISAR CAMPOS SOBRE TODO EL DE REGISTRO EXPEDIENTE
  createHeaderNASH() {
    this.NASHRecordHeader = {} as nashTreatmentModelHeader;
    const nashData = {} as nashTreatmentModelHeader;

    //nashData.initials = "REGISTRO/EXPEDIENTE";  //relacionar iniciales  - REVISAR CAMPO SGO EN EL JSON YA ESTA OBTENIENDO EL CAMPO MARIO REVISAR PENDIENTE
    nashData.research_nash_id = "ID";   //relacionar iniciales
    nashData.initials = "INICIALES";
    nashData.birthdate = "F. DE NACIMIENTO";
    nashData.edad = "EDAD";
    nashData.gender = "GENERO";
    nashData.state = "ESTADO DE LA REPUBLICA";

    nashData.diagnostic_date = "F. DIAGNOSTICO";
    nashData.peso = "PESO";
    nashData.talla = "TALLA";
    nashData.imc = "IMC";
    nashData.obesidad = "OBESIDAD";
    nashData.sobrepeso = "SOBREPESO";
    nashData.circunferencia_cintura = "CIRC. CINTURA";
    nashData.circunferencia_cadera = "CIRC. CADERA";
    nashData.indice_cintura_cadera = "IND. CINTURA CADERA";
    nashData.consumo_alcohol = "CONSUMO ALCOHOL";
    nashData.gramos_alcohol = "GR. ALCOHOL";
    nashData.diabetes_mellitus = "MELLITUS";
    nashData.hipertension_arterial = "HIPERTENSION ARTERIAL";
    nashData.hipercolesterolemia = "HIPERCOLESTEROLEMIA";
    nashData.hipertrigliceridemia = "HIPERTRIGLICERIDEMIA";
    nashData.hipotiroidismo = "HIPOTIROIDISMO";
    nashData.presion_sistolica = "PRESION SISTOLICA";
    nashData.presion_diastolica = "PRESION DIASTOLICA";
    nashData.antihipertensivos = "ANTIHIPERTENSIVOS";
    nashData.hipoglucemiante = "HIPOGLUCEMIANTE";
    nashData.hipoglucemiantes_orales = "HIPOGLUCEMIANTE ORALES";
    nashData.uso_insulina = "USO INSULINA";
    nashData.estatinas = "ESTATINAS";
    nashData.clase_estatina = "CLASE ESTATINAS";
    nashData.fibratos = "FIBRATOS";
    nashData.clase_fibratos = "CLASE FIBRATOS";
    nashData.antioxidantes = "ANTIOXIDANTES";
    nashData.clase_antioxidantes = "CLASE ANTIOXIDANTES";
    nashData.hemoglobina = "HEMOGLOBINA";
    nashData.plaquetas = "PLAQUETAS";
    nashData.glucosa = "GLUCOSA";
    nashData.creatinina = "CREATININA";
    nashData.colesterol = "COLESTEROL";
    nashData.hdl = "HDL";
    nashData.ldl = "LDL";
    nashData.vldl = "VLDL";
    nashData.indice_aterogenico = "IND. ATEROGÉNICO";
    nashData.trigliceridos = "TRIGLICERIDOS";
    nashData.bt = "BT";
    nashData.bd = "BD";
    nashData.bi = "BI";
    nashData.ast = "AST";
    nashData.alt = "ALT";
    nashData.fal = "FAL";
    nashData.ggt = "GGT";
    nashData.albumina = "ALBUMINA";
    nashData.insulina_serica = "INSULINA SERICA";
    nashData.homa_ir = "HOMA IR";
    nashData.pcr_ultrasensible = "PCR ULTRASENSIBLE";
    nashData.elastrografia_cap = "ELASTOGRAFIA TRANSITORIA (CAP)";
    nashData.grado_esteatosis = "GRADO DE ESTEATOSIS";
    nashData.elastrografia_kpa = "ELASTOGRAFIA TRANSITORIA (KPa)";
    nashData.grado_fibrosis = "GRADO DE FIBROSIS";
    nashData.nafld_fibrosis = "NAFLD FIBROSIS";
    nashData.fib_4 = "FIB-4";
    nashData.apri = "APRI";
    nashData.hbsag = "HBSAG";
    nashData.hbeag = "HBEAG";
    nashData.anticuerpos_hbs = "HBS";
    nashData.anticuerpos_hbe = "HBE";
    nashData.anticuerpos_vhc = "VHC";
    nashData.biopsia_hepatica = "BIOPSIA HEPATICA";
    nashData.indicaciones_biopsia = "INDICACIONES BIOPSIA";
    nashData.grado_actividad_bh = "GRADO ACTIVIDAD BH";
    nashData.grado_fibrosis_bh = "GRADO FIBROSIS BH";
    nashData.grado_esteatosis_bh = "GRADO ESTEATOSIS BH";
    nashData.tratamiento_nash = "TRATAMIENTO NASH";
    nashData.inicio_tratamiento = "INICIO TRATAMIENTO";
    nashData.duracion_tratamiento = "DURACION TRATAMIENTO";
    nashData.pioglitazona = "PIOGLITAZONA";
    nashData.selonsertib = "SELONSERTIB";
    nashData.elafibranor = "ELAFIBRANOR";
    nashData.cenicriviroc = "CENICRIVIROC";
    nashData.resmetirom = "RESMETIROM";
    nashData.liraglutide = "LIRAGLUTIDE";
    nashData.metformin = "METFORMIN";
    nashData.puntaje_nas = "PUNTAJE NAS";
    nashData.evolucion_post_tratamiento = "EVOLUCIÓN POST TRATAMIENTO";
    nashData.MD_hospital_id = "HOSPITAL";
    nashData.creation_date = "FECHA REGISTRO";
    nashData.creation_time = "HORA REGISTRO";
    nashData.creation_username = "USUARIO";


    this.NASHRecordHeader = nashData;

  }

  //NASH 5 sgo
  getExcelDataNASH(nashData: nashTreatmentModel) {
    const nashDataExcel = {} as nashTreatmentModel;
    //nashDataExcel.expediente_id = nashData.expediente_id == null ? "" : nashData.expediente_id;

    //ID
    nashDataExcel.research_nash_id = nashData.research_nash_id;

    //INICIALES
    nashDataExcel.initials = nashData.initials == null ? "*****" : nashData.initials;

    //FECHA CUMPLEAÑOS
    let birt_D = "";
    if (nashData.birthdate != null) {
      birt_D = nashData.birthdate;
    }
    nashDataExcel.birthdate = birt_D;

    //EDAD
    nashDataExcel.edad = nashData.edad == null ? 0 : nashData.edad;

    //GENERO
    nashDataExcel.gender = nashData.gender == null ? 0 : nashData.gender;//Género

    //ESTADO DE LA REPUBLICA
    nashDataExcel.state = nashData.state == null ? 0 : nashData.state;

    //FECHA DIAGNOSTICO
    nashDataExcel.diagnostic_date = nashData.diagnostic_date == null ? "00/00/0000": nashData.diagnostic_date;

    //PESO
    nashDataExcel.peso = nashData.peso == null ? 0 : nashData.peso;

    //TALLA
    nashDataExcel.talla = nashData.talla == null ? 0 : nashData.talla;

    //IMC
    nashDataExcel.imc = nashData.imc == null ? 0 : nashData.imc;

    //OBESIDAD
    nashDataExcel.obesidad = nashData.obesidad == null ? 0 : nashData.obesidad;

    //SOBREPESO
    nashDataExcel.sobrepeso = nashData.sobrepeso == null ? 0 : nashData.sobrepeso;

    //CIRC. CINTURA
    nashDataExcel.circunferencia_cintura = nashData.circunferencia_cintura == null ? 0 : nashData.circunferencia_cintura;

    //CIRC. CADERA
    nashDataExcel.circunferencia_cadera = nashData.circunferencia_cadera == null ? 0 : nashData.circunferencia_cadera;

    //IND CINTURA CADERA
    nashDataExcel.indice_cintura_cadera = nashData.indice_cintura_cadera == null ? 0 : nashData.indice_cintura_cadera;

    //CONSUMO ALCOHOL
    nashDataExcel.consumo_alcohol = nashData.consumo_alcohol == null ? 0 : nashData.consumo_alcohol;

    //GRAMOS ALCOHOL
    nashDataExcel.gramos_alcohol = nashData.peso == null ? 0 : nashData.peso;

    //MELLITUS
    nashDataExcel.diabetes_mellitus = nashData.diabetes_mellitus == null ? 0 : nashData.diabetes_mellitus;

    //HIPERTENSION ARTERIAL
    nashDataExcel.hipertension_arterial = nashData.hipertension_arterial == null ? 0 : nashData.hipertension_arterial;

    //HIPERCOLESTEROLEMIA
    nashDataExcel.hipercolesterolemia = nashData.hipercolesterolemia == null ? 0 : nashData.hipercolesterolemia;

    //HIPERTRIGLICERIDEMIA
    nashDataExcel.hipertrigliceridemia = nashData.hipertrigliceridemia == null ? 0 : nashData.hipertrigliceridemia;

    //HIPOTIROIDISMO
    nashDataExcel.hipotiroidismo = nashData.hipotiroidismo == null ? 0 : nashData.hipotiroidismo;

    //PRESION SISTOLICA
    nashDataExcel.presion_sistolica = nashData.presion_sistolica == null ? 0 : nashData.presion_sistolica;

    //PRESION DIASTOLICA
    nashDataExcel.presion_diastolica = nashData.presion_diastolica == null ? 0 : nashData.presion_diastolica;

    //ANTIHIPERTENSIVOS
    nashDataExcel.antihipertensivos = nashData.antihipertensivos == null ? 0 : nashData.antihipertensivos;

    //HIPOGLUCEMIANTE
    nashDataExcel.hipoglucemiante = nashData.hipoglucemiante == null ? 0 : nashData.hipoglucemiante;

    //HIPOGLUCEMIANTE ORALES
    nashDataExcel.hipoglucemiantes_orales = nashData.hipoglucemiantes_orales == null ? 0 : nashData.hipoglucemiantes_orales;

    //USO INSULINA
    nashDataExcel.uso_insulina = nashData.uso_insulina == null ? 0 : nashData.uso_insulina;

    //ESTATINAS
    nashDataExcel.estatinas = nashData.estatinas == null ? 0 : nashData.estatinas;

    //CLASE ESTATINAS
    nashDataExcel.clase_estatina = nashData.clase_estatina == null ? 0 : nashData.clase_estatina;

    //FIBRATOS
    nashDataExcel.fibratos = nashData.fibratos == null ? 0 : nashData.fibratos;

    //CLASE FIBRATOS
    nashDataExcel.clase_fibratos = nashData.clase_fibratos == null ? 0 : nashData.clase_fibratos;

    //ANTIOXIDANTES
    nashDataExcel.antioxidantes = nashData.antioxidantes == null ? 0 : nashData.antioxidantes;

    //CLASE ANTIOXIDANTES
    nashDataExcel.clase_antioxidantes = nashData.clase_antioxidantes == null ? 0 : nashData.clase_antioxidantes;

    //HEMOGLOBINA
    nashDataExcel.hemoglobina = nashData.hemoglobina == null ? 0 : nashData.hemoglobina;

    //PLAQUETAS
    nashDataExcel.plaquetas = nashData.plaquetas == null ? 0 : nashData.plaquetas;

    //GLUCOSA
    nashDataExcel.glucosa = nashData.glucosa == null ? 0 : nashData.glucosa;

    //CREATININA
    nashDataExcel.creatinina = nashData.creatinina == null ? 0 : nashData.creatinina;

    //COLESTEROL
    nashDataExcel.colesterol = nashData.colesterol == null ? 0 : nashData.colesterol;

    //HDL
    nashDataExcel.hdl = nashData.hdl == null ? 0 : nashData.hdl;

    //LDL
    nashDataExcel.ldl = nashData.ldl == null ? 0 : nashData.ldl;

    //VLDL
    nashDataExcel.vldl = nashData.vldl == null ? 0 : nashData.vldl;

    //IND. ATEROGÉNICO
    nashDataExcel.indice_aterogenico = nashData.indice_aterogenico == null ? 0 : nashData.indice_aterogenico;

    //TRIGLICERIDOS
    nashDataExcel.trigliceridos = nashData.trigliceridos == null ? 0 : nashData.trigliceridos;

    //BT
    nashDataExcel.bt = nashData.bt == null ? 0 : nashData.bt;

    //BD
    nashDataExcel.bd = nashData.bd == null ? 0 : nashData.bd;

    //BI
    nashDataExcel.bi = nashData.bi == null ? 0 : nashData.bi;

    //AST
    nashDataExcel.ast = nashData.ast == null ? 0 : nashData.ast;

    //ALT
    nashDataExcel.alt = nashData.alt == null ? 0 : nashData.alt;

    //FAL
    nashDataExcel.fal = nashData.fal == null ? 0 : nashData.fal;

    //GGT
    nashDataExcel.ggt = nashData.ggt == null ? 0 : nashData.ggt;

    //ALBUMINA
    nashDataExcel.albumina = nashData.albumina == null ? 0 : nashData.albumina;

    //INSULINA SERICA
    nashDataExcel.insulina_serica = nashData.insulina_serica == null ? 0 : nashData.insulina_serica;

    //HOMA IR
    nashDataExcel.homa_ir = nashData.homa_ir == null ? 0 : nashData.homa_ir;

    //PCR ULTRASENSIBLE
    nashDataExcel.pcr_ultrasensible = nashData.pcr_ultrasensible == null ? 0 : nashData.pcr_ultrasensible;

    //ELASTOGRAFIA TRANSITORIA (CAP)
    nashDataExcel.elastrografia_cap = nashData.elastrografia_cap == null ? 0 : nashData.elastrografia_cap;

    //GRADO DE ESTEATOSIS
    nashDataExcel.grado_esteatosis = nashData.grado_esteatosis == null ? 0 : nashData.grado_esteatosis;

    //ELASTOGRAFIA TRANSITORIA (KPa)
    nashDataExcel.elastrografia_kpa = nashData.elastrografia_kpa == null ? 0 : nashData.elastrografia_kpa;

    //GRADO DE FIBROSIS
    nashDataExcel.grado_fibrosis = nashData.grado_fibrosis == null ? 0 : nashData.grado_fibrosis;

    //NAFLD FIBROSIS
    nashDataExcel.nafld_fibrosis = nashData.nafld_fibrosis == null ? 0 : nashData.nafld_fibrosis;

    //FIB-4
    nashDataExcel.fib_4 = nashData.fib_4 == null ? 0 : nashData.fib_4;

    //APRI
    nashDataExcel.apri = nashData.apri == null ? 0 : nashData.apri;

    //HBSAG
    nashDataExcel.hbsag = nashData.hbsag == null ? 0 : nashData.hbsag;

    //HBEAG
    nashDataExcel.hbeag = nashData.hbeag == null ? 0 : nashData.hbeag;

    //ANTICUERPOS HBS
    nashDataExcel.anticuerpos_hbs = nashData.anticuerpos_hbs == null ? 0 : nashData.anticuerpos_hbs;

    //ANTICUERPOS HBE
    nashDataExcel.anticuerpos_hbe = nashData.anticuerpos_hbe == null ? 0 : nashData.anticuerpos_hbe;

    //ANTICUERPOS VHC
    nashDataExcel.anticuerpos_vhc = nashData.anticuerpos_vhc == null ? 0 : nashData.anticuerpos_vhc;

    //BIOPSIA HEPATICA
    nashDataExcel.biopsia_hepatica = nashData.biopsia_hepatica == null ? 0 : nashData.biopsia_hepatica;

    //INDICACIONES BIOPSIA
    nashDataExcel.indicaciones_biopsia = nashData.indicaciones_biopsia == null ? "*****" : nashData.indicaciones_biopsia;

    //GRADO ACTIVIDAD BH
    nashDataExcel.grado_actividad_bh = nashData.grado_actividad_bh == null ? 0 : nashData.grado_actividad_bh;

    //GRADO FIBROSIS BH
    nashDataExcel.grado_fibrosis_bh = nashData.grado_fibrosis_bh == null ? 0 : nashData.grado_fibrosis_bh;

    //GRADO ESTEATOSIS BH
    nashDataExcel.grado_esteatosis_bh = nashData.grado_esteatosis_bh == null ? 0 : nashData.grado_esteatosis_bh;

    //TRATAMIENTO NASH
    nashDataExcel.tratamiento_nash = nashData.tratamiento_nash == null ? 0 : nashData.tratamiento_nash;

    //INICIO TRATAMIENTO
    nashDataExcel.inicio_tratamiento = nashData.inicio_tratamiento == null ? "00/00/0000" : nashData.inicio_tratamiento;

    //DURACION TRATAMIENTO
    nashDataExcel.duracion_tratamiento = nashData.duracion_tratamiento == null ? 0 : nashData.duracion_tratamiento;

    //PIOGLITAZONA
    nashDataExcel.pioglitazona = nashData.pioglitazona == null ? 0 : nashData.pioglitazona;

    //SELONSERTIB
    nashDataExcel.selonsertib = nashData.selonsertib == null ? 0 : nashData.selonsertib;

    //ELAFIBRANOR
    nashDataExcel.elafibranor = nashData.elafibranor == null ? 0 : nashData.elafibranor;

    //CENICRIVIROC
    nashDataExcel.cenicriviroc = nashData.cenicriviroc == null ? 0 : nashData.cenicriviroc;

    //RESMETIROM
    nashDataExcel.resmetirom = nashData.resmetirom == null ? 0 : nashData.resmetirom;

    //LIRAGLUTIDE
    nashDataExcel.liraglutide = nashData.liraglutide == null ? 0 : nashData.liraglutide;

    //METFORMIN
    nashDataExcel.metformin = nashData.metformin == null ? 0 : nashData.metformin;

    //PUNTAJE NAS
    nashDataExcel.puntaje_nas = nashData.puntaje_nas == null ? 0 : nashData.puntaje_nas;

    //EVOLUCIÓN POST TRATAMIENTO
    nashDataExcel.evolucion_post_tratamiento = nashData.evolucion_post_tratamiento == null ? 0 : nashData.evolucion_post_tratamiento;

    //HOSPITAL
    nashDataExcel.MD_hospital_id = nashData.MD_hospital_id == null ? 0 : nashData.MD_hospital_id;

    //FECHA REGISTRO
    nashDataExcel.creation_date = nashData.creation_date == null ? "00/00/0000" : nashData.creation_date;

    //HORA REGISTRO
    nashDataExcel.creation_time = nashData.creation_time == null ? "00/00/0000" : nashData.creation_time;

    //USUARIO
    nashDataExcel.creation_username = nashData.creation_username == null ? "00/00/0000" : nashData.creation_username;

    return nashDataExcel;

  }

  //NASH 6 sgo
  guardarRegistroNASH() {

    // this.minimizeScreen();
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn = true;

    if (this.create_flag) {
      console.log("Guardando...");
      this.data_nash_.data = this.NASHRecordCreate.filter(function (e1) {
        return e1 != null;
      });
      this.nashTreatmentService.saveNASHTreatment(this.data_nash_).subscribe((resp_data: any) => {
        if (resp_data.http_code == null) {
          if (resp_data.code == 200) {
            this.NASHRecord = [];
            this.NASHRecordCreate = [];
            this.create_flag = false;
            this.progres_spinner_refresh_nash_treatment = true;

            this.getNASHData();

            this.staticAlertClosed2 = false;
            this.alert_2.type = 'success';
            this.alert_2.message = 'Datos guardados correctamente.';
            this.reset();
            this.hidden_update_btn = false;
            console.log("Disable button for save...");
            this.save_disabled_nash = false;
            this.save_enabled_nash = true;
          } else {
            this.staticAlertClosed2 = false;
            this.alert_2.type = 'danger';
            this.alert_2.message = 'No se pudo guardar la información, intente nuevamente.';
            this.reset();
            this.progres_spinner_refresh_nash_treatment = true;
            this.hidden_update_btn = false;

            this.save_disabled_nash = false;
            this.save_enabled_nash = true;
          }
        } else {
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'Hubo un error al intentar guardar la información.';
          this.reset();
          this.progres_spinner_refresh_nash_treatment = true;
          this.hidden_update_btn = false;
        }
      }, err => {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar guardar la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn = false;
      });
    }
    if (this.update_flag) {

      this.data_nash_.data = this.NASHRecordUpdate.filter(function (e1) {
        return e1 != null;
      });

      this.nashTreatmentService.updateNASHTreatment(this.data_nash_).subscribe((resp_data: any) => {
        console.log(resp_data);

        if (resp_data.code == 200) {
          this.NASHRecord = [];
          this.NASHRecordUpdate = [];
          this.update_flag = false;
          this.progres_spinner_refresh_nash_treatment = true;
          this.getNASHData();
          this.hidden_update_btn = false;

          this.staticAlertClosed2 = false;
          this.alert_2.type = 'success';
          this.alert_2.message = 'Datos actualizados correctamente.';
          this.reset();

          this.save_disabled_nash = false;
          this.save_enabled_nash = true;
        } else {
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'danger';
          this.alert_2.message = 'Hubo un error al actualizar la información.';
          this.reset();
          this.progres_spinner_refresh_nash_treatment = true;
          this.hidden_update_btn = false;
        }
      }, err => {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al intentar actualizar la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn = false;
      });
    }
  }

  //NASH 7 sgo
  agregarNuevoRegistroNASH(event) {
    //this.regexValidation("2019-02-02");
    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn = true;
    //this.indiceNash = (Number(this.indiceNash) + 1);
    const nashData = {} as nashTreatmentModel;
    this.date_ = new Date(this.today.getFullYear(), -12, 0);
    //this.start_date = this.pipe.transform(this.date_, 'yyyy-MM-dd');
    //this.strDate = this.pipe.transform(this.date_, 'yyyy-MM-dd');//this.pipe.transform(this.today, 'yyyy-MM-dd');

    this.start_date;// = this.strDate;
    this.end_date;// = this.strDate;

    if (this.comboHospital.hospital_id == 0) {
      this.minimizeScreen();
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'warning';
      this.alert_2.message = 'Debe seleccionar un hospital';
      this.reset();
      this.progres_spinner_refresh_nash_treatment = true;
      this.hidden_update_btn = false;

    } else {
      this.maximizeScreen();
      nashData.MD_hospital_id = this.comboHospital.hospital_id;
      nashData.MD_entity_id = this.entity_id;
      nashData.research_date_begin = this.strDate;
      nashData.research_date_end = this.strDate;
      //nashData.research_nash_id = this.indiceNash;
      nashData.month_execution = 9;
      nashData.row_color = "row_new";
      nashData.status = 1;
      nashData.active_red_sem = "row_sem_red_visible";
      nashData.active_green_sem = "row_sem_green_hidden";
      nashData.checkbox_value = true;
      nashData.disable_checkbox = true;
      this.NASHRecord.push(nashData);
      this.progres_spinner_refresh_nash_treatment = true;
      this.hidden_update_btn = false;
      this.save_disabled_nash = true;
      this.save_enabled_nash = false;
    }
    this.scroll('body-table');
  }


  //NASH 8 sgo
  updateRecordNASH(id, column_name, treatment, i) {
    ///DATE VALIDATION
    if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

    } else {
      if (this.regexValidation(treatment.birthdate) == "OK.") {
        //   vhcData.birthdate = treatment.birthdate;
        console.log("Fecha de Nacimiento correcta.");
        this.save_disabled_nash = true;
        this.save_enabled_nash = false;
        this.message_notification = "";
        treatment.style_input_date = "control-date-ok";

        let element = document.getElementById("gender");


        if (id != null) {

          this.update_flag = true;
          const nashData = {} as nashTreatmentModel;

          nashData.MD_entity_id = this.entity_id;
          nashData.MD_hospital_id = treatment.MD_hospital_id;
          nashData.research_nash_id = id;
          nashData.month_execution = treatment.month_execution;


          //nashData.expediente_id = treatment.expediente_id; //Expediente id
          //nashData.year = treatment.year;//Año de dx de nash
          //nashData.transmission_mechanism = treatment.transmission_mechanism; //mecanismo de trasmision

          //REVISAR CAMPOS QUE SEAN CORRECTOS - SGO
          //ORDEN COMENZANDO CON INICIALES

          //INICIALES
          nashData.initials = treatment.initials;

          //FECHA DE NACIMIENTO
          nashData.birthdate = treatment.birthdate;

          //EDAD
          nashData.edad = treatment.age;

          //GENERO
          nashData.gender = treatment.gender;

          //ESTADO
          nashData.state = treatment.state;

          //FECHA DIAGNOSTICO
          if (treatment.diagnostic_date === "null" || treatment.diagnostic_date === null || treatment.diagnostic_date === ''){
            nashData.diagnostic_date = "1900-01-01";
          }else{
            nashData.diagnostic_date = treatment.diagnostic_date;
          }

          //PESO
          nashData.peso = treatment.peso;

          //TALLA
          nashData.talla = treatment.talla;

          //IMC
          nashData.imc = treatment.imc;

          //OBESIDAD
          nashData.obesidad = treatment.obesidad;

          //SOBREPESO
          nashData.sobrepeso = treatment.sobrepeso;

          //CIRCUNFERENCIA CINTURA
          nashData.circunferencia_cintura = treatment.circunferencia_cintura;

          //CIRCUNFERENCIA CADERA
          nashData.circunferencia_cadera = treatment.circunferencia_cadera;

          //INDICE CINTURA CADERA
          nashData.indice_cintura_cadera = treatment.indice_cintura_cadera;

          //CONSUMO ALCOHOL
          nashData.consumo_alcohol = treatment.consumo_alcohol;

          //GRAMOS DE ALCOHOL
          nashData.gramos_alcohol = treatment.gramos_alcohol;

          //DIABETES MELLITUS
          nashData.diabetes_mellitus = treatment.diabetes_mellitus;

          //HIPERTENSION ARTERIAL
          nashData.hipertension_arterial = treatment.hipertension_arterial;

          //HIPERCOLESTEROLEMIA
          nashData.hipercolesterolemia = treatment.hipercolesterolemia;

          //HIPERTRIGLICERIDEMIA
          nashData.hipertrigliceridemia = treatment.hipertrigliceridemia;

          //HIPOTIROIDISMO
          nashData.hipotiroidismo = treatment.hipotiroidismo;

          //PRESION SISTOLICA
          nashData.presion_sistolica = treatment.presion_sistolica;

          //PRESION DIASTOLICA
          nashData.presion_diastolica = treatment.presion_diastolica;

          //ANTIHIPERTENSIVOS
          nashData.antihipertensivos = treatment.antihipertensivos;

          //CLASE ANTIHIPERTENSIVOS
          nashData.clase_antihipertensivos = treatment.clase_antihipertensivos;

          //HIPOGLUCEMIANTE
          nashData.hipoglucemiante = treatment.hipoglucemiante;

          //HIPOGLUCEMIANTES ORALES
          nashData.hipoglucemiantes_orales = treatment.hipoglucemiantes_orales;

          //USO INSULINA
          nashData.uso_insulina = treatment.uso_insulina;

          //ESTATINAS
          nashData.estatinas = treatment.estatinas;

          //CLASE ESTATINAS
          nashData.clase_estatina = treatment.clase_estatina;

          //FIBRATOS
          nashData.fibratos = treatment.fibratos;

          //CLASE FIBRATOS
          nashData.clase_fibratos = treatment.clase_fibratos;

          //ANTIOXIDANTES
          nashData.antioxidantes = treatment.antioxidantes;

          //CLASE ANTIOXIDANTES
          nashData.clase_antioxidantes = treatment.clase_antioxidantes;

          //HEMOGLOBINA
          nashData.hemoglobina = treatment.hemoglobina;

          //PLAQUETAS
          nashData.plaquetas = treatment.plaquetas;

          //GLUCOSA
          nashData.glucosa = treatment.glucosa;

          //CREATININA
          nashData.creatinina = treatment.creatinina;

          //COLESTEROL
          nashData.colesterol = treatment.colesterol;

          //HDL
          nashData.hdl = treatment.hdl;

          //LDL
          nashData.ldl = treatment.ldl;

          //VLDL
          nashData.vldl = treatment.vldl;

          //INDICE ATEROGENICO
          nashData.indice_aterogenico = treatment.indice_aterogenico;

          //TRIGLICERIDOS
          nashData.trigliceridos = treatment.trigliceridos;

          //BT
          nashData.bt = treatment.bt;

          //BD
          nashData.bd = treatment.bd;

          //BI
          nashData.bi = treatment.bi;

          //AST
          nashData.ast = treatment.ast;

          //ALT
          nashData.alt = treatment.alt;

          //FAL
          nashData.fal = treatment.fal;

          //GGT
          nashData.ggt = treatment.ggt;

          //ALBUMINA
          nashData.albumina = treatment.albumina;

          //INSULINA SERICA
          nashData.insulina_serica = treatment.insulina_serica;

          //HOMA IR
          nashData.homa_ir = treatment.homa_ir;

          //PCR ULTRASENSIBLE
          nashData.pcr_ultrasensible = treatment.pcr_ultrasensible;

          //ELASTOGRAFIA TRANSITORIA (CAP)
          nashData.elastrografia_cap = treatment.elastrografia_cap;

          //GRADO DE ESTEATOSIS
          nashData.grado_esteatosis = treatment.grado_esteatosis;

          //ELASTOGRAFIA TRANSITORIA (KPa)
          nashData.elastrografia_kpa = treatment.elastrografia_kpa;

          //Grado fibrosis
          nashData.grado_fibrosis = treatment.grado_fibrosis;

          //NAFLD FIBROSIS
          nashData.nafld_fibrosis = treatment.nafld_fibrosis;

          //FIB-4 SCORE
          nashData.fib_4 = treatment.fib_4;

          //APRI
          nashData.apri = treatment.apri;

          //HBsAg
          nashData.hbsag = treatment.hbsag;

          //HBeAg
          nashData.hbeag = treatment.hbeag;

          //ANTICUERPOS ANTI HBs
          nashData.anticuerpos_hbs = treatment.anticuerpos_hbs;

          //ANTICUERPOS ANTI HBe
          nashData.anticuerpos_hbe = treatment.anticuerpos_hbe;

          //ANTICUERPOS ANTI VHC
          nashData.anticuerpos_vhc = treatment.anticuerpos_vhc;

          //BIOPSIA HEPATICA
          nashData.biopsia_hepatica = treatment.biopsia_hepatica;

          //INDICACIONES DE LA BIOPSIA
          nashData.indicaciones_biopsia = treatment.indicaciones_biopsia;

          //GRADO DE ACTIVIDAD POR BIOPSIA HEPATICA
          nashData.grado_actividad_bh = treatment.grado_actividad_bh;

          //GRADO DE FIBROSIS POR BIOPSIA HEPATICA
          nashData.grado_fibrosis_bh = treatment.grado_fibrosis_bh;

          // GRADO DE ESTEATOSIS POR BIOPSIA HEPATICA
          nashData.grado_esteatosis_bh = treatment.grado_esteatosis_bh;

          //TRATAMIENTO NASH
          nashData.tratamiento_nash = treatment.tratamiento_nash;

          //INICIO DEL TRATAMIENTO
          if (treatment.inicio_tratamiento === "null" || treatment.inicio_tratamiento === null || treatment.inicio_tratamiento === ''){
            nashData.inicio_tratamiento = "1900-01-01";
          }else{
            nashData.inicio_tratamiento = treatment.inicio_tratamiento;
          }

          //DURACION DEL TRATAMIENTO
          nashData.duracion_tratamiento = treatment.duracion_tratamiento;

          //PIOGLITAZONA
          nashData.pioglitazona = treatment.pioglitazona;

          //SELONSERTIB
          nashData.selonsertib = treatment.selonsertib;

          //ELAFIBRANOR
          nashData.elafibranor = treatment.elafibranor;

          //CENICRIVIROC
          nashData.cenicriviroc = treatment.cenicriviroc;

          //RESMETIROM
          nashData.resmetirom = treatment.resmetirom;

          //LIRAGLUTIDE
          nashData.liraglutide = treatment.liraglutide;

          //METFORMIN
          nashData.metformin = treatment.metformin;

          //PUNTAJE NAS
          nashData.puntaje_nas = treatment.puntaje_nas;

          //EVOLUCIÓN POST TRATAMIENTO
          nashData.evolucion_post_tratamiento = treatment.evolucion_post_tratamiento;

          //vhcData.comentarios = treatment.comentarios;//Comentarios

          //nashData.creation_userid = treatment.creation_userid;
          //nashData.creation_username = treatment.creation_username;
          //nashData.creation_date = treatment.creation_date;
          //nashData.creation_time = treatment.creation_time;

          nashData.modification_userid = treatment.modification_userid;
          nashData.modification_username = treatment.modification_username;
          nashData.modification_date = treatment.modification_date;
          nashData.modification_time = treatment.modification_time;

          nashData.status = treatment.status;
          nashData.row_color = "row_update";// Nuevos" treatment.row_color;"

          // console.log("Color: " + nashData.row_color);
          this.NASHRecordUpdate[id] = nashData;
          //
          //this.NASHRecord[i] = nashData;
          treatment.row_color = nashData.row_color;
          //console.log(this.NASHRecord[i]);
          //console.log(this.NASHRecordUpdate);
          //console.log("Actualizando.." + id + " " + column_name);
          if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

          } else {
            if (this.regexValidation(treatment.birthdate) == "OK.") {
              nashData.birthdate = treatment.birthdate;
              //console.log("Fecha correcta.");
              this.save_disabled_nash = true;
              this.save_enabled_nash = false;
            } else {
              //console.log("Error en formato de la Fecha de Nacimiento.");
            }
          }

        } else {
          this.create_flag = true;
          const nashData = {} as nashTreatmentModel;

          //MES
          nashData.month_execution = treatment.month_execution;

          //INICIALES
          nashData.initials = treatment.initials;

          //nashData.expediente_id = treatment.expediente_id; //Expediente id

          if (treatment.birthdate === "null" || treatment.birthdate === null || treatment.birthdate === '') {

          } else {
            nashData.birthdate = treatment.birthdate;
          }

          //EDAD
          nashData.edad = treatment.age;

          //GENERO
          nashData.gender = treatment.gender;//Género

          //ESTADO
          nashData.state = treatment.state;

          //FECHA DIAGNOSTICO
          if (treatment.diagnostic_date === "null" || treatment.diagnostic_date === null || treatment.diagnostic_date === ''){
            nashData.diagnostic_date = "1900-01-01";
          }else{
            nashData.diagnostic_date = treatment.diagnostic_date;
          }

          //PESO
          nashData.peso = treatment.peso;

          //TALLA
          nashData.talla = treatment.talla;

          //IMC
          nashData.imc = treatment.imc;

          //OBESIDAD
          nashData.obesidad = treatment.obesidad;

          //SOBREPESO
          nashData.sobrepeso = treatment.sobrepeso;

          //CIRCUNFERENCIA CINTURA
          nashData.circunferencia_cintura = treatment.circunferencia_cintura;

          //CIRCUNFERENCIA CADERA
          nashData.circunferencia_cadera = treatment.circunferencia_cadera;

          //INDICE CINTURA CADERA
          nashData.indice_cintura_cadera = treatment.indice_cintura_cadera;

          //CONSUMO ALCOHOL
          nashData.consumo_alcohol = treatment.consumo_alcohol;

          //GRAMOS DE ALCOHOL
          nashData.gramos_alcohol = treatment.gramos_alcohol;

          //DIABETES MELLITUS
          nashData.diabetes_mellitus = treatment.diabetes_mellitus;

          //HIPERTENSION ARTERIAL
          nashData.hipertension_arterial = treatment.hipertension_arterial;

          //HIPERCOLESTEROLEMIA
          nashData.hipercolesterolemia = treatment.hipercolesterolemia;

          //HIPERTRIGLICERIDEMIA
          nashData.hipertrigliceridemia = treatment.hipertrigliceridemia;

          //HIPOTIROIDISMO
          nashData.hipotiroidismo = treatment.hipotiroidismo;

          //PRESION SISTOLICA
          nashData.presion_sistolica = treatment.presion_sistolica;

          //PRESION DIASTOLICA
          nashData.presion_diastolica = treatment.presion_diastolica;

          //ANTIHIPERTENSIVOS
          nashData.antihipertensivos = treatment.antihipertensivos;

          //CLASE ANTIHIPERTENSIVOS
          nashData.clase_antihipertensivos = treatment.clase_antihipertensivos;

          //HIPOGLUCEMIANTE
          nashData.hipoglucemiante = treatment.hipoglucemiante;

          //HIPOGLUCEMIANTES ORALES
          nashData.hipoglucemiantes_orales = treatment.hipoglucemiantes_orales;

          //USO INSULINA
          nashData.uso_insulina = treatment.uso_insulina;

          //ESTATINAS
          nashData.estatinas = treatment.estatinas;

          //CLASE ESTATINAS
          nashData.clase_estatina = treatment.clase_estatina;

          //FIBRATOS
          nashData.fibratos = treatment.fibratos;

          //CLASE FIBRATOS
          nashData.clase_fibratos = treatment.clase_fibratos;

          //ANTIOXIDANTES
          nashData.antioxidantes = treatment.antioxidantes;

          //CLASE ANTIOXIDANTES
          nashData.clase_antioxidantes = treatment.clase_antioxidantes;

          //HEMOGLOBINA
          nashData.hemoglobina = treatment.hemoglobina;

          //PLAQUETAS
          nashData.plaquetas = treatment.plaquetas;

          //GLUCOSA
          nashData.glucosa = treatment.glucosa;

          //CREATININA
          nashData.creatinina = treatment.creatinina;

          //COLESTEROL
          nashData.colesterol = treatment.colesterol;

          //HDL
          nashData.hdl = treatment.hdl;

          //LDL
          nashData.ldl = treatment.ldl;

          //VLDL
          nashData.vldl = treatment.vldl;

          //INDICE ATEROGENICO
          nashData.indice_aterogenico = treatment.indice_aterogenico;

          //TRIGLICERIDOS
          nashData.trigliceridos = treatment.trigliceridos;

          //BT
          nashData.bt = treatment.bt;

          //BD
          nashData.bd = treatment.bd;

          //BI
          nashData.bi = treatment.bi;

          //AST
          nashData.ast = treatment.ast;

          //ALT
          nashData.alt = treatment.alt;

          //FAL
          nashData.fal = treatment.fal;

          //GGT
          nashData.ggt = treatment.ggt;

          //ALBUMINA
          nashData.albumina = treatment.albumina;

          //INSULINA SERICA
          nashData.insulina_serica = treatment.insulina_serica;

          //HOMA IR
          nashData.homa_ir = treatment.homa_ir;

          //PCR ULTRASENSIBLE
          nashData.pcr_ultrasensible = treatment.pcr_ultrasensible;

          //ELASTOGRAFIA TRANSITORIA (CAP)
          nashData.elastrografia_cap = treatment.elastrografia_cap;

          //GRADO DE ESTEATOSIS
          nashData.grado_esteatosis = treatment.grado_esteatosis;

          //ELASTOGRAFIA TRANSITORIA (KPa)
          nashData.elastrografia_kpa = treatment.elastrografia_kpa;

          //Grado fibrosis
          nashData.grado_fibrosis = treatment.grado_fibrosis;

          //NAFLD FIBROSIS
          nashData.nafld_fibrosis = treatment.nafld_fibrosis;

          //FIB-4 SCORE
          nashData.fib_4 = treatment.fib_4;

          //APRI
          nashData.apri = treatment.apri;

          //HBsAg
          nashData.hbsag = treatment.hbsag;

          //HBeAg
          nashData.hbeag = treatment.hbeag;

          //ANTICUERPOS ANTI HBs
          nashData.anticuerpos_hbs = treatment.anticuerpos_hbs;

          //ANTICUERPOS ANTI HBe
          nashData.anticuerpos_hbe = treatment.anticuerpos_hbe;

          //ANTICUERPOS ANTI VHC
          nashData.anticuerpos_vhc = treatment.anticuerpos_vhc;

          //BIOPSIA HEPATICA
          nashData.biopsia_hepatica = treatment.biopsia_hepatica;

          //INDICACIONES DE LA BIOPSIA
          nashData.indicaciones_biopsia = treatment.indicaciones_biopsia;

          //GRADO DE ACTIVIDAD POR BIOPSIA HEPATICA
          nashData.grado_actividad_bh = treatment.grado_actividad_bh;

          //GRADO DE FIBROSIS POR BIOPSIA HEPATICA
          nashData.grado_fibrosis_bh = treatment.grado_fibrosis_bh;

          // GRADO DE ESTEATOSIS POR BIOPSIA HEPATICA
          nashData.grado_esteatosis_bh = treatment.grado_esteatosis_bh;

          //TRATAMIENTO NASH
          nashData.tratamiento_nash = treatment.tratamiento_nash;

          //INICIO DEL TRATAMIENTO
          if (treatment.inicio_tratamiento === "null" || treatment.inicio_tratamiento === null || treatment.inicio_tratamiento === ''){
            nashData.inicio_tratamiento = "1900-01-01";
          }else{
            nashData.inicio_tratamiento = treatment.inicio_tratamiento;
          }

          //DURACION DEL TRATAMIENTO
          nashData.duracion_tratamiento = treatment.duracion_tratamiento;

          //PIOGLITAZONA
          nashData.pioglitazona = treatment.pioglitazona;

          //SELONSERTIB
          nashData.selonsertib = treatment.selonsertib;

          //ELAFIBRANOR
          nashData.elafibranor = treatment.elafibranor;

          //CENICRIVIROC
          nashData.cenicriviroc = treatment.cenicriviroc;

          //RESMETIROM
          nashData.resmetirom = treatment.resmetirom;

          //LIRAGLUTIDE
          nashData.liraglutide = treatment.liraglutide;

          //METFORMIN
          nashData.metformin = treatment.metformin;

          //PUNTAJE NAS
          nashData.puntaje_nas = treatment.puntaje_nas;

          //EVOLUCIÓN POST TRATAMIENTO
          nashData.evolucion_post_tratamiento = treatment.evolucion_post_tratamiento;


          nashData.creation_userid = treatment.creation_userid;
          nashData.creation_username = treatment.creation_username;
          nashData.creation_date = treatment.creation_date;
          nashData.creation_time = treatment.creation_time;
          nashData.modification_userid = treatment.modification_userid;
          nashData.modification_username = treatment.modification_username;
          nashData.modification_date = treatment.modification_date;
          nashData.modification_time = treatment.modification_time;

          nashData.status = treatment.status;
          nashData.row_color = "row_new";// Nuevos" treatment.row_color;"
          this.NASHRecordCreate[i] = this.NASHRecord[i];
        }
      } else {
        console.log("Error en formato de la Fecha de Nacimiento.");
        this.message_notification = "Error en el formato de fecha. Formato correcto YYYY-MM-DD";
        treatment.style_input_date = "control-date-error";
        this.save_disabled_nash = false;
        this.save_enabled_nash = true;
      }
    }
  }


  //NASH 9 sgo
  updateStatusNASH(id, status, treatment, i) {

    this.update_flag = true;
    const nashData = {} as nashTreatmentModel;

    nashData.MD_hospital_id = treatment.MD_hospital_id;
    nashData.MD_entity_id = this.entity_id;
    nashData.research_nash_id = id;

    nashData.month_execution = treatment.month_execution;
    if (!treatment.checkbox_value) {
      treatment.checkbox_value = false;
      nashData.checkbox_value = false;//enabled
      nashData.status = 0;
      treatment.status = nashData.status;
      nashData.row_color = "row_disabled";// Nuevos" treatment.row_color;
      treatment.row_color = nashData.row_color;
      treatment.disabled_row = true;
      nashData.active_gray_sem = "row_sem_gray_visible";
    } else {
      treatment.checkbox_value = true;
      nashData.checkbox_value = true;//disabled
      nashData.status = 1;
      treatment.status = nashData.status;
      nashData.row_color = "row_enabled";// Nuevos" treatment.row_color;"
      treatment.row_color = nashData.row_color;
      treatment.disabled_row = false;
      nashData.active_gray_sem = "row_sem_gray_hidden";
    }
    // console.log("Color: " + nashData.row_color);
    this.NASHRecordUpdate[id] = nashData;
    this.guardarRegistroNASH();
  }

  //NASH 10 sgo
  getNASHData() {

    //console.log("Consulta por hospitales: " + this.comboHospital.hospital_id + " -- " + this.start_date);

    this.progres_spinner_refresh_nash_treatment = false;
    this.hidden_update_btn = true;

    this.hospital_id = (this.comboHospital.hospital_id != undefined) ? this.comboHospital.hospital_id : 0;
    //hospital_id, role_id,entity_id,treatment_id,status_id, start_date, end_date
    this.nashTreatmentService.getNASHTreatment(this.hospital_id, this.role_id, this.entity_id, 4, this.status_id, this.start_date, this.end_date).subscribe((resp_data_get: any) => {

      this.NASHRecordEstilo = [];
      this.NASHRecordEstiloExcel = [];
      if (resp_data_get.code == 200) {
        if (resp_data_get.data.data.length > 0) {

          resp_data_get.data.data.map((r) => {

            const nashData = {} as nashTreatmentModel;
            const nashDataExcel = {} as nashTreatmentModel;

            nashData.MD_entity_id = r.MD_entity_id;
            nashData.MD_hospital_id = r.MD_hospital_id;
            nashData.active_green_sem = "row_sem_green_visible";

            nashData.active_red_sem = "row_sem_red";///initial value

            nashData.research_date_begin = r.research_date_begin;
            nashData.research_date_end = r.research_date_end;
            nashData.research_nash_id = r.research_nash_id;
            nashData.month_execution = r.month_execution;

            //Iniciales
            nashData.initials = r.initials;
            if (r.initials == "" || r.initials == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Fecha Nacimiento
            if (r.birthdate == "" || r.birthdate == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            } else {
              nashData.birthdate = r.birthdate;
            }

            //Edad
            nashData.edad = r.edad;
            if (r.edad == "" || r.edad == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Genero
            nashData.gender = r.gender;
            if (r.gender == "" || r.gender == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Estado
            nashData.state = r.state;
            if (r.state == "" || r.state == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Fecha Diagnostico
            nashData.diagnostic_date = r.diagnostic_date;

            //Peso
            nashData.peso = r.peso;
            if (r.peso == "" || r.peso == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Talla
            nashData.talla = r.talla;
            if (r.talla == "" || r.talla == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //IMC
            nashData.imc = r.imc;
            if (r.imc == "" || r.imc == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Obesidad
            nashData.obesidad = r.obesidad;
            if (r.obesidad == "" || r.obesidad == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Sobrepeso
            nashData.sobrepeso = r.sobrepeso;
            if (r.sobrepeso == "" || r.sobrepeso == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Circunferencia cintura
            nashData.circunferencia_cintura = r.circunferencia_cintura;
            if (r.circunferencia_cintura == "" || r.circunferencia_cintura == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Circunferencia cadera
            nashData.circunferencia_cadera = r.circunferencia_cadera;
            if (r.circunferencia_cadera == "" || r.circunferencia_cadera == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Indice cintura cadera
            nashData.indice_cintura_cadera = r.indice_cintura_cadera;
            if (r.indice_cintura_cadera == "" || r.indice_cintura_cadera == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Consumo alcohol
            nashData.consumo_alcohol = r.consumo_alcohol;
            if (r.consumo_alcohol == "" || r.consumo_alcohol == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Gramos de alcohol
            nashData.gramos_alcohol = r.gramos_alcohol;
            if (r.gramos_alcohol == "" || r.gramos_alcohol == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Diabetes mellitus
            nashData.diabetes_mellitus = r.diabetes_mellitus;
            if (r.diabetes_mellitus == "" || r.diabetes_mellitus == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipertension arterial
            nashData.hipertension_arterial = r.hipertension_arterial;
            if (r.hipertension_arterial == "" || r.hipertension_arterial == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipercolesterolemia
            nashData.hipercolesterolemia = r.hipercolesterolemia;
            if (r.hipercolesterolemia == "" || r.hipercolesterolemia == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipertrigliceridemia
            nashData.hipertrigliceridemia = r.hipertrigliceridemia;
            if (r.hipertrigliceridemia == "" || r.hipertrigliceridemia == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipotiroidismo
            nashData.hipotiroidismo = r.hipotiroidismo;
            if (r.hipotiroidismo == "" || r.hipotiroidismo == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Presion sistolica
            nashData.presion_sistolica = r.presion_sistolica;
            if (r.presion_sistolica == "" || r.presion_sistolica == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Presion diastolica
            nashData.presion_diastolica = r.presion_diastolica;
            if (r.presion_diastolica == "" || r.presion_diastolica == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Antihipertensivos
            nashData.antihipertensivos = r.antihipertensivos;
            if (r.antihipertensivos == "" || r.antihipertensivos == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Clase Antihipertensivos
            nashData.clase_antihipertensivos = r.clase_antihipertensivos;
            if (r.clase_antihipertensivos == "" || r.clase_antihipertensivos == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipoglucemiante
            nashData.hipoglucemiante = r.hipoglucemiante;
            if (r.hipoglucemiante == "" || r.hipoglucemiante == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hipoglucemiantes orales
            nashData.hipoglucemiantes_orales = r.hipoglucemiantes_orales;
            if (r.hipoglucemiantes_orales == "" || r.hipoglucemiantes_orales == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Uso insulina
            nashData.uso_insulina = r.uso_insulina;
            if (r.uso_insulina == "" || r.uso_insulina == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Estatinas
            nashData.estatinas = r.estatinas;
            if (r.estatinas == "" || r.estatinas == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Clase Estatinas
            nashData.clase_estatina = r.clase_estatina;
            if (r.clase_estatina == "" || r.clase_estatina == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Fibratos
            nashData.fibratos = r.fibratos;
            if (r.fibratos == "" || r.fibratos == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Clase Fibratos
            nashData.clase_fibratos = r.clase_fibratos;
            if (r.clase_fibratos == "" || r.clase_fibratos == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Antioxidantes
            nashData.antioxidantes = r.antioxidantes;
            if (r.antioxidantes == "" || r.antioxidantes == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Clase Antioxidantes
            nashData.clase_antioxidantes = r.clase_antioxidantes;
            if (r.clase_antioxidantes == "" || r.clase_antioxidantes == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Hemoglobina
            nashData.hemoglobina = r.hemoglobina;
            if (r.hemoglobina == "" || r.hemoglobina == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Plaquetas
            nashData.plaquetas = r.plaquetas;
            if (r.plaquetas == "" || r.plaquetas == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Glucosa
            nashData.glucosa = r.glucosa;
            if (r.glucosa == "" || r.glucosa == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Creatinina
            nashData.creatinina = r.creatinina;
            if (r.creatinina == "" || r.creatinina == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Colesterol
            nashData.colesterol = r.colesterol;
            if (r.colesterol == "" || r.colesterol == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //HDL
            nashData.hdl = r.hdl;
            if (r.hdl == "" || r.hdl == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //LDL
            nashData.ldl = r.ldl;
            if (r.ldl == "" || r.ldl == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //VLDL
            nashData.vldl = r.vldl;
            if (r.vldl == "" || r.vldl == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Indice aterogenico
            nashData.indice_aterogenico = r.indice_aterogenico;
            if (r.indice_aterogenico == "" || r.indice_aterogenico == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Trigliceridos
            nashData.trigliceridos = r.trigliceridos;
            if (r.trigliceridos == "" || r.trigliceridos == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //BT
            nashData.bt = r.bt;
            if (r.bt == "" || r.bt == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //BD
            nashData.bd = r.bd;
            if (r.bd == "" || r.bd == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //BI
            nashData.bi = r.bi;
            if (r.bi == "" || r.bi == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //AST
            nashData.ast = r.ast;
            if (r.ast == "" || r.ast == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ALT
            nashData.alt = r.alt;
            if (r.alt == "" || r.alt == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //FAL
            nashData.fal = r.fal;
            if (r.fal == "" || r.fal == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //GGT
            nashData.ggt = r.ggt;
            if (r.ggt == "" || r.ggt == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Albumina
            nashData.albumina = r.albumina;
            if (r.albumina == "" || r.albumina == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Insulina serica
            nashData.insulina_serica = r.insulina_serica;
            if (r.insulina_serica == "" || r.insulina_serica == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Homa ir
            nashData.homa_ir = r.homa_ir;
            if (r.homa_ir == "" || r.homa_ir == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Pcr ultrasensible
            nashData.pcr_ultrasensible = r.pcr_ultrasensible;
            if (r.pcr_ultrasensible == "" || r.pcr_ultrasensible == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ELASTOGRAFIA TRANSITORIA (CAP)
            nashData.elastrografia_cap = r.elastrografia_cap;
            if (r.elastrografia_cap == "" || r.elastrografia_cap == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //GRADO DE ESTEATOSIS
            nashData.grado_esteatosis = r.grado_esteatosis;
            if (r.grado_esteatosis == "" || r.grado_esteatosis == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ELASTOGRAFIA TRANSITORIA (KPa)
            nashData.elastrografia_kpa = r.elastrografia_kpa;
            if (r.elastrografia_kpa == "" || r.elastrografia_kpa == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //Grado fibrosis
            nashData.grado_fibrosis = r.grado_fibrosis;
            if (r.grado_fibrosis == "" || r.grado_fibrosis == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //NAFLD FIBROSIS
            nashData.nafld_fibrosis = r.nafld_fibrosis;
            if (r.nafld_fibrosis == "" || r.nafld_fibrosis == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //FIB-4 SCORE
            nashData.fib_4 = r.fib_4;
            if (r.fib_4 == "" || r.fib_4 == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //APRI
            nashData.apri = r.apri;
            if (r.apri == "" || r.apri == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //HBsAg
            nashData.hbsag = r.hbsag;
            if (r.hbsag == "" || r.hbsag == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //HBeAg
            nashData.hbeag = r.hbeag;
            if (r.hbeag == "" || r.hbeag == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ANTICUERPOS ANTI HBs
            nashData.anticuerpos_hbs = r.anticuerpos_hbs;
            if (r.anticuerpos_hbs == "" || r.anticuerpos_hbs == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ANTICUERPOS ANTI HBe
            nashData.anticuerpos_hbe = r.anticuerpos_hbe;
            if (r.anticuerpos_hbe == "" || r.anticuerpos_hbe == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ANTICUERPOS ANTI VHC
            nashData.anticuerpos_vhc = r.anticuerpos_vhc;
            if (r.anticuerpos_vhc == "" || r.anticuerpos_vhc == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //BIOPSIA HEPATICA
            nashData.biopsia_hepatica = r.biopsia_hepatica;
            if (r.biopsia_hepatica == "" || r.biopsia_hepatica == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //INDICACIONES DE LA BIOPSIA
            nashData.indicaciones_biopsia = r.indicaciones_biopsia;
            if (r.indicaciones_biopsia == "" || r.indicaciones_biopsia == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //GRADO DE ACTIVIDAD POR BIOPSIA HEPATICA
            nashData.grado_actividad_bh = r.grado_actividad_bh;
            if (r.grado_actividad_bh == "" || r.grado_actividad_bh == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //GRADO DE FIBROSIS POR BIOPSIA HEPATICA
            nashData.grado_fibrosis_bh = r.grado_fibrosis_bh;
            if (r.grado_fibrosis_bh == "" || r.grado_fibrosis_bh == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            // GRADO DE ESTEATOSIS POR BIOPSIA HEPATICA
            nashData.grado_esteatosis_bh = r.grado_esteatosis_bh;
            if (r.grado_esteatosis_bh == "" || r.grado_esteatosis_bh == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //TRATAMIENTO NASH
            nashData.tratamiento_nash = r.tratamiento_nash;
            if (r.tratamiento_nash == "" || r.tratamiento_nash == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //INICIO DEL TRATAMIENTO
            nashData.inicio_tratamiento = r.inicio_tratamiento;
            if (r.inicio_tratamiento == "" || r.inicio_tratamiento == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //DURACION DEL TRATAMIENTO
            nashData.duracion_tratamiento = r.duracion_tratamiento;
            if (r.duracion_tratamiento == "" || r.duracion_tratamiento == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //PIOGLITAZONA
            nashData.pioglitazona = r.pioglitazona;
            if (r.pioglitazona == "" || r.pioglitazona == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //SELONSERTIB
            nashData.selonsertib = r.selonsertib;
            if (r.selonsertib == "" || r.selonsertib == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //ELAFIBRANOR
            nashData.elafibranor = r.elafibranor;
            if (r.elafibranor == "" || r.elafibranor == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //CENICRIVIROC
            nashData.cenicriviroc = r.cenicriviroc;
            if (r.cenicriviroc == "" || r.cenicriviroc == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //RESMETIROM
            nashData.resmetirom = r.resmetirom;
            if (r.resmetirom == "" || r.resmetirom == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //LIRAGLUTIDE
            nashData.liraglutide = r.liraglutide;
            if (r.liraglutide == "" || r.liraglutide == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //METFORMIN
            nashData.metformin = r.metformin;
            if (r.metformin == "" || r.metformin == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //PUNTAJE NAS
            nashData.puntaje_nas = r.puntaje_nas;
            if (r.puntaje_nas == "" || r.puntaje_nas == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //EVOLUCION POST TRATAMIENTO
            nashData.evolucion_post_tratamiento = r.evolucion_post_tratamiento;
            if (r.evolucion_post_tratamiento == "" || r.evolucion_post_tratamiento == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //HOSPITAL
            nashData.MD_hospital_id = r.MD_hospital_id;
            if (r.MD_hospital_id == "" || r.MD_hospital_id == null) {
              nashData.active_red_sem = "row_sem_red_visible";
              nashData.active_green_sem = "row_sem_green_hidden";
            }

            //FECHA DE REGISTRO
            nashData.creation_date = r.creation_date;

            //HORA DE REGISTRO
            nashData.creation_time = r.creation_time;

            //USUARIO
            nashData.creation_username = r.creation_username;

            //
            nashData.creation_userid = r.creation_userid;
            nashData.modification_username = r.modification_username;
            nashData.modification_date = r.modification_date;
            nashData.modification_time = r.modification_time;
            nashData.status = r.status;
            if (nashData.status == 1) {
              console.log(">> Status: " + nashData.status);
              nashData.checkbox_value = true;//enabled
              nashData.disabled_row = false;
              nashData.row_color = "row_get";// Nuevos" treatment.row_color;"
              nashData.active_gray_sem = "row_sem_gray_hidden";
              nashData.checkbox_status = true;
            } else {
              console.log("Status: " + nashData.status);
              nashData.checkbox_value = false;//disabled
              nashData.disabled_row = true;
              nashData.checkbox_status = true;
              nashData.row_color = "row_disabled";// Nuevos" treatment.row_color;"
              nashData.active_gray_sem = "row_sem_gray_visible";
              nashData.active_red_sem = "row_sem_red";
              nashData.active_green_sem = "row_sem_green_hidden";
            }
            this.NASHRecordEstilo.push(nashData);
            this.NASHRecord = this.NASHRecordEstilo;
            this.NASHRecordEstiloExcel.push(this.getExcelDataNASH(nashData));
            this.hidden_update_btn = false;
            this.progres_spinner_refresh_nash_treatment = true;
          });
        } else {
          console.log("Minimizar");
          this.minimizeScreen();
          this.staticAlertClosed2 = false;
          this.alert_2.type = 'Warning';
          this.alert_2.message = 'No se encontraron datos. Intente aumentando el rango de fechas o cambiando los parámetros de búsqueda';
          this.reset();
          this.progres_spinner_refresh_nash_treatment = true;
          this.hidden_update_btn = false;
        }
      } else {
        this.staticAlertClosed2 = false;
        this.alert_2.type = 'danger';
        this.alert_2.message = 'Hubo un error al obtener la información.';
        this.reset();
        this.progres_spinner_refresh_nash_treatment = true;
        this.hidden_update_btn = false;
      }
      this.NASHRecordExcel = this.NASHRecordEstiloExcel;
      this.NASHRecord = this.NASHRecordEstilo;

    }, err => {
      this.staticAlertClosed2 = false;
      this.alert_2.type = 'danger';
      this.alert_2.message = 'Hubo un error al obtener la información.';
      this.reset();
      this.progres_spinner_refresh_nash_treatment = true;
      this.hidden_update_btn = false;
    });
  }

  //NASH 11 sgo
  updateTableRecordsNASH() {
    this.getNASHData();
  }


  //Creada SGO
  statusFilterNASH() {
    if (this.status_filter == 1) {
      this.status_id = 1;
    }
    if (this.status_filter == 2) {
      this.status_id = 0;
    }
    if (this.status_filter == 3) {
      this.status_id = 3;
    }
    this.getNASHData();
  }

//#endregion


}

export class country {
  id: number;
  country: string;
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
