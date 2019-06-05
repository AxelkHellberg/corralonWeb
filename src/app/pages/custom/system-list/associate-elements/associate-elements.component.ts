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
      id: {
        title: 'ID',
        type: 'text',
      },
      equipmentName: {
        title: 'Nombre de Equipamiento',
        type: 'text',
      },
      detail: {
        title: 'Detalle',
        type: 'text',
      },
      system: {
        title: 'Sistema',
        type: 'text',
      },
      attributes: {
        title: 'Asociar atributos a medir',
        type: 'text',
        edit: {
          type: 'html',
        }
      },
      tag: {
        title: 'Tag',
        type: 'html',
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
