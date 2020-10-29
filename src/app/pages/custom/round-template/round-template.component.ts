import { RoundsDetails } from './../../../@models/rounds';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { RoundTemplateData, RoundFields } from '../../../@models/general';
import { elementEnd } from '@angular/core/src/render3';
import { data } from 'jquery';

@Component({
  selector: 'ngx-round-template',
  templateUrl: './round-template.component.html',
  styleUrls: ['./round-template.component.scss']
})
export class RoundTemplateComponent implements OnInit {
  fullData = [];
  data = [];
  DatosTabla = [];

  settings: SmartTableSettings = {
    mode: 'external',
    attr: {
      class: 'general-table'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    columns: {


      nombreRonda: {
        title: 'Ronda',
        type: 'text',
        width: '200px'
      },
      id: {
        title: 'Ronda Id',
        type: 'text',
        width: '200px'
      },

    }
  };
  showRoundTemplate: boolean;
  roundTemplateId: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || queryParam.edit || queryParam.id) {
        this.showRoundTemplate = true;
        this.roundTemplateId = queryParam.id;
      } else {
        this.showRoundTemplate = false;
      }
    });
  }

  async ngOnInit() {
    this.data = await this.generalService.getRondasCompletas();
    console.log("ngOnInit this.data")
    console.log(this.data);
    //console.log(await this.generalService.getRondasCompletas())
    //this.data.forEach(data => {
    // data['nombreRonda']=data.nombre;
    /*data.Tareas=[];
    for(let i = 0; i < data.campoRondaPlantillaRonda.length;i++){
    data.Tareas[i]=[data.campoRondaPlantillaRonda[i].campoRondaId , data.campoRondaPlantillaRonda[i].campoRonda!= undefined?(data.campoRondaPlantillaRonda[i].campoRonda.nombre):null,data.campoRondaPlantillaRonda[i].plantillaRondaId,data.nombre]};

      
    });*/

    for (let i = 0; i < this.data.length; i++) {
      //let aux = aux.concat(this.data[i].Tarea)
      this.DatosTabla = this.DatosTabla.concat({ id: this.data[i].id, nombreRonda: this.data[i].nombre });
    }

    console.log(this.DatosTabla);
    //this.getFieldsRoundTemplate();
    //this.traerCamposRonda();
  }




  //descartar
  async getFieldsRoundTemplate() {
    if (this.roundTemplateId) {
      const fullData = this.data.find(item => item.id === +this.roundTemplateId);
      try {
        const response = await this.generalService.getFieldTemplate(this.roundTemplateId);
        fullData.full.fieldsData = response.map(field => (<RoundsDetails>{
          unit: field.unidadMedida.nombre,
          equipment: field.equipamiento.nombre,
          plant: field.equipamiento.sistema.planta.nombre,
          system: field.equipamiento.sistema.nombre,
          name: field.nombre,
          minValue: field.valorMin,
          normalValue: field.valorNormal,
          maxValue: field.valorMax,
          type: field.tipoCampoRondaId,
          roundFieldId: field.id,
          roundTemplateId: field.plantillaRondaId,
        }));
        this.fullData = { ...fullData };
      } catch (error) {

      }
    }
  }
  ///////////
  async getTemplates() {
    // let roundTemplateData;
    try {
      this.fullData = await this.generalService.getRondasCompletas();
      console.log("this.fullData");
      console.log(this.fullData);
    } catch (error) {
    }
    /*try {
      this.data = roundTemplateData.items.map(item => {
        const time = item.horarios ? item.horarios != -1 ? Array.isArray(item.horarios) ? item.horarios.join(' - ') : item.horarios : item.horarios : item.horarios
        let timer = item.horarios ? item.horarios != -1 ? !Array.isArray(item.horarios) ? item.horarios.split(' - ') : item.horarios : item.horarios : item.horarios
        timer = timer ? Array.from(timer).map((item: any) => {
          const _item = item ? item.split(':') : item
          return {
            hour: _item[0],
            minute: _item[1],
          };
        }) : timer
        return {
          id: item.id,
          nombre: item.nombre,
          time,
          full: {
            timeData: {
              timer: {},
              time,
            },
            fieldsData: [],
            tableTimeData: timer,
            horarioId: item.horarioId,
            campoRondaId: item.campoRondaId,
            templateConfig: {
              obligatorioSistema: item.obligatorioSistema,
              funcionamientoSistema: item.funcionamientoSistema,
              obligatorioEquipo: item.obligatorioEquipo,
              funcionamientoEquipo: item.funcionamientoEquipo,
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }*/
  }

  createTemplate() {
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        create: true,
      }
    });
    this.fullData = null;
  }
 
  async editTemplate({ data }) {
    let dataFields = []
    console.log("editTemplate data");
    console.log(data);
    const response = await this.generalService.getRondasCompletas1(data.id);
    console.log("response");
    console.log(response);
    response.forEach(field => {
      field.campoRondaPlantillaRonda.forEach(element => {
        if (data.id == field.id) {
          // this.nombreRondaAux=data.nombre;
          element.campoRonda = { ...element.campoRonda, nombreRonda: data.nombreRonda, rondaId: data.id }
          dataFields = dataFields.concat(element.campoRonda);
          
        }
      });
      //dataFields.push(<RoundsDetails>{
        /*unit: field.unidadMedida.nombre,
        equipment: field.equipamiento.nombre,
        plant: field.equipamiento.sistema.planta.nombre,
        system: field.equipamiento.sistema.nombre,
        name: field.nombre,
        minValue: field.valorMin,
        normalValue: field.valorNormal,
        maxValue: field.valorMax,
        type: field.tipoCampoRondaId,
        roundFieldId: field.id,
        roundTemplateId: field.plantillaRondaId,*/
        //})
      });
      var aux:any = {dataFiels: dataFields,data: data}
      dataFields=aux;
    //data.full.fieldsData = dataFields;
    //this.fullData = data;
    console.log("dataFiels");
    console.log(dataFields);
    this.fullData = dataFields;
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        id: data.id,
      }
    });
  }

  async deleteTemplate(template) {
    const { id } = template.data;
    try {
      await this.generalService.deleteRoundTemplate(id);
      delete this.data[template.index];
      this.data = [...this.data];
    } catch (error) {
      console.log(error)
      template.confirm.reject();
    }
  }

  async onSaveData(dataResivida) {
    console.log("onsave")
    console.log(dataResivida);
    //this.generalService.createRonda(dataResivida.tareaId,dataResivida.rondaId);
    this.generalService.createRonda(dataResivida.tareaId,dataResivida.rondaId);
    this.ngOnInit;
    // console.log("this.actualizarCaposRoda");
    // this.actualizarCaposRoda(dataResivida.rondaId,dataResivida.tareaId);
    /* const templateData: RoundTemplateData = {
       nombre: data.nombre,
       funcionamientoSistema: !!data.full.templateConfig.funcionamientoSistema,
       obligatorioSistema: !!data.full.templateConfig.obligatorioSistema,
       funcionamientoEquipo: !!data.full.templateConfig.funcionamientoEquipo,
       obligatorioEquipo: !!data.full.templateConfig.obligatorioEquipo,
       horarios: data.time ? data.time.split(' - ') : '',
     };
     if (data.id) {
       try {
         await this.generalService.editRoundTemplate(data.id, templateData);
       } catch (error) {
         console.log(error)
       }
     } else {
       try {
         const { id } = await this.generalService.createRoundTemplate(templateData);
         data.id = id;
         await this.saveRoundsFields(data);
       } catch (error) {
         console.log(error)
       }
     }
     this.getTemplates();
     this.fullData = null;
     this.roundTemplateId = null;*/
  }

  async saveRoundsFields(data) {
    data.full.fieldsData.forEach(async (field: RoundsDetails) => {
      const dataTemplate: RoundFields = {
        nombre: field.name,
        valorNormal: field.normalValue,
        valorMax: field.maxValue,
        valorMin: field.minValue,
        equipamientoId: field.equipmentId,
        tipoCampoRondaId: field.typeId,
        unidadMedidaId: field.unitId,
        plantillaRondaId: data.id,
      }
      await this.generalService.createRoundFields(dataTemplate);
    });
    this.ngOnInit;
  }



  async traerCamposRonda() {
    let data: any;
    data = await this.generalService.getTarea();
    this.fullData = data.items;

    console.log("Datos: ");
    console.log(this.fullData);
  }




  //descartar
  /*async actualizarCaposRoda(plantillaRonda: any, Id: any) {
    let data: any;
    data = await this.generalService.getTarea();
    const infoAEnviar = {
      plantillaRondaId: plantillaRonda,
    };
   // this.generalService.createRonda(infoAEnviar);
    let data1 = await this.generalService.getTarea();
    this.ngOnInit();

  }*/

}
