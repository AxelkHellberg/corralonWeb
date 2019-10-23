import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-round-reports',
  templateUrl: './round-reports.component.html',
  styleUrls: ['./round-reports.component.scss']
})
export class RoundReportsComponent implements OnInit {
  statusSelectedItem: string = '';
  typeSelectedItem: string = '';
  filterTableSettings: any = {};
  showDetail: boolean;
  roundsData: any = [];
  settings: SmartTableSettings = {
    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      status: {
        title: 'Estado',
        type: 'html',
      },
      // percent: {
      //   title: 'Tipo de Falla',
      //   type: 'text',
      // },
      id: {
        title: 'ID',
        type: 'text',
      },
      operator: {
        title: 'Operador',
        type: 'text',
      },
      roundName: {
        title: 'Nombre de la Ronda',
        type: 'text',
      },
      date: {
        title: 'Fecha',
        type: 'text',
      },
      time: {
        title: 'Hora',
        type: 'text',
      },
    },
  };

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    let maneuverGuides;
    try {
      const response = await this.generalService.getRounds();
      maneuverGuides = response.items;
    } catch (e) { }

    try {
      const response = await this.generalService.getUser();
      const userFullName = (item) => {
        const data = response.items.find(user => item.userId === user.id);
        return `${data.name} ${data.lastName}`;
      };
      const {items: roundStatus} = await this.generalService.getRoundsStatus();

      this.roundsData = maneuverGuides.map(item => ({
        status: this.setRoundStatus(roundStatus, item.estadoRondaId),
        id: item.id,
        roundName: item.nombre,
        date: moment(item.createdAt).utc().format('DD/MM/YYYY'),
        time: moment(item.createdAt).utc().format('HH:mm'),
        operator: userFullName(item)
      }));
    } catch (error) {

    }
  }

  setRoundStatus(roundsStatus: any[], statusId: number) {
    const {nombre: status} = roundsStatus.find(_status => _status.id === statusId);
    return `<div class="container-btn btn btn-success">${status}</div>`;
  }
  filterTable(column: string, filterTerm: string): void {
    const noFilter = !!filterTerm;
    this.filterTableSettings = { ...this.filterTableSettings, [column]: noFilter ? filterTerm : null};
  }

}
