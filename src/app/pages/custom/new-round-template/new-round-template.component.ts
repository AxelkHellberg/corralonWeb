import { TimeData } from './../../../@models/rounds';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { RoundsDetails } from '../../../@models/rounds';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-new-round-template',
  templateUrl: './new-round-template.component.html',
  styleUrls: ['./new-round-template.component.scss']
})
export class NewRoundTemplateComponent implements OnInit, OnChanges {
  @ViewChild('addOrEdit') addOrEditTemplate: TemplateRef<any>;
  @Output() onSave = new EventEmitter<any>();
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
    component: '',
    timer: new Set(),
    time: '',
  };
  plantId:any
  systemId:any
  equipmentId:any
  componentId:any
  plantArray:any = []
  systemArray:any = []
  equipmentArray:any = []
  unitArray:any = []
  dataTypeArray:any = []
  dataType:any;
  min:any;
  max:any;
  normal:any;
  nameField:any;

  timeData: TimeData = {
    timer: new Set(),
    time: '',
  }
  tableData = [];
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
        width: '300px',
      },
      system: {
        title: 'Sistema',
        type: 'text',
        width: '300px',
      },
      equipment: {
        title: 'Equipamiento',
        type: 'text',
        width: '300px',
      },
      component: {
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
      },
    },
  };
  plant = {
    selected: '',
    selectItems: [
      {
        text: 'Planta A',
        value: '1'
      },
      {
        text: 'Planta B',
        value: '2'
      }
    ],
    placeholder: 'Planta'
  };
  system = {
    selected: '',
    selectItems: [
      {
        text: 'System A1',
        value: '1',
        plant: 'Planta A',
      },
      {
        text: 'System A2',
        value: '2',
        plant: 'Planta A',
      },
      {
        text: 'System B1',
        value: '3',
        plant: 'Planta B',
      },
      {
        text: 'System B2',
        value: '4',
        plant: 'Planta B',
      }
    ],
    placeholder: 'Sistema',
  };
  equipment = {
    selected: '',
    selectItems: [
      {
        text: 'Equipment A10',
        value: '1',
        system: 'System A1',
      },
      {
        text: 'Equipment A11',
        value: '2',
        system: 'System A1',
      },
      {
        text: 'Equipment A20',
        value: '3',
        system: 'System A2',
      },
      {
        text: 'Equipment A21',
        value: '4',
        system: 'System A2',
      },
      {
        text: 'Equipment B10',
        value: '5',
        system: 'System B1',
      },
      {
        text: 'Equipment B11',
        value: '6',
        system: 'System B1',
      },
      {
        text: 'Equipment B20',
        value: '7',
        system: 'System B2',
      },
      {
        text: 'Equipment B21',
        value: '8',
        system: 'System B2',
      },
    ],
    placeholder: 'Equipamiento',
  };
  typeData = {
    selected : '',
    placeholder: 'Tipo de dato',
    selectItems: [
      {
        text: 'Tipo de dato 1',
        value: '1'
      },
      {
        text: 'Tipo de dato 2',
        value: '2'
      },
    ]
  }
  component = {
    selected: '',
    selectItems: [
      {
        text: 'Unidad de medida A10',
        value: '1',
        equipment: 'Equipment A10',
      },
      {
        text: 'Unidad de medida A11',
        value: '2',
        equipment: 'Equipment A11',
      },
      {
        text: 'Unidad de medida A20',
        value: '3',
        equipment: 'Equipment A20',
      },
      {
        text: 'Unidad de medida A21',
        value: '4',
        equipment: 'Equipment A21',
      },
      {
        text: 'Unidad de medida B10',
        value: '5',
        equipment: 'Equipment B10',
      },
      {
        text: 'Unidad de medida B11',
        value: '6',
        equipment: 'Equipment B11',
      },
      {
        text: 'Unidad de medida B20',
        value: '7',
        equipment: 'Equipment B20',
      },
      {
        text: 'Unidad de medida B21',
        value: '8',
        equipment: 'Equipment B21',
      },
    ],
    placeholder: 'Unidad de medida',
  };
  isEditorCreate: boolean;
  enableSystem: boolean;
  enableEquipment: boolean;
  enableComponent: boolean;
  enableSaveButton: boolean;
  maneuverGuideContent: string;
  timeStart: string;
  timeEnd: string;
  currentIndex: any;
  templateIndex: any;
  constructor(private generalService: GeneralService, private route: ActivatedRoute, private router: Router, private dialogService: NbDialogService) {}

  async ngOnInit() {
    await this.getPlants();
    await this.getSystem();
    await this.getEquipment();
    await this.getUnit();
    await this.getDataType();
  }

  createTemplate() {
    this.isEditorCreate = true;
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  async getPlants(){
    try {
      this.plantArray = await this.generalService.getPlants();
      console.log(this.plantArray)
    }
    catch(err){
      console.log(err)
    }
  }

  async getSystem(){
    try {
      this.systemArray = await this.generalService.getSystems();
      console.log(this.systemArray)
    }
    catch(err){
      console.log(err)
    }
  }

  async getEquipment(){
    try {
      this.equipmentArray = await this.generalService.getEquipments();
      console.log(this.equipmentArray)
    }
    catch(err){
      console.log(err)
    }
  }

  async getUnit(){
    try {
      this.unitArray = await this.generalService.getMeasurementUnits();
      console.log(this.unitArray)
    }
    catch(err){
      console.log(err)
    }
  }

  async getDataType(){
    try {
      this.dataTypeArray = await this.generalService.getDataType();
      console.log(this.dataTypeArray)
    }
    catch(err){
      console.log(err)
    }
  }

  editTemplate(data) {
    this.data = data.data;
    this.currentIndex = data.index;
    this.isEditorCreate = true;
    this.enableSystem = true;
    this.enableComponent = true;
    this.enableEquipment = true;
    this.enableSaveButton = true;
    this.plant.selected = this.selectFirstItem(this.plant, 'text', this.data.plant);
    this.system.selected = this.selectFirstItem(this.system, 'text', this.data.system);
    this.equipment.selected = this.selectFirstItem(this.equipment, 'text', this.data.equipment);
    this.component.selected = this.selectFirstItem(this.component, 'text', this.data.component);
    this.tableTimeData = Array.from(this.data.timer).map((time: any) => {
      const _time = time.split(':');
      return {
        hour: _time[0],
        minute: _time[1],
      };
    });
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Editar Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  deleteTemplate(data): void {
    delete this.tableData[data.index];
    this.tableData = [...this.tableData];
  }

  selectPlant(item): void {
    this.enableSystem = true;
    this.data.plant = item.nombre;
    this.plantId = item.id
    this.enableEquipment = false;
    this.enableSaveButton = false;
    this.maneuverGuideContent = '';
    // this.system.selected = this.selectFirstItem(this.system, 'plant', item.text);
  }
  selectSystem(item): void {
    this.enableEquipment = true;
    this.systemId = item.id
    this.data.system = item.nombre;
    this.enableSaveButton = false;
    // this.equipment.selected = this.selectFirstItem(this.equipment, 'system', item.text)
  }

  selectEquipment(item): void {
    this.equipmentId = item.id
    this.enableComponent = true;
    this.data.equipment = item.nombre;
    this.enableSaveButton = false;
    // this.equipment.selected = this.selectFirstItem(this.component, 'equipment', item.text);
  }

  selectComponent(item): void {
    this.componentId = item.id
    this.enableSaveButton = false;
    this.data.component = item.nombre;
  }

  selectTypeData(item): void {
    this.enableSaveButton = true;
    this.max = ''
    this.min = ''
    this.normal = ''
    this.dataType = item.id;
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
        this.tableTimeData[i].hour = this.tableTimeData[i].hour.replace(/\D/g, '') > 12 ? '12' :
          this.tableTimeData[i].hour.replace(/\D/g, '');
        this.tableTimeData[i].minute = this.tableTimeData[i].minute.replace(/\D/g, '') > 59 ? '59' :
          this.tableTimeData[i].minute.replace(/\D/g, '');
        this.timeData.timer.add(`${this.tableTimeData[i].hour}:${this.tableTimeData[i].minute}`);
      }
      this.timeData.time = Array.from(this.timeData.timer).join(' - ');
      console.log(data, this.tableTimeData, this.timeData.timer, this.timeData.time);
    }, 200);
  }

  selectFirstItem(data, filterProperty, filterValue): string {
    const filteredData = data.selectItems.find(item => item[filterProperty] === filterValue);
    return filteredData.value;
  }

  saveChanges(dialog: NbDialogRef<any>): void {
    this.disableAll();
    if(!this.tableData)
    this.tableData = []
    if (this.currentIndex != null) {
      this.tableData[this.currentIndex] = this.data;
      this.tableData = [...this.tableData];
      this.currentIndex = null;
    } else {
      this.tableData = [...this.tableData, ...[this.data]];
    }
    console.log(this.tableData)
    this.currentIndex = null;
    this.plant.selected = '';
    this.system.selected = '';
    this.equipment.selected = '';
    this.component.selected = '';
    this.data = {
      plant: '',
      system: '',
      equipment: '',
      component: '',
      timer: new Set(),
      time: '',
    }
    dialog.close();
  }

  saveTemplate() {
    this.router.navigate(['/pages/round-template']);
    this.onSave.emit({
      id: this.fullData && this.fullData.id || null,
      nombre: this.roundName,
      time: this.timeData.time,
      indexEdited: this.templateIndex,
      full: {
        tableData: this.tableData,
        timeData: this.timeData.timer,
        tableTimeData: this.tableTimeData,
        templateConfig: {
          funcionamientoSistema: this.funcionamientoSistema,
          obligatorioSistema: this.obligatorioSistema,
          funcionamientoEquipo: this.funcionamientoEquipo,
          obligatorioEquipo: this.obligatorioEquipo,
        },
        fieldConfig:{
          nombre: this.nameField,
	        valorNormal:this.normal,
	        valorMax:this.max,
	        valorMin:this.min,
	        equipamientoId:this.equipmentId,
	        tipoCampoRondaId: this.dataType,
	        unidadMedidaId: this.componentId
        }
      },
    });
  }

  changeField(e,a){
    this[a] = e
  }

  discardChanges(dialog: NbDialogRef<any>): void {
    this.disableAll();
    this.tableTimeData = [];
    this.data = {
      plant: '',
      system: '',
      equipment: '',
      component: '',
      timer: new Set(),
      time: '',
    }
    dialog.close();
  }

  disableAll(): void {
    this.enableEquipment = false;
    this.enableSystem = false;
    this.enableComponent = false;
    this.enableSaveButton = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fullData && changes.fullData.currentValue) {
      console.log(this.fullData)
      this.roundName = this.fullData.nombre || null;
      this.timeData.time = this.fullData.time || null;
      this.tableData = this.fullData.full.tableData || null;
      this.timeData = this.fullData.full.timeData || null;
      this.tableTimeData = this.fullData.full.tableTimeData || null;
      // tslint:disable-next-line: max-line-length
      const { obligatorioSistema = null, funcionamientoSistema = null, obligatorioEquipo = null, funcionamientoEquipo = null } = this.fullData.full.templateConfig;
      this.obligatorioSistema = obligatorioSistema || null;
      this.funcionamientoSistema = funcionamientoSistema || null;
      this.obligatorioEquipo = obligatorioEquipo || null;
      this.funcionamientoEquipo = funcionamientoEquipo || null;
      this.templateIndex = this.fullData.index || null;
      this.fullData.id = this.fullData.id || null;
    }
  }

}
