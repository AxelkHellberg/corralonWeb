import { Component, OnInit } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {

  data = [];

  settings: SmartTableSettings = {
    attr: {
      class: 'general-table',
    },
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

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getPlants();
      this.data = response.items;
    } catch (e) {

    }
  }

  async addPlant(plant: ConfirmData) {
    const { newData } = plant;
    try {
      await this.generalService.createPlant(newData);
      plant.confirm.resolve();
    } catch (error) {
      plant.confirm.reject();
    }
  }

  async editPlant(plant: ConfirmData) {
    const { id } = plant.data;
    try {
      await this.generalService.editPlant(id, plant.newData);
      plant.confirm.resolve();
    } catch (error) {
      plant.confirm.reject();
    }
  }

  async deletePlant(plant: ConfirmData) {
    const { id } = plant.data;
    try {
      await this.generalService.deletePlant(id);
      plant.confirm.resolve();
    } catch (error) {
      plant.confirm.reject();
    }
  }

}
