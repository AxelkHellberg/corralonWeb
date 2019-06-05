import { Component, OnInit } from '@angular/core';
import { MeasurementUnits } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  data: MeasurementUnits[] = [
    {
      id: 1,
      measurement: 'VOLT',
      detail: 'Detalle 1',
    },
    {
      id: 2,
      measurement: 'AMP',
      detail: 'Detalle 2',
    },
  ]

  settings: SmartTableSettings = {
    attr: {
      class: 'general-table',
    },
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
    },
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        width: '150px',
      },
      measurement: {
        title: 'Medida',
        type: 'text',
        width: '300px',
      },
      detail: {
        title: 'Detalle',
        type: 'text',
        width: '100px',
      },
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
