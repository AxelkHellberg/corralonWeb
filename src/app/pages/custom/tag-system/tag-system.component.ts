import { Component, OnInit } from "@angular/core";
import { forEach } from '@angular/router/src/utils/collection';
import { SmartTableSettings } from "../../../@models/smart-table";
import { GeneralService } from "../../../services/general.service";

@Component({
  selector: "ngx-tag-system",
  templateUrl: "./tag-system.component.html",
  styleUrls: ["./tag-system.component.scss"]
})
export class TagSystemComponent implements OnInit {
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
      class: "general-table"
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
        width: '200px'
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
            ]
          }
        }
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
              }
            ]
          }
        }
      }
    }
  };

  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.getTag();
  }

  async getTag() {
    try {
      const response = await this.generalService.getTag(1);
      console.log(response);
      this.data = response.items.map(item => ({
        ...item,
        obligatorio: item.obligatorio ? 'Si' : 'No',
        habilitado: item.habilitado ? 'Encendido' : 'Apagado'
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async createOrEditEquipment(event, isEdit = false) {
    if(event.newData.nombre != '')
    {
      const response = await this.generalService.getTag(1);
      console.log(response);
      let datos = response.items
      let repetido = false;
      for(let dato of datos)
      {
        if(dato.nombre == event.newData.nombre)
        {
          repetido = true;
        }
      }
      if(!repetido){
    try {
      const data = {
        nombre: event.newData.nombre,
        obligatorio: event.newData.obligatorio === 'Si' ? true : false,
        habilitado: event.newData.habilitado === 'Encendido' ? true : false,
        tipoTagId: 1,
      };
      if ( isEdit ) {
        await this.generalService.editTag(data);
      } else {
        await this.generalService.createTag(data);
      }
      event.confirm.resolve();
    } catch (e) {
      console.log(e);
      event.confirm.reject();
    }}
    else{
      alert('campo repetido');
    }
  }
  else{
    alert('Inserte un Nombre')
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
