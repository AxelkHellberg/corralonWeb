import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SmartTableSettings } from '../../../../@models/smart-table';

@Component({
  selector: 'ngx-associate-elements',
  templateUrl: './associate-elements.component.html',
  styleUrls: ['./associate-elements.component.scss']
})
export class AssociateElementsComponent implements OnInit {
  @Input() type: string = 'tag';
  @Output() onSave = new EventEmitter<void>();
  enable: boolean;
  options = [
    { value: 'Si', label: 'Si' },
    { value: 'No', label: 'No' },
  ];
  option;
  settings: SmartTableSettings = {
    noDataMessage: '',
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
      attributeName: {
        title: 'Nombre del Atributo',
        type: 'text',
      },
      measure: {
        title: 'Medida',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Medida 1',
                value: '1',
              },
              {
                title: 'Medida 2',
                value: '2',
              }
            ]
          },
        },
      },
      normalValue: {
        title: 'Valor Normal',
        type: 'text',
      },
      warningValue: {
        title: 'Valor de Alerta',
        type: 'text',
      },
      failureValue: {
        title: 'Valor de Falla',
        type: 'text',
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit();
  }

}
