import { Component, OnInit } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundFields, RoundTemplateData } from '../../../@models/general';
import { GeneralService } from '../../../services/general.service';
import { RoundsDetails } from '../../../@models/rounds';
import { elementEnd } from '@angular/core/src/render3';

@Component({
  selector: 'ngx-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
  fullData: any;
  data: any;
  Nueva: boolean;
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
      nombre: {
        title: 'Nombre de Tarea',
        type: 'text',
        width: '200px'
      },
      equipamientoId: {
        title: 'equipamiento',
        type: 'text',
        width: '200px'
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
        width: '200px'
      },
      unidadMedidaId: {
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

  async onSaveData(data) {
    console.log("onsave");
    console.log(data)
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
  async getTareas() {
    const response = await this.generalService.getTarea();
    this.data = response.items;
    console.log(this.data);
    let res;

    res= await this.generalService.getTareaCompleta();
    
    this.dataCompleta = res.items;
  console.log(this.dataCompleta);
    
  }


  prueba() {
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
      }
    });
    console.log(this.Nueva)
  }
  async ngOnInit() {
    this.getTareas();
    
    //this.getFieldsRoundTemplate();
    //console.log("data");
    //console.log(this.data);
  }


  createTemplate() {
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
      }
    });
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
    this.generalService.deleteRoundFields(dataTarea.id);
  }

  async editTarea(tarea) {
    const res = await this.generalService.getTareaCompleta();
    res.forEach(element => {if(element.id == tarea.data.id)
    {
      this.fullData=element;
    }
      
    });
    this.router.navigate(['/pages/tarea'], {
      queryParams: {
        Nueva: true,
        id: tarea.data.id,

      }
    });
    //this.generalService.getTareaCompleta();
    //console.log("tarea Completa");
    //
    console.log("this.full data (tarea)");
    console.log(this.fullData);
  }

}