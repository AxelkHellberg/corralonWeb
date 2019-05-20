import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-new-maneuver-guide-template',
  templateUrl: './new-maneuver-guide-template.component.html',
  styleUrls: ['./new-maneuver-guide-template.component.scss']
})
export class NewManeuverGuideTemplateComponent implements OnInit {
  enableSystem: boolean;
  selectedPlant: string;

  data = [];

  settings = {
    mode: 'external',
    attr: {
      class: 'general-table',
    },
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
      maneuverGuide: {
        title: 'Guía de Maniobra',
        type: 'text',
        width: '300px',
      },
    },
  };
  plant = {
    selected: '1',
    selectItems: [
      {
        text: 'Planta A',
        value: '1',
      },
      {
        text: 'Planta B',
        value: '2',
      },
    ],
    placeholder: '',
  };
  system = {
    selected: '',
    selectItems: [
      {
        text: 'System A',
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
      },
    ],
    placeholder: 'Sistema',
  };
  isEditorCreate: boolean;
  enableManeuverGuide: boolean;

  enableSaveButton: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  createTemplate() {
    this.isEditorCreate = true;
  }

  selectPlant(item) {
    this.enableSystem = true;
    this.selectedPlant = item.text;
    this.system.selected = this.selectFirstItem(this.system, 'plant');
  }
  selectSystem() {
    this.enableManeuverGuide = true;
  }

  selectManeuverGuide(event: any) {
    this.enableSaveButton = !!event.data;
  }

  selectFirstItem(data, filterProperty) {
    const filteredData = data.selectItems.find(item => item[filterProperty] === this.selectedPlant);
    return filteredData.value;
  }

  saveChanges() {
    this.enableManeuverGuide = false;
    this.enableSystem = false;
    this.enableSaveButton = false;
    this.isEditorCreate = false;
  }
}
