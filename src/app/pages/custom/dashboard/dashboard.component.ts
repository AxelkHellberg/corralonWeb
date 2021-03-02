import { RoundsByUserData } from './../../../@models/dashboard';
import { BarHorizontalChartData } from './../../../@models/charts/bar-horizontal-chart';
import { Component, OnInit } from '@angular/core';
import { PieChartData } from '../../../@models/charts/pie-chart';
import { GeneralService } from '../../../services/general.service';
import { RoundsQuantity } from '../../../@models/dashboard';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  settings: SmartTableSettings = {
    actions:false,
/*     add: {
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
    }, */
    columns: {
      codigo: {
        title: 'Codigo',
        type: 'text',
        width: '1px',
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
      },
      stockPeru: {
        title: 'Stock',
        type: 'text',
        width: '1px',
      },
      precio: {
        title: 'Precio',
        type: 'text',
        width: '1px',
      },
    },
  };
  settingsSeleccionados: SmartTableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
      columnTitle: ''
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      codigo: {
        title: 'Codigo',
        type: 'text',
        width: '1px',
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
      },
      cantidad: {
        title: 'Cantidad',
        type: 'text',
        editable: true,
        width: '1px',
      },
      precio: {
        title: 'Precio',
        type: 'text',
        width: '1px',
      },
    },
  };
  pieChartData: PieChartData;
  barHorizontalChartData: BarHorizontalChartData;

  constructor(private generalService: GeneralService) {
  }


  source: LocalDataSource;
  sourceSeleccionados: LocalDataSource;
  productos: any[];
  productosSeleccionados: any[] = [];
  async ngOnInit(): Promise<void> {
    this.productos = await this.generalService.traerProductos();
    console.log("productos:")
    console.log(this.productos)
    this.source = new LocalDataSource([]);
    this.source = new LocalDataSource(this.productos);
  }

  selectProducto(producto){
    console.log(producto)
    let prodSelecc = {
      codigo: producto.data.codigo,
      descripcion: producto.data.descripcion,
      cantidad: 1,
      precio: producto.data.precio
    }
      this.productosSeleccionados.push(prodSelecc)
      this.sourceSeleccionados = new LocalDataSource([]);
      this.sourceSeleccionados = new LocalDataSource(this.productosSeleccionados);
  }

/*   async getRoundsQuantity() {
    try {
      const response: RoundsQuantity = await this.generalService.getRoundsQuantity(1);
      console.log("respose");
      console.log(response);
      this.pieChartData = {
        labels: ['Completas', 'Incompletas'],
        datasets: [{
          data: [+response[0].cantidad, +response[1].cantidad],
          backgroundColor: ['#88afff', '#c492ee'],
        }]
      }
    } catch (error) {
      console.log(error)

    }
  }

  async getRoundsByUser() {
    try {
      const response: RoundsByUserData[] = await this.generalService.getRoundsByUser(2);
      console.log("respose");
      console.log(response);
      this.barHorizontalChartData = {
        labels: response.map(user => user.username),
        datasets: [
          {
            label: 'Completas',
            backgroundColor: '#c492ee', 
            data: response.map(user => +user.cantidad),
          },
        ]
      }
    } catch (error) {

    }
  } */

}

