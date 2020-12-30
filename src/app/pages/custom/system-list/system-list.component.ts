import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  @ViewChild('newSystemTemplate') newSystemTemplate: TemplateRef<any>;
  @ViewChild('editSystemTemplate') editSystemTemplate: TemplateRef<any>;
  associateTagId: boolean;
  plants: PlantData[] = [];
  tags: any[] = [];
  tagsNoAsignados: any[] = [];
  data: SystemList[] = [];
  system: SystemData = {} as SystemData;
  loading: boolean;
  errorMessage: string;
  settings: SmartTableSettings = {
    mode: 'external',
    noDataMessage: 'Sin Sistemas',
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
      nombre: {
        title: 'Nombre de Sistema',
        type: 'text',
      },
      tipoSistema: {
        title: 'Subsistema',
        type: 'text',
      },
      descripcion: {
        title: 'Descripción',
        type: 'text',
      },
      KKS: {
        title: 'Id',
        type: 'text',
      },
      plantaNombre: {
        title: 'Planta',
        type: 'text',
      },
      tagNombre: {
        title: 'Tag',
        type: 'text',
      },
    },
  };
  systemTypes: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService, private dialogService: NbDialogService) {
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
      this.tags = response.items;
      this.tagsNoAsignados = await this.generalService.getTagNoAsignadosSistemas()
      console.log("TAGs No asgnados");
      console.log(this.tagsNoAsignados);
      console.log("TAGs asignados")
      console.log(this.tags)
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
      this.data.forEach(system => {
        system.plantaNombre = (this.plants.find(_plant => _plant.id === system.plantaId) || {nombre: null}).nombre;
        // tslint:disable-next-line: max-line-length
        system.tipoSistema = (this.systemTypes.find(_systemType => _systemType.id === system.tipoSistemaId) || {nombre: null}).nombre;
        system.tagNombre = (this.tags.find(tag => tag.id === system.tagId) || {nombre: null}).nombre;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addSystem(dialog: NbDialogRef<any>) {
    this.errorMessage = null;
    if (!dialog) {
      this.dialogService.open(this.newSystemTemplate);
      return false;
    }
    this.loading = true;
    try {
      await this.generalService.createSystem(this.system);
      console.log("SYSTEM:")
      console.log(this.system)
      await this.generalService.deshabilitarTagSeleccionado(this.system.tagId);
      this.getAllData();
      dialog.close();
      this.system = {} as SystemData;
    } catch ({error}) {
      this.errorMessage = (error || {}).userMessage;
    } finally {
      this.loading = false;
    }
  }

  async editSystem(system, dialog) {
    this.errorMessage = null;
    if (system) {
      const { id, nombre, descripcion, KKS, plantaId, tagId, tipoSistemaId } = (system || {}).data || system;
      this.system = { nombre, descripcion, id, KKS, plantaId, tagId, tipoSistemaId };
    }

    if (!dialog) {
      this.dialogService.open(this.editSystemTemplate);
      return false;
    }
    try {
      this.loading = true;
      await this.generalService.editSystem(this.system.id, this.system);
      this.getAllData();
      dialog.close();
      this.system = {} as SystemData;
    } catch ({error}) {
      this.errorMessage = (error || {}).userMessage;
    } finally {
      this.loading = false;
    }
  }

  async deleteSystem(system) {
    const { id } = system.data;
    try {
      await this.generalService.deleteSystem(id);
      this.getAllData();
    } catch (error) {
    }
  }

}
