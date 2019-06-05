import { Component, OnInit } from '@angular/core';
import { SystemType } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-systems-type',
  templateUrl: './systems-type.component.html',
  styleUrls: ['./systems-type.component.scss']
})
export class SystemsTypeComponent implements OnInit {
  data: SystemType[] = [
    {
      id: 1,
      typeSystemName: 'Energía',
      detail: 'Detalle 1',
    },
    {
      id: 2,
      typeSystemName: 'Tratamiento cloacal',
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
      typeSystemName: {
        title: 'Nombre de Tipo de Sistema',
        type: 'text',
        width: '200px',
      },
      detail: {
        title: 'Detalle',
        type: 'text',
        width: '300px',
      },
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
