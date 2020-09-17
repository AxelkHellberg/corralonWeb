import { Component, OnInit } from '@angular/core';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-tag-equipment',
  templateUrl: './tag-equipment.component.html',
  styleUrls: ['./tag-equipment.component.scss']
})
export class TagEquipmentComponent implements OnInit {

  data = [
    // {
    //   id: 1,
    //   number: 'TAG-324',
    //   status: 'Encendido',
    //   mandatory: 'Si',
    // },
    // {
    //   id: 2,
    //   number: 'TAG-564',
    //   status: 'Apagado',
    //   mandatory: 'No',
    // },
  ];

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
      //   editable: false,
      //   addable: false,
      // },
      nombre: {
        title: 'N° de Tag',
        type: 'text',
        width: '200px',
      },
      habilitado: {
        title: 'Estado',
        type: 'text',
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Encendido',
                value: 'Encendido',
              },
              {
                title: 'Apagado',
                value: 'Apagado',
              }
            ],
          },
        },
      },
      obligatorio: {
        title: 'Obligatorio',
        type: 'text',
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [
              {
                title: 'Si',
                value: 'Si',
              },
              {
                title: 'No',
                value: 'No',
              },
            ],
          },
        },
      },
    },
  };
  constructor(private generalService: GeneralService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getTag()
  }

  async getTag() {
    try {
      const response = await this.generalService.getTag(2);
      console.log(response)
      this.data = response.items.map(item => ({
        ...item,
        obligatorio: item.obligatorio ? 'Si' : 'No',
        habilitado: item.habilitado ? 'Encendido' : 'Apagado',
      }));
    } catch (e) {
      console.log(e)
    }
  }
  showToastRepetido(position, status) {
    this.toastrService.show(
      'Los Nombres de los Tag no pueden Repetirce',
      `Nombre de Tag Repetido.`,
      { position, status });
    }
    showToastNombre(position, status) {
      this.toastrService.show(
        'Los Tags deben tener Nombre',
        `Ingrese un Nombre.`,
        { position, status });}

  async createOrEditEquipment(event, isEdit = false) {
    if (event.newData.nombre != '') {
      const response = await this.generalService.getTag(2);
      console.log(response);
      let datos = response.items
      let repetido = false;
      for (let dato of datos) {
        if (dato.nombre == event.newData.nombre) {
          repetido = true;
        }
      }
      
        try {
          const data = {
            nombre: event.newData.nombre,
            obligatorio: event.newData.obligatorio === 'Si' ? true : false,
            habilitado: event.newData.habilitado === 'Encendido' ? true : false,
            tipoTagId: 2,
          };
          if (isEdit) {
            await this.generalService.editTag(event.newData.id,data);
          } else {
            if (!repetido) {
            await this.generalService.createTag(data);
          }
          else {
            this.showToastRepetido('top-right','warning');;
          }
          }
          event.confirm.resolve();
        } catch (e) {
          console.log(e);
          event.confirm.reject();
        }

     
    }
    else {
      this.showToastNombre('top-right','warning');
    }
  }

  async deleteEquipment(event) {
    try {
      await this.generalService.deleteTag(event.data.id);
      event.confirm.resolve();
    } catch (e) {
      event.confirm.reject();
    }
  }

}
