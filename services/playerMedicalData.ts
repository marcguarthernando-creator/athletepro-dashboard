export const playerMedicalData: Record<string, any> = {
  "ALEJANDRO GUERRA": {
    "name": "ALEJANDRO GUERRA",
    "biometrics": {
      "weight": "96.7",
      "height": "191.1",
      "age": 27,
      "wingspan": "197.2"
    },
    "anthropometry": {
      "fat": "13.1",
      "muscle": "45.9",
      "bone": "11.2",
      "residual": "29.8",
      "somatotype": {
        "endo": "2.4",
        "meso": "4.3",
        "ecto": "2.4"
      },
      "folds": {
        "triceps": "8.5",
        "subscapular": "10.2",
        "biceps": "4.1",
        "suprailiac": "12.5",
        "abdominal": "15.3",
        "thigh": "9.8",
        "calf": "6.5",
        "sum": "66.9"
      },
      "perimeters": {
        "armRelaxed": "34.5",
        "armContracted": "37.2",
        "forearm": "30.1",
        "thigh": "58.4",
        "calf": "39.2"
      },
      "diameters": {
        "humerus": "7.4",
        "femur": "10.1",
        "bistyloid": "5.9"
      }
    },
    "injuries": [
      {
        "date": "2025-02-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-01-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-03-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": true
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "ankle": {
        "l": "10.5",
        "r": "9.5"
      },
      "yBalance": {
        "anterior": { "l": "80", "r": "76" },
        "posteromedial": { "l": "81", "r": "81" },
        "posterolateral": { "l": "80", "r": "80" }
      },
      "slSquat": {
        "left": { "ankle": "Bien", "knee": "Precaución", "hip": "Bien" },
        "right": { "ankle": "Bien", "knee": "Precaución", "hip": "Precaución" }
      },
      "hurdleStep": {
        "left": { "stability": "Excelente", "hip": "Excelente", "pelvis": "Excelente" },
        "right": { "stability": "Malo", "hip": "Excelente", "pelvis": "Excelente" }
      },
      "core": {
        "leftSide": "95s",
        "rightSide": "90s",
        "ratio": "0.94",
        "ratioEval": "Bien"
      },
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "BABEL LIPASI": {
    "name": "BABEL LIPASI",
    "biometrics": {
      "weight": "96.3",
      "height": "185.3",
      "age": 29,
      "wingspan": "190.4"
    },
    "anthropometry": {
      "fat": "13.8",
      "muscle": "50.0",
      "bone": "10.4",
      "residual": "25.8",
      "somatotype": {
        "endo": "2.3",
        "meso": "5.8",
        "ecto": "1.6"
      }
    },
    "injuries": [
      {
        "date": "2025-04-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-01-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Activa",
        "private": false
      },
      {
        "date": "2025-09-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "DAVID ACOSTA": {
    "name": "DAVID ACOSTA",
    "biometrics": {
      "weight": "102.6",
      "height": "214.4",
      "age": 22,
      "wingspan": "224.2"
    },
    "anthropometry": {
      "fat": "7.6",
      "muscle": "44.1",
      "bone": "11.6",
      "residual": "36.7",
      "somatotype": {
        "endo": "2.0",
        "meso": "7.9",
        "ecto": "2.1"
      }
    },
    "injuries": [
      {
        "date": "2025-10-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-09-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": true
      },
      {
        "date": "2025-11-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "DAVID DELGADO": {
    "name": "DAVID DELGADO",
    "biometrics": {
      "weight": "106.9",
      "height": "214.0",
      "age": 21,
      "wingspan": "223.9"
    },
    "anthropometry": {
      "fat": "13.0",
      "muscle": "44.8",
      "bone": "11.7",
      "residual": "30.5",
      "somatotype": {
        "endo": "2.5",
        "meso": "7.4",
        "ecto": "1.5"
      }
    },
    "injuries": [
      {
        "date": "2025-11-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-05-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "DIEGO FERNANDEZ": {
    "name": "DIEGO FERNANDEZ",
    "biometrics": {
      "weight": "109.6",
      "height": "190.9",
      "age": 24,
      "wingspan": "196.9"
    },
    "anthropometry": {
      "fat": "9.0",
      "muscle": "46.5",
      "bone": "13.1",
      "residual": "31.4",
      "somatotype": {
        "endo": "3.3",
        "meso": "4.0",
        "ecto": "1.4"
      }
    },
    "injuries": [
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-05-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-01-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "DYLAN BORDON": {
    "name": "DYLAN BORDON",
    "biometrics": {
      "weight": "88.3",
      "height": "199.4",
      "age": 20,
      "wingspan": "206.8"
    },
    "anthropometry": {
      "fat": "12.4",
      "muscle": "42.7",
      "bone": "13.0",
      "residual": "31.9",
      "somatotype": {
        "endo": "1.6",
        "meso": "4.0",
        "ecto": "2.6"
      }
    },
    "injuries": [
      {
        "date": "2025-08-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Activa",
        "private": false
      },
      {
        "date": "2025-01-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-10-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "EMILIS PREKIVICIUS": {
    "name": "EMILIS PREKIVICIUS",
    "biometrics": {
      "weight": "92.1",
      "height": "212.8",
      "age": 19,
      "wingspan": "222.4"
    },
    "anthropometry": {
      "fat": "9.4",
      "muscle": "46.7",
      "bone": "12.7",
      "residual": "31.2",
      "somatotype": {
        "endo": "2.8",
        "meso": "7.1",
        "ecto": "2.0"
      }
    },
    "injuries": [
      {
        "date": "2025-07-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Activa",
        "private": false
      },
      {
        "date": "2025-06-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "LOUIS RIGA": {
    "name": "LOUIS RIGA",
    "biometrics": {
      "weight": "99.2",
      "height": "208.2",
      "age": 30,
      "wingspan": "217.0"
    },
    "anthropometry": {
      "fat": "12.0",
      "muscle": "42.0",
      "bone": "12.7",
      "residual": "33.3",
      "somatotype": {
        "endo": "2.6",
        "meso": "7.9",
        "ecto": "1.4"
      }
    },
    "injuries": [
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": true
      },
      {
        "date": "2025-09-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ANALÍTICA SANGUÍNEA"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "MANUEL CRUJEIRAS": {
    "name": "MANUEL CRUJEIRAS",
    "biometrics": {
      "weight": "104.1",
      "height": "192.5",
      "age": 29,
      "wingspan": "198.8"
    },
    "anthropometry": {
      "fat": "9.1",
      "muscle": "44.8",
      "bone": "10.3",
      "residual": "35.8",
      "somatotype": {
        "endo": "3.4",
        "meso": "7.8",
        "ecto": "2.1"
      }
    },
    "injuries": [
      {
        "date": "2025-09-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": true
      },
      {
        "date": "2025-05-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-03-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ANALÍTICA SANGUÍNEA"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "MOHAMED SANGARE": {
    "name": "MOHAMED SANGARE",
    "biometrics": {
      "weight": "94.9",
      "height": "202.3",
      "age": 32,
      "wingspan": "210.2"
    },
    "anthropometry": {
      "fat": "8.9",
      "muscle": "44.2",
      "bone": "10.3",
      "residual": "36.6",
      "somatotype": {
        "endo": "2.8",
        "meso": "7.8",
        "ecto": "1.7"
      }
    },
    "injuries": [
      {
        "date": "2025-10-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Activa",
        "private": false
      },
      {
        "date": "2025-05-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": true
      },
      {
        "date": "2025-08-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ANALÍTICA SANGUÍNEA"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "RAFA RODRIGUEZ": {
    "name": "RAFA RODRIGUEZ",
    "biometrics": {
      "weight": "83.1",
      "height": "208.4",
      "age": 24,
      "wingspan": "217.3"
    },
    "anthropometry": {
      "fat": "13.2",
      "muscle": "49.8",
      "bone": "12.7",
      "residual": "24.3",
      "somatotype": {
        "endo": "2.5",
        "meso": "4.3",
        "ecto": "1.5"
      }
    },
    "injuries": [
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-02-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Activa",
        "private": true
      },
      {
        "date": "2025-11-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ANALÍTICA SANGUÍNEA"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  },
  "XABIER LOPEZ": {
    "name": "XABIER LOPEZ",
    "biometrics": {
      "weight": "106.2",
      "height": "193.8",
      "age": 25,
      "wingspan": "200.3"
    },
    "anthropometry": {
      "fat": "14.5",
      "muscle": "49.1",
      "bone": "12.3",
      "residual": "24.1",
      "somatotype": {
        "endo": "2.7",
        "meso": "4.5",
        "ecto": "1.9"
      }
    },
    "injuries": [
      {
        "date": "2025-11-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      },
      {
        "date": "2025-11-15",
        "type": "Esguince Tobillo",
        "zone": "Lower Body",
        "status": "Activa",
        "private": false
      },
      {
        "date": "2025-08-15",
        "type": "Sobrecarga Isquios",
        "zone": "Lower Body",
        "status": "Recuperada",
        "private": false
      }
    ],
    "info": {
      "medication": [
        "Aspirina 100mg",
        "Vitamina D3"
      ],
      "supplementation": [
        "Proteína Whey",
        "Creatina"
      ],
      "allergies": [
        "Ninguna conocida"
      ],
      "previousInjuries": [
        "Esguince leve (2022)"
      ],
      "familyHistory": [
        "Ninguno relevante"
      ],
      "personalHistory": [
        "Operado de apéndice"
      ]
    },
    "rom": {
      "lower": {
        "Tobillo Flexión Dorsal": {
          "l": "42°",
          "r": "44°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "40° | 41°"
            }
          ]
        },
        "Cadera Flexión": {
          "l": "115°",
          "r": "112°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "110° | 108°"
            }
          ]
        },
        "Knee Extension": {
          "l": "0°",
          "r": "0°",
          "history": [
            {
              "date": "OCT 2025",
              "val": "0° | -2°"
            }
          ]
        }
      },
      "upper": {
        "Hombro Flexión": {
          "l": "175°",
          "r": "178°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "170° | 172°"
            }
          ]
        },
        "Hombro Rot. Interna": {
          "l": "65°",
          "r": "62°",
          "history": [
            {
              "date": "JUN 2025",
              "val": "60° | 58°"
            }
          ]
        }
      }
    },
    "evaluation": {
      "UPPER BODY": {
        "score": "8.5",
        "desc": "Sin asimetrías detectadas. Excelente estabilidad.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.2"
          }
        ]
      },
      "SPINAL COLUMN": {
        "score": "7.8",
        "desc": "Control motor adecuado en movimientos dinámicos.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.5"
          }
        ]
      },
      "LOWER BODY": {
        "score": "9.0",
        "desc": "Potencia explosiva en rango óptimo.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "8.5"
          }
        ]
      },
      "ABS / CORE": {
        "score": "8.0",
        "desc": "Estabilidad central sólida en anti-rotación.",
        "history": [
          {
            "date": "OCT 2025",
            "val": "7.8"
          }
        ]
      }
    },
    "physicalTests": {
      "jump": {
        "history": [
          {
            "date": "15 DIC",
            "value": "42"
          },
          {
            "date": "01 DIC",
            "value": "40"
          },
          {
            "date": "15 NOV",
            "value": "43"
          },
          {
            "date": "01 NOV",
            "value": "41"
          }
        ],
        "comments": "Mejora constante en la potencia reactiva."
      },
      "hopTest": {
        "history": [
          {
            "date": "15 DIC",
            "lVal": "185",
            "rVal": "182",
            "asymmetry": "1.6%"
          },
          {
            "date": "01 DIC",
            "lVal": "180",
            "rVal": "178",
            "asymmetry": "1.1%"
          }
        ],
        "comments": "Asimetría dentro de los rangos de normalidad (<5%)."
      },
      "strengthPeaks": {
        "history": [
          {
            "date": "15 DIC",
            "isometric": "450",
            "eccentric": "510"
          },
          {
            "date": "01 DIC",
            "isometric": "435",
            "eccentric": "495"
          }
        ],
        "comments": "Pico de fuerza isométrica en niveles óptimos."
      },
      "custom": [
        {
          "name": "Grip Strength",
          "value": "65",
          "unit": "kg",
          "date": "15 DIC"
        }
      ]
    },
    "extra": {
      "aiReports": [
        {
          "title": "Análisis de Recuperación Semanal",
          "date": "15 Dic 2025",
          "type": "Weekly"
        },
        {
          "title": "Predicción de Riesgo de Lesión",
          "date": "01 Dic 2025",
          "type": "Risk"
        }
      ],
      "questionnaires": [
        {
          "date": "20 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "85/100",
          "status": "Completo"
        },
        {
          "date": "19 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "82/100",
          "status": "Completo"
        },
        {
          "date": "18 DIC 2025",
          "name": "Well-being (WBQ)",
          "score": "88/100",
          "status": "Completo"
        }
      ]
    },
    "extraTests": {
      "selected": [
        "ECOGRAFÍA",
        "RESONANCIA MAGNÉTICA (RMN)"
      ],
      "comment": "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    }
  }
};