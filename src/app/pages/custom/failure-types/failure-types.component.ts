import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-failure-types',
  templateUrl: './failure-types.component.html',
  styleUrls: ['./failure-types.component.scss']
})
export class FailureTypesComponent implements OnInit {

  data = [
    {
      id: 1,
      failureType: 'Error 1',
      deatil: 'Detalle 1',
    },
    {
      id: 2,
      failureType: 'Error 2',
      deatil: 'Detalle 2',
    },
  ]

  settings = {
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
      failureType: {
        title: 'Tipo de Falla',
        type: 'text',
        width: '200px',
      },
      deatil: {
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
