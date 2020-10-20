import { Component, OnInit } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundFields, RoundTemplateData } from '../../../@models/general';
import { GeneralService } from '../../../services/general.service';
import { RoundsDetails } from '../../../@models/rounds';

@Component({
  selector: 'ngx-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
  fullData: any;
  data: any[];
  Nueva: boolean;
  showRoundTemplate: boolean;
  roundTemplateId: any;



  settings: SmartTableSettings = {
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
        title: 'Nombre de Ronda',
        type: 'text',
        width: '200px'
      },
      time: {
        title: 'Horario',
        type: 'text',
        width: '300px'
      }
    },
      

    
  };
 constructor(private route: ActivatedRoute,private router : Router,private generalService: GeneralService) {this.route.queryParams.subscribe(queryParam => {
  if (queryParam.Nueva) {
    this.Nueva = true;

  } else {
    this.Nueva = false;
  } });}
 
  async onSaveData(data) {
    console.log("onsave");
    const templateData: RoundTemplateData = {
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
        const { id } = await this.generalService.createRoundTemplate(templateData);
        data.id = id;
        await this.saveRoundsFields(data);
      } catch (error) {
        console.log(error)
      }
    }
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
      await this.generalService.createRoundFields(dataTemplate);
    });
  }



 
 prueba(){
  this.router.navigate(['/pages/tarea'], {
    queryParams: {
      Nueva: true,
    }
  });
  console.log(this.Nueva)
 }
  async ngOnInit() {
    await this.getTemplates();
    this.getFieldsRoundTemplate();
    console.log("data");
    console.log(this.data);
  }

}
