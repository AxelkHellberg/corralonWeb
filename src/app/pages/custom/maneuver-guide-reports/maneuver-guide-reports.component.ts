import { Component, OnInit } from '@angular/core';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import * as moment from 'moment';
import { infoGuia } from '../../../@models/general';

@Component({
  selector: 'ngx-maneuver-guide-reports',
  templateUrl: './maneuver-guide-reports.component.html',
  styleUrls: ['./maneuver-guide-reports.component.scss']
})
export class ManeuverGuideReportsComponent implements OnInit {

  statusSelectedItem: string = '';
  typeSelectedItem: string = '';
  filterTableSettings: any = {};
  showDetail: boolean;
  data: any = [];
  dataDetalle: any = [];
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
      // status: {
      //   title: 'Estado',
      //   type: 'html',
      // },
      // id: {
      //   title: 'ID',
      //   type: 'text',
      // },
      // total: {
      //   title: 'Total',
      //   type: 'text',
      // },
      operator: {
        title: 'Operador',
        type: 'text',
      },
      maneuverGuideName: {
        title: 'Nombre de la Guía de Maniobra',
        type: 'text',
      },
      date: {
        title: 'Fecha',
        type: 'text',
      },
      time: {
        title: 'Hora',
        type: 'text',
      },
    },
  };
  min: Date;
  max: Date;

  selectedItem: any;

  constructor(private generalService: GeneralService) { }

  async ngOnInit() {
    let maneuverGuides;
    try {
      const response = await this.generalService.getManeuverGuide();
      maneuverGuides = response.items;
    } catch (e) { }

    try {
      const response = await this.generalService.getUser();
      const userFullName = (item) => {
        const data = response.items.find(user => item.userId === user.id);
        return `${data.name} ${data.lastName}`;
      };
      const getDate = (date: any, format: string) => {
        date = new Date(date);
        return moment(date).format(format);
      }

      this.data = maneuverGuides.map(item => ({
        ...item,
        id: item.id,
        maneuverGuideName: item.nombre,
        date: moment(item.createdAt).utc().format('DD/MM/YYYY'),
        time: moment(item.createdAt).utc().format('HH:mm'),
        operator: item.userId,
        status: item.status
      })

      );
    } catch (error) {
    }

  }

  filterTable(column: string, filterTerm: string): void {
    const noFilter = !!filterTerm;
    this.filterTableSettings = { ...this.filterTableSettings, [column]: noFilter ? filterTerm : null };
  }

  selectItem({ data }) {
    let datAux : any[]; 
    let dataAenviar: any;
    this.generalService.getGuiaManiobraCampos({
      id: 2,
      filters: {
        guiaManiobraId: data.id,
        plantillaGuiaManiobraId: data.plantillaGuiaManiobraId
      }
    }).then((res) => { dataAenviar = {
      data,
      datAux:res
      
             
    };console.log(dataAenviar); 
    this.selectedItem = dataAenviar;
    this.showDetail = true;});
    
    //console.log(data);
    

    //console.log(this.dataDetalle/*.__zone_symbol__value*/)
  }
  // this.dataDetalle = {
  //   id:2,
  //   filters:{
  //  guiaManiobraId = 1,
  // plantillaGuiaManiobraId = 1
  //}
  //}
  //console.log(this.dataDetalle);
}
