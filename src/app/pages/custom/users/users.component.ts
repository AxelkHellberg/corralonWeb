import { UserData } from './../../../@models/general';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../../@models/users';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  data: Users[] = [];
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
      // },
      name: {
        title: 'Nombre',
        type: 'text',
      },
      lastName: {
        title: 'Apellido',
        type: 'text',
      },
      profile: {
        title: 'Perfil',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: []
          },
        },
      },
      // email: {
      //   title: 'E-mail',
      //   type: 'text',
      // },
      lastSession: {
        title: 'Última Sesión',
        type: 'text',
        editable: false,
      },
    },
  };
  profiles: any;

  constructor(private generalService: GeneralService) {
    this.getUsers();
  }

  async getUsers() {
    try {
      const response = await this.generalService.getProfile();
      this.profiles = response.items;
      this.settings.columns.profile.editor.config.list = response.items.map(profile => ({
        title: profile.name,
        value: profile.name,
      }));
      this.settings = {...this.settings};
    } catch (e) {

    }

    try {
      const response = await this.generalService.getUser();
      this.data = response.items;
      this.data.forEach(item => {
        item['profile'] = this.profiles.find(profile => profile.id === item.profileId).name;
        item['lastSession'] = moment(item.updateAt).utc().format('DD/MM/YYYY hh:mm');
      });
      console.log(this.data)
    } catch (e) {
      console.log(e)
    }
  }

  async createUser(data: ConfirmData) {
    const userData: UserData = data.newData;
    userData.username = `${userData.name.charAt(0)}${userData.lastName.replace(/ /g, '').toLowerCase()}`;
    userData.password = '123456';
    userData.dni = 'prueba';
    userData.profile = this.profiles.find(profile => profile.name === userData.profile).id;
    delete (userData as any).lastSession;
    try {
      const response = await this.generalService.createUser(userData);
      this.getUsers();
      data.confirm.resolve();
    } catch (error) {
      data.confirm.reject();
    }
  }
  async editUser(data: ConfirmData) {
    const { newData } = data;
    try {
      delete newData.lastSession;
      delete newData.email;
      newData.profileId = this.profiles.find(profile => profile.name === newData.profile).id;
      delete newData.profile;
      const response = await this.generalService.editUser(newData.id, newData);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async deleteUser(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteUser(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

}
