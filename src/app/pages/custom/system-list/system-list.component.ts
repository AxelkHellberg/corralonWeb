import { SystemList } from './../../../@models/systems';
import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../@theme/components/custom/select/select.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {

  associateTag: boolean;
  data: SystemList[] = [
    {
      id: '1',
      systemName: 'Auxiliares Uca',
      systemType: 'ENERGÍA',
      detail: 'Detalle 1',
      plant: 'Planta A',
      tag: '<a href="#/pages/system-list?tag=true">Sin Tag</a>',
      equipment: 'Cargador Evequoz',
    },
    {
      id: '2',
      systemName: 'Planteamiento de tratamiento de efluentes cloacales',
      systemType: 'AGUA',
      detail: 'Detalle 2',
      plant: 'Planta C',
      tag: '<a href="#/pages/system-list?tag=true">ABC 123</a>',
      equipment: 'Auxiliares UCA',
    },
  ];
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
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Planta A',
                value: 'Planta A'
              },
              {
                title: 'Planta B',
                value: 'Planta B'
              },
              {
                title: 'Planta C',
                value: 'Planta C'
              }
            ]
          }
        }
      },
      tag: {
        title: 'Tag',
        type: 'html',
      },
    },
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(queryParams => {
      this.associateTag = !!queryParams.tag;
    });
  }

  ngOnInit() {
  }

  goToTable() {
    this.router.navigate(['/pages/system-list']);
  }

}
