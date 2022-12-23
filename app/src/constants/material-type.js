export const MATERIAL_TYPE_ENUM = {
  PROSP_EXPL_MINAS_PEDR: 'PROSP_EXPL_MINAS_PEDR',
  AGRIC_PROC_ALIM: 'AGRIC_PROC_ALIM',
  PROC_MAD_PAINEL_MOB_PAPEL: 'PROC_MAD_PAINEL_MOB_PAPEL',
  IND_COURO_TEXTIL: 'IND_COURO_TEXTIL',
  REF_PETR_PURIF_GASNAT_TRATCARV: 'REF_PETR_PURIF_GASNAT_TRATCARV',
  PROC_QUIM_INORG: 'PROC_QUIM_INORG',
  PROC_QUIM_ORG: 'PROC_QUIM_ORG',
  REVEST_COLA_VED: 'REVEST_COLA_VED',
  IND_FOTOGRAFICA: 'IND_FOTOGRAFICA',
  PROC_TERMICOS: 'PROC_TERMICOS',
  TRAT_QUIM_REV_METAIS: 'TRAT_QUIM_REV_METAIS',
  MOLD_TRAT_MET_PLAST: 'MOLD_TRAT_MET_PLAST',
  OLEOS_USAD_RESID_COMB_LIQ: 'OLEOS_USAD_RESID_COMB_LIQ',
  SOLV_FLUID_REFRIG_GAS_PROP_ORG: 'SOLV_FLUID_REFRIG_GAS_PROP_ORG',
  EMB_ABSORV_PANOS_MATFILTR_VESTPROT: 'EMB_ABSORV_PANOS_MATFILTR_VESTPROT',
  NAO_ESPEC: 'NAO_ESPEC',
  CONSTR_DEMOLIC: 'CONSTR_DEMOLIC',
  SERV_SAUDE: 'SERV_SAUDE',
  INST_GEST_RESID_EST_TRAT_AGUA: 'INST_GEST_RESID_EST_TRAT_AGUA',
  SOLID_URB_EQUIP: 'SOLID_URB_EQUIP',
};

export const MATERIAL_TYPE_LABEL = {
  PROSP_EXPL_MINAS_PEDR: 'Prospecção e exploração de minas e pedreiras',
  AGRIC_PROC_ALIM: 'Agricultura e processamento de produtos alimentares',
  PROC_MAD_PAINEL_MOB_PAPEL:
    'Processamento de madeira, painéis, mobiliário e papel',
  IND_COURO_TEXTIL: 'Indústria do couro e da têxtil',
  REF_PETR_PURIF_GASNAT_TRATCARV:
    'Refinação de petróleo, da purificação de gás natural e do tratamento do carvão',
  PROC_QUIM_INORG: 'Processos químicos inorgânicos',
  PROC_QUIM_ORG: 'Processos químicos orgânicos',
  REVEST_COLA_VED: 'Revestimentos (tintas, vernizes), colas, vedantes',
  IND_FOTOGRAFICA: 'Indústria fotográfica',
  PROC_TERMICOS: 'Processos térmicos',
  TRAT_QUIM_REV_METAIS: 'Tratamentos químicos e revestimentos de metais',
  MOLD_TRAT_MET_PLAST:
    'Moldagem e do tratamento de superfície de metais e plásticos',
  OLEOS_USAD_RESID_COMB_LIQ: 'Óleos usados e resíduos de combustíveis líquidos',
  SOLV_FLUID_REFRIG_GAS_PROP_ORG:
    'Solventes, fluidos de refrigeração e gases propulsores orgânicos',
  EMB_ABSORV_PANOS_MATFILTR_VESTPROT:
    'Embalagens; absorventes, panos de limpeza, materiais filtrantes e vestuário de proteção',
  NAO_ESPEC: 'Não especificados',
  CONSTR_DEMOLIC: 'Construção e demolição',
  SERV_SAUDE: 'Serviços de saúde',
  INST_GEST_RESID_EST_TRAT_AGUA:
    'Instalações de gestão de resíduos, de estações de tratamento de águas residuais',
  SOLID_URB_EQUIP:
    'Sólidos urbanos e equiparados (domésticos, do comércio, indústria e serviços)',
};

export const MATERIAL_TYPE_LIST = [
  {
    value: MATERIAL_TYPE_LABEL.PROSP_EXPL_MINAS_PEDR,
    id: MATERIAL_TYPE_ENUM.PROSP_EXPL_MINAS_PEDR,
  },
  {
    value: MATERIAL_TYPE_LABEL.AGRIC_PROC_ALIM,
    id: MATERIAL_TYPE_ENUM.AGRIC_PROC_ALIM,
  },
  {
    value: MATERIAL_TYPE_LABEL.PROC_MAD_PAINEL_MOB_PAPEL,
    id: MATERIAL_TYPE_ENUM.PROC_MAD_PAINEL_MOB_PAPEL,
  },
  {
    value: MATERIAL_TYPE_LABEL.IND_COURO_TEXTIL,
    id: MATERIAL_TYPE_ENUM.IND_COURO_TEXTIL,
  },
  {
    value: MATERIAL_TYPE_LABEL.REF_PETR_PURIF_GASNAT_TRATCARV,
    id: MATERIAL_TYPE_ENUM.REF_PETR_PURIF_GASNAT_TRATCARV,
  },
  {
    value: MATERIAL_TYPE_LABEL.PROC_QUIM_INORG,
    id: MATERIAL_TYPE_ENUM.PROC_QUIM_INORG,
  },
  {
    value: MATERIAL_TYPE_LABEL.PROC_QUIM_ORG,
    id: MATERIAL_TYPE_ENUM.PROC_QUIM_ORG,
  },
  {
    value: MATERIAL_TYPE_LABEL.REVEST_COLA_VED,
    id: MATERIAL_TYPE_ENUM.REVEST_COLA_VED,
  },
  {
    value: MATERIAL_TYPE_LABEL.IND_FOTOGRAFICA,
    id: MATERIAL_TYPE_ENUM.IND_FOTOGRAFICA,
  },
  {
    value: MATERIAL_TYPE_LABEL.PROC_TERMICOS,
    id: MATERIAL_TYPE_ENUM.PROC_TERMICOS,
  },
  {
    value: MATERIAL_TYPE_LABEL.TRAT_QUIM_REV_METAIS,
    id: MATERIAL_TYPE_ENUM.TRAT_QUIM_REV_METAIS,
  },
  {
    value: MATERIAL_TYPE_LABEL.MOLD_TRAT_MET_PLAST,
    id: MATERIAL_TYPE_ENUM.MOLD_TRAT_MET_PLAST,
  },
  {
    value: MATERIAL_TYPE_LABEL.OLEOS_USAD_RESID_COMB_LIQ,
    id: MATERIAL_TYPE_ENUM.OLEOS_USAD_RESID_COMB_LIQ,
  },
  {
    value: MATERIAL_TYPE_LABEL.SOLV_FLUID_REFRIG_GAS_PROP_ORG,
    id: MATERIAL_TYPE_ENUM.SOLV_FLUID_REFRIG_GAS_PROP_ORG,
  },
  {
    value: MATERIAL_TYPE_LABEL.EMB_ABSORV_PANOS_MATFILTR_VESTPROT,
    id: MATERIAL_TYPE_ENUM.EMB_ABSORV_PANOS_MATFILTR_VESTPROT,
  },
  {
    value: MATERIAL_TYPE_LABEL.CONSTR_DEMOLIC,
    id: MATERIAL_TYPE_ENUM.CONSTR_DEMOLIC,
  },
  {
    value: MATERIAL_TYPE_LABEL.SERV_SAUDE,
    id: MATERIAL_TYPE_ENUM.SERV_SAUDE,
  },
  {
    value: MATERIAL_TYPE_LABEL.INST_GEST_RESID_EST_TRAT_AGUA,
    id: MATERIAL_TYPE_ENUM.INST_GEST_RESID_EST_TRAT_AGUA,
  },
  {
    value: MATERIAL_TYPE_LABEL.SOLID_URB_EQUIP,
    id: MATERIAL_TYPE_ENUM.SOLID_URB_EQUIP,
  },
  {
    value: MATERIAL_TYPE_LABEL.NAO_ESPEC,
    id: MATERIAL_TYPE_ENUM.NAO_ESPEC,
  },
];
