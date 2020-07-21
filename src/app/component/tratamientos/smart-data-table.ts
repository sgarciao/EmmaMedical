
export let settingsListTreatmentsNASH = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    short_name:{
      title: 'Iniciales del Paciente',
      filter: true,
      width: '30%',
      type: 'html'
    },
    birth_date: {
      title: 'F. Nacimiento',
      filter: true,
      width: '30%',
      type: 'html'
    },
    gender: {
      title: 'Género',
      filter: true,
      width: '10%',
      type: 'html'
    },
    child_stadium: {
      title: 'ESTADIO DE CHILD',
      filter: true,
      width: '10%',
      type: 'html'
    },
    mellitus_diabetes: {
      title: 'DIABETES MELLITUS ',
      filter: true,
      width: '10%',
      type: 'html'
    },
    hypertension: {
      title: 'HIPERTENSIÓN',
      filter: true,
      width: '10%',
      type: 'html'
    },  
    HIPERCOLESTEROLEMIA: {
      title: 'HIPERCOLESTEROLEMIA',
      filter: true,
      width: '10%',
      type: 'html'
    },
    HIPERTRIGLICERIDEMIA : {
      title: 'HIPERTRIGLICERIDEMIA',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    weight : {
      title: 'PESO (kg)',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    size : {
      title: 'Talla (cm)',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    fibroscan : {
      title: 'FIBROSCAN ',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    fribrotest : {
      title: 'FIBROTEST ',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    sw : {
      title: 'SW  (kPa)',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    fin_4 : {
      title: 'FIN - 4',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    Hb1A1c : {
      title: 'Hb1A1c',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    i_homma : {
      title: 'I. de HOMMA ',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    imc : {
      title: 'IMC',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    waist : {
      title: 'CINTURA (cm)',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    hip : {
      title: 'CADERA (cm)',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    hg : {
      title: 'HG',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    leukocytes : {
      title: 'LEUCOCITOS',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    platelets : {
      title: 'PLAQUETAS',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    alt_tgp : {
      title: 'ALT / TGP',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    fa : {
      title: 'FA',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    ggt : {
      title: 'GGT',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    albu : {
      title: 'ALBU',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    tp_irn : {
      title: 'TP / INR ',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    bt : {
      title: 'BT',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    bd : {
      title: 'BD',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    bi : {
      title: 'BI',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    ascitis : {
      title: 'ASCITIS ',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    encephalopathy : {
      title: 'ENCEFALOPATIA',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
  varicose_veins : {
      title: 'VARICES',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    hepatocarcinoma : {
      title: 'HEPATOCARCINOMA',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    treatment : {
      title: 'TRATAMIENTO',
      filter: true,
      width: '10%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",
    custom: [
              { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  };


  
export let settingsListTreatmentsASH = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    short_name:{
      title: 'Iniciales del Paciente',
      filter: true,
      width: '30%',
      type: 'html'
    },
    birth_date: {
      title: 'F. Nacimiento',
      filter: true,
      width: '30%',
      type: 'html'
    },
    gender: {
      title: 'Género',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    tx_start_date : {
      title: 'F. Inicio de Tx',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    cirrhosis : {
      title: 'Cirrosis',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    child_stadium : {
      title: 'Estadio Child (Puntaje)',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    weight : {
      title: 'PESO (kg)',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    size : {
      title: 'TALLA (cm)',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    imc : {
      title: 'IMC',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    oh_intake : {
      title: 'INGESTA OH (gr)',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    comsumtion_type : {
      title: 'TIEMPO DE CONSUMO',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    drugs : {
      title: 'DROGAS',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    fribroscan : {
      title: 'FIBROSCAN',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    fibrotest : {
      title: 'FIBROTEST',
      filter: true,
      width: '10%',
      type: 'html'
    }
    , 
    sw : {
      title: 'SW (kPa)',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    end_4 : {
      title: 'FIN - 4',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    hg : {
      title: 'HG',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    leukocytes : {
      title: 'LEUCOCITOS',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    platelets : {
      title: 'PLAQUETAS',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    alt_tgp : {
      title: 'ALT / TGP',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    ast_tgp : {
      title: 'AST / TGO',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    fa : {
      title: 'FA',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    ggt : {
      title: 'GGT',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    albu : {
      title: 'ALBU',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    tp_irn : {
      title: 'TP / INR',
      filter: true,
      width: '10%',
      type: 'html'
    }   , 
    bt : {
      title: 'BT',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    bd : {
      title: 'BD',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    bi : {
      title: 'BI',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    v_esophageal: {
      title: 'V. Esofágicas',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    ascitis : {
      title: 'ASCITIS ',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    encephalopathy : {
      title: 'ENCEFALOPATIA',
      filter: true,
      width: '10%',
      type: 'html'
    }, 
    hepatocarcinoma : {
      title: 'HEPATOCARCINOMA',
      filter: true,
      width: '10%',
      type: 'html'
    }
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",
    custom: [
              { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 10, totalKey: 100, float: 'right;' }
  };


  export let settingsListTreatmentsVHB = {
    hideSubHeader: true,
    defaultStyle: false,
    width: '100px',
    columns: {
      short_name:{
        title: 'Iniciales del Paciente',
        filter: true,
        width: '30%',
        type: 'html'
      },
      birth_date: {
        title: 'F. Nacimiento',
        filter: true,
        width: '30%',
        type: 'html'
      },
      gender: {
        title: 'Género',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      f_diagnostic : {
        title: 'F. de diagnostico',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      start_date : {
        title: 'F. Inicio de Tx',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      cirrhosis : {
        title: 'Cirrosis',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      child_stadium : {
        title: 'Estadio Child (Puntaje)',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      v_esophageal : {
        title: 'V. Esofágicas',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      genotype : {
        title: 'Genotipo',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      initial_cv : {
        title: 'CV Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      initial_log : {
        title: 'Log Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      cv_6_m : {
        title: 'CV 6 M',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      log : {
        title: 'Log',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      cv_12_m : {
        title: 'CV  12 M',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      log_cv_12_m : {
        title: 'Log',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_hb : {
        title: 'HB Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_hb : {
        title: 'Hb final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_leuc : {
        title: 'Leuc Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_leuc : {
        title: 'Leuc final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_plaq : {
        title: 'Plaq Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_plaq : {
        title: 'Plaq Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_bt : {
        title: 'BT Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_bt : {
        title: 'BT Final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_tgo : {
        title: 'TGO Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_tgo : {
        title: 'TGO Final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_tgp : {
        title: 'TGP Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_tgp : {
        title: 'TGP Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_albu : {
        title: 'ALBU inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_albu: {
        title: 'ALBU final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_inr : {
        title: 'INR Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      inr_final : {
        title: 'INR Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_creat : {
        title: 'Creat Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_creat : {
        title: 'Creatinina Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      ascitis : {
        title: 'ASCITIS',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      encephalopathy : {
        title: 'ENCEFALOPATIA',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      hepatocarcinoma : {
        title: 'HEPATOCARCINOMA',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      treatment : {
        title: 'TRATAMIENTO',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      adverse_effect : {
        title: 'Efecto Adverso',
        filter: true,
        width: '10%',
        type: 'html'
      },
      description_effect : {
        title: 'Cual/describir',
        filter: true,
        width: '10%',
        type: 'html'
      },
      severity : {
        title: 'Severidad del Efecto Adverso ',
        filter: true,
        width: '10%',
        type: 'html'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: "",
      custom: [
                { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
      position:  'right',
    },
    attr: { class: 'fixed_header' },
    pager: { perPage: 10, totalKey: 100, float: 'right;' }
    };

    
  export let settingsListTreatmentsVHC = {
    hideSubHeader: true,
    defaultStyle: false,
    width: '100px',
    columns: {
      short_name:{
        title: 'Iniciales del Paciente',
        filter: true,
        width: '30%',
        type: 'html'
      },
      birth_date: {
        title: 'F. Nacimiento',
        filter: true,
        width: '30%',
        type: 'html'
      },
      gender: {
        title: 'Género',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      start_date : {
        title: 'F. Inicio de Tx',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      cirrhosis : {
        title: 'Cirrosis',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      child_stadium : {
        title: 'Estadio Child (Puntaje)',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      v_esophageal : {
        title: 'V. Esofágicas',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      genotype : {
        title: 'Genotipo',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      initial_cv : {
        title: 'CV Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      initial_log : {
        title: 'Log Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      cv_s12 : {
        title: 'CV S12',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      log_s12 : {
        title: 'Log S12',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      cv_s_24 : {
        title: 'CV S 24',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      log_rvs_24 : {
        title: 'Log RVS 24',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_hb : {
        title: 'HB Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_hb : {
        title: 'Hb final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_leuc : {
        title: 'Leuc Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_leuc : {
        title: 'Leuc final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_plaq : {
        title: 'Plaq Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_plaq : {
        title: 'Plaq Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_bt : {
        title: 'BT Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_bt : {
        title: 'BT Final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_tgo : {
        title: 'TGO Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      final_tgo : {
        title: 'TGO Final',
        filter: true,
        width: '10%',
        type: 'html'
      }   , 
      initial_tgp : {
        title: 'TGP Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_tgp : {
        title: 'TGP Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_albu : {
        title: 'ALBU inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_albu: {
        title: 'ALBU final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_inr : {
        title: 'INR Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      inr_final : {
        title: 'INR Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      initial_creat : {
        title: 'Creat Inicial',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      final_creat : {
        title: 'Creatinina Final',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      ascitis : {
        title: 'ASCITIS',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      encephalopathy : {
        title: 'ENCEFALOPATIA',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      hepatocarcinoma : {
        title: 'HEPATOCARCINOMA',
        filter: true,
        width: '10%',
        type: 'html'
      }, 
      treatment : {
        title: 'TRATAMIENTO',
        filter: true,
        width: '10%',
        type: 'html'
      }
      , 
      adverse_effect : {
        title: 'Efecto Adverso',
        filter: true,
        width: '10%',
        type: 'html'
      },
      description_effect : {
        title: 'Cual/describir',
        filter: true,
        width: '10%',
        type: 'html'
      },
      severity : {
        title: 'Severidad del Efecto Adverso ',
        filter: true,
        width: '10%',
        type: 'html'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: "",
      custom: [
                { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico"  width="22px" height="22px" />', width: '100px'}],      
      position:  'right',
    },
    attr: { class: 'fixed_header' },
    pager: { perPage: 10, totalKey: 100, float: 'right;' }
    };

    export let settingsListTreatmentsHAI = {
      hideSubHeader: true,
      defaultStyle: false,
      width: '100px',
      columns: {
      short_name:{
      title: 'Iniciales del Paciente',
      filter: true,
      width: '30%',
      type: 'html'
      },
      birth_date: {
      title: 'F. Nacimiento',
      filter: true,
      width: '30%',
      type: 'html'
      },
      gender: {
      title: 'Género',
      filter: true,
      width: '10%',
      type: 'html'
      },
      child_stadium: {
      title: 'ESTADIO DE CHILD',
      filter: true,
      width: '10%',
      type: 'html'
      },
      weight: {
      title: 'PESO (kg) ',
      filter: true,
      width: '10%',
      type: 'html'
      },
      size: {
      title: 'TALLA (cm)',
      filter: true,
      width: '10%',
      type: 'html'
      },
      fibroscan: {
      title: 'FIBROSCAN',
      filter: true,
      width: '10%',
      type: 'html'
      },
      sw_kpa : {
      title: 'SW (kPa)',
      filter: true,
      width: '10%',
      type: 'html'
      },
      fin_4 : {
      title: 'FIN-4',
      filter: true,
      width: '10%',
      type: 'html'
      },
      hg : {
      title: 'HG',
      filter: true,
      width: '10%',
      type: 'html'
      },
      leucocitos : {
      title: 'LEUCOCITOS',
      filter: true,
      width: '10%',
      type: 'html'
      },
      plaquetas : {
      title: 'PLAQUETAS ',
      filter: true,
      width: '10%',
      type: 'html'
      },
      alt_tgp : {
      title: 'ALT / TGP',
      filter: true,
      width: '10%',
      type: 'html'
      },
      ast_tgo : {
      title: 'AST / TGO',
      filter: true,
      width: '10%',
      type: 'html'
      },
      fa : {
      title: 'FA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      ggt : {
      title: 'GGT ',
      filter: true,
      width: '10%',
      type: 'html'
      },
      albu : {
      title: 'ALBU',
      filter: true,
      width: '10%',
      type: 'html'
      },
      tp_inr : {
      title: 'TP / INR',
      filter: true,
      width: '10%',
      type: 'html'
      },
      bt : {
      title: 'BT',
      filter: true,
      width: '10%',
      type: 'html'
      },
      bd : {
      title: 'BD',
      filter: true,
      width: '10%',
      type: 'html'
      },
      bi : {
      title: 'BI',
      filter: true,
      width: '10%',
      type: 'html'
      },
      ana : {
      title: 'ANA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      ama : {
      title: 'AMA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      asma : {
      title: 'ASMA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      anti_lkm : {
      title: 'ANTI_LKM',
      filter: true,
      width: '10%',
      type: 'html'
      },
      gamaglobulina : {
      title: 'GAMAGLOBULINA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      lgg : {
      title: 'lgG',
      filter: true,
      width: '10%',
      type: 'html'
      },
      lgm : {
      title: 'lgM',
      filter: true,
      width: '10%',
      type: 'html'
      },
      lgA : {
      title: 'lgA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      ascitis : {
      title: 'ASCITIS',
      filter: true,
      width: '10%',
      type: 'html'
      },
      encefalopatia : {
      title: 'ENCEFALOPATIA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      varices : {
      title: 'VARICES',
      filter: true,
      width: '10%',
      type: 'html'
      },
      hepatocarcinoma : {
      title: 'HEPARTOCARCINOMA',
      filter: true,
      width: '10%',
      type: 'html'
      },
      tratamiento : {
      title: 'TRATAMIENTO',
      filter: true,
      width: '10%',
      type: 'html'
      }
      },
      actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: "",
      custom: [
      { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico" width="22px" height="22px" />', width: '100px'}],
      position: 'right',
      },
      attr: { class: 'fixed_header' },
      pager: { perPage: 10, totalKey: 100, float: 'right;' }
      };

      export let settingsListTreatmentsHCC = {
        hideSubHeader: true,
        defaultStyle: false,
        width: '100px',
        columns: {
        short_name:{
        title: 'Iniciales del Paciente',
        filter: true,
        width: '30%',
        type: 'html'
        },
        birth_date: {
        title: 'F. Nacimiento',
        filter: true,
        width: '30%',
        type: 'html'
        },
        gender: {
        title: 'Género',
        filter: true,
        width: '10%',
        type: 'html'
        },
        cirrosis: {
        title: 'CIRROSIS',
        filter: true,
        width: '10%',
        type: 'html'
        },
        child_stadium: {
        title: 'ESTADIO DE CHILD',
        filter: true,
        width: '10%',
        type: 'html'
        },
        etiologia: {
        title: 'ETIOLOGIA DE LA CIRROSIS',
        filter: true,
        width: '10%',
        type: 'html'
        },
        tamaño_tumor: {
        title: 'TAMAÑO DEL TUMOR',
        filter: true,
        width: '10%',
        type: 'html'
        },
        localizacion_tumor: {
        title: 'LOCALIZACIÓN DEL TUMOR',
        filter: true,
        width: '10%',
        type: 'html'
        },
        grado_diferenciacion: {
        title: 'GRADO DE DIFERENCIACIÓN',
        filter: true,
        width: '10%',
        type: 'html'
        },
        metastasis: {
        title: 'METASTASIS',
        filter: true,
        width: '10%',
        type: 'html'
        },
        diabetes: {
        title: 'DIABETES',
        filter: true,
        width: '10%',
        type: 'html'
        },
        weight: {
        title: 'PESO (kg) ',
        filter: true,
        width: '10%',
        type: 'html'
        },
        size: {
        title: 'TALLA (cm)',
        filter: true,
        width: '10%',
        type: 'html'
        },
        hb1a1c: {
        title: 'Hb1A1c',
        filter: true,
        width: '10%',
        type: 'html'
        },
        imc: {
        title: 'IMC',
        filter: true,
        width: '10%',
        type: 'html'
        },
        cintura: {
        title: 'CINTURA (cm)',
        filter: true,
        width: '10%',
        type: 'html'
        },
        cadera: {
        title: 'CADERA (cm)',
        filter: true,
        width: '10%',
        type: 'html'
        },
        hg: {
        title: 'HG',
        filter: true,
        width: '10%',
        type: 'html'
        },
        leucocitos : {
        title: 'LEUCOCITOS',
        filter: true,
        width: '10%',
        type: 'html'
        },
        plaquetas : {
        title: 'PLAQUETAS ',
        filter: true,
        width: '10%',
        type: 'html'
        },
        alt_tgp : {
        title: 'ALT / TGP',
        filter: true,
        width: '10%',
        type: 'html'
        },
        ast_tgo : {
        title: 'AST / TGO',
        filter: true,
        width: '10%',
        type: 'html'
        },
        fa : {
        title: 'FA',
        filter: true,
        width: '10%',
        type: 'html'
        },
        ggt : {
        title: 'GGT',
        filter: true,
        width: '10%',
        type: 'html'
        },
        albu : {
        title: 'ALBU',
        filter: true,
        width: '10%',
        type: 'html'
        },
        tp_inr : {
        title: 'TP / INR',
        filter: true,
        width: '10%',
        type: 'html'
        },
        bt : {
        title: 'BT',
        filter: true,
        width: '10%',
        type: 'html'
        },
        bd : {
        title: 'BD',
        filter: true,
        width: '10%',
        type: 'html'
        },
        bi : {
        title: 'BI',
        filter: true,
        width: '10%',
        type: 'html'
        },
        afp : {
        title: 'AFP',
        filter: true,
        width: '10%',
        type: 'html'
        },
        ca19_9 : {
        title: 'CA19-9',
        filter: true,
        width: '10%',
        type: 'html'
        },
        ascitis : {
        title: 'ASCITIS',
        filter: true,
        width: '10%',
        type: 'html'
        },
        encefalopatia : {
        title: 'ENCEFALOPATIA',
        filter: true,
        width: '10%',
        type: 'html'
        },
        varices : {
        title: 'VARICES',
        filter: true,
        width: '10%',
        type: 'html'
        },
        tratamiento : {
        title: 'TRATAMIENTO',
        filter: true,
        width: '10%',
        type: 'html'
        }
        },
        actions: {
        add: false,
        edit: false,
        delete: false,
        columnTitle: "",
        custom: [
        { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico" width="22px" height="22px" />', width: '100px'}],
        position: 'right',
        },
        attr: { class: 'fixed_header' },
        pager: { perPage: 10, totalKey: 100, float: 'right;' }
        };

        export let settingsListTreatmentsALF = {
          hideSubHeader: true,
          defaultStyle: false,
          width: '100px',
          columns: {
          short_name:{
          title: 'Iniciales del Paciente',
          filter: true,
          width: '30%',
          type: 'html'
          },
          birth_date: {
          title: 'F. Nacimiento',
          filter: true,
          width: '30%',
          type: 'html'
          },
          gender: {
          title: 'Género',
          filter: true,
          width: '10%',
          type: 'html'
          },
          fecha_tratamiento: {
          title: 'F. INICIO DE TX.',
          filter: true,
          width: '10%',
          type: 'html'
          },
          cirrosis: {
          title: 'CIRROSIS',
          filter: true,
          width: '10%',
          type: 'html'
          },
          child_stadium: {
          title: 'ESTADIO DE CHILD',
          filter: true,
          width: '10%',
          type: 'html'
          },
          v_esofagicas: {
          title: 'V. ESOFAGICAS',
          filter: true,
          width: '10%',
          type: 'html'
          },
          genotipo: {
          title: 'GENOTIPO',
          filter: true,
          width: '10%',
          type: 'html'
          },
          cv_inicial: {
          title: 'CV INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          log_inicial: {
          title: 'LOG INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          cv_s12: {
          title: 'CV S12',
          filter: true,
          width: '10%',
          type: 'html'
          },
          log_s12: {
          title: 'LOG S12',
          filter: true,
          width: '10%',
          type: 'html'
          },
          cv_rvs_12: {
          title: 'CV RVS 12',
          filter: true,
          width: '10%',
          type: 'html'
          },
          log_rvs_12: {
          title: 'LOG RVS 12',
          filter: true,
          width: '10%',
          type: 'html'
          },
          hb_inicial: {
          title: 'HB INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          hb_final: {
          title: 'HB FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          leuc_inicial: {
          title: 'LEUC INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          leuc_final: {
          title: 'LEUC FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          plaq_inicial: {
          title: 'PLAQ INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          plaq_final: {
          title: 'PLAQ FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          bt_inicial: {
          title: 'BT INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          bt_final: {
          title: 'BT FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          tgo_inicial: {
          title: 'TGO INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          tgo_final: {
          title: 'TGO FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          tgp_inicial: {
          title: 'TGP INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          tgp_final: {
          title: 'TGP FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          inr_inicial: {
          title: 'INR INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          inr_final: {
          title: 'INR FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          creatinina_inicial: {
          title: 'CREATININA INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          creatinina_final: {
          title: 'CREATININA FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          efecto_adverso: {
          title: 'EFECTO ADVERSO',
          filter: true,
          width: '10%',
          type: 'html'
          },
          descripcion_efecto_adv: {
          title: 'CUAL / DESCRIBIR',
          filter: true,
          width: '10%',
          type: 'html'
          },
          severidad: {
          title: 'SEVERIDAD DEL EFECTO ADVERSO',
          filter: true,
          width: '10%',
          type: 'html'
          },
          accion_tomada: {
          title: 'ACCION_TOMADA',
          filter: true,
          width: '10%',
          type: 'html'
          },
          child_inicial: {
          title: 'CHILD INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          child_final: {
          title: 'CHILD FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          meld_inicial: {
          title: 'MELD INICIAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          meld_final: {
          title: 'MELD FINAL',
          filter: true,
          width: '10%',
          type: 'html'
          },
          comentarios: {
          title: 'COMENTARIOS',
          filter: true,
          width: '10%',
          type: 'html'
          },
          medicamento_usado: {
          title: 'MEDICAMENTO USADO',
          filter: true,
          width: '10%',
          type: 'html'
          }
          },
          actions: {
          add: false,
          edit: false,
          delete: false,
          columnTitle: "",
          custom: [
          { name: 'viewFileP', title: '<img src="https://e1-cln-ema-store.s3.amazonaws.com/images/icons/Oxygen-Icons.org-Oxygen-Mimetypes-application-pdf.ico" width="22px" height="22px" />', width: '100px'}],
          position: 'right',
          },
          attr: { class: 'fixed_header' },
          pager: { perPage: 10, totalKey: 100, float: 'right;' }
          };