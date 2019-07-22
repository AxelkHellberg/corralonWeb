import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-failure-notifications',
  templateUrl: './failure-notifications.component.html',
  styleUrls: ['./failure-notifications.component.scss']
})
export class FailureNotificationsComponent implements OnInit {
  statusSelectedItem: string = '';
  systemSelectedItem: string = '';
  equipmentSelectedItem: string = '';
  showDetail: boolean;
  filterTableSettings: any = {};
  failureData: any = [
    {
      status: `<div class="container-btn btn btn-danger">DETECTADO</div>`,
      id: '1',
      failureType: 'Error 1',
      roundNumber: 47,
      date: '15/04/2019',
      time: '15:04:35',
      system: 'Auxiliares Uca',
      equipment: 'Cargador Evequoz',
    },
    {
      status: '<div class="container-btn btn btn-warning">EN REPARACIÓN</div>',
      id: '2',
      failureType: 'Error 2',
      roundNumber: 48,
      date: '15/04/2019',
      time: '16:04:35',
      system: 'UPS 2',
      equipment: 'Auxiliares UCA',
    },
    {
      status: '<div class="container-btn btn btn-success">SOLUCIONADO</div>',
      id: '1',
      failureType: 'Error 3',
      roundNumber: 49,
      date: '15/04/2019',
      time: '18:04:35',
      system: 'UPS 1',
      equipment: 'Auxiliares UCA',
    },
  ];
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
      estadoFalla: {
        title: 'Estado',
        type: 'html',
      },
      id: {
        title: 'ID',
        type: 'text',
      },
      tipoFalla: {
        title: 'Tipo de Falla',
        type: 'text',
      },
      roundNumber: {
        title: 'Nro de Ronda',
        type: 'text',
      },
      date: {
        title: 'Fecha',
        type: 'text',
      },
      time: {
        title: 'Horario',
        type: 'text',
      },
      system: {
        title: 'Sistema',
        type: 'text',
      },
      equipment: {
        title: 'Equipo',
        type: 'text',
      },
    },
  };
  failureTypes: any;
  failureStatus: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getFailureType();
      this.failureTypes = response.items;
    } catch (error) {

    }

    try {
      const response = await this.generalService.getStatusFailures();
      this.failureStatus = response.items;
    } catch (error) {

    }

    try {
      const response = await this.generalService.getNotificationsFailures();
      this.failureData = response.items;
      this.failureData.forEach(data => {
        data['estadoFalla'] = this.failureTypes.find(failure => failure.id === data.estadoFallaId).nombre;
        data['tipoFalla'] = this.failureTypes.find(failure => failure.id === data.tipoFallaId).nombre;
        data['date'] = data.updateAt;
      })
    } catch (error) {

    }
   }

  filterTable(column: string, filterTerm: string): void {
    const noFilter = !!filterTerm;
    this.filterTableSettings = { ...this.filterTableSettings, [column]: noFilter ? filterTerm : null };
  }

  selectRow(event: string) {
    this.showDetail = !this.showDetail;
  }

}
