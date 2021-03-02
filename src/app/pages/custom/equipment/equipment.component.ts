import { GeneralService } from './../../../services/general.service';
import { ConfirmData } from './../../../@models/smart-table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';
import { EquipmentData } from '../../../@models/general';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  associateType: string;
  associateElements: boolean;
  data: Equipment[] = [];
  tag: any[] = [];
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
      nombre: {
        title: 'Nombre de Equipamiento',
        type: 'text',
      },
      detalle: {
        title: 'Detalle',
        type: 'text',
      },
      sistemaId: {
        title: 'Sistema',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: []
          },
        },
      },
      tagId: {
        title: 'Tag',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
    },
  };
  systems: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService, private toastrService: NbToastrService) {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.tag) {
        this.associateElements = true;
        this.associateType = 'tag';
      }
      if (queryParams.attributes) {
        this.associateElements = true;
        this.associateType = 'attributes';
      }
    });
  }
  tagsNoAsignados: any[] = [];
  productos: any[];
  async ngOnInit() {
    this.productos = await this.generalService.traerProductos();
    console.log("productos:")
    console.log(this.productos)
   // this.getData();
  }
  showToastNombre(position, status) {
    this.toastrService.show(
      'Los Equipos deben tener Nombre',
      `Ingese un Nombre al Equipo.`,
      { position, status });
    }
    showToastTagEquipo(position, status) {
      this.toastrService.show(
        '',
        `Seleccione un Tag de Equipo.`,
        { position, status });
      }
      showToastSistema(position, status) {
        this.toastrService.show(
          '',
          `Seleccione un Sistema.`,
          { position, status });
        }
        showToastTagRepetido(position, status) {
          this.toastrService.show(
            '',
            `El tag ya esta en uso.`,
            { position, status });
          }
  async getData() {
    try {
      const response = await this.generalService.getTag(2);
      this.tagsNoAsignados = await this.generalService.getTagNoAsignadosEquipos();
      this.tag = response.items;
      this.settings.columns.tagId.editor.config.list = this.tagsNoAsignados.map(tag => ({
        title: tag.nombre,
        value: tag.nombre,
        tagid: tag.id
      }));
      this.settings = { ...this.settings };
    } catch (e) { }

    try {
      const response = await this.generalService.getSystems();
      this.systems = response.items;
      this.settings.columns.sistemaId.editor.config.list = response.items.map(system => ({
        title: system.nombre,
        value: system.nombre,
      }));
      this.settings = { ...this.settings };
    } catch (e) { }

    try {
      const response = await this.generalService.getEquipments();
      this.data = response.items;
      this.data.forEach(data => {
        data.sistemaId = (this.systems.find(system => system.id === data.sistemaId) || {} as any).nombre || 'Desconocido';
        data.tagId = (this.tag.find(tag => tag.id === data.tagId) || {} as any).nombre || 'Desconocido';
      });
    } catch (e) { }

  }

  async addEquipment(data: ConfirmData) {
    const { newData } = data;
    let tag_repetido = false;
      const response = await this.generalService.getEquipments();
      let equipos = response.items;
      equipos.forEach(data => {
        data.sistemaId = (this.systems.find(system => system.id === data.sistemaId) || {} as any).nombre || 'Desconocido';
        data.tagId = (this.tag.find(tag => tag.id === data.tagId) || {} as any).nombre || 'Desconocido';
      });
      console.log("equipos");
      console.log(equipos);
      for(let equipo of equipos){
      
        if(newData.tagId == equipo.tagId)
        {
          tag_repetido= true;
          break;
        }
      
      }

    if (newData.nombre != '' && newData.tagId != '' && newData.sistemaId != '' && !tag_repetido) {
      const equipmentData: EquipmentData = {
        nombre: newData.nombre,
        detalle: newData.detalle,
        sistemaId: this.systems.find(system => system.nombre === newData.sistemaId).id,
        tagId: (this.tag.find(tag => tag.nombre === newData.tagId) || {} as any).id || -1,
      };
      try {
        await this.generalService.createEquipment(equipmentData);
        await this.generalService.deshabilitarTagSeleccionado(equipmentData.tagId)

        this.getData();
        data.confirm.resolve();
      } catch (error) {
        data.confirm.reject();
      }
    }
    else {
      if (newData.nombre == '') {
        this.showToastNombre('top-right','warning');
      }
      if(newData.tagId == '')
      {
        this.showToastTagEquipo('top-right','warning');
      }
      if(newData.sistemaId == '')
      {
        this.showToastSistema('top-right','warning');
      }
      if(tag_repetido)
      {
        this.showToastTagRepetido('top-right','warning');
      }
    }
  }

  async editEquipment(data: ConfirmData) {
    const { newData } = data;
    const equipmentData: EquipmentData = {
      nombre: newData.nombre,
      detalle: newData.detalle,
      sistemaId: this.systems.find(system => system.nombre === newData.sistemaId).id,
      tagId: this.tag.find(tag => tag.nombre === newData.tagId).id,
    };
    try {
      const response = await this.generalService.editEquipment(newData.id, equipmentData);
      data.confirm.resolve();
    } catch (e) {
      data.confirm.reject();
    }
  }
  async deleteEquipment(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteEquipment(data.data.id);
      console.log((this.tag.find(tag => tag.nombre == data.data.tagId) || {} as any).id)
      
      await this.generalService.activarTag((this.tag.find(tag => tag.nombre === data.data.tagId) || {} as any).id)
      this.getData()
      data.confirm.resolve();
    } catch (e) {
      data.confirm.reject();
    }
  }


  goBack() {
    this.associateElements = false;
    this.router.navigate(['pages/equipment']);
  }

  rowSelect() {
    this.associateElements = true;
    this.associateType = 'attributes';
  }

}
