import { Component, OnInit } from '@angular/core';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {

  data = [
    {
      id: 1,
      name: 'Planta 1',
      description: 'Descripción 1',
    },
    {
      id: 2,
      name: 'Planta 2',
      description: 'Descripción 2',
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
      name: {
        title: 'Nombre',
        type: 'text',
        width: '200px',
      },
      description: {
        title: 'Descripción',
        type: 'text',
        width: '300px',
      },
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
