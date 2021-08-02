/**
 * Fecha: 24-07-2021
 * Modulo de tratamientos (Nash)
 * Modelo de datos para el tratamiento de Nash
 */

import { NumberCardModule } from "@swimlane/ngx-charts";

export interface nashTreatmentData {
    data: nashTreatmentModel[];
}

export class nashTreatmentModel {
    /////////////////////////////////
    research_nash_id: number;
    MD_entity_id: number;
    MD_hospital_id: number;
    MD_patient_id: number;
    MD_doctor_id: number;
    MD_nurse_id: number;
    research_date_begin: string;
    research_date_end: string;
    research_status_id: number;
    month_execution: number;
    /////////////////////////////////
    initials: string;
    birthdate: string;
    edad: number;
    gender: number;
    country: number;
    state: number;
    diagnostic_date: string;
    tx_date_begin: string;
    peso: number;
    talla: number;
    imc: number;
    obesidad: number;
    sobrepeso: number;
    circunferencia_cintura: number;
    circunferencia_cadera: number;
    indice_cintura_cadera: number;
    consumo_alcohol: number;
    gramos_alcohol: number;
    diabetes_mellitus: number;
    hipertension_arterial: number;
    hipercolesterolemia: number;
    hipertrigliceridemia: number;
    hipotiroidismo: number;
    presion_sistolica: number;
    presion_diastolica: number;
    antihipertensivos: number;
    clase_antihipertensivos: number;
    hipoglucemiante: number;
    hipoglucemiantes_orales: number;
    uso_insulina: number;
    estatinas: number;
    clase_estatina: number;
    fibratos: number;
    clase_fibratos: number;
    antioxidantes: number;
    clase_antioxidantes: number;
    hemoglobina: number;
    plaquetas: number;
    glucosa: number;
    creatinina: number;
    colesterol: number;
    hdl: number;
    ldl: number;
    vldl: number;
    indice_aterogenico: number;
    trigliceridos: number;
    bt: number;
    bd: number;
    bi: number;
    ast: number;
    alt: number;
    fal: number;
    ggt: number;
    albumina: number;
    insulina_serica: number;
    homa_ir: number;
    pcr_ultrasensible: number;
    elastrografia_cap: number;
    grado_esteatosis: number;
    elastrografia_kpa: number;
    grado_fibrosis: number;
    nafld_fibrosis: number;
    fib_4: number;
    apri: number;
    hbsag: number;
    hbeag: number;
    anticuerpos_hbs: number;
    anticuerpos_hbe: number;
    anticuerpos_vhc: number;
    biopsia_hepatica: number;
    indicaciones_biopsia: string;
    grado_actividad_bh: number;
    grado_fibrosis_bh: number;
    grado_esteatosis_bh: number;
    tratamiento_nash: number;
    inicio_tratamiento: string;
    duracion_tratamiento: number;
    pioglitazona: number;
    selonsertib: number;
    elafibranor: number;
    cenicriviroc: number;
    liraglutide: number;
    resmetirom: number;
    /////////////////////////////////////////
    creation_userid: number;
    creation_username: string;
    creation_date: string;
    creation_time: string;
    modification_userid: number;
    modification_username: string;
    modification_date: string;
    modification_time: string;
    status: number;
    /////////ADDITIONAL
    row_color: string;
    column_color: string;
    active_red_sem: string;
    active_green_sem: string;
    active_gray_sem: string;
    checkbox_status: boolean;
    checkbox_value: boolean;
    disable_checkbox: boolean;
    disabled_row: boolean;
    style_input_date: string;
}

export class nashTreatmentModelHeader {
    /////////////////////////////////
    research_nash_id: string;
    MD_entity_id: string;
    MD_hospital_id: string;
    MD_patient_id: string;
    MD_doctor_id: string;
    MD_nurse_id: string;
    research_date_begin: string;
    research_date_end: string;
    research_status_id: string;
    month_execution: string;
    /////////////////////////////////
    initials: string;
    birthdate: string;
    edad: string;
    gender: string;
    country: string;
    state: string;
    diagnostic_date: string;
    tx_date_begin: string;
    peso: string;
    talla: string;
    imc: string;
    obesidad: string;
    sobrepeso: string;
    circunferencia_cintura: string;
    circunferencia_cadera: string;
    indice_cintura_cadera: string;
    consumo_alcohol: string;
    gramos_alcohol: string;
    diabetes_mellitus: string;
    hipertension_arterial: string;
    hipercolesterolemia: string;
    hipertrigliceridemia: string;
    hipotiroidismo: string;
    presion_sistolica: string;
    presion_diastolica: string;
    antihipertensivos: string;
    clase_antihipertensivos: string;
    hipoglucemiante: string;
    hipoglucemiantes_orales: string;
    uso_insulina: string;
    estatinas: string;
    clase_estatina: string;
    fibratos: string;
    clase_fibratos: string;
    antioxidantes: string;
    clase_antioxidantes: string;
    hemoglobina: string;
    plaquetas: string;
    glucosa: string;
    creatinina: string;
    colesterol: string;
    hdl: string;
    ldl: string;
    vldl: string;
    indice_aterogenico: string;
    trigliceridos: string;
    bt: string;
    bd: string;
    bi: string;
    ast: string;
    alt: string;
    fal: string;
    ggt: string;
    albumina: string;
    insulina_serica: string;
    homa_ir: string;
    pcr_ultrasensible: string;
    elastrografia_cap: string;
    grado_esteatosis: string;
    elastrografia_kpa: string;
    grado_fibrosis: string;
    nafld_fibrosis: string;
    fib_4: string;
    apri: string;
    hbsag: string;
    hbeag: string;
    anticuerpos_hbs: string;
    anticuerpos_hbe: string;
    anticuerpos_vhc: string;
    biopsia_hepatica: string;
    indicaciones_biopsia: string;
    grado_actividad_bh: string;
    grado_fibrosis_bh: string;
    grado_esteatosis_bh: string;
    tratamiento_nash: string;
    inicio_tratamiento: string;
    duracion_tratamiento: string;
    pioglitazona: string;
    selonsertib: string;
    elafibranor: string;
    cenicriviroc: string;
    liraglutide: string;
    resmetirom: string;
    /////////////////////////////////////////
    creation_userid: string;
    creation_username: string;
    creation_date: string;
    creation_time: string;
    modification_userid: string;
    modification_username: string;
    modification_date: string;
    modification_time: string;
    status: string;

    /////////ADDITIONAL

    //Esta sección la tiene el vhcTreatmentModelHeader por eso se omite para nashTreatmentModel
    //SGO - 26-07-2021
    //     row_color: string;
    //     column_color: string;
    //     active_red_sem: string;
    //     active_green_sem: string;
    //     active_gray_sem: string;
    //     checkbox_status: boolean;
    //     checkbox_value: boolean;
    //     disable_checkbox: boolean;
    //     disabled_row: boolean;
    //     style_input_date: string;
    //

}

//Verificar si se requiere esta clase para nash
export class comorbilidades_list_ {
    comorbilidades: number;
    description: string;
}
