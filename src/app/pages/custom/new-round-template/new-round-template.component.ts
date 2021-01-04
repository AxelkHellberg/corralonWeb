import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbListModule } from '@nebular/theme';
import { utc } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { title } from 'process';
import { RoundsDetails } from '../../../@models/rounds';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { RoundFields } from './../../../@models/general';
import { TimeData } from './../../../@models/rounds';


@Component({
  selector: 'ngx-new-round-template',
  templateUrl: './new-round-template.component.html',
  styleUrls: ['./new-round-template.component.scss']
})
export class NewRoundTemplateComponent implements OnInit, OnChanges {
  @ViewChild('addOrEdit') addOrEditTemplate: TemplateRef<any>;
  @Output() onSave = new EventEmitter<any>();
  @Output() onRefreshRoundTemplate = new EventEmitter();
  @Input() fullData: any;
  roundName: string;
  descripcion: string;
  selectedPlant: string;
  selectedSystem: string;
  selectedEquipment: string;
  funcionamientoSistema: boolean = false;
  obligatorioSistema: boolean = false;
  funcionamientoEquipo: boolean = false;
  obligatorioEquipo: boolean = false;
  data: any;// = {
  /*plant: '',
  system: '',
  equipment: '',
  unit: '',
  type: undefined,
  plantId: null,
  systemId: null,
  equipmentId: null,
  unitId: null,
  typeId: null,
  timer: new Set(),
  time: '',
  name: '',
  minValue: '',
  maxValue: '',
  normalValue: '',*/
  // nombre: '',
  // tarea: '',
  // tareaId: null,
  // ronda: '',
  // rodnaId: null,
  //};
  plantId: any;
  systemId: any;
  equipmentId: any;
  componentId: any;
  plantArray: any = [];
  systemArray: any = [];
  equipmentArray: any = [];
  unitArray: any = [];
  dataTypeArray: any = [];
  dataType: any;
  min: any;
  max: any;
  normal: any;
  nameField: any;
  tareasSeleccionadas: any[] = [];
  idTareasSeleccionadas: any[] = [];

  //tareas
  rondaArray: any[];
  tareaArray: any[];
  selectTarea(item): void {

    console.log("this.full.data");
    console.log(item.data);
    this.data.tareaId = item.data.idTarea;
    this.data.tarea = item.data.nombre;
    // this.data.rodnaID = 1;
    this.tareasSeleccionadas.push(item.data);
    this.idTareasSeleccionadas.push(item.data.idTarea);
    this.source2 = new LocalDataSource([]);
    this.source2 = new LocalDataSource(this.tareasSeleccionadas);

    console.log("TAREAS SELECCIONADAS:")
    console.log(this.tareasSeleccionadas)
    console.log("this.data");
    console.log(this.data);
    console.log("item");
    console.log(item.data);

  }

  selectTarea2(item): void {


    // this.data.rodnaID = 1;

    let i = this.tareasSeleccionadas.indexOf( item.data );
    this.tareasSeleccionadas.splice(i,1);
    this.source2 = new LocalDataSource([]);
    this.source2 = new LocalDataSource(this.tareasSeleccionadas);

  }
  selectRonda(item): void {

    this.data.rondaId = item.id;
    this.data.ronda = item.nombre;
    // this.data.rodnaID = 1;
    console.log(this.data);
    console.log("this.data");
    console.log(this.data);
    console.log("item");
    console.log(item);
  }



  timeData: TimeData = {
    timer: new Set(),
    time: ''
  };
  fieldsData = [];
  tableTimeData = [];
  settings: SmartTableSettings = {
    noDataMessage: '',
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
      nombre: {
        title: 'Tarea',
        type: 'text',
        width: '300px'
      },
    }
  };
  timeSetting = {
    noDataMessage: '',
    attr: {
      class: 'general-table'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      hour: {
        title: 'Hora',
        type: 'text',
        width: '50px',
        min: 0,
        max: 24
      },
      minute: {
        title: 'Minuto',
        type: 'text',
        width: '50px',
        min: 0,
        max: 59
      }
    }
  };
  plant = {
    selected: '',
    selectItems: [],
    placeholder: 'Planta'
  };
  system = {
    selected: '',
    selectItems: [],
    placeholder: 'Sistema'
  };
  equipment = {
    selected: '',
    selectItems: [],
    placeholder: 'Equipamiento'
  };
  typeData = {
    selected: '',
    placeholder: 'Tipo de dato',
    selectItems: [
      {
        text: 'Tipo de dato 1',
        value: '1'
      },
      {
        text: 'Tipo de dato 2',
        value: '2'
      }
    ]
  };
  unit = {
    selected: '',
    selectItems: [],
    placeholder: 'Unidad de medida'
  };
  isEditorCreate: boolean;
  enableSystem: boolean;
  enableEquipment: boolean;
  enableComponent: boolean;
  maneuverGuideContent: string;
  timeStart: string;
  timeEnd: string;
  currentIndex: any;
  templateIndex: any;
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }
  dataTarea: any;
  agregarTarea: boolean = false;
  edit: boolean = false;
  /* hora: any = {
     dias: String,
     tiporRecurrencia: Number,
     horaInicio: String,
     horaFin: String,
     fechaInicio: String,
     fechaFin: String,
     plantillaId: Number,
   }*/
  ngOnInit() {
    /*     if (this.fullData) {
          console.log("this.fullData");
          console.log(this.fullData);
    
          this.roundName = this.fullData.data.nombreRonda;
          this.data.rondaId = this.fullData.data.id;
        } this.getAllData();
        this.dataTarea = this.fullData.dataFiels;
        console.log("dataTarea");
        console.log(this.dataTarea); */
    this.getAllData();
  }

  accion(): void  {
   console.log("El encontrado es:")
    ///console.log( this.tareasSeleccionadas.indexOf(item[0]))
  }

  unidadDemedida: any[];

  async getAllData() {

    let r = await this.generalService.getMeasurementUnits();
    this.unidadDemedida = r.items;
    console.log("unidad de medida")
    console.log(this.unidadDemedida)
    
    Promise.all([
      this.generalService.getTareaCompletaNuevo(),
    ]).then(([tarea]) => {
      this.data = tarea;
      this.dataTarea = tarea;
      console.log("DATA:");
      console.log(this.data);
    
      let cont = 0;
      this.data.forEach(dato => {
        console.log("Equipo:")
        console.log(dato.Equipo)
        dato={...dato,
        equipamientoNombre:dato.Equipo,
        sistemaNombre: dato.Sistema,
        plantaNombre: dato.Planta,
        nombre: dato.NombreTarea,
        descripcion: dato.Descripcion,
        unidadDemedidaNombre: dato.UnidadMedida? dato.UnidadMedida: "Sin Nombre",
        idTarea: dato.idTarea
        }
    
      this.data[cont] = dato;
      this.dataTarea[cont] = dato;
        cont +=1;
      });
      this.source = new LocalDataSource([]);
      this.source = new LocalDataSource(this.data);
/*       this.source2 = new LocalDataSource([]);
      this.source2 = new LocalDataSource(this.dataTarea); */
  
    })/* .catch(() => { console.log("ALGO FALLO")}); */

    /*     this.data = await this.generalService.getTareaCompleta();
        
        let cont = 0;
        this.data.forEach(dato => {
          dato={...dato,
          equipamientoNombre:dato.equipamiento ? dato.equipamiento.nombre : null,
          sistemaId: dato.equipamiento && dato.equipamiento.sistema ? dato.equipamiento.sistema.id : null,
          sistemaNombre:dato.equipamiento && dato.equipamiento.sistema? dato.equipamiento.sistema.nombre : null,
          plantaId: dato.equipamiento && dato.equipamiento.sistema && dato.equipamiento.sistema.planta? dato.equipamiento.sistema.planta.id: null,
          plantaNombre:dato.equipamiento && dato.equipamiento.sistema && dato.equipamiento.sistema.planta? dato.equipamiento.sistema.planta.nombre: null,
        }
    
        this.data[cont] = dato;
          cont +=1;
        });
        
        console.log("this.data");
        console.log(this.data);
        */
  }

source : LocalDataSource;
source2 : LocalDataSource;


  createTemplate() {
    this.isEditorCreate = true;
    this.agregarTarea = true;
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false
    });
  }

  editTemplate(data) {
    console.log("editTemplate");
    this.data.tareaId = data.data.id;
    console.log(this.data.tareaId);

    /*this.data = data.data;
    this.currentIndex = data.index;
    this.isEditorCreate = true;
    this.enableSystem = true;
    this.enableComponent = true;
    this.enableEquipment = true;
    this.data.plantId = this.plantArray.items.find(
      plant => plant.nombre === data.data.plant
    ).id;
    this.data.systemId = this.systemArray.items.find(
      system => system.nombre === data.data.system
    ).id;
    this.data.equipmentId = this.equipmentArray.items.find(
      equipment => equipment.nombre === data.data.equipment
    ).id;
    this.data.unitId = this.unitArray.items.find(
      type => type.nombre === data.data.unit
    ).id;
    this.data.typeId = this.data.type;*/
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Editar Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false
    });
  }

  async deleteTemplate(data) {
    await this.saveOrDeleteRoundsFields(data.data, true);
    delete this.fieldsData[data.index];
    this.fieldsData = [...this.fieldsData];
  }


  /* horaInicio: any;
   horaFin: any;
 
   selectTimeInicio(): void {
     console.log(this.horaInicio)
     let moment = require("moment");
     let horaInicio = moment(this.horaInicio.hour, 'HH').format('HH');
     let minInicio = moment(this.horaInicio.minute, 'MM').format('MM');
     this.hora = {
       ...this.hora,
       horaInicio: horaInicio.toString(10) + ":" + minInicio.toString(10),
 
 
     }
     console.log(this.hora);
   }
 
   selectTimeFin(): void {
 
     console.log(this.horaFin);
     let moment = require("moment");
     let horaFin = moment(this.horaFin.hour, 'HH').format('HH');
     let minFin = moment(this.horaFin.minute, 'MM').format('MM');
     this.hora = {
       ...this.hora,
       horaFin: horaFin.toString(10) + ":" + minFin.toString(10),
 
 
     }
     console.log(this.hora);
   }
   selectedDia = [];
   selectedRecurrencia = [];
 
 
   agregarDia() {
     console.log("funcionanado");
     console.log(this.selectedDia);
   }
 
   agregarRecurrencia() {
     console.log("funcionanado");
     console.log(this.selectedRecurrencia);
   }*/

  /*
   selectTime(data: any, action?: string): void {
     data.confirm.resolve();
     let _data = data.newData || data.data;
 
     if (action === 'delete') {
       const deleteIndex = this.tableTimeData.indexOf(_data);
       this.tableTimeData.splice(deleteIndex, 1);
     }
     setTimeout(() => {
       this.timeData.timer = new Set();
       for (let i = 0; i < this.tableTimeData.length; i++) {
         this.tableTimeData[i].hour =
           this.tableTimeData[i].hour.replace(/\D/g, '') > 24
             ? '24'
             : this.tableTimeData[i].hour.replace(/\D/g, '');
         this.tableTimeData[i].minute =
           this.tableTimeData[i].minute.replace(/\D/g, '') > 59
             ? '59'
             : this.tableTimeData[i].minute.replace(/\D/g, '');
         this.timeData.timer.add(
           `${this.tableTimeData[i].hour}:${this.tableTimeData[i].minute}`
         );
       }
       this.timeData.time = Array.from(this.timeData.timer).join(' - ');
       console.log(
         data,
         this.tableTimeData,
         this.timeData.timer,
         this.timeData.time
       );
     }, 200);
   }
 */
  selectFirstItem(data, filterProperty, filterValue): string {
    console.log("selectFristItem")
    const filteredData = data.selectItems.find(
      item => item[filterProperty] === filterValue
    );
    return filteredData.value;
  }




  async saveChanges(dialog: NbDialogRef<any>) {
    console.log("saveChages");
    console.log(dialog);
    if (this.agregarTarea) {
      if (this.fullData) {

        this.generalService.createRonda(this.data.tareaId, this.fullData.data.id);
      }
      //console.log(this.fullData); 
    }
    else {
      if (this.edit) {
        //elimino la tarea y agrego la nueva
      }
    }

    /* this.disableAll();
    if (!this.fieldsData) this.fieldsData = [];
    if (this.currentIndex != null) {
      await this.saveOrDeleteRoundsFields(this.data);
      this.fieldsData[this.currentIndex] = this.data;
      this.fieldsData = [...this.fieldsData];
      this.currentIndex = null;
    } else {
      await this.saveOrDeleteRoundsFields(this.data);
      this.fieldsData = [...this.fieldsData, ...[this.data]];
    }
    this.currentIndex = null;*/


    /* console.log("this.data");
     this.data.nombre=this.roundName;
     if(this.fullData != null)this.data.rondaId=this.fullData.data.id;
     console.log(this.data);
     
     this.generalService.createRonda(this.data.nombre,this.data.rondaId);*/

    dialog.close();
    this.agregarTarea = false;
  }

  async saveTemplate() {
    let res;

      res = await this.generalService.createRoundTemplate(this.roundName,this.descripcion);
      this.data.rondaId = res.insertId;

      let cont = 0;
      this.tareasSeleccionadas.forEach(element => {
        this.generalService.asociarTareasEnRondas(this.idTareasSeleccionadas[cont],this.data.rondaId)
        console.log("El id de la tarea que se carga es : ")
        console.log(this.idTareasSeleccionadas[cont])
        console.log("Con la rondaId:")
        console.log(this.data.rondaId)
        cont += 1;
      });


    // this.selectTimeInicio();
    // this.selectTimeFin();
    //let dias = "";
    // this.selectedDia.forEach(dia => { dias = dias = '' ? (dias.concat(dia)) : (dias.concat(",").concat(dia)) })

    // console.log("dias");
    // console.log(dias);
    // this.hora = {
    //   ...this.hora,
    //   dias: dias,
    //    tipoRecurrencia: this.selectedRecurrencia,
    //    fechaInicio: this.dia,
    //    fechaFin: this.dia,
    //    plantillaId: this.data.rondaId
    //  }
    //  this.generalService.createHorario(this.hora);
    this.router.navigate(['/pages/round-template']).then(()=>{
      location.reload();
    });

  }

  /*  generarHorario() {
    // this.selectTimeInicio();
     //this.selectTimeFin();
     //let dias = "";
     //this.selectedDia.forEach(dia => { dias = dias = '' ? (dias.concat(dia)) : (dias.concat(",").concat(dia)) })
 
 /*this.hora = {
       dias: "1,2,3",
       tipoRecurrencia: 0,
       horaInicio: "08:00",
       horaFin: "10:00",
       fechaInicio: "2020-10-22:00:00.0",
       fechaFin: "2020-10-22:00:00.00",
       plantillaId: 139
     }
     console.log(this.hora);
     this.generalService.createHorario(this.hora);
   }
 
    dia = "";
   selectDate(fecha: Date) {
     console.log("fecha: ");
     this.dia= fecha.getFullYear().toString()+"-"+((fecha.getMonth()<10)?("0"+fecha.getMonth().toString()):fecha.getMonth().toString())+"-"+((fecha.getDay()<10)?("0"+fecha.getDay().toString()):fecha.getDay().toString())+":00:00.00";
     console.log(this.dia);
   }*/


  changeField(e, a) {
    this[a] = e;
  }

  discardChanges(dialog: NbDialogRef<any>): void {
    this.disableAll();
    this.tableTimeData = [];
    this.data = {
      plant: '',
      system: '',
      equipment: '',
      unit: '',
      timer: new Set(),
      time: ''
    };
    dialog.close();
  }

  disableAll(): void {
    this.enableEquipment = false;
    this.enableSystem = false;
    this.enableComponent = false;
  }

  get enableSaveButton(): boolean {
    return [
      this.data.plantId,
      this.data.systemId,
      this.data.equipmentId,
      this.data.unitId,
      this.data.typeId,
      this.data.name,
      +this.data.typeId < 3 ? this.data.minValue : true,
      +this.data.typeId < 3 ? this.data.maxValue : true,
      this.data.normalValue].every(key => !!key);
  }

  async saveOrDeleteRoundsFields(field: RoundsDetails, isDelete = false) {
    console.log("saveOrDeleteRoundFields");
    /*const roundTemplateId = field.roundTemplateId || (this.route.snapshot.queryParams || {} as any).id;
    if (roundTemplateId) {
      const dataTemplate: RoundFields = {
        nombre: field.name,
        valorNormal: +field.typeId === 3 ? !!field.normalValue : field.normalValue,
        valorMax: field.maxValue,
        valorMin: field.minValue,
        equipamientoId: field.equipmentId,
        tipoCampoRondaId: field.typeId,
        unidadMedidaId: field.unitId,
        plantillaRondaId: roundTemplateId,
      }

      if (field.roundFieldId && isDelete) {
        await this.generalService.deleteRoundFields(field.roundFieldId);
      } else if (field.roundFieldId) {
        await this.generalService.editRoundFields(dataTemplate, field.roundFieldId);
      } else {
        await this.generalService.createRoundFields(dataTemplate);
      }
      this.onRefreshRoundTemplate.emit();
    }

    if (!field.roundTemplateId && isDelete) {
      return true;
    }*/

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fullData && changes.fullData.currentValue) {
      this.roundName = this.fullData.nombre || null;
      this.timeData.time = this.fullData.time || null;
      this.fieldsData = this.fullData.full.fieldsData || null;
      this.timeData = this.fullData.full.timeData || null;
      this.tableTimeData = this.fullData.full.tableTimeData || [];
      // tslint:disable-next-line: max-line-length
      const {
        obligatorioSistema = null,
        funcionamientoSistema = null,
        obligatorioEquipo = null,
        funcionamientoEquipo = null
      } = this.fullData.full.templateConfig;
      this.obligatorioSistema = obligatorioSistema;
      this.funcionamientoSistema = funcionamientoSistema;
      this.obligatorioEquipo = obligatorioEquipo;
      this.funcionamientoEquipo = funcionamientoEquipo;
      this.templateIndex = this.fullData.index;
      this.fullData.id = this.fullData.id || null;
    }
  }



  setingsTareaSeleccionada: SmartTableSettings = {
    noDataMessage: 'No se seleccionaron tareas',
    mode: 'external',
    actions: false,
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
      plantaNombre: {
        title: 'Planta',
        type: 'text',
        width: '200px'
      },
      sistemaNombre: {
        title: 'Sistema',
        type: 'text',
        width: '200px'
      },
      equipamientoNombre: {
        title: 'Equipo',
        type: 'text',
        width: '200px'
      },
      nombre: {
        title: 'Nombre de Tarea',
        type: 'text',
        width: '200px'
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
        width: '200px'
      },
      unidadDemedidaNombre: {
        title: 'Unidad De Medida',
        type: 'text',
        width: '200px'
      }

    }
  };

  setingsTarea: SmartTableSettings = {
    noDataMessage: '',
    mode: 'external',
    actions: false,
    attr: {
      class: 'general-table'
    },
    columns: {
      plantaNombre: {
        title: 'Planta',
        type: 'text',
        width: '200px'
      },
      sistemaNombre: {
        title: 'Sistema',
        type: 'text',
        width: '200px'
      },
      equipamientoNombre: {
        title: 'Equipo',
        type: 'text',
        width: '200px'
      },
      nombre: {
        title: 'Nombre de Tarea',
        type: 'text',
        width: '200px'
      },
      descripcion: {
        title: 'Descripcion',
        type: 'text',
        width: '200px'
      },
/*       unidadMedidaId: {
        title: 'Unidad De Medida ID',
        type: 'text',
        width: '200px'
      }, */
      unidadDemedidaNombre: {
        title: 'Unidad De Medida',
        type: 'text',
        width: '200px'
      }

    }
  };



}
