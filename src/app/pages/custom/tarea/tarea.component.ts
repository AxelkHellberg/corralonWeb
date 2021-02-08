import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundFields, RoundTemplateData } from '../../../@models/general';
import { GeneralService } from '../../../services/general.service';
import { RoundsDetails } from '../../../@models/rounds';
import { elementEnd } from '@angular/core/src/render3';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit, OnChanges {
  static getTareasStatic() {
   //window.location.reload()
  }
  fullData: any;
  data : any[];
  Nueva: boolean;
  tareaEditada: boolean;
  showRoundTemplate: boolean;
  roundTemplateId: any;



  settings: SmartTableSettings = {
    mode: 'external',
    attr: {
      class: 'general-table',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      plantaNombre: {
        title: 'Planta',
        type: 'text',
        width: '200px'
      },
      sistemaNombre: {
        title: 'Sistema',
        type: 'text',
        width: '200px'
      },
      equipamientoNombre: {
        title: 'Equipo',
        type: 'text',
        width: '200px'
      },
      nombre: {
        title: 'Nombre de Tarea',
        type: 'text',
        width: '200px'
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
        width: '200px'
      },
      unidadMedidaNombre: {
        title: 'Unidad De Medida',
        type: 'text',
        width: '200px'
      },

    },



  };
  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.Nueva) {
        this.Nueva = true;

      } else {
        this.Nueva = false;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
   // this.getTareas();
  }

  async onSaveData(data) {
    console.log("onsave");
    console.log(data)
    this.getTareas();
    /*const templateData: RoundTemplateData = {
      nombre: data.nombre,
      funcionamientoSistema: !!data.full.templateConfig.funcionamientoSistema,
      obligatorioSistema: !!data.full.templateConfig.obligatorioSistema,
      funcionamientoEquipo: !!data.full.templateConfig.funcionamientoEquipo,
      obligatorioEquipo: !!data.full.templateConfig.obligatorioEquipo,
      horarios: data.time ? data.time.split(' - ') : '',
    };
    if (data.id) {
      try {
        await this.generalService.editRoundTemplate(data.id, templateData);
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        //const { id } = await this.generalService.createRoundTemplate(templateData);
        const { id } = await this.generalService.createRoundTemplate(templateData);
        data.id = id;
        console.log("templetaData");
        console.log(templateData);
        await this.saveRoundsFields(data);
      } catch (error) {
        console.log(error)
      }
    }*/
    this.getTemplates();
    this.fullData = null;
    this.roundTemplateId = null;
  }
  async getFieldsRoundTemplate() {
    if (this.roundTemplateId) {
      const fullData = this.data.find(item => item.id === +this.roundTemplateId);
      try {
        const response = await this.generalService.getFieldTemplate(this.roundTemplateId);
        fullData.full.fieldsData = response.map(field => (<RoundsDetails>{
          unit: field.unidadMedida.nombre,
          equipment: field.equipamiento.nombre,
          plant: field.equipamiento.sistema.planta.nombre,
          system: field.equipamiento.sistema.nombre,
          name: field.nombre,
          minValue: field.valorMin,
          normalValue: field.valorNormal,
          maxValue: field.valorMax,
          type: field.tipoCampoRondaId,
          roundFieldId: field.id,
          roundTemplateId: field.plantillaRondaId,
        }));
        this.fullData = { ...fullData };
      } catch (error) {

      }
    }
  }


  async getTemplates() {
    let roundTemplateData;
    try {
      roundTemplateData = await this.generalService.getRoundTemplate();
    } catch (error) {
    }
    try {
      this.data = roundTemplateData.items.map(item => {
        const time = item.horarios ? item.horarios != -1 ? Array.isArray(item.horarios) ? item.horarios.join(' - ') : item.horarios : item.horarios : item.horarios
        let timer = item.horarios ? item.horarios != -1 ? !Array.isArray(item.horarios) ? item.horarios.split(' - ') : item.horarios : item.horarios : item.horarios
        timer = timer ? Array.from(timer).map((item: any) => {
          const _item = item ? item.split(':') : item
          return {
            hour: _item[0],
            minute: _item[1],
          };
        }) : timer
        return {
          id: item.id,
          nombre: item.nombre,
          time,
          full: {
            timeData: {
              timer: {},
              time,
            },
            fieldsData: [],
            tableTimeData: timer,
            horarioId: item.horarioId,
            campoRondaId: item.campoRondaId,
            templateConfig: {
              obligatorioSistema: item.obligatorioSistema,
              funcionamientoSistema: item.funcionamientoSistema,
              obligatorioEquipo: item.obligatorioEquipo,
              funcionamientoEquipo: item.funcionamientoEquipo,
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async saveRoundsFields(data) {
    console.log("saverounds");
    data.full.fieldsData.forEach(async (field: RoundsDetails) => {
      const dataTemplate: RoundFields = {
        nombre: field.name,
        valorNormal: field.normalValue,
        valorMax: field.maxValue,
        valorMin: field.minValue,
        equipamientoId: field.equipmentId,
        tipoCampoRondaId: field.typeId,
        unidadMedidaId: field.unitId,
        plantillaRondaId: data.id,
      }
      console.log("dataTemplate");
      console.log(dataTemplate);
      await this.generalService.createRoundFields(dataTemplate);
    });
  }
  
dataCompleta : any[];
source: LocalDataSource;
  public async getTareas() {

   // const response = await this.generalService.getTarea();
   Promise.all([
    this.generalService.getTareaCompletaNuevo(),
  ]).then(([tarea]) => {
    this.data = tarea;
    console.log("DATA:");
    console.log(this.data);
  
/*     let cont = 0;
    this.data.forEach(dato => {
      this.data[cont] = {
        plantaNombre: dato[cont].Planta,
        sistemaNombre: dato[cont].Sistema,
        equipoNombre: dato[cont].Equipo,
        nombre: dato[cont].NombreTarea,
        descripcion: dato[cont].Descripcion,
        unidadMedidaNombre: dato[cont].UnidadMedida,
      }
      cont += 1 ;
    }) */
    let cont = 0;
    this.data.forEach(dato => {
      console.log("Equipo:")
      console.log(dato.Equipo)
      dato={...dato,
      equipamientoNombre:dato.Equipo,
      sistemaNombre: dato.Sistema,
      plantaNombre: dato.Planta,
      nombre: dato.NombreTarea,
      descripcion: dato.Descripcion,
      unidadMedidaNombre: dato.UnidadMedida? dato.UnidadMedida: "Sin Nombre"
    }
  
    this.data[cont] = dato;
      cont +=1;
    });
    this.source = new LocalDataSource([]);
    this.source = new LocalDataSource(this.data);

  }).catch(() => { });


/*     let cont = 0;
    this.data.forEach(dato => {
      this.data[cont] = {
        plantaNombre: dato[cont].Planta,
        sistemaNombre: dato[cont].Sistema,
        equipoNombre: dato[cont].Equipo,
        nombre: dato[cont].NombreTarea,
        descripcion: dato[cont].Descripcion,
        unidadMedidaNombre: dato[cont].UnidadMedida,
      }
      cont += 1 ;
    })
    this.source = new LocalDataSource([]);
    this.source = new LocalDataSource(this.data); */

    
/*     console.log("this.data");
    console.log(this.data); */
   
    
  }


  prueba() {
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
      }
    });
    console.log(this.Nueva)
  }
 
unidades: any[];
  async ngOnInit() {
    this.getTareas();
    let r= await this.generalService.getMeasurementUnits();
    this.unidades = r.items;
    
    //this.getFieldsRoundTemplate();
    //console.log("data");
    //console.log(this.data);
  }


  createTemplate() {
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
        }
      })/* .then(()=> {
        this.getTareas()
      }); */
    this.fullData = null;
  }

  //descartar
  async editTemplate({ data }) {
    console.log("edit data");
    console.log(data);
    const dataFields = []
    const response = await this.generalService.getRondasCompletas1(data.id);
    console.log("edit respose");
    console.log(response[0].campoRondaPlantillaRonda[0]);
    //resisar el caso de que tenga muchos
    let res = response[0].campoRondaPlantillaRonda
    res.forEach(field => {
      dataFields.push(<RoundsDetails>{
        unit: field.campoRonda.unidadMedidaId,
        equipment: field.campoRonda.equipamientoId,
        //plant: field.equipamiento.sistema.planta.nombre,
        //system: field.equipamiento.sistema.nombre,
        name: field.campoRonda.nombre,
        minValue: field.campoRonda.valorMin,
        normalValue: field.campoRonda.valorNormal,
        maxValue: field.campoRonda.valorMax,
        type: field.campoRonda.tipoCampoRondaId,
        roundFieldId: field.campoRonda.id,
        roundTemplateId: field.campoRonda.plantillaRondaId,
      })
    });
    data.full.fieldsData = dataFields;
    this.fullData = data;
    console.log("this.full data (tarea)");
    console.log(this.fullData);
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
        id: data.id,
      }
    });
  }
  //descartar
  async deleteTemplate(template) {
    console.log("delete");
    console.log(template);
    const { id } = template.data;
    try {
      await this.generalService.deleteRoundTemplate(id);
      delete this.data[template.index];
      this.data = [...this.data];
    } catch (error) {
      console.log(error)
      template.confirm.reject();
    }
  }

  async deleteTarea(tarea) {
    console.log("deleteTarea");
    const dataTarea = tarea.data;
    console.log(dataTarea.id);
    this.generalService.deleteRoundFields(tarea.data.idTarea);

    
  }

  async editTarea(tarea) {
    console.log("Tarea id seleccionada : ")
    console.log(tarea)
   let value = await this.generalService.getTareaCompletaPorId(tarea.data.idTarea)
   this.fullData = value[0]
   console.log("this.full data (tarea)");
   console.log(this.fullData);
   this.router.navigate(['/pages/tarea'], {
     queryParams: {
       Nueva: true,
       id: tarea.data.id,
       nombreSistema: this.fullData.nombreSistema,
       sistemaId: this.fullData.sistemaId,
       nombreEquipo: this.fullData.nombreEquipo,
       equipoId: this.fullData.equipoId,
       nombrePlanta: this.fullData.nombrePlanta,
       plantaId: this.fullData.plantaId,
       nombreTipoTarea: this.fullData.nombreTipoTarea,
       nombreUnidadMedida: this.fullData.nombreUnidadMedida,
       tareaDescripcion: this.fullData.tareaDescripcion,
       tareaId: this.fullData.tareaId,
       tareaNombre: this.fullData.tareaNombre,
       tipoCampoRondaId: this.fullData.tipoCampoRondaId,
       unidadMedidaId: this.fullData.unidadMedidaId,
       valorMax: this.fullData.valorMax,
       valorMin: this.fullData.valorMin,
       valorNormal: this.fullData.valorNormal,
       tareaEditada: true
     }
   });

/*    let i = 0
   for(i;i<500;i++){
     console.log("esperando respuesta")
   } */

  //this.generalService.getTareaCompleta();
  //console.log("tarea Completa");
  //


  }

}
