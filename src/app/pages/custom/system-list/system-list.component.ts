import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { CreateConfirmData } from './../../../@models/smart-table';
import { SystemList } from './../../../@models/systems';

@Component({
  selector: 'ngx-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {

  associateTagId: boolean;
  data: SystemList[] = [
    {
      id: '1',
      nombre: 'Auxiliares Uca',
      systemType: 'ENERGÍA',
      detail: 'Detalle 1',
      descripcion: 'Detalle 1',
      plantId: 'Planta A',
      tagId: '<a href="#/pages/system-list?tag=true">Sin Tag</a>',
      equipment: 'Cargador Evequoz',
    },
    {
      id: '2',
      nombre: 'Planteamiento de tratamiento de efluentes cloacales',
      systemType: 'AGUA',
      detail: 'Detalle 2',
      descripcion: 'Detalle 2',
      plantId: 'Planta C',
      tagId: '<a href="#/pages/system-list?tag=true">ABC 123</a>',
      equipment: 'Auxiliares UCA',
    },
  ];
  settings: SmartTableSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
      nombre: {
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
      plantId: {
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
      tagId: {
        title: 'Tag',
        type: 'html',
      },
    },
  };

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParams => {
      this.associateTagId = !!queryParams.tag;
    });
  }

  ngOnInit() {
  }

  goToTable() {
    this.router.navigate(['/pages/system-list']);
  }

  async addSystem(data: CreateConfirmData) {
    const { newData } = data;
    try {
      await this.generalService.createSystem(newData);
      data.confirm.resolve();
    } catch (e) {
      console.log(e);
      data.confirm.reject();
    }
  }

}
