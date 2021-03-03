import { NumberCardModule } from "@swimlane/ngx-charts";

export interface vhcTreatmentData{
	data: vhcTreatmentModel[];
}

export class vhcTreatmentModel{
	research_vhc_id: 			number;
	MD_entity_id: 				number; //IN pi_MD_entity_id	int(11),
	MD_hospital_id:				number ;//IN pi_MD_hospital_idint(11),
	MD_patient_id:				number ;//IN pi_MD_patient_id	int(11),
	MD_doctor_id:				number ;//IN pi_MD_doctor_id	int(11),
	MD_nurse_id:				number ;//IN pi_MD_nurse_id	int(11),
	research_date_begin:		string	;//IN pi_research_date_begin	date,
	research_date_end:			string	;//IN pi_research_date_enddate,
	research_status_id:			number	;//IN pi_research_status_id	int(11),
	month_execution:			number	;//IN pi_month_executionint(11),
	/////////////////////////////////////////////////////////
	initials:					string;//IN pi_initialsvarchar(10),
	birthdate:					string;//IN pi_birthdatedate,
	age:						number; //IN pi_age	int(11),
	gender:						number	;//	IN pi_genderint(11),
	country:					number;//IN pi_countryint(11),
	state:						number;//IN pi_state int(11),
	year:						number;//IN pi_year_dx_vhc	int(11),
	transmission_mechanism:		number;//IN pi_mechanism_transmissionint(11),
	comorbilidades:				number;//IN pi_comorbilidadesint(11),
	manif_extrahepaticas:		number;//IN pi_manif_extrahepaticas	int(11),
	grado_fibrosis_hepatica:	number;//IN pi_grado_fibrosis_hepaticaint(11),
	cirrosis:					number;//IN pi_cirrosisint(11),
	estado_cirrosis_compensada:	number;//IN pi_estado_cirrosis_compensada	int(11),
	cirrosis_descompensada:		number;//IN pi_cirrosis_descompensadaint(11),
	child_inicial:				number;//IN pi_child_inicial	int(11),
	child_final:				number;//IN pi_child_final	int(11),
	meld_inicial:				number;//IN pi_meld_inicial	int(11),
	meld_final:					number;//IN pi_meld_final	int(11),
	esofagicas:					number;//IN pi_v_esofagicas	int(11),
	estado_inicial:				number;//IN pi_estado_inicialint(11),
	tipo_tx_previo:				number;//IN pi_tipo_tx_previovarchar(45),
	year_inicio_tx_add:			number;//IN pi_year_inicio_tx_add	int(11),
	esquema_tratamiento:		number;//IN pi_esquema_tratamiento	int(11),
	tiempo_tratamiento_meses:	number;//IN pi_tiempo_tratamiento_mesesint(11),
	rvs:						number;//IN pi_rvs	int(11),
	cv_inicial:					number;//IN pi_cv_inicial	int(11),
	log_inicial:				number;//IN pi_log_inicial	int(11),
	cv_rvs12:					number;//IN pi_cv_rvs12int(11),
	log_rvs12:					number;//IN pi_log_rvs12int(11),
	funcion_renal:				number;//IN pi_funcion_renal	int(11),
	hb_inicial:					number;//IN pi_hb_inicial	int(11),
	hb_final:					number;//IN pi_hb_finalint(11),
	leucocitos_inicial:			number;//IN pi_leucocitos_inicial	int(11),
	leucocitos_final:			number;//IN pi_leucocitos_finalint(11),
	plaquetas_inicial:			number;//IN pi_plaquetas_inicialint(11),
	plaquetas_final:			number;//IN pi_plaquetas_finalint(11),
	creatinina_inicial:			number;//IN pi_creatinina_inicial	int(11),
	creatinina_final:			number;//IN pi_creatinina_finalint(11),
	tgo_inicial:				number;//IN pi_tgo_inicial	int(11),
	tgo_final:					number;//IN pi_tgo_finalint(11),
	tgp_inicial:				number;//IN pi_tgp_inicial	int(11),
	tgp_final:					number;//IN pi_tgp_finalint(11),
	alumina_inicial:			number;//IN pi_alumina_inicialint(11),
	alumina_final:				number;//IN pi_alumina_final	int(11),
	inr_inicial:				number;//IN pi_inr_inicial	int(11),
	inr_final:					number;//IN pi_inr_finalint(11),
	bt_inicial:					number;//IN pi_bt_inicial	int(11),
	bt_final:					number;//IN pi_bt_finalint(11),
	efecto_adverso:				number;//IN pi_efecto_adversoint(11),
	descripcion_adverso:		number;//IN pi_descripcion_adverso	text,
	severidad_efecto_adverso:	number;//IN pi_severidad_efecto_adversoint(11),
	accion_tomada:				number;//IN pi_accion_tomada	int(11),
  comentarios:				string;//IN pi_comentarios	text,
  glucosa_inicial:    number;//
  glucosa_final:      number;
  genotipo:           number;

  funcion_renal_post: number;//		funcion_renal_post int(11)
  fibroscan_sw_basal: number;//		fibroscan_sw_basal int(11)
  fibroscan_sw_final: number;//		fibroscan_sw_final int(11)
  apri_basal:         number;//		apri_basal int(11)
  apri_final:         number;//		apri_final int(11)
  fib4_basal:         number;//		fib4_basal int(11)
  fib4_final:         number;//		fib4_final int(11)
  expediente_id:      string;//		expediente_id varchar(30)
  dm:                 number;//		DM
  hta:                number;//		HTA
  obesidad:           number;//		Obesidad
  hipertiroidismo:    number;//		Hipertiroidismo
  sindrome_metabolico:number;//		Sindrome metabolico
  cardiopatia_isquemica: number;//		Cardiopatia Isquémica
  irc_dialisis:       number;//		7 IRC en dialisis
  irc_hemodilaisis:   number;//		8 IRC en hemodilaisis
  irc_sin_tx_sustiututivo: number;//		9 IRC sin tx sustiututivo
  hipotiroidismo:     number;//		10 hipotiroidismo
  dislipidemia:       number;//		11 dislipidemia
  vih:                number;//		VIH
  trasplante_hepatico:number;//		13  Trasplante hepatico
  trasplante_renal:   number;//		14 Trasplante renal
  sobre_peso:         number;//		Sobre peso
  hepatitis_b:        number;//		Hepatitis B
  trastorno_consumo_alcohol:  number;//		Trastorno por consumo de alcohol
  varices_esofagicas: number;//		varices_esofagicas
  hemorragia_variceal:number;//		hemorragia_variceal
  ascitis:            number;//		ascitis
  encefalopatia:      number;//		encefalopatia
  sindrome_hepatorenal:number;//		sindrome_hepatorenal
  hepatocarcinoma:    number;//		hepatocarcinoma
  /////////////////////////////////////////
	creation_userid:			number	;
	creation_username:			string	;
	creation_date:				string	;
	creation_time:				string	;
	modification_userid:		number	;
	modification_username:		string	;
	modification_date:			string	;
	modification_time:			string	;
	status:						number	;
	/////////ADDITIONAL
    row_color:				string;
	column_color: 			string;
	active_red_sem: 		string;
	active_green_sem: 		string;
  active_gray_sem: string;
  checkbox_status: boolean;
  checkbox_value:boolean;
  disable_checkbox:boolean;
  disabled_row: boolean;
}


export class vhcTreatmentModelHeader{
    research_vhc_id: 			string;
	MD_entity_id: 				string; //IN pi_MD_entity_id	int(11),
	MD_hospital_id:				string ;//IN pi_MD_hospital_idint(11),
	MD_patient_id:				string ;//IN pi_MD_patient_id	int(11),
	MD_doctor_id:				string ;//IN pi_MD_doctor_id	int(11),
	MD_nurse_id:				string ;//IN pi_MD_nurse_id	int(11),
	research_date_begin:		string	;//IN pi_research_date_begin	date,
	research_date_end:			string	;//IN pi_research_date_enddate,
	research_status_id:			string	;//IN pi_research_status_id	int(11),
	month_execution:			string	;//IN pi_month_executionint(11),
	/////////////////////////////////////////////////////////
	initials:					string;//IN pi_initialsvarchar(10),
	birthdate:					string;//IN pi_birthdatedate,
	age:						string; //IN pi_age	int(11),
	gender:						string	;//	IN pi_genderint(11),
	country:					string;//IN pi_countryint(11),
	state:						string;//IN pi_state int(11),
	year:						string;//IN pi_year_dx_vhc	int(11),
	transmission_mechanism:		string;//IN pi_mechanism_transmissionint(11),
	comorbilidades:				string;//IN pi_comorbilidadesint(11),
	manif_extrahepaticas:		string;//IN pi_manif_extrahepaticas	int(11),
	grado_fibrosis_hepatica:	string;//IN pi_grado_fibrosis_hepaticaint(11),
	cirrosis:					string;//IN pi_cirrosisint(11),
	estado_cirrosis_compensada:	string;//IN pi_estado_cirrosis_compensada	int(11),
	cirrosis_descompensada:		string;//IN pi_cirrosis_descompensadaint(11),
	child_inicial:				string;//IN pi_child_inicial	int(11),
	child_final:				string;//IN pi_child_final	int(11),
	meld_inicial:				string;//IN pi_meld_inicial	int(11),
	meld_final:					string;//IN pi_meld_final	int(11),
	esofagicas:					string;//IN pi_v_esofagicas	int(11),
	estado_inicial:				string;//IN pi_estado_inicialint(11),
	tipo_tx_previo:				string;//IN pi_tipo_tx_previovarchar(45),
	year_inicio_tx_add:			string;//IN pi_year_inicio_tx_add	int(11),
	esquema_tratamiento:		string;//IN pi_esquema_tratamiento	int(11),
	tiempo_tratamiento_meses:	string;//IN pi_tiempo_tratamiento_mesesint(11),
	rvs:						string;//IN pi_rvs	int(11),
	cv_inicial:					string;//IN pi_cv_inicial	int(11),
	log_inicial:				string;//IN pi_log_inicial	int(11),
	cv_rvs12:					string;//IN pi_cv_rvs12int(11),
	log_rvs12:					string;//IN pi_log_rvs12int(11),
	funcion_renal:				string;//IN pi_funcion_renal	int(11),
	hb_inicial:					string;//IN pi_hb_inicial	int(11),
	hb_final:					string;//IN pi_hb_finalint(11),
	leucocitos_inicial:			string;//IN pi_leucocitos_inicial	int(11),
	leucocitos_final:			string;//IN pi_leucocitos_finalint(11),
	plaquetas_inicial:			string;//IN pi_plaquetas_inicialint(11),
	plaquetas_final:			string;//IN pi_plaquetas_finalint(11),
	creatinina_inicial:			string;//IN pi_creatinina_inicial	int(11),
	creatinina_final:			string;//IN pi_creatinina_finalint(11),
	tgo_inicial:				string;//IN pi_tgo_inicial	int(11),
	tgo_final:					string;//IN pi_tgo_finalint(11),
	tgp_inicial:				string;//IN pi_tgp_inicial	int(11),
	tgp_final:					string;//IN pi_tgp_finalint(11),
	alumina_inicial:			string;//IN pi_alumina_inicialint(11),
	alumina_final:				string;//IN pi_alumina_final	int(11),
	inr_inicial:				string;//IN pi_inr_inicial	int(11),
	inr_final:					string;//IN pi_inr_finalint(11),
	bt_inicial:					string;//IN pi_bt_inicial	int(11),
	bt_final:					string;//IN pi_bt_finalint(11),
	efecto_adverso:				string;//IN pi_efecto_adversoint(11),
	descripcion_adverso:		string;//IN pi_descripcion_adverso	text,
	severidad_efecto_adverso:	string;//IN pi_severidad_efecto_adversoint(11),
	accion_tomada:				string;//IN pi_accion_tomada	int(11),
  comentarios:				string;//IN pi_comentarios	text,
  glucosa_inicial:    string;
  glucosa_final:      string;
  genotipo:           string;

  funcion_renal_post: string;//		funcion_renal_post int(11)
  fibroscan_sw_basal: string;//		fibroscan_sw_basal int(11)
  fibroscan_sw_final: string;//		fibroscan_sw_final int(11)
  apri_basal:         string;//		apri_basal int(11)
  apri_final:         string;//		apri_final int(11)
  fib4_basal:         string;//		fib4_basal int(11)
  fib4_final:         string;//		fib4_final int(11)
  expediente_id:      string;//		expediente_id varchar(30)
  dm:                 string;//		DM
  hta:                string;//		HTA
  obesidad:           string;//		Obesidad
  hipertiroidismo:    string;//		Hipertiroidismo
  sindrome_metabolico:string;//		Sindrome metabolico
  cardiopatia_isquemica: string;//		Cardiopatia Isquémica
  irc_dialisis:       string;//		7 IRC en dialisis
  irc_hemodilaisis:   string;//		8 IRC en hemodilaisis
  irc_sin_tx_sustiututivo: string;//		9 IRC sin tx sustiututivo
  hipotiroidismo:     string;//		10 hipotiroidismo
  dislipidemia:       string;//		11 dislipidemia
  vih:                string;//		VIH
  trasplante_hepatico:string;//		13  Trasplante hepatico
  trasplante_renal:   string;//		14 Trasplante renal
  sobre_peso:         string;//		Sobre peso
  hepatitis_b:        string;//		Hepatitis B
  trastorno_consumo_alcohol:  string;//		Trastorno por consumo de alcohol
  varices_esofagicas: string;//		varices_esofagicas
  hemorragia_variceal:string;//		hemorragia_variceal
  ascitis:            string;//		ascitis
  encefalopatia:      string;//		encefalopatia
  sindrome_hepatorenal:string;//		sindrome_hepatorenal
  hepatocarcinoma:    string;//		hepatocarcinoma
	/////////////////////////////////////////
	creation_userid:			string	;
	creation_username:			string	;
	creation_date:				string	;
	creation_time:				string	;
	modification_userid:		string	;
	modification_username:		string	;
	modification_date:			string	;
	modification_time:			string	;
	status:						string	;
	/////////ADDITIONAL
}

export class comorbilidades_list_{
  comorbilidades: number;
  description: string;
}
