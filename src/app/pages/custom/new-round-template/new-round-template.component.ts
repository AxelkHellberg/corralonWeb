import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
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
      tarea: {
        title: 'Tarea',
        type: 'text',
        width: '300px'
      },
      descripcion: {
        title: 'Descripcion',
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
  ) {}

  ngOnInit() {
    this.getAllData();
  }

  async getAllData() {
    this.settings = {...this.settings, attr: {class: 'general-table disabled'}};
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
      this.settings = {...this.settings, attr: {class: 'general-table'}};
    }).catch(() => {});
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
    this.data.typeId = this.data.type;
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
    this.disableAll();
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

  saveTemplate() {
    this.router.navigate(['/pages/round-template']);
    this.onSave.emit({
      id: (this.fullData && this.fullData.id) || null,
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
    });
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
    const roundTemplateId = field.roundTemplateId || (this.route.snapshot.queryParams || {} as any).id;
    if (roundTemplateId) {
      const dataTemplate: RoundFields = {
        nombre: field.name,
        valorNormal: +field.typeId === 3 ? !!field.normalValue : field.normalValue,
        valorMax: field.maxValue,
        valorMin: field.minValue,
        // plantaId: field.plantId,
        // sistemaId: field.systemId,
        equipamientoId: field.equipmentId,
        tipoCampoRondaId: field.typeId,
        unidadMedidaId: field.unitId,
        plantillaRondaId: roundTemplateId,
      }

      if (field.roundFieldId && isDelete) {
        await this.generalService.deleteRoundFields(dataTemplate, field.roundFieldId);
      } else if (field.roundFieldId) {
        await this.generalService.editRoundFields(dataTemplate, field.roundFieldId);
      } else {
        await this.generalService.createRoundFields(dataTemplate);
      }
      this.onRefreshRoundTemplate.emit();
    }

    if (!field.roundTemplateId && isDelete) {
      return true;
    }

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
}
