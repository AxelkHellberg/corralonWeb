import { PlantData } from './../../../@models/general';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  @ViewChild('newPlantTemplate') newPlantTemplate: TemplateRef<any>;
  @ViewChild('editPlantTemplate') editPlantTemplate: TemplateRef<any>;
  data = [];
  plant: PlantData = {} as PlantData;
  loading: boolean;
  errorMessage: string;
  settings: SmartTableSettings = {
    mode: 'external',
    noDataMessage: 'Sin Plantas',
    attr: {
      class: 'general-table',
    },
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
    },
    columns: {
      nombre: {
        title: 'Nombre',
        type: 'text',
        width: '200px',
      },
      descripcion: {
        title: 'Descripción',
        type: 'text',
        width: '300px',
      },
    }
  };

  constructor(
    private generalService: GeneralService,
    private dialogService: NbDialogService,
    ) { }

  ngOnInit() {
    this.getPlants();
  }

  async getPlants() {
    try {
      const response = await this.generalService.getPlants();
      this.data = response.items;
    } catch (e) {

    }
  }

  async addPlant(dialog: NbDialogRef<any>) {
    this.errorMessage = null;
    if (!dialog) {
      this.dialogService.open(this.newPlantTemplate);
      return false;
    }
    try {
      this.loading = true;
      await this.generalService.createPlant(this.plant);
      this.getPlants();
      this.plant = {} as PlantData;
      dialog.close();
    } catch ({error}) {
      this.errorMessage = (error || {}).userMessage;
    } finally {
      this.loading = false;
    }
  }

  async editPlant(plant, dialog?) {
    this.errorMessage = null;
    if (plant) {
      const { id, nombre, descripcion } = (plant || {}).data || plant;
      this.plant = { nombre, descripcion, id };
    }

    if (!dialog) {

      this.dialogService.open(this.editPlantTemplate);
      return false;
    }
    try {
      this.loading = true;
      await this.generalService.editPlant(this.plant.id, this.plant);
      this.getPlants();
      dialog.close();
      this.plant = {} as PlantData;
    } catch ({error}) {
      this.errorMessage = (error || {}).userMessage;
    } finally {
      this.loading = false;
    }
  }

  async deletePlant(plant: ConfirmData) {
    const { id } = plant.data;
    try {
      await this.generalService.deletePlant(id);
      this.getPlants();
    } catch (error) {}
  }

}
