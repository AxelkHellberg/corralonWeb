import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { ConfirmData } from './../../../@models/smart-table';
import { SystemList } from './../../../@models/systems';

@Component({
  selector: 'ngx-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {
  associateTagId: boolean;
  data: SystemList[] = [];
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
      plantaId: {
        title: 'Planta',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
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

  async ngOnInit() {
    try {
      const response = await this.generalService.getPlants();
      const plants = response.items.map(plant => ({
        title: plant.nombre,
        value: +plant.id,
      }));
      this.settings.columns.plantaId.editor.config.list = plants;
      this.settings = {...this.settings};
    } catch (e) {

    }

    try {
      const response = await this.generalService.getSystems();
      this.data = response.items;
    } catch (e) {

    }
  }

  goToTable() {
    this.router.navigate(['/pages/system-list']);
  }

  async addSystem(data: ConfirmData) {
    const { newData } = data;
    try {
      await this.generalService.createSystem({...newData, descripcion: `Descripción ${newData.nombre}`});
      data.confirm.resolve();
    } catch (e) {
      console.log(e);
      data.confirm.reject();
    }
  }

}
