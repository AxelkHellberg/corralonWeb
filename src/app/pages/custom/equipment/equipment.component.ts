import { GeneralService } from './../../../services/general.service';
import { CreateConfirmData } from './../../../@models/smart-table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  associateType: string;
  associateElements: boolean;
  data: Equipment[] = [
    {
      id: '1',
      nombre: 'Auxiliares Uca',
      systemId: 'ENERGÍA',
      detalle: 'Detalle 1',
      attributes: '<a href="#/pages/equipment?attributes=true">Asociar</a>',
      tag: '<a href="#/pages/equipment?tag=true">ABC123</a>',
      equipment: 'Cargador Evequoz',
    },
    {
      id: '2',
      nombre: 'Planteamiento de tratamiento de efluentes cloacales',
      systemId: 'AGUA',
      detalle: 'Detalle 2',
      attributes: '<a href="#/pages/equipment?attributes=true">Asociar</a>',
      tag: '<a href="#/pages/equipment?tag=true">Sin Tag</a>',
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
        title: 'Nombre de Equipamiento',
        type: 'text',
      },
      detalle: {
        title: 'Detalle',
        type: 'text',
      },
      system: {
        title: 'Sistema',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'ENERGÍA',
                value: 'ENERGÍA',
              },
              {
                title: 'AGUA',
                value: 'AGUA',
              },
            ]
          }
        }
      },
      attributes: {
        title: 'Asociar atributos a medir',
        type: 'html',
      },
      tag: {
        title: 'Tag',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                value: '<a href="#/pages/equipment?tag=true" href="javascript:void(0)">ABC123</a>',
                title: 'ABC123',
              },
              {
                value: '<a href="#/pages/equipment?tag=true" href="javascript:void(0)">Sin Tag</a>',
                title: 'Sin Tag',
              },
            ],
          },
        },
      },
    },
  };

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.tag) {
        this.associateElements = true;
        this.associateType = 'tag';
      }
      if (queryParams.attributes) {
        this.associateElements = true;
        this.associateType = 'attributes';
      }
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.associateElements = false;
    this.router.navigate(['pages/equipment']);
  }

  rowSelect() {
    this.associateElements = true;
    this.associateType = 'attributes';
  }

  async addEquipment(data: CreateConfirmData) {
    const { newData } = data;
    try {
      await this.generalService.createEquipment(newData);
    } catch (error) {
      console.log(error);
    }
  }

}
