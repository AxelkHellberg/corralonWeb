import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../@theme/components/custom/select/select.component';

@Component({
  selector: 'ngx-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {

  associateTag: boolean;
  data: any = [
    {
      id: '1',
      systemName: 'Auxiliares Uca',
      systemType: 'ENERGÍA',
      detail: 'Detalle 1',
      plant: {
        selected: '1',
        selectItems: [
          {
            text: 'Planta B',
            value: '1',
          },
        ],
        placeholder: 'Planta',
      },
      tag: '<a routerLink="/pages/dashboard" href="javascript:void(0)">Sin Tag</a>',
      equipment: 'Cargador Evequoz',
    },
    {
      id: '2',
      systemName: 'Planteamiento de tratamiento de efluentes cloacales',
      systemType: 'AGUA',
      detail: 'Detalle 2',
      plant: {
        selected: '3',
        selectItems: [
          {
            text: 'Planta A',
            value: '1',
          },
          {
            text: 'Planta B',
            value: '2',
          },
          {
            text: 'Planta C',
            value: '3',
          },
        ],
        placeholder: 'Planta',
      },
      tag: '<a href="javascript:void(0)">Sin Tag</a>',
      equipment: 'Auxiliares UCA',
    },
  ];
  settings = {
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
      systemName: {
        title: 'Nombre de Sistema',
        type: 'text',
      },
      systemType: {
        title: 'Tipo de Sistema',
        type: 'text',
      },
      detail: {
        title: 'Detalle',
        type: 'text',
      },
      plant: {
        title: 'Planta',
        type: 'custom',
        renderComponent: SelectComponent,
        onComponentInitFunction: (component: SelectComponent) => component.setConfig('plant'),
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

}
