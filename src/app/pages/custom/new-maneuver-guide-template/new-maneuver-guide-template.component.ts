import { ManeuverGuideData, PlantData, SystemData } from './../../../@models/general';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-new-maneuver-guide-template',
  templateUrl: './new-maneuver-guide-template.component.html',
  styleUrls: ['./new-maneuver-guide-template.component.scss']
})
export class NewManeuverGuideTemplateComponent implements OnInit, OnChanges {
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
        width: '300px'
      },
      system: {
        title: 'Sistema',
        type: 'text',
        width: '300px'
      },
      maneuverGuide: {
        title: 'Guía de Maniobra',
        type: 'text',
        width: '300px'
      }
    }
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
        text: 'System A',
        value: '1',
        plant: 'Planta A'
      },
      {
        text: 'System A2',
        value: '2',
        plant: 'Planta A'
      },
      {
        text: 'System B1',
        value: '3',
        plant: 'Planta B'
      },
      {
        text: 'System B2',
        value: '4',
        plant: 'Planta B'
      }
    ],
    placeholder: 'Sistema'
  };
  isCreate: boolean;
  isEdit: boolean;
  enableManeuverGuide: boolean;

  enableSaveButton: boolean;

  maneuverGuideContent: string;
  currentIndex: number;
  templateIndex: number;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {}

  async ngOnInit() {
    try {
      const response = await this.generalService.getPlants();
      this.plants = response.items;
    } catch (error) { }

    try {
      const response = await this.generalService.getSystems();
      this.systems = response.items;
    } catch (error) { }
  }

  createTemplate() {
    this.isCreate = true;
    this.data = {
      plant: '',
      system: '',
      maneuverGuide: '',
    };
    this.plant.selected = '';
    this.system.selected = '';
    this.maneuverGuideContent = '';
  }

  editTemplate(row) {
    this.isEdit = true;
    this.enableManeuverGuide = true;
    this.enableSaveButton = true;
    this.enableSystem = true;
    this.selectOnEdit(row.data, row.index);
  }

  deleteTemplate(row) {
    delete this.tableData[row.index];
    this.tableData = [...this.tableData];
  }

  selectPlant(item) {
    this.enableSystem = true;
    this.data.plant = item.text;
    this.enableManeuverGuide = false;
    this.enableSaveButton = false;
    this.maneuverGuideContent = '';
    this.system.selected = this.selectFirstItem(this.system, 'plant', this.data.plant);
  }
  selectSystem(item) {
    this.enableManeuverGuide = true;
    this.data.system = item.text;
  }

  selectManeuverGuide(event: any) {
    this.enableSaveButton = !!event.data;
  }

  selectFirstItem(data, filterProperty, filterValue) {
    const filteredData = data.selectItems.find(
      item => item[filterProperty] === filterValue
    );
    return filteredData.value;
  }

  selectOnEdit(data: any, index: number) {
    this.data = data;
    this.currentIndex = index;
    this.plant.selected = this.selectFirstItem(this.plant, 'text', this.data.plant);
    this.system.selected = this.selectFirstItem(this.system, 'text', this.data.system);
    this.data.maneuverGuide = this.data.maneuverGuide;
  }

  async saveChanges() {
    this.enableManeuverGuide = false;
    this.enableSystem = false;
    this.enableSaveButton = false;
    if (this.isCreate) {
      this.tableData = [...this.tableData, ...[this.data]];
    } else if (this.isEdit) {
      this.tableData[this.currentIndex] = this.data;
      this.tableData = [...this.tableData];
    }
    this.isCreate = false;
    this.isEdit = false;
    try {
      await this.saveManeuverGuideName();
    } catch (error) { }

    try {
      const maneuverGuideData: ManeuverGuideData = {
        userId: 1,
        plantillaGuiaManiobraId: 2,
        nombre: this.data.maneuverGuide,
      };
      await this.generalService.createManeuverGuide(maneuverGuideData);
    } catch (error) {
      console.log(error);
    }
  }

  async saveManeuverGuideName() {
    try {
      if (this.templateIndex) {
        await this.generalService.editManeuverGuideTemplate(this.templateIndex, this.maneuverGuideName);
      } else {
        await this.generalService.createManeuverGuideTemplate(this.maneuverGuideName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveTemplate() {
    try {
      await this.saveManeuverGuideName();
      this.onSave.emit({
        nombre: this.maneuverGuideName,
        indexEdited: this.templateIndex,
      });
    } catch (e) {

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fullData && changes.fullData.currentValue) {
      // this.tableData = data.full.tableData;
      this.maneuverGuideName = this.fullData.nombre;
      this.templateIndex = this.fullData.id;
    }
  }
}
