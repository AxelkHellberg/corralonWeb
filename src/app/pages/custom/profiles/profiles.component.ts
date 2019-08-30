import { Component, OnInit } from '@angular/core';
import { Profiles } from '../../../@models/profiles';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  data: Profiles[] = [];
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
      //   width: '200px',
      //   editable: false,
      // },
      name: {
        title: 'Tipo de perfil',
        type: 'text',
        width: '230px',
      },
    },
  };

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getProfile();
      this.data = response.items;
    } catch (e) {
      console.log(e)
    }
  }

  async addProfile(data: ConfirmData) {
    try {
      const response = await this.generalService.createProfile(data.newData.name);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async editProfile(data: ConfirmData) {
    try {
      console.log(data.newData);
      const response = await this.generalService.editProfile(data.newData.id, data.newData.name);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async deleteProfile(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteProfile(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

}
