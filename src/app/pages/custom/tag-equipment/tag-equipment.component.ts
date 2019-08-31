import { Component, OnInit } from '@angular/core';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-tag-equipment',
  templateUrl: './tag-equipment.component.html',
  styleUrls: ['./tag-equipment.component.scss']
})
export class TagEquipmentComponent implements OnInit {

  data = [
    {
      id: 1,
      number: 'TAG-324',
      status: 'Encendido',
      mandatory: 'Si',
    },
    {
      id: 2,
      number: 'TAG-564',
      status: 'Apagado',
      mandatory: 'No',
    },
  ];

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
      // id: {
      //   title: 'ID',
      //   type: 'text',
      //   width: '150px',
      //   editable: false,
      //   addable: false,
      // },
      number: {
        title: 'N° de Tag',
        type: 'text',
        width: '200px',
      },
      status: {
        title: 'Estado',
        type: 'text',
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Encendido',
                value: 'Encendido',
              },
              {
                title: 'Apagado',
                value: 'Apagado',
              }
            ],
          },
        },
      },
      mandatory: {
        title: 'Obligatorio',
        type: 'text',
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Si',
                value: 'Si',
              },
              {
                title: 'No',
                value: 'No',
              },
            ],
          },
        },
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
