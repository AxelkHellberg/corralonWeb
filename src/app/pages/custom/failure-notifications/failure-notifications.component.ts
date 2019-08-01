import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';
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
  failureData: any = [];
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
      origin: {
        title: 'Origen',
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
    },
  };
  failureTypes: any;
  failureStatus: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getFailureType();
      this.failureTypes = response.items;
      console.log(this.failureTypes);
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
        data['estadoFalla'] = this.failureStatus.find(failure => failure.id === data.estadoFallaId).nombre;
        data['tipoFalla'] = this.failureTypes.find(failure => failure.id === data.tipoFallaId).nombre;
        data['date'] = moment(data.updateAt).utc().format('DD/MM/YYYY');
        data['time'] = moment(data.updateAt).utc().format('hh:mm:ss');
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
