import { RoundsDetails } from './../../../@models/rounds';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { RoundTemplateData, RoundFields } from '../../../@models/general';

@Component({
  selector: 'ngx-round-template',
  templateUrl: './round-template.component.html',
  styleUrls: ['./round-template.component.scss']
})
export class RoundTemplateComponent implements OnInit {
  fullData: any;
  data = [];

  settings: SmartTableSettings = {
    mode: 'external',
    attr: {
      class: 'general-table'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
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
    }
  };
  showRoundTemplate: boolean;
  roundTemplateId: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || queryParam.edit || queryParam.id) {
        this.showRoundTemplate = true;
        this.roundTemplateId = queryParam.id;
      } else {
        this.showRoundTemplate = false;
      }
    });
  }

  async ngOnInit() {
    await this.getTemplates();
    if (this.roundTemplateId) {
      const fullData = this.data.find(item => item.id === +this.roundTemplateId);
      try {
        const response = await this.generalService.getFieldTemplate(this.roundTemplateId);
        fullData.full.fieldsData = response.map(field => (<RoundsDetails>{
          unit: field.unidadMedida.nombre,
          equipment: field.equipamiento.nombre,
          plant:  field.equipamiento.sistema.planta.nombre,
          system: field.equipamiento.sistema.nombre,
          name: field.nombre,
          minValue: field.valorMin,
          normalValue: field.valorNormal,
          maxValue: field.valorMax,
          type: field.tipoCampoRondaId,
          roundFieldId: field.id,
          roundTemplateId: field.plantillaRondaId,
        }));
        this.fullData = fullData;
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
        timer = timer ? Array.from(timer).map((item:any)=>{
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

  createTemplate() {
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        create: true,
      }
    });
    this.fullData = null;
  }

  async editTemplate({data}) {
    const dataFields = []
    const response = await this.generalService.getFieldTemplate(data.id);
    response.forEach(field => {
      dataFields.push(<RoundsDetails>{
        unit: field.unidadMedida.nombre,
        equipment: field.equipamiento.nombre,
        plant:  field.equipamiento.sistema.planta.nombre,
        system: field.equipamiento.sistema.nombre,
        name: field.nombre,
        minValue: field.valorMin,
        normalValue: field.valorNormal,
        maxValue: field.valorMax,
        type: field.tipoCampoRondaId,
        roundFieldId: field.id,
        roundTemplateId: field.plantillaRondaId,
      })
    });
    data.full.fieldsData = dataFields;
    this.fullData = data;
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        id: data.id,
      }
    });
  }

  async deleteTemplate(template) {
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

  async onSaveData(data) {
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

  async saveRoundsFields(data) {
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
}
