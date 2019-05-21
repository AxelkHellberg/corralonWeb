import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-new-round-template',
  templateUrl: './new-round-template.component.html',
  styleUrls: ['./new-round-template.component.scss']
})
export class NewRoundTemplateComponent implements OnInit {
  maneuverGuideName: string;
  selectedPlant: string;
  selectedSystem: string;
  selectedEquipment: string;
  data = [];
  settings = {
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
        title: 'Componente',
        type: 'text',
        width: '300px',
      },
    }
  };
  plant = {
    selected: '1',
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
    placeholder: ''
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
  component = {
    selected: '',
    selectItems: [
      {
        text: 'Component A10',
        value: '1',
        equipment: 'Equipment A10',
      },
      {
        text: 'Component A11',
        value: '2',
        equipment: 'Equipment A10',
      },
      {
        text: 'Component A20',
        value: '3',
        equipment: 'Equipment A20',
      },
      {
        text: 'Component A21',
        value: '4',
        equipment: 'Equipment A21',
      },
      {
        text: 'Component B10',
        value: '5',
        equipment: 'Equipment B10',
      },
      {
        text: 'Component B11',
        value: '6',
        equipment: 'Equipment B11',
      },
      {
        text: 'Component B20',
        value: '7',
        equipment: 'Equipment B20',
      },
      {
        text: 'Component B21',
        value: '8',
        equipment: 'Equipment B21',
      },
    ],
    placeholder: 'Componente',
  };
  isEditorCreate: boolean;
  enableSystem: boolean;
  enableEquipment: boolean;
  enableComponent: boolean;
  enableSaveButton: boolean;
  maneuverGuideContent: string;
  timeStart: string;
  timeEnd: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  createTemplate() {
    this.isEditorCreate = true;
  }

  selectPlant(item) {
    this.enableSystem = true;
    this.selectedPlant = item.text;
    this.enableEquipment = false;
    this.enableSaveButton = false;
    this.maneuverGuideContent = '';
    this.system.selected = this.selectFirstItem(this.system, 'plant', item.text);
  }
  selectSystem(item) {
    this.enableEquipment = true;
    this.selectedSystem = item.text;
    this.enableSaveButton = false;
    this.equipment.selected = this.selectFirstItem(this.equipment, 'system', item.text)
  }

  selectEquipment(item) {
    this.enableComponent = true;
    this.selectedEquipment = item.text;
    this.enableSaveButton = false;
    this.equipment.selected = this.selectFirstItem(this.component, 'equipment', item.text);
  }

  selectComponent(item) {
    this.enableSaveButton = true;
  }

  selectManeuverGuide(event: any) {
    this.enableSaveButton = !!event.data;
  }

  selectFirstItem(data, filterProperty, filterValue) {
    const filteredData = data.selectItems.find(item => item[filterProperty] === filterValue);
    return filteredData.value;
  }

  saveChanges() {
    this.enableEquipment = false;
    this.enableSystem = false;
    this.enableSaveButton = false;
    this.isEditorCreate = false;
  }

}
