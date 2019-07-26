import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { SmartTableSettings } from '../../../@models/smart-table';

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
  roundsData: any = [
    {
      status: `<div class="container-btn btn btn-success">COMPLETA</div>`,
      id: '1',
      percent: '100%',
      operator: 'Juan Rodríguez',
      file: '454676',
      type: 'Ronda',
      roundName: 'Plantilla 1',
      time: '15/04/2019 15:04',
    },
    {
      status: '<div class="container-btn btn btn-danger">INCOMPLETA</div>',
      id: '2',
      percent: '70%',
      operator: 'Juan Rodríguez',
      file: '454676',
      type: 'Ronda',
      roundName: 'Plantilla 1',
      time: '16/04/2019 15:04',
    }
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
      status: {
        title: 'Estado',
        type: 'html',
      },
      id: {
        title: 'ID',
        type: 'text',
      },
      percent: {
        title: 'Tipo de Falla',
        type: 'text',
      },
      operator: {
        title: 'Operador',
        type: 'text',
      },
      file: {
        title: 'Legajo',
        type: 'text',
      },
      roundName: {
        title: 'Nombre de Ronda',
        type: 'text',
      },
      time: {
        title: 'Fecha',
        type: 'text',
      },
    },
  };
  min: Date;
  max: Date;

  constructor(protected dateService: NbDateService<Date>) { }

  ngOnInit() {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
  }

  filterTable(column: string, filterTerm: string): void {
    const noFilter = !!filterTerm;
    this.filterTableSettings = { ...this.filterTableSettings, [column]: noFilter ? filterTerm : null};
  }

}
