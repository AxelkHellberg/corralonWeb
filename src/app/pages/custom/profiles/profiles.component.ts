import { Component, OnInit } from '@angular/core';
import { Profiles } from '../../../@models/profiles';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { NbToastrService } from '@nebular/theme';
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

  constructor(private generalService: GeneralService, private toastrService: NbToastrService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getProfile();
      this.data = response.items;
    } catch (e) {
      console.log(e)
    }
  }
  showToastNombre(position, status) {
    this.toastrService.show(
      'Los Roles deben tener Nombre',
      `Ingrese un Nombre.`,
      { position, status });
  }
  showToastRepetido(position, status) {
    this.toastrService.show(
      `2 o Mas Roles tienen el mismo Nombre.`,
      'Los Nombres no pueden Repetir',
      { position, status });
  }
  showToastUso(position, status) {
    this.toastrService.show(
      ``,
      'No pueden Eliminarse Perfiles en uso',
      { position, status });
  }
  async addProfile(data: ConfirmData) {
    if (data.newData.name != '') {
      try {
        const perfiles = await this.generalService.getProfile();
        let datos = perfiles.items;
        console.log(datos);
        let repetido: boolean = false;
        for (let perfil of datos) {
          if (data.newData.name == perfil.name) {
            repetido = true;

            break;
          }
        }
        if (repetido != true) {
          const response = await this.generalService.createProfile(data.newData.name);
          //console.log(response)
          data.confirm.resolve();
        }
        else {
          this.showToastRepetido('top-right', 'warning');
          data.confirm.reject();
        }

      } catch (e) {
        console.log(e)
        data.confirm.reject();
      }
      
    }
    else {
      this.showToastNombre('top-right', 'warning');
      data.confirm.reject();
    }
  }
  async editProfile(data: ConfirmData) {
    if (data.newData.name != '') {
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
    else {
      this.showToastNombre('top-right', 'warning');
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
      this.showToastUso('top-right', 'warning');
    }
  }

}
