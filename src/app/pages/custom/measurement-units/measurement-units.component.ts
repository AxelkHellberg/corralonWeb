import { ConfirmData } from './../../../@models/smart-table';
import { Component, OnInit } from '@angular/core';
import { MeasurementUnits } from '../../../@models/systems';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { throwError } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  data: MeasurementUnits[] = []

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
      // },
      nombre: {
        title: 'Medida',
        type: 'text',
        width: '300px',
      },
      // detail: {
      //   title: 'Detalle',
      //   type: 'text',
      //   width: '100px',
      //   editable: false,
      // },
    }
  };

  constructor(private generalService: GeneralService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getMeasurement();
  }

  async getMeasurement() {
    try {
      const response = await this.generalService.getMeasurementUnits();
      this.data = response.items;
    } catch (e) {
      console.log(e)
    }
  }
  showToastNombre(position, status) {
    this.toastrService.show(
      'Las Unidades de Medida deben tener Nombre',
      `Ingrese un Nombre.`,
      { position, status });
  }
  showToastRepetido(position, status) {
    this.toastrService.show(
      'Los Nombres no se pueden Repetir',
      `Nombre Repetido.`,
      { position, status });
  }
  async addMeasurement(data: ConfirmData) {
    try {
      let repetidos = false;
      const res = await this.generalService.getMeasurementUnits();
      let datos = res.items;
      if (data.newData.nombre != '') {
        for (let dato of datos) {
          console.log(dato.nombre + data.newData.nombre)
          if (data.newData.nombre == dato.nombre) {
            this.showToastRepetido('top-right','warning');
            repetidos = true;
            break;
          }
        }

        if (!repetidos) {
          const response = await this.generalService.createMeasurementUnits(data.newData.nombre);
          console.log(response)
          this.getMeasurement();
          data.confirm.resolve();
        }
      }


      else {
        this.showToastNombre('top-right','warning');
      }
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }
  async editMeasurement(data: ConfirmData) {
    if (data.newData.nombre != '') {
    try {
      const response = await this.generalService.editMeasurementUnits(data.newData.id, data.newData.nombre);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }}
    else
    {
      this.showToastNombre('top-right','warning');
    }
  }
  async deleteMeasurement(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteMeasurementUnits(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

}
