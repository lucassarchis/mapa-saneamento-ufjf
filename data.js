/**
 * Banco de Dados de Normativos, Padrões Ambientais e Indicadores do SINISA
 * Pesquisa: Normativos e padrões de lançamento e reúso de esgotos sanitários tratados
 * Autora: Katryne Karla Dutra Lopes
 * Universidade Federal de Juiz de Fora (UFJF) - Engenharia Sanitária e Ambiental (ESA)
 */

const PARAM_DEFINITIONS = {
  SST: {
    sigla: "SST",
    nome: "Sólidos Suspensos Totais",
    unidade: "mg/L",
    descricao: "Partículas sólidas retidas por filtro. Indicador de turbidez e carga física."
  },
  Ssed: {
    sigla: "Ssed",
    nome: "Sólidos Sedimentáveis",
    unidade: "mL/L",
    descricao: "Volume de sólidos decantáveis após 1h de repouso em cone Imhoff."
  },
  DQO: {
    sigla: "DQO",
    nome: "Demanda Química de Oxigênio",
    unidade: "mg/L O₂",
    descricao: "Oxigênio consumido na oxidação química total de matéria orgânica e inorgânica."
  },
  DBO: {
    sigla: "DBO",
    nome: "Demanda Bioquímica de Oxigênio (5d, 20°C)",
    unidade: "mg/L O₂",
    descricao: "Oxigênio consumido por bactérias para degradar a matéria orgânica em 5 dias."
  },
  N_NH4: {
    sigla: "N-NH₄⁺",
    nome: "Nitrogênio Amoniacal",
    unidade: "mg/L N",
    descricao: "Nitrogênio presente na forma de amônia. Tóxico para vida aquática e causa eutrofização."
  },
  Ptotal: {
    sigla: "P total",
    nome: "Fósforo Total",
    unidade: "mg/L P",
    descricao: "Nutriente limitante. Excesso gera proliferação de algas (eutrofização)."
  },
  Coliformes: {
    sigla: "Coliformes / E. coli",
    nome: "Coliformes Termotolerantes / E. coli",
    unidade: "UFC/100 mL",
    descricao: "Bactérias de origem fecal indicadoras de risco sanitário e contaminação microbiológica."
  },
  Turbidez: {
    sigla: "Turbidez",
    nome: "Turbidez",
    unidade: "uT",
    descricao: "Grau de dispersão de luz na água por partículas em suspensão."
  },
  Helmintos: {
    sigla: "Ovos de helmintos",
    nome: "Ovos Viáveis de Helmintos",
    unidade: "Ovos/L",
    descricao: "Parasitas intestinais. Devem estar ausentes no reúso não potável seguro."
  },
  Cloro_Residual: {
    sigla: "Cloro Residual",
    nome: "Cloro Residual Livre",
    unidade: "mg/L Cl₂",
    descricao: "Desinfetante residual livre para evitar repenetração de patógenos."
  }
};

const BRASIL_DATA = {
  nome: "Brasil",
  sinisa: {
    ies0001: 55.8,
    ies2004: 80.5
  },
  lancamento: {
    norma: "Conama 430/2011",
    link: "http://conama.mma.gov.br/?option=com_sisconama&task=arquivo.download&id=648",
    parametros: {
      SST: "Padrão da classe",
      Ssed: "< 1,0 mL/L",
      DQO: "-",
      DBO: "≤ 120 mg/L (ou ≥ 60%)",
      N_NH4: "≤ 20 mg/L",
      Ptotal: "Padrão da classe",
      Coliformes: "Padrão da classe"
    }
  },
  infiltracao: {
    norma: "Conama 396/2008",
    link: "http://conama.mma.gov.br/?option=com_sisconama&task=arquivo.download&id=559",
    parametros: {
      SST: "≤ 60 mg/L",
      Ssed: "< 0,1 mL/L",
      DQO: "-",
      DBO: "≤ 60 mg/L",
      N_NH4: "≤ 10 mg/L",
      Ptotal: "-",
      Coliformes: "< 200 NMP/100 mL"
    }
  },
  reuso: {
    norma: "CNRH 54/2005",
    link: "https://www.gov.br/mdr/pt-br/assuntos/seguranca-hidrica/cnrh/resolucoes/resolucao-no-54-de-28-de-novembro-de-2005.pdf",
    parametros: {
      Turbidez: "< 2 a 5 uT",
      DQO: "≤ 90 mg/L",
      DBO: "≤ 10 mg/L",
      Coliformes: "Ausente a < 200 NMP/100 mL",
      Helmintos: "Ausente (< 1 ovo/L)",
      Cloro_Residual: "0,5 a 1,5 mg/L"
    }
  }
};

const STATES_DATABASE = {
  MG: {
    uf: "MG",
    nome: "Minas Gerais",
    regiao: "Sudeste",
    capital: "Belo Horizonte",
    sinisa: {
      ies0001: 80.0,
      ies2004: 80.0
    },
    lancamento: {
      norma: "DN COPAM/CERH 08/2022",
      link: "http://www.siam.mg.gov.br/sla/consulta/viewNorma.do?id=54419",
      parametros: {
        SST: "≤ 100 mg/L (ou ≥ 70%)",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L (ou ≥ 70%)",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "DN COPAM/CERH 08/2022",
      link: "http://www.siam.mg.gov.br/sla/consulta/viewNorma.do?id=54419",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente (< 0,1 mL/L)",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "DN COPAM 230/2018",
      link: "http://www.siam.mg.gov.br/sla/consulta/viewNorma.do?id=47185",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 10 a 20 mg/L",
        Coliformes: "Ausente a < 200 NMP/100 mL",
        Helmintos: "Ausente (< 1 ovo/L)",
        Cloro_Residual: "0,5 a 2,0 mg/L"
      }
    }
  },

  SP: {
    uf: "SP",
    nome: "São Paulo",
    regiao: "Sudeste",
    capital: "São Paulo",
    sinisa: {
      ies0001: 91.8,
      ies2004: 78.5
    },
    lancamento: {
      norma: "Dec. Estadual 8.468/1976",
      link: "https://www.cetesb.sp.gov.br/legislacao/estadual/decretos/1976_Dec_8468.pdf",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 60 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "Padrão da classe"
      }
    },
    infiltracao: {
      norma: "Resolução SMA 03/2000",
      link: "https://cetesb.sp.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Res. Conjunta SES/SMA 01/2017",
      link: "https://cetesb.sp.gov.br/reuso-de-agua/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 75 mg/L",
        DBO: "≤ 10 a 30 mg/L",
        Coliformes: "Ausente a < 200 NMP/100 mL",
        Helmintos: "Ausente (< 1 ovo/L)",
        Cloro_Residual: "1,0 a 2,0 mg/L"
      }
    }
  },

  RJ: {
    uf: "RJ",
    nome: "Rio de Janeiro",
    regiao: "Sudeste",
    capital: "Rio de Janeiro",
    sinisa: {
      ies0001: 69.2,
      ies2004: 68.1
    },
    lancamento: {
      norma: "Resolução CONEMA 90/2021",
      link: "http://www.inea.rj.gov.br/",
      parametros: {
        SST: "≤ 80 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L (ou ≥ 70%)",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 4,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução CONEMA 90/2021",
      link: "http://www.inea.rj.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Lei Estadual 7.424/2016",
      link: "http://www.inea.rj.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  PR: {
    uf: "PR",
    nome: "Paraná",
    regiao: "Sul",
    capital: "Curitiba",
    sinisa: {
      ies0001: 77.5,
      ies2004: 86.0
    },
    lancamento: {
      norma: "Resolução CEMA 110/2021",
      link: "https://www.iat.pr.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L (ou ≥ 70%)",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L (ou ≥ 70%)",
        DBO: "≤ 60 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 NMP/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução CEMA 110/2021",
      link: "https://www.iat.pr.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Resolução SEDEST 041/2020",
      link: "https://www.iat.pr.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 2,0 mg/L"
      }
    }
  },

  RS: {
    uf: "RS",
    nome: "Rio Grande do Sul",
    regiao: "Sul",
    capital: "Porto Alegre",
    sinisa: {
      ies0001: 36.8,
      ies2004: 81.2
    },
    lancamento: {
      norma: "Resolução CONSEMA 355/2017",
      link: "https://fepam.rs.gov.br/",
      parametros: {
        SST: "≤ 80 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução CONSEMA 355/2017",
      link: "https://fepam.rs.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 1,5 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Resolução CONSEMA 346/2017",
      link: "https://fepam.rs.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente (< 1 ovo/L)",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  SC: {
    uf: "SC",
    nome: "Santa Catarina",
    regiao: "Sul",
    capital: "Florianópolis",
    sinisa: {
      ies0001: 34.2,
      ies2004: 73.6
    },
    lancamento: {
      norma: "Resolução CONSEMA 98/2017",
      link: "https://www.ima.sc.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução CONSEMA 98/2017",
      link: "https://www.ima.sc.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Resolução CONSEMA 128/2019",
      link: "https://www.ima.sc.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  DF: {
    uf: "DF",
    nome: "Distrito Federal",
    regiao: "Centro-Oeste",
    capital: "Brasília",
    sinisa: {
      ies0001: 92.5,
      ies2004: 88.7
    },
    lancamento: {
      norma: "Resolução ADASA 09/2019",
      link: "https://www.adasa.df.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "< 0,5 mL/L",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 30 mg/L (ou ≥ 85%)",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 1,0 mg/L",
        Coliformes: "< 500 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução ADASA 09/2019",
      link: "https://www.adasa.df.gov.br/",
      parametros: {
        SST: "≤ 40 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        N_NH4: "≤ 5,0 mg/L",
        Ptotal: "≤ 1,0 mg/L",
        Coliformes: "< 100 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Resolução ADASA 13/2020",
      link: "https://www.adasa.df.gov.br/",
      parametros: {
        Turbidez: "< 1 a 3 uT",
        DQO: "≤ 60 mg/L",
        DBO: "≤ 5 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "1,0 a 2,0 mg/L"
      }
    }
  },

  GO: {
    uf: "GO",
    nome: "Goiás",
    regiao: "Centro-Oeste",
    capital: "Goiânia",
    sinisa: {
      ies0001: 61.4,
      ies2004: 79.1
    },
    lancamento: {
      norma: "Resolução CEMAm 08/2020",
      link: "https://www.meioambiente.go.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEMAD-GO / NBR 13969",
      link: "https://www.meioambiente.go.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Portaria SEMAD 154/2021",
      link: "https://www.meioambiente.go.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "Ausente a < 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  BA: {
    uf: "BA",
    nome: "Bahia",
    regiao: "Nordeste",
    capital: "Salvador",
    sinisa: {
      ies0001: 42.3,
      ies2004: 84.5
    },
    lancamento: {
      norma: "Resolução CEPRAM 4.327/2013",
      link: "http://www.inema.ba.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "INEMA / CONAMA 396/2008",
      link: "http://www.inema.ba.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Lei Estadual 11.172/2008",
      link: "http://www.inema.ba.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  CE: {
    uf: "CE",
    nome: "Ceará",
    regiao: "Nordeste",
    capital: "Fortaleza",
    sinisa: {
      ies0001: 47.6,
      ies2004: 75.4
    },
    lancamento: {
      norma: "Resolução COEMA 02/2017",
      link: "https://www.semace.ce.gov.br/",
      parametros: {
        SST: "≤ 90 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 160 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 2,5 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "Resolução COEMA 02/2017",
      link: "https://www.semace.ce.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 35 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Resolução COEMA 02/2020",
      link: "https://www.semace.ce.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 2,0 mg/L"
      }
    }
  },

  PE: {
    uf: "PE",
    nome: "Pernambuco",
    regiao: "Nordeste",
    capital: "Recife",
    sinisa: {
      ies0001: 33.5,
      ies2004: 72.0
    },
    lancamento: {
      norma: "Portaria CPRH 045/2016",
      link: "http://www.cprh.pe.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "CPRH / NBR 13969",
      link: "http://www.cprh.pe.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Lei Estadual 15.698/2015",
      link: "http://www.cprh.pe.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  ES: {
    uf: "ES",
    nome: "Espírito Santo",
    regiao: "Sudeste",
    capital: "Vitória",
    sinisa: {
      ies0001: 56.1,
      ies2004: 71.4
    },
    lancamento: {
      norma: "Resolução CONSEMA 04/2018",
      link: "https://iema.es.gov.br/",
      parametros: {
        SST: "≤ 90 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "CONSEMA-ES / NBR 13969",
      link: "https://iema.es.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 35 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Decreto Estadual 4.678-R/2020",
      link: "https://iema.es.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  MS: {
    uf: "MS",
    nome: "Mato Grosso do Sul",
    regiao: "Centro-Oeste",
    capital: "Campo Grande",
    sinisa: {
      ies0001: 61.2,
      ies2004: 76.5
    },
    lancamento: {
      norma: "Resolução IMASUL 649/2018",
      link: "https://www.imasul.ms.gov.br/",
      parametros: {
        SST: "≤ 80 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 150 mg/L",
        DBO: "≤ 50 mg/L (ou ≥ 80%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "IMASUL / CONAMA 396/2008",
      link: "https://www.imasul.ms.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 1,5 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Diretrizes IMASUL",
      link: "https://www.imasul.ms.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  MT: {
    uf: "MT",
    nome: "Mato Grosso",
    regiao: "Centro-Oeste",
    capital: "Cuiabá",
    sinisa: {
      ies0001: 42.8,
      ies2004: 74.2
    },
    lancamento: {
      norma: "Resolução CONSEMA-MT 03/2018",
      link: "http://www.sema.mt.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEMA-MT / NBR 13969",
      link: "http://www.sema.mt.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEMA-MT / CNRH 54/2005",
      link: "http://www.sema.mt.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  AM: {
    uf: "AM",
    nome: "Amazonas",
    regiao: "Norte",
    capital: "Manaus",
    sinisa: {
      ies0001: 24.5,
      ies2004: 78.0
    },
    lancamento: {
      norma: "Resolução CEMAAM 27/2019",
      link: "http://www.ipaam.am.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "IPAAM / CONAMA 396/2008",
      link: "http://www.ipaam.am.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "CEMAAM / IPAAM",
      link: "http://www.ipaam.am.gov.br/",
      parametros: {
        Turbidez: "< 2 a 5 uT",
        DQO: "≤ 80 mg/L",
        DBO: "≤ 10 mg/L",
        Coliformes: "Ausente",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  PA: {
    uf: "PA",
    nome: "Pará",
    regiao: "Norte",
    capital: "Belém",
    sinisa: {
      ies0001: 10.2,
      ies2004: 58.3
    },
    lancamento: {
      norma: "Resolução COEMA-PA 120/2015",
      link: "https://www.semas.pa.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEMAS-PA / NBR 13969",
      link: "https://www.semas.pa.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEMAS-PA / CNRH 54/2005",
      link: "https://www.semas.pa.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  MA: {
    uf: "MA",
    nome: "Maranhão",
    regiao: "Nordeste",
    capital: "São Luís",
    sinisa: {
      ies0001: 18.9,
      ies2004: 62.1
    },
    lancamento: {
      norma: "SEMA-MA / Conama 430/2011",
      link: "https://www.sema.ma.gov.br/",
      parametros: {
        SST: "Padrão da classe",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 120 mg/L (ou ≥ 60%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "Padrão da classe"
      }
    },
    infiltracao: {
      norma: "SEMA-MA / Conama 396/2008",
      link: "https://www.sema.ma.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "-",
        DBO: "≤ 60 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "-",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEMA-MA / CNRH 54/2005",
      link: "https://www.sema.ma.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  PB: {
    uf: "PB",
    nome: "Paraíba",
    regiao: "Nordeste",
    capital: "João Pessoa",
    sinisa: {
      ies0001: 40.5,
      ies2004: 71.8
    },
    lancamento: {
      norma: "SUDEMA-PB / Conama 430/2011",
      link: "http://sudema.pb.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SUDEMA-PB / NBR 13969",
      link: "http://sudema.pb.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Lei Estadual 10.932/2017",
      link: "http://sudema.pb.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  RN: {
    uf: "RN",
    nome: "Rio Grande do Norte",
    regiao: "Nordeste",
    capital: "Natal",
    sinisa: {
      ies0001: 28.4,
      ies2004: 69.5
    },
    lancamento: {
      norma: "IDEMA-RN / Conama 430/2011",
      link: "http://www.idema.rn.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "IDEMA-RN / Conama 396/2008",
      link: "http://www.idema.rn.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 100 mg/L",
        DBO: "≤ 30 mg/L",
        N_NH4: "≤ 5,0 mg/L",
        Ptotal: "≤ 1,5 mg/L",
        Coliformes: "< 100 NMP/100 mL"
      }
    },
    reuso: {
      norma: "Lei Estadual 10.155/2017",
      link: "http://www.idema.rn.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  AL: {
    uf: "AL",
    nome: "Alagoas",
    regiao: "Nordeste",
    capital: "Maceió",
    sinisa: {
      ies0001: 25.1,
      ies2004: 65.8
    },
    lancamento: {
      norma: "IMA-AL / Conama 430/2011",
      link: "http://www.ima.al.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "IMA-AL / Conama 396/2008",
      link: "http://www.ima.al.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 40 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "IMA-AL / CNRH 54/2005",
      link: "http://www.ima.al.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  PI: {
    uf: "PI",
    nome: "Piauí",
    regiao: "Nordeste",
    capital: "Teresina",
    sinisa: {
      ies0001: 19.4,
      ies2004: 67.2
    },
    lancamento: {
      norma: "SEMARH-PI / Conama 430/2011",
      link: "https://www.semarh.pi.gov.br/",
      parametros: {
        SST: "Padrão da classe",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 120 mg/L (ou ≥ 60%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEMARH-PI / NBR 13969",
      link: "https://www.semarh.pi.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 50 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEMARH-PI / CNRH 54/2005",
      link: "https://www.semarh.pi.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  SE: {
    uf: "SE",
    nome: "Sergipe",
    regiao: "Nordeste",
    capital: "Aracaju",
    sinisa: {
      ies0001: 35.6,
      ies2004: 68.9
    },
    lancamento: {
      norma: "ADEMA-SE / Conama 430/2011",
      link: "https://www.adema.se.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "ADEMA-SE / NBR 13969",
      link: "https://www.adema.se.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 35 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "ADEMA-SE / CNRH 54/2005",
      link: "https://www.adema.se.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  RO: {
    uf: "RO",
    nome: "Rondônia",
    regiao: "Norte",
    capital: "Porto Velho",
    sinisa: {
      ies0001: 9.1,
      ies2004: 54.2
    },
    lancamento: {
      norma: "SEDAM-RO / Conama 430/2011",
      link: "http://www.sedam.ro.gov.br/",
      parametros: {
        SST: "Padrão da classe",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 120 mg/L (ou ≥ 60%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEDAM-RO / NBR 13969",
      link: "http://www.sedam.ro.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 50 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEDAM-RO / CNRH 54/2005",
      link: "http://www.sedam.ro.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  AC: {
    uf: "AC",
    nome: "Acre",
    regiao: "Norte",
    capital: "Rio Branco",
    sinisa: {
      ies0001: 14.6,
      ies2004: 56.4
    },
    lancamento: {
      norma: "IMAC-AC / Conama 430/2011",
      link: "http://www.imac.ac.gov.br/",
      parametros: {
        SST: "Padrão da classe",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 120 mg/L (ou ≥ 60%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "IMAC-AC / NBR 13969",
      link: "http://www.imac.ac.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 50 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "IMAC-AC / CNRH 54/2005",
      link: "http://www.imac.ac.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  TO: {
    uf: "TO",
    nome: "Tocantins",
    regiao: "Norte",
    capital: "Palmas",
    sinisa: {
      ies0001: 31.8,
      ies2004: 76.2
    },
    lancamento: {
      norma: "NATURATINS / Conama 430/2011",
      link: "https://www.to.gov.br/naturatins",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "NATURATINS / NBR 13969",
      link: "https://www.to.gov.br/naturatins",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 35 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "NATURATINS / CNRH 54/2005",
      link: "https://www.to.gov.br/naturatins",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  AP: {
    uf: "AP",
    nome: "Amapá",
    regiao: "Norte",
    capital: "Macapá",
    sinisa: {
      ies0001: 11.0,
      ies2004: 51.5
    },
    lancamento: {
      norma: "SEMA-AP / Conama 430/2011",
      link: "https://sema.ap.gov.br/",
      parametros: {
        SST: "Padrão da classe",
        Ssed: "< 1,0 mL/L",
        DQO: "-",
        DBO: "≤ 120 mg/L (ou ≥ 60%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "Padrão da classe",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "SEMA-AP / NBR 13969",
      link: "https://sema.ap.gov.br/",
      parametros: {
        SST: "≤ 60 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 120 mg/L",
        DBO: "≤ 50 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "SEMA-AP / CNRH 54/2005",
      link: "https://sema.ap.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 90 mg/L",
        DBO: "≤ 20 mg/L",
        Coliformes: "< 200 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  },

  RR: {
    uf: "RR",
    nome: "Roraima",
    regiao: "Norte",
    capital: "Boa Vista",
    sinisa: {
      ies0001: 58.2,
      ies2004: 82.3
    },
    lancamento: {
      norma: "FEMARH-RR / Conama 430/2011",
      link: "http://www.femarh.rr.gov.br/",
      parametros: {
        SST: "≤ 100 mg/L",
        Ssed: "< 1,0 mL/L",
        DQO: "≤ 180 mg/L",
        DBO: "≤ 60 mg/L (ou ≥ 75%)",
        N_NH4: "≤ 20 mg/L",
        Ptotal: "≤ 3,0 mg/L",
        Coliformes: "< 1.000 UFC/100 mL"
      }
    },
    infiltracao: {
      norma: "FEMARH-RR / NBR 13969",
      link: "http://www.femarh.rr.gov.br/",
      parametros: {
        SST: "≤ 50 mg/L",
        Ssed: "Ausente",
        DQO: "≤ 110 mg/L",
        DBO: "≤ 35 mg/L",
        N_NH4: "≤ 10 mg/L",
        Ptotal: "≤ 2,0 mg/L",
        Coliformes: "< 200 NMP/100 mL"
      }
    },
    reuso: {
      norma: "FEMARH-RR / CNRH 54/2005",
      link: "http://www.femarh.rr.gov.br/",
      parametros: {
        Turbidez: "< 3 uT",
        DQO: "≤ 85 mg/L",
        DBO: "≤ 15 mg/L",
        Coliformes: "< 100 NMP/100 mL",
        Helmintos: "Ausente",
        Cloro_Residual: "0,5 a 1,5 mg/L"
      }
    }
  }
};
