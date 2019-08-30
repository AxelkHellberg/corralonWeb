import { Component, OnInit } from '@angular/core';
import { FailureTypes } from '../../../@models/failures';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-failure-types',
  templateUrl: './failure-types.component.html',
  styleUrls: ['./failure-types.component.scss']
})
export class FailureTypesComponent implements OnInit {

  data: FailureTypes[] = []

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
      // id: {
      //   title: 'ID',
      //   type: 'text',
      //   width: '150px',
      // },
      nombre: {
        title: 'Tipo de Falla',
        type: 'text',
        width: '200px',
      },
      // deatil: {
      //   title: 'Descripción',
      //   type: 'text',
      //   width: '300px',
      // },
    }
  };

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getFailureType();
      this.data = response.items;
    } catch (e) {
      console.log(e)
    }
  }

  async addFailureType(data: ConfirmData) {
    try {
      const response = await this.generalService.createFailureType(data.newData.nombre);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async editFailureType(data: ConfirmData) {
    try {
      const response = await this.generalService.editFailureType(data.newData.id, data.newData.nombre);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async deleteFailureType(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteFailureType(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

}
