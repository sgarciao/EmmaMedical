export interface nashTreatmentData{
	data: nashTratment[];
}
export interface nashTratmentHeader{
    /////////////////////////////////
	research_nash_id:       String;
	entity_id:              String;
	hospital_id:            String;
	date_begin:             String;
	date_end:               String;
	research_status_id:     String;
	month_execution:        String;
	/////////////////////////////////
	short_name:             String;//initials
	birth_date:             String;
	gender:                 String;
	child_stadium:          String;
	mellitus_diabetes:      String;
	hypertension:           String;
	HIPERCOLESTEROLEMIA:    String;
	HIPERTRIGLICERIDEMIA:   String;
	weight:                 String;
	size:                   String;
	fibroscan:              String;
	fribrotest:             String;
	sw:                     String;
	fin_4:                  String;
	Hb1A1c:                 String;
	i_homma:                String;
	imc:                    String;
	waist:                  String;
	hip:                    String;
	hg:                     String;
	leukocytes:             String;
	platelets:              String;
	alt_tgp:                String;
	ast_tgo:				String;
	fa:                     String;
	ggt:                    String;
	albu:                   String;
	tp_irn:                 String;
	bt:                     String;
	bd:                     String;
	bi:                     String;
	ascitis:                String;
	encephalopathy:         String;
	varicose_veins:         String;
	hepatocarcinoma:        String;
	treatment:              String;
	/////////////////////////////
	creation_user_id:       String;
	creation_user_name:     String;
	creation_date:          String;
	creation_time:          String;
	modification_user_name: String;
	modification_date:      String;
	modification_time:      String;
	color: 					String;
	status:                 String;
}


export interface nashTratment{
    /////////////////////////////////
	research_nash_id:       number;
	entity_id:              number;
	hospital_id:            number;
	date_begin:             String;
	date_end:               String;
	research_status_id:     number;
	month_execution:        number;
	/////////////////////////////////
	short_name:             String;//initials
	birth_date:             String;
	gender:                 number;
	child_stadium:          number;
	mellitus_diabetes:      number;
	hypertension:           number;
	HIPERCOLESTEROLEMIA:    number;
	HIPERTRIGLICERIDEMIA:   number;
	weight:                 number;
	size:                   number;
	fibroscan:              number;
	fribrotest:             number;
	sw:                     number;
	fin_4:                  number;
	Hb1A1c:                 number;
	i_homma:                number;
	imc:                    number;
	waist:                  number;
	hip:                    number;
	hg:                     number;
	leukocytes:             number;
	platelets:              number;
	alt_tgp:                number;
	ast_tgo:				number;
	fa:                     number;
	ggt:                    number;
	albu:                   number;
	tp_irn:                 number;
	bt:                     number;
	bd:                     number;
	bi:                     number;
	ascitis:                number;
	encephalopathy:         number;
	varicose_veins:         number;
	hepatocarcinoma:        number;
	treatment:              number;
	/////////////////////////////
	creation_user_id:       number;
	creation_user_name:     String;
	creation_date:          String;
	creation_time:          String;
	modification_user_name: String;
	modification_date:      String;
	modification_time:      String;
	status:                 number;
	row_color:				string;
	column_color: 			string;
	active_red_sem: 		string;
	active_green_sem: 		string;
}
  