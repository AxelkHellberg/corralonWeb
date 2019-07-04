import { Component, OnInit } from '@angular/core';
import { SmartTableSettings, CreateConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {

  data = [
    {
      nombre: 'Planta 1',
      descripcion: 'Descripción 1',
    },
    {
      nombre: 'Planta 2',
      descripcion: 'Descripción 2',
    },
  ]

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

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
  }

  async addPlant(data: CreateConfirmData) {
    console.log(data);
    const { newData } = data;
    try {
      await this.generalService.createPlant(newData);
      data.confirm.resolve();
    } catch (error) {
      data.confirm.reject();
    }
  }

}
