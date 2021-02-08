import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbCheckboxComponent, NbDialogRef, NbDialogService } from '@nebular/theme';
import { RoundsDetails } from '../../../@models/rounds';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { RoundFields } from './../../../@models/general';
import { TimeData } from './../../../@models/rounds';
import { TareaComponent } from '../tarea/tarea.component';



@Component({
  selector: 'ngx-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.scss']
})
export class NuevaTareaComponent implements OnInit {
  @ViewChild('addOrEdit') addOrEditTemplate: TemplateRef<any>;
  @Output() onSave = new EventEmitter<any>();
  @Output() onRefreshRoundTemplate = new EventEmitter();
  @Input() fullData: any;
  roundName: string;
  selectedPlant: string;
  selectedSystem: string;
  selectedEquipment: string;
  funcionamientoSistema: boolean = false;
  obligatorioSistema: boolean = false;
  funcionamientoEquipo: boolean = false;
  obligatorioEquipo: boolean = false;

  data: RoundsDetails = {
    plant: '',
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
    normalValue: '',
    descripcion: '',
/*     plant: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.nombrePlanta:'',
    system: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.nombreSistema:'',
    equipment: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.nombreEquipo:'',
    unit: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.nombreUnidadMedida:'',
    type: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.nombreTipoTarea:undefined,
    plantId: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.plantaId:null,
    systemId: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.sistemaId:null,
    equipmentId: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.equipoId:null,
    unitId: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.unidadMedidaId:null,
    typeId: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.tipoCampoRondaId:null,
    timer: new Set(),
    time: '',
    name: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.tareaNombre:'',
    minValue: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.valirMin:'',
    maxValue: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.valorMax:'',
    normalValue: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.valorNormal:'',
    descripcion: this.route.snapshot.queryParams.editTarea=true?this.route.snapshot.queryParams.descripcion:'', */
  };
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
  descripcionField: any;

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
      plant: {
        title: 'Planta',
        type: 'text',
        width: '300px'
      },
      system: {
        title: 'Sistema',
        type: 'text',
        width: '300px'
      },
      equipment: {
        title: 'Equipo',
        type: 'text',
        width: '300px',
      },
      unit: {
        title: 'Unidad de medida',
        type: 'text',
        width: '300px',
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
        max: 23
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
  edit : boolean = false;
  ngOnInit() {
    console.log(this.route.snapshot.queryParams)
    this.getAllData();
    console.log("THIS FULL DATA NEW TAKS:")
    console.log(this.fullData)
    if (this.fullData) {
      console.log("NOMBRE SISTEMA")
      console.log(this.data.system)
      console.log("ID SISTEMA")
      console.log(this.data.systemId)
     // this.traerInfo(1);
      console.log("NOMBRE SISTEMA")
      console.log(this.data.system)
      console.log("ID SISTEMA")
      console.log(this.data.systemId)
      
      this.edit = true;
      // this.editTemplate(this.fullData);
      this.dialogService.open(this.addOrEditTemplate, {
        context: 'Editar Elemento',
        closeOnBackdropClick: false,
        closeOnEsc: false
      });
      console.log("full data editar tarea");
      console.log(this.fullData);
    }
    else {
      this.edit = false;
      this.createTemplate();
    }
  }

  async traerInfo(id: any) {
 ////   const res = await this.generalService.getTareaCompleta();
   /* console.log("for each de tarea completa");
    res.forEach(element => {
      if(element.id == id)
      {
        this.fullData = element;
      }
      console.log(element);

    });*/
    console.log("this.fullData");
    console.log(this.fullData);
    this.enableSystem = true;
    this.enableEquipment = false;
    this.maneuverGuideContent = '';
    this.data.systemId = this.fullData.sistemaId;
    this.data.system = this.fullData.nombreSistema;
    this.data.equipment =this.fullData.nombreEquipo;
    this.data.equipmentId = this.fullData.equipoId;
    this.enableComponent = true;
    this.data.unitId = this.fullData.unidadMedidaId;
    this.data.unit = this.fullData.nombreUnidadMedida;
    this.data.type = this.fullData.tipoCampoRondaId; 
    this.data.typeId = this.fullData.tipoCampoRondaId; 
    this.data = {
      ...this.data,
      normalValue:this.fullData.valorNormal,
      minValue: this.fullData.valorMin,
      maxValue: this.fullData.valorMax,
    };
    this.data.name=this.fullData.tareaNombre;
    this.data.plant = this.fullData.nombrePlanta;
    this.data.plantId = this.fullData.plantaId;
    this.data.descripcion = this.fullData.tareaDescripcion;
    
    console.log("this.data");
    console.log(this.data);
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.traerInfo(1)
    },3500);
}



  async getAllData() {
    this.settings = { ...this.settings, attr: { class: 'general-table disabled' } };
    Promise.all([
      this.generalService.getPlants(),
      this.generalService.getSystems(),
      this.generalService.getEquipments(),
      this.generalService.getMeasurementUnits(),
      this.generalService.getDataType(),
    ]).then(([plants, systems, equipments, measurementUnits, dataTypes]) => {
      this.plantArray = plants;
      this.systemArray = systems;
      this.equipmentArray = equipments;
      this.unitArray = measurementUnits;
      this.dataTypeArray = dataTypes;
      this.settings = { ...this.settings, attr: { class: 'general-table' } };
    }).catch(() => { });
  }

  createTemplate() {
    this.isEditorCreate = true;
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false
    });
  }

  editTemplate(data) {
    this.data = data.data;
    console.log("editTemplate");
    console.log(this.data);
    //this.currentIndex = data.index;
    //this.isEditorCreate = true;
    //this.enableSystem = true;
    //this.enableComponent = true;
    // this.enableEquipment = true;
    //this.data.plantId = data;
    // this.data.plantId = this.plantArray.items.find(
    //   plant => plant.nombre === data.data.plant
    // ).id;
    // this.data.systemId = this.systemArray.items.find(
    //   system => system.nombre === data.data.system
    // ).id;
    //  this.data.equipmentId = this.equipmentArray.items.find(
    //    equipment => equipment.nombre === data.data.equipamientoId
    //  ).id;
    // this.data.equipmentId = data.data.equipamientoId;
    // this.data.unitId = this.unitArray.items.find(
    //  type => type.nombre === data.data.nidadMedidaId
    //  ).id;
    //this.data.typeId = data.data.tipoCampoRondaId;
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

  selectPlant(item): void {
    this.enableSystem = true;
    this.data.plant = item.nombre;
    this.data.plantId = item.id;
    this.enableEquipment = false;
    this.maneuverGuideContent = '';
    this.data.systemId = null;
    this.data.equipmentId = null;
  }
  selectSystem(item): void {
    this.enableEquipment = true;
    this.data.systemId = item.id;
    this.data.system = item.nombre;
    this.data.equipmentId = null;
  }

  selectEquipment(item): void {
    this.data.equipmentId = item.id;
    this.enableComponent = true;
    this.data.equipment = item.nombre;
  }

  selectComponent(item): void {
    console.log("EL ID ES:")
    console.log(item.id)
    this.data.unitId = item.id;
    this.data.unit = item.nombre;
  }

  selectTypeData(item): void {
    this.data.type = item.id;
    this.data.typeId = item.id;
    this.data = {
      ...this.data,
      normalValue: '',
      minValue: '',
      maxValue: '',
    };
  }

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

  selectFirstItem(data, filterProperty, filterValue): string {
    const filteredData = data.selectItems.find(
      item => item[filterProperty] === filterValue
    );
    return filteredData.value;
  }

  async saveChanges(dialog: NbDialogRef<any>) {
    console.log("save changes");
    console.log(dialog);
    this.disableAll();
    if (!this.fieldsData) this.fieldsData = [];
    if (this.currentIndex != null) {
      await this.saveOrDeleteRoundsFields(this.data);
      this.fieldsData[this.currentIndex] = this.data;
      this.fieldsData = [...this.fieldsData];
      this.currentIndex = null;
      console.log("save changes this.data");
      console.log(this.data);
    } else {
      await this.saveOrDeleteRoundsFields(this.data);
      this.fieldsData = [...this.fieldsData, ...[this.data]];
    }
    this.currentIndex = null;
    this.data = {
      plant: '',
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
      normalValue: '',
    };
    dialog.close();
  }


  saveTarea() {
    console.log("save template");
    console.log(this.fullData);
    this.router.navigate(['/pages/tarea']);
    this.onSave.subscribe()
    /* this.onSave.emit({
       id: (this.fullData && this.fullData.id) || null,
      // id: this.fullData? (this.fullData.id? this.fullData : null) : null,
       nombre: this.roundName,
       time: this.timeData.time,
       indexEdited: this.templateIndex,
       full: {
         fieldsData: this.fieldsData,
         timeData: this.timeData.timer,
         tableTimeData: this.tableTimeData,
         templateConfig: {
           funcionamientoSistema: this.funcionamientoSistema,
           obligatorioSistema: this.obligatorioSistema,
           funcionamientoEquipo: this.funcionamientoEquipo,
           obligatorioEquipo: this.obligatorioEquipo
         },
       }
     });*/
  }

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
    console.log(this.fullData);
    this.router.navigate(['/pages/tarea']);
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
    console.log("guardar campos ronda");
    const roundTemplateId = field.roundTemplateId || (this.route.snapshot.queryParams || {} as any).id;
    if (roundTemplateId) {
      const dataTemplate: any = {
        nombre: field.name,
        valorNormal: +field.typeId === 3 ? !!field.normalValue : field.normalValue,
        valorMax: field.maxValue,
        valorMin: field.minValue,
        plantaId: field.plantId,
        sistemaId: field.systemId,
        equipamientoId: field.equipmentId,
        tipoCampoRondaId: field.typeId,
        unidadMedidaId: field.unitId,
        //plantillaRondaId: roundTemplateId,
      }

      if (field.roundFieldId && isDelete) {
        await this.generalService.deleteRoundFields( field.roundFieldId);
      } else if (field.roundFieldId) {
        await this.generalService.editRoundFields(this.data.descripcion,this.data.name,this.fullData.tareaId,this.data.normalValue,this.data.maxValue,this.data.minValue,this.data.equipmentId,this.data.typeId,this.data.unitId);
      } else {
        console.log("CreatRoundFields");
        console.log(dataTemplate);
        await this.generalService.createRoundFields(dataTemplate);
      }
      this.onRefreshRoundTemplate.emit();
    }

    if (!field.roundTemplateId && isDelete) {
      return true;
    }

  }


  guardarTarea(dialog: NbDialogRef<any>): void {
    console.log("guardarTarea");
    const campRondaInfo = {
      nombre: this.data.name!=''?this.data.name:this.fullData.name,
      descripcion: this.data.descripcion,
      valorNormal: this.data.normalValue,
      valorMax: this.data.maxValue,
      valorMin: this.data.minValue,
      equipamientoId: this.data.equipmentId,
      tipoCampoRondaId: this.data.typeId,
      unidadMedidaId: this.data.unitId,
    };
    console.log("SE GUARDO LA TAREA CON UN ID:")
    console.log(campRondaInfo.unidadMedidaId);
    console.log("EL ID DE DATA ES:")
    console.log(this.data.unitId)
    if(!this.edit){
      console.log("guardarTarea campos")
      console.log(campRondaInfo);
    this.generalService.crearTarea(campRondaInfo);}
    if(this.edit)
    {
     this.generalService.editRoundFields(this.data.descripcion,this.data.name,this.fullData.tareaId,this.data.normalValue,this.data.maxValue,this.data.minValue,this.data.equipmentId,this.data.typeId,this.data.unitId);
    }
    console.log(this.fullData);
    this.router.navigate(['/pages/tarea']).then(()=> {
        TareaComponent.getTareasStatic()  
    });
    dialog.close();
  }



  ngOnChanges(changes: SimpleChanges) {
    /* if (changes.fullData && changes.fullData.currentValue) {
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
     }*/
  }


}
