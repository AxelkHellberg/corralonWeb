import { UserData } from './../../../@models/general';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Users } from '../../../@models/users';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';


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
      username: {
        title: 'Usuario',
        type: 'text',
      },
      password: {
        title: 'Contraseña',
        type: 'text',
      },
    },
  };
  profiles: any;

  constructor(private generalService: GeneralService, private dialogService: NbDialogService) {
    this.getUsers();
    
  }
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'No se puede eliminar el usuario Administrador' });
  }

  perfilesArray: any[];
  usuariosArray: any[];
  async getUsers(){
    Promise.all([
      this.generalService.getProfile(),
      this.generalService.getUser(),

    ]).then(([perfiles, usuarios]) => {

      this.usuariosArray = usuarios.items;
      console.log("UsuariosArray");
      console.log(this.usuariosArray)

      this.perfilesArray = perfiles.items;
      
      let cont = 0;
      this.usuariosArray.forEach(data => {
        this.usuariosArray[cont].password= "***************"
        cont += 1;
      })

      this.source = new LocalDataSource(this.usuariosArray);


    }).catch(() => { });

    



  }
  
  source: LocalDataSource;

  async createUser(data: ConfirmData) {
    
    let userData = data;

    userData.newData.dni = "sin definir";
    userData.newData.profileId = 1

    console.log(userData.newData)
    try {
      const response = await this.generalService.createUser(userData.newData);
      console.log( userData);
      this.getUsers();
      data.confirm.resolve();
    } catch (error) {
      data.confirm.reject();
    }
  }


  probando()
  {
    console.log("HOLA")
  }

  async editUser(data: ConfirmData) {
    const { newData } = data;
    try {
      delete newData.lastSession;
      delete newData.email;
      newData.profileId = 1
      delete newData.profile;
      const response = await this.generalService.editUser(newData.id, newData);
      console.log(response);
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
