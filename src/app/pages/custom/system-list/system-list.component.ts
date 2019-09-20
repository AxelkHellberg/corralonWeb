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
  tag: any[] = [];
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
      // id: {
      //   title: 'ID',
      //   type: 'text',
      //   editable: false,
      //   addable: false,
      // },
      nombre: {
        title: 'Nombre de Sistema',
        type: 'text',
      },
      tipoSistema: {
        title: 'Tipo de Sistema',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      descripcion: {
        title: 'Descripción',
        type: 'text',
      },
      KKS: {
        title: 'KKS',
        type: 'text',
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
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      // tagId: {
      //   title: 'Tag',
      //   type: 'html',
      // },
    },
  };
  systemTypes: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParams => {
      this.associateTagId = !!queryParams.tag;
    });
  }

  ngOnInit() {
    this.getAllData();
  }

  goToTable() {
    this.router.navigate(['/pages/system-list']);
  }

  async getAllData() {
    try {
      const response = await this.generalService.getTag(1);
      this.tag = response.items;
      this.settings.columns.tagId.editor.config.list = response.items.map(tag => ({
        title: tag.nombre,
        value: tag.nombre,
      }));
      this.settings = {...this.settings};
    } catch (e) {

    }

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
      const response = await this.generalService.getTypeSystems();
      this.systemTypes = response.items;
      console.log(this.systemTypes);
      this.settings.columns.tipoSistema.editor.config.list = response.items.map(systemType => ({
        title: systemType.nombre,
        value: systemType.nombre,
      }));
      this.settings = {...this.settings};
    } catch (e) {

    }

    try {
      const response = await this.generalService.getSystems();
      this.data = response.items;
      console.log(this.data);
      this.data.forEach(system => {
        system.plantaNombre = (this.plants.find(_plant => _plant.id === system.plantaId) || {nombre: null}).nombre;
        // tslint:disable-next-line: max-line-length
        system.tipoSistema = (this.systemTypes.find(_systemType => _systemType.id === system.tipoSistemaId) || {nombre: null}).nombre;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addSystem(data: ConfirmData) {
    const { newData } = data;
    const systemData: SystemData = {
      nombre: newData.nombre,
      KKS: newData.KKS,
      descripcion: `Descripción ${newData.nombre}`,
      plantaId: this.plants.find(_plant => _plant.nombre === newData.plantaNombre).id,
      tipoSistemaId: this.systemTypes.find(_systemType => _systemType.nombre === newData.tipoSistema).id,
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
      KKS: system.newData.KKS,
      descripcion: `Descripción ${system.newData.nombre}`,
      plantaId: this.plants.find(_plant => _plant.nombre === system.newData.plantaNombre).id,
      tipoSistemaId: this.systemTypes.find(_systemType => _systemType.nombre === system.newData.tipoSistema).id,
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
