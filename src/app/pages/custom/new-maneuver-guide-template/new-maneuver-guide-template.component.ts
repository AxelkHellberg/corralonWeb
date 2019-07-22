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
  plantSelected: string;
  systemSelected: string;
  isCreate: boolean;
  isEdit: boolean;
  enableManeuverGuide: boolean;

  enableSaveButton: boolean;

  maneuverGuideTitle: string;
  maneuverGuideDescription: string;
  currentIndex: number;
  maneuverGuideId: number;
  currentPlantId: number;
  currentSystemId: number;

  constructor(private dialogService: NbDialogService, private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getPlants();
      this.plants = response.items;
      console.log(this.plants);
    } catch (error) { }

    try {
      const response = await this.generalService.getSystems();
      this.systems = response.items;
      console.log(this.systems);
    } catch (error) { }

    try {
      const response = await this.generalService.getManeuverGuideFieldsWithPlants(this.maneuverGuideId);
      console.log(response)
      this.tableData = response.map(res => ({
        id: res.id,
        plant: res.sistema.planta.nombre,
        plantaId: res.sistema.planta.plantaId,
        system: res.sistema.nombre,
        sistemaId: res.sistema.sistemaId,
        maneuverGuideName: res.nombre,
        maneuverGuideDescription: res.descripcion,
      }))
    } catch (error) {

    }
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
    this.plantSelected = '';
    this.systemSelected = '';
    this.maneuverGuideTitle = '';
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  async editTemplate(row) {
    this.isEdit = true;
    this.isCreate = false;
    this.enableManeuverGuide = true;
    this.enableSaveButton = true;
    this.enableSystem = true;
    this.selectOnEdit(row.data, row.index);
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
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
    this.data.plant = plant.nombre;
    this.enableManeuverGuide = false;
    this.enableSaveButton = false;
    this.maneuverGuideTitle = '';
    this.currentPlantId = plant.id;
    // this.system.selected = this.selectFirstItem(this.system, 'plant', this.data.plant);
  }
  selectSystem(item) {
    this.enableManeuverGuide = true;
    this.data.system = item.nombre;
    this.currentSystemId = item.id;
  }

  selectManeuverGuide(event: any) {
    this.enableSaveButton = !!event.data;
  }

  // selectFirstItem(data, filterProperty, filterValue) {
  //   const filteredData = data.selectItems.find(
  //     item => item[filterProperty] === filterValue
  //   );
  //   return filteredData.value;
  // }

  selectOnEdit(data: any, index: number) {
    this.data = data;
    this.plantSelected = data.plantaId;
    this.systemSelected = data.sistemaId;
    this.data.maneuverGuide = this.data.maneuverGuide;
  }

  async saveChanges(dialog: NbDialogRef<any>) {
    this.enableManeuverGuide = false;
    this.enableSystem = false;
    this.enableSaveButton = false;
    if (this.isCreate) {
      this.tableData = [...this.tableData, ...[this.data]];
    } else if (this.isEdit) {
      this.tableData[this.currentIndex] = this.data;
      this.tableData = [...this.tableData];
    }
    try {
      await this.saveManeuverGuideName();
    } catch (error) { }

    try {
      await this.saveManeuverGuideFields();
      dialog.close();
    } catch (error) { }
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
      sistemaId: this.currentSystemId,
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
