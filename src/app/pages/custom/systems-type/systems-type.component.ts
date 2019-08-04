import { Component, OnInit } from '@angular/core';
import { SystemType } from '../../../@models/systems';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-systems-type',
  templateUrl: './systems-type.component.html',
  styleUrls: ['./systems-type.component.scss']
})
export class SystemsTypeComponent implements OnInit {
  data: SystemType[] = []

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
      id: {
        title: 'ID',
        type: 'text',
        width: '150px',
        editable: false,
        addable: false,
      },
      nombre: {
        title: 'Nombre de Tipo de Sistema',
        type: 'text',
        width: '200px',
      },
      // detail: {
      //   title: 'Detalle',
      //   type: 'text',
      //   width: '300px',
      // },
    }
  };

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getTypeSystems();
      this.data = response.items;
      console.log(this.data)
    } catch (e) {
      console.log(e)
    }
  }

  async addSystemType(data: ConfirmData) {
    try {
      const response = await this.generalService.createTypeSystems(data.newData.nombre);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async editSystemType(data: ConfirmData) {
    try {
      const response = await this.generalService.editTypeSystems(data.newData.id, data.newData.nombre);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async deleteSystemType(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteTypeSystems(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

}
