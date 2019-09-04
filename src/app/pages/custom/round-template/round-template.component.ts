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
  data = [
    // {
    //   id: 1,
    //   nombre: 'Plantilla 1',
    //   time: '9:00 - 12:20',
    //   indexEdited: 1,
    //   full: {
    //     tableData: [
    //       {
    //         plant: 'Planta A',
    //         system: 'System A2',
    //         equipment: 'Equipment A20',
    //         component: 'Component A20',
    //         timer: {},
    //         time: '',
    //       },
    //       {
    //         plant: 'Planta B',
    //         system: 'System B1',
    //         equipment: 'Equipment B10',
    //         component: 'Component B10',
    //         timer: {},
    //         time: '',
    //       },
    //     ],
    //     timeData: { timer: {}, time: '9:00 - 12:20' },
    //     tableTimeData: [{ hour: '9', minute: '00' }, { hour: '12', minute: '20' }],
    //     templateConfig: { systemMandatory: true, equipmentFunctionality: true },
    //   }
    // },
    // {
    //   id: 2,
    //   nombre: 'Plantilla 2',
    //   time: '9:00',
    //   indexEdited: 2,
    //   full: {
    //     tableData: [
    //       {
    //         plant: 'Planta A',
    //         system: 'System A2',
    //         equipment: 'Equipment A20',
    //         component: 'Component A20',
    //         timer: {},
    //         time: '',
    //       },
    //       {
    //         plant: 'Planta B',
    //         system: 'System B1',
    //         equipment: 'Equipment B10',
    //         component: 'Component B10',
    //         timer: {},
    //         time: '',
    //       },
    //     ],
    //     timeData: { timer: {}, time: '9:00' },
    //     tableTimeData: [{ hour: '9', minute: '00' }],
    //     templateConfig: { systemMandatory: true, equipmentFunctionality: true },
    //   }
    // }
  ];

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
      // id: {
      //   title: 'ID',
      //   type: 'text',
      //   width: '150px'
      // },
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
      this.fullData = this.data.find(item => item.id === +this.roundTemplateId);
      console.log(this.fullData);
    }
  }

  

  async getTemplates() {
    let roundTemplateData;
    try {
      roundTemplateData = await this.generalService.getRoundTemplate();
      console.log(roundTemplateData);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await this.generalService.getSchedule();
      console.log(response);
      this.data = roundTemplateData.items.map(item => {
        console.log(item)
        const time = response.items.filter(_item => _item.id === item.horarioId)
        .map(_item => `${_item.hora}:${_item.minuto}`).join(' - ')
        const timer = response.items.filter(_item => _item.id === item.horarioId)
        .map(_item => ({hour: _item.hora, minute: _item.minuto}));
        return {
          id: item.id,
          nombre: item.nombre,
          //time,
          full: {
            timeData: {
              timer: {},
              //time,
            },
            //tableTimeData: timer,
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
  }

  editTemplate({data}) {
    this.fullData = data;
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        id: data.id,
      }
    });
  }

  deleteTemplate(row) {
    delete this.data[row.index];
    this.data = [...this.data];
  }

  async onSaveData(data) {
    const templateData:RoundTemplateData = {
      nombre: data.nombre,
      funcionamientoSistema: data.full.templateConfig.funcionamientoSistema,
      obligatorioSistema: data.full.templateConfig.obligatorioSistema,
      funcionamientoEquipo: data.full.templateConfig.funcionamientoEquipo,
      obligatorioEquipo: data.full.templateConfig.obligatorioEquipo,
      campoRondaId: data.full.campoRondaId || 1,
      horarioId: data.full.horarioId || -1,
    };
    
    console.log(templateData, data);
    if (data.id) {
      try {
        const response = await this.generalService.editRoundTemplate(data.id, templateData);
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await this.generalService.createRoundTemplate(templateData);
        const dataTemplate:RoundFields = {
          nombre: data.full.fieldConfig.nombre,
          valorNormal: data.full.fieldConfig.valorNormal,
          valorMax: data.full.fieldConfig.valorMax,
          valorMin: data.full.fieldConfig.valorMin,
          equipamientoId: data.full.fieldConfig.equipamientoId,
          tipoCampoRondaId: data.full.fieldConfig.tipoCampoRondaId,
          unidadMedidaId: data.full.fieldConfig. unidadMedidaId,
          plantillaRondaId: response.id
        }
        const res = await this.generalService.createRoundFields(dataTemplate)
      } catch (error) {
        console.log(error)
      }
    }
    this.getTemplates()
    console.log(data);
    this.fullData = null;
    this.roundTemplateId = null;
  }
}
