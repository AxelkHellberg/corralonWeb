import { ManeuverGuideData, PlantData, SystemData, ManeuverGuideFields } from './../../../@models/general';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-new-maneuver-guide-template',
  templateUrl: './new-maneuver-guide-template.component.html',
  styleUrls: ['./new-maneuver-guide-template.component.scss']
})
export class NewManeuverGuideTemplateComponent implements OnInit, OnChanges {
  @ViewChild('addOrEdit') addOrEditTemplate: TemplateRef<any>;
  @Output() onSave = new EventEmitter<any>();
  maneuverGuideName: string;
  enableSystem: boolean;
  selectedPlant: string;
  selectedSystem: string;

  @Input() fullData: any;
  data: any;
  tableData = [];
  plants: PlantData[] = [];
  systems: SystemData[] = [];

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
        title: 'Equipo',
        type: 'text',
        width: '300px',
      },
      maneuverGuideName: {
        title: 'Nombre',
        type: 'text',
        width: '300px',
      },
      maneuverGuideDescription: {
        title: 'Descripción',
        type: 'text',
        width: '300px',
      }
    }
  };
  plantSelected: number;
  systemSelected: number;
  isCreate: boolean;
  isEdit: boolean;
  enableManeuverGuide: boolean;
  maneuverGuideTitle: string;
  maneuverGuideDescription: string;
  currentIndex: number;
  maneuverGuideId: number;
  currentPlantId: number;
  currentSystemId: number;
  currentEquipmentId: number;
  equipments: any;
  enableEquipment: boolean;
  equipmentSelected: any;


  plantArray: any = [];
  systemArray: any = [];
  equipmentArray: any = [];


  constructor(private dialogService: NbDialogService, private generalService: GeneralService) { }

  ngOnInit() {
    this.getAllData();
  }

  async getAllData() {
    this.settings = {...this.settings, attr: {class: 'general-table disabled'}};
    Promise.all([
       this.generalService.getPlants(),
       this.generalService.getSystems(),
       this.generalService.getEquipments(),
       //this.generalService.getManeuverGuideFieldsWithPlants(this.maneuverGuideId),
    ]).then(([plants, systems,equipments/*,maneuverGuideFieldsWithPlants*/]) => {
      this.plantArray = plants.items;
      this.systemArray = systems.items;
      this.equipmentArray = equipments.items;
      /*this.tableData = maneuverGuideFieldsWithPlants.map(res => ({
        id: res.id,
        plant: res.equipamiento.sistema.planta.nombre,
        plantaId: res.equipamiento.sistema.planta.id,
        system: res.equipamiento.sistema.nombre,
        sistemaId: res.equipamiento.sistema.id,
        equipment: res.equipamiento.nombre,
        equipmentId: res.equipamiento.id,
        maneuverGuideName: res.nombre,
        maneuverGuideDescription: res.descripcion
      }));*/
      this.settings = {...this.settings, attr: {class: 'general-table'}};
      console.log(plants)
    }).catch(() => {});

    Promise.all([
     
      this.generalService.getManeuverGuideFieldsWithPlants(this.maneuverGuideId),
   ]).then(([maneuverGuideFieldsWithPlants]) => {
    
     this.tableData = maneuverGuideFieldsWithPlants.map(res => ({
       id: res.id,
       plant: res.equipamiento.sistema.planta.nombre,
       plantaId: res.equipamiento.sistema.planta.id,
       system: res.equipamiento.sistema.nombre,
       sistemaId: res.equipamiento.sistema.id,
       equipment: res.equipamiento.nombre,
       equipmentId: res.equipamiento.id,
       maneuverGuideName: res.nombre,
       maneuverGuideDescription: res.descripcion
     }));


   }).catch(() => {});
}

  createTemplate() {
    this.isCreate = true;
    this.isEdit = false;
    this.data = {
      plant: '',
      system: '',
      maneuverGuideName: '',
      maneuverGuideDescription: '',
    };
    this.plantSelected = null;
    this.systemSelected = null;
    this.maneuverGuideTitle = '';
    this.dialogService.open(this.addOrEditTemplate, {
      context: {title: 'Añadir Elemento', data: this.data},
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  async editTemplate(row) {
    this.isEdit = true;
    this.isCreate = false;
    this.enableManeuverGuide = true;
    this.enableSystem = true;
    this.enableEquipment = true;
    this.selectOnEdit(row.data, row.index);
    this.dialogService.open(this.addOrEditTemplate, {
      context: {title: 'Editar Elemento', data: this.data},
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  async deleteTemplate(row) {
    try {
      await this.generalService.deleteManeuverGuideField(row.data.id)
    } catch (e) { }
    delete this.tableData[row.index];
    this.tableData = [...this.tableData];
  }

  selectPlant(plant) {
    this.enableSystem = true;
    this.enableEquipment = false;
    this.systemSelected = null;
    this.data.plant = plant.nombre;
    this.maneuverGuideTitle = '';
    this.currentPlantId = plant.id;
    this.currentSystemId = null;
  }
  selectSystem(item) {
    this.data.system = item.nombre;
    this.enableEquipment = true;
    this.equipmentSelected = null;
    this.currentSystemId = item.id;
    this.currentEquipmentId = null;
  }
  selectEquipment(item) {
    this.data.equipment = item.nombre;
    this.currentEquipmentId = item.id;
  }

  selectOnEdit(data: any, index: number) {
    this.data = data;
    this.plantSelected = this.plantArray.find(plant => plant.nombre === data.plant).id;
    this.systemSelected = this.systemArray.find(system => system.nombre === data.system).id;
    this.equipmentSelected = this.equipmentArray.find(equipment => equipment.nombre === data.equipment).id;
    this.currentPlantId = this.plantSelected;
    this.currentSystemId = this.systemSelected;
    this.currentEquipmentId = this.equipmentSelected;
    this.data.maneuverGuide = this.data.maneuverGuide;
  }

  get enableSaveButton(): boolean {
    return [this.currentPlantId, this.currentSystemId, this.currentEquipmentId].every(item => !!item);
  }

  discardChanges(dialog: NbDialogRef<any>) {
    dialog.close();
  }

  async saveChanges(dialog: NbDialogRef<any>, dialogData: any) {
    this.data = dialogData.data;
    this.enableManeuverGuide = false;
    this.enableSystem = false;
    try {
      await this.saveManeuverGuideName();
    } catch (error) { }

    try {
      await this.saveManeuverGuideFields();
      if (this.isCreate) {
        this.tableData = [...this.tableData, ...[this.data]];
      } else if (this.isEdit) {
        this.tableData[this.currentIndex] = this.data;
        this.tableData = [...this.tableData];
      }

    } catch (error) { } finally {
      this.getAllData();
      dialog.close();
    }
    this.isCreate = false;
    this.isEdit = false;
  }

  async saveManeuverGuideName() {
    try {
      if (this.maneuverGuideId) {
        await this.generalService.editManeuverGuideTemplate(this.maneuverGuideId, this.maneuverGuideName);
      } else {
        const response = await this.generalService.createManeuverGuideTemplate(this.maneuverGuideName || 'Guía sin nombre');
        this.maneuverGuideId = response.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveManeuverGuideFields() {
    const maneuverGuideData: ManeuverGuideFields = {
      plantillaGuiaManiobraId: this.maneuverGuideId,
      nombre: this.data.maneuverGuideName,
      descripcion: this.data.maneuverGuideDescription,
      equipamientoId: this.currentEquipmentId,
    };
    if (this.isCreate) {
      await this.generalService.createManeuverGuideFields(maneuverGuideData);
    } else if (this.isEdit) {
      await this.generalService.editManeuverGuideFields(this.data.id, maneuverGuideData);
    }
  }

  async saveTemplate() {
    try {
      await this.saveManeuverGuideName();
      this.onSave.emit({
        nombre: this.maneuverGuideName,
        indexEdited: this.maneuverGuideId,
      });
    } catch (e) {

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fullData && changes.fullData.currentValue) {
      // this.tableData = data.full.tableData;
      this.maneuverGuideName = this.fullData.nombre;
      this.maneuverGuideId = this.fullData.id;
    }
  }
}
