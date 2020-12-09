import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';
@Component({
  selector: 'ngx-failure-notifications',
  templateUrl: './failure-notifications.component.html',
  styleUrls: ['./failure-notifications.component.scss']
})
export class FailureNotificationsComponent implements OnInit {
  statusSelectedItem: string = '';
  systemSelectedItem: string = '';
  equipmentSelectedItem: string = '';
  showDetail: boolean;
  filterTableSettings: any = {};
  failureData: any = [];
  failureDataEquipment: any = [];
  failureDataSystem: any = [];
  settings: SmartTableSettings = {
    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      estadoFallaNombreBoton: {
        title: 'Estado',
        type: 'html',
      },
      // id: {
      //   title: 'ID',
      //   type: 'text',
      // },
      tipoFallaNombre: {
        title: 'Tipo de Falla',
        type: 'text',
      },
      origen: {
        title: 'Origen',
        type: 'text',
      },
      date: {
        title: 'Fecha',
        type: 'text',
      },
      time: {
        title: 'Horario',
        type: 'text',
      },
      // sistema: {
      //   title: 'Sistema',
      //   type: 'text',
      // },
    },
  };
  failureTypes: any;
  failureStatus: any;
  selectedData: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private generalService: GeneralService) { }
  datosFalla : any[];
  async ngOnInit() {
    try {
      const response = await this.generalService.getFailureType();
      this.failureTypes = response.items;
      console.log(this.failureTypes);
    } catch (error) {

    }

    try {
      const response = await this.generalService.getStatusFailures();
      this.failureStatus = response.items;
    } catch (error) {

    }

    try {

//-------Obteniendo y mostrando fallas de equipo----------------
      this.failureDataEquipment = await this.generalService.getFallasEquipo();
      this.failureDataSystem = await this.generalService.getFallasSistema();

/*       this.failureData.forEach(data => {
        data['estadoFallaNombre'] = data.estadoFalla.nombre;
        data['tipoFallaNombre'] = (data.tipoFalla == null ?  'Desconocido': data.tipoFalla.nombre  );
        data['estadoFallaNombreBoton'] = this.setStatusFailureButton(data.estadoFallaNombre.toUpperCase());
        data['date'] = moment(data.updateAt).utc().format('DD/MM/YYYY');
        data['time'] = moment(data.updateAt).utc().format('hh:mm:ss');
        data['sistema'] = this.getSystemName(data);
        //data['origen'] = this.getOrigin(data);
        //data['operador'] = data.valoresCamposManiobras.guiaManiobra.user.username;
      }); */
      let cont = 0;
      this.failureDataEquipment.forEach(dato => {
       dato={...dato,
        estado: null, ///REVISAR DATOS PARA VER QUE PONER ACA (PREGUNTAR A MAXI)
        origen: dato.equipamientoId ? dato.equipamientoId : null,
        tipoFallaNombre: dato.notificacionFallaId ? dato.notificacionFallaId : null,
        date: moment(dato.updateAt).utc().format('DD/MM/YYYY'),
        time: moment(dato.updateAt).utc().format('hh:mm:ss'),
      }
  
      this.failureData[cont] = dato;
        cont +=1;
      });
//-------Obteniendo y mostrando fallas de equipo----------------
//---------------------------------------------------------------------------------------------------------------
//-------Obteniendo y mostrando fallas de sistema----------------
    
      this.failureDataSystem.forEach(dato => {
       dato={...dato,
        estado: null, ///REVISAR DATOS PARA VER QUE PONER ACA (PREGUNTAR A MAXI)
        origen:dato.sistemaId ? dato.sistemaId : null,
        tipoFallaNombre: dato.notificacionFallaId ? dato.notificacionFallaId : null,
        date: moment(dato.updateAt).utc().format('DD/MM/YYYY'),
        time: moment(dato.updateAt).utc().format('hh:mm:ss'),
      }
  
      this.failureData[cont] = dato;
        cont +=1;
      });
//-------Obteniendo y mostrando fallas de sistema----------------
console.log("FALLAS JUNTAS: ");
//nuevo array
this.datosFalla=this.failureData;

console.log(this.failureData);
//---------------------------------------------------------------------------------------------------------------
    } catch (error) {

    }
   }

  setStatusFailureButton(status: string) {
    let button = '';
    switch (status) {
      case 'DETECTADO':
        button = `<div class="container-btn btn btn-danger">${status}</div>`;
        break;

      case 'SOLUCIONADO':
        button = `<div class="container-btn btn btn-success">${status}</div>`;
        break;

      default:
          button = `<div class="container-btn btn btn-warning">${status}</div>`;
        break;
    }
    return button;
  }

  getSystemName(data) {
    let name = '';
    if (data) {
      name = data.valoresCamposManiobras.length ?
             data.valoresCamposManiobras[0].campoManiobra.sistema.nombre : '';
    }
    return name;
  }

  getOrigin(data) {
    let origin;
    if (data) {
      origin = (data.valoresCamposManiobras.length && 'Guía de Maniobra') ||
               (data.fallasEquipamiento.length && 'Equipamiento') ||
               (data.fallasSistema.length && 'Sistema') ||
               (data.valoresCamposRonda.length && 'Ronda') || 'Desconocido';
    }
    return origin;
  }

  filterTable(column: string, filterTerm: string): void {
    const noFilter = !!filterTerm;
    this.filterTableSettings = { ...this.filterTableSettings, [column]: noFilter ? filterTerm : null };
  }

  selectRow({data}) {
    this.showDetail = !this.showDetail;
    this.selectedData = data;
  }

  closeDetail(data: any) {
    data.estadoFallaNombreBoton = this.setStatusFailureButton(data.estadoFallaNombre.toUpperCase());
    this.showDetail = false;
  }

}
