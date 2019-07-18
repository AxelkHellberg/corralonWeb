import { GeneralService } from './../../../services/general.service';
import { ConfirmData } from './../../../@models/smart-table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';
import { EquipmentData } from '../../../@models/general';

@Component({
  selector: 'ngx-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  associateType: string;
  associateElements: boolean;
  data: Equipment[] = [];
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
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        editable: false,
      },
      nombre: {
        title: 'Nombre de Equipamiento',
        type: 'text',
      },
      detalle: {
        title: 'Detalle',
        type: 'text',
      },
      sistemaId: {
        title: 'Sistema',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: []
          },
        },
      },
      attributes: {
        title: 'Asociar atributos a medir',
        type: 'html',
        editable: false,
      },
      tag: {
        title: 'Tag',
        type: 'html',
        editable: false,
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

  async ngOnInit() {
    try {
      const response = await this.generalService.getSystems();
      // this.plants = response.items;
      this.settings.columns.sistemaId.editor.config.list = response.items.map(system => ({
        title: system.nombre,
        value: system.id,
      }));
      this.settings = {...this.settings};
    } catch (e) {

    }

    try {
      const response = await this.generalService.getEquipments();
      this.data = response.items;
    } catch (e) {
      console.log(e)
    }
  }

  async addEquipment(data: ConfirmData) {
    const { newData } = data;
    try {
      await this.generalService.createEquipment(newData);
    } catch (error) {
      console.log(error);
    }
  }

  async editEquipment(data: ConfirmData) {
    const { newData } = data;
    const equipmentData: EquipmentData = {
      nombre: newData.nombre,
      detalle: newData.detalle,
      sistemaId: newData.sistemaId,
    }
    try {
      const response = await this.generalService.editEquipment(newData.id, equipmentData);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async deleteEquipment(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteEquipment(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }


  goBack() {
    this.associateElements = false;
    this.router.navigate(['pages/equipment']);
  }

  rowSelect() {
    this.associateElements = true;
    this.associateType = 'attributes';
  }

}
