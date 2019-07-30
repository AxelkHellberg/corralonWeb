import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

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
    //   roundName: 'Plantilla 1',
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
    //   roundName: 'Plantilla 2',
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
      id: {
        title: 'ID',
        type: 'text',
        width: '150px'
      },
      roundName: {
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

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || queryParam.edit) {
        this.showRoundTemplate = true;
      } else {
        this.showRoundTemplate = false;
      }
    });
  }

  async ngOnInit() {
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
        const time = response.items.filter(_item => _item.id === item.horarioId)
        .map(_item => `${_item.hora}:${_item.minuto}`).join(' - ')
        const timer = response.items.filter(_item => _item.id === item.horarioId)
        .map(_item => ({hour: _item.hora, minute: _item.minuto}));
        return {
          id: item.id,
          roundName: item.nombre,
          time,
          full: {
            timeData: {
              timer: {},
              time,
            },
            tableTimeData: timer,
            templateConfig: {
              systemMandatory: item.obligatorioSistema,
              systemFunctionality: item.funcionamientoSistema,
              equipmentMandatory: item.obligatorioEquipo,
              equipmentFunctionality: item.funcionamientoEquipo,
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

  editTemplate(data) {
    this.fullData = data;
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        edit: true,
      }
    });
  }

  deleteTemplate(row) {
    delete this.data[row.index];
    this.data = [...this.data];
  }

  onSaveData(data) {
    if (data.indexEdited != null) {
      this.data[data.indexEdited] = data;
      this.data = [...this.data];
    } else {
      data = {
        ...data,
        id: this.data.length + 1
      };
      this.data = [...this.data, ...[data]];
    }
  }
}
