import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { ConfirmData } from './../../../@models/smart-table';
import { SystemList } from './../../../@models/systems';
import { SystemData, PlantData } from '../../../@models/general';

@Component({
  selector: 'ngx-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {
  associateTagId: boolean;
  plants: PlantData[] = [];
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
        title: 'Nombre de Sistema',
        type: 'text',
      },
      // systemType: {
      //   title: 'Tipo de Sistema',
      //   type: 'text',
      //   editable: false,
      // },
      descripcion: {
        title: 'Descripción',
        type: 'text',
        editable: false,
      },
      plantaNombre: {
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
        editable: false,
      },
    },
  };

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParams => {
      this.associateTagId = !!queryParams.tag;
    });
  }

  ngOnInit() {
    this.getPlantsAndSystem();
  }

  goToTable() {
    this.router.navigate(['/pages/system-list']);
  }

  async getPlantsAndSystem() {
    try {
      const response = await this.generalService.getPlants();
      this.plants = response.items;
      this.settings.columns.plantaNombre.editor.config.list = response.items.map(plant => ({
        title: plant.nombre,
        value: plant.nombre,
      }));
      this.settings = {...this.settings};
    } catch (e) {

    }

    try {
      const response = await this.generalService.getSystems();
      this.data = response.items;
      this.data.forEach(plant => {
        plant.plantaNombre = this.plants.find(_plant => _plant.id === plant.plantaId).nombre;
      });
      console.log(this.data);
    } catch (e) {

    }
  }

  async addSystem(data: ConfirmData) {
    const { newData } = data;
    const systemData: SystemData = {
      nombre: newData.nombre,
      descripcion: `Descripción ${newData.nombre}`,
      plantaId: this.plants.find(_plant => _plant.nombre === newData.plantaNombre).id,
      tagId: newData.tagId || null,
    };
    try {
      await this.generalService.createSystem(systemData);
      data.confirm.resolve();
    } catch (e) {
      console.log(e);
      data.confirm.reject();
    }
  }

  async editSystem(system: ConfirmData) {
    const { id } = system.data;
    const data: SystemData = {
      nombre: system.newData.nombre,
      descripcion: `Descripción ${system.newData.nombre}`,
      plantaId: this.plants.find(_plant => _plant.nombre === system.newData.plantaNombre).id,
      tagId: system.newData.tagId,
    }
    try {
      await this.generalService.editSystem(id, data);
      system.confirm.resolve();
    } catch (error) {
      system.confirm.reject();
    }
  }

  async deleteSystem(system: ConfirmData) {
    const { id } = system.data;
    try {
      await this.generalService.deletePlant(id);
      system.confirm.resolve();
    } catch (error) {
      system.confirm.reject();
    }
  }

}
