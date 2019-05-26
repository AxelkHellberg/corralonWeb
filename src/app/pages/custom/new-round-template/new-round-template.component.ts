import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-new-round-template',
  templateUrl: './new-round-template.component.html',
  styleUrls: ['./new-round-template.component.scss']
})
export class NewRoundTemplateComponent implements OnInit {
  @ViewChild('addOrEdit') addOrEditTemplate: TemplateRef<any>;
  maneuverGuideName: string;
  selectedPlant: string;
  selectedSystem: string;
  selectedEquipment: string;
  data = {
    plant: '',
    system: '',
    equipment: '',
    component: '',
    time: new Set(),
    timer: '',
  };
  tableData = [];
  timeData = [];
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
      timer: {
        title: 'Horario',
        type: 'text',
        width: '300px',
      }
    }
  };
  timeSetting = {
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
        valuePrepareFunction: (cell, row) => {
          const getNumber = cell.replace(/\D/g, '');
          const validate = getNumber > 12 ? 12 : getNumber;
          // this.selectTime(row);
          return validate;
        }
      },
      minute: {
        title: 'Minuto',
        type: 'text',
        width: '50px',
        valuePrepareFunction: (value, row) => {
          const getNumber = value.replace(/\D/g, '');
          const validate = getNumber > 59 ? 59 : getNumber;
          return validate;
        }
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
        equipment: 'Equipment A11',
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
  currentIndex: any;
  constructor(private route: ActivatedRoute, private router: Router, private dialogService: NbDialogService) {}

  ngOnInit() {}

  createTemplate() {
    this.isEditorCreate = true;
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Añadir Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  editTemplate(data) {
    console.log(data)
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
    this.dialogService.open(this.addOrEditTemplate, {
      context: 'Editar Elemento',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  deleteTemplate(data) {
    delete this.tableData[data.index];
    this.tableData = [...this.tableData];
  }

  selectPlant(item) {
    this.enableSystem = true;
    this.data.plant = item.text;
    this.enableEquipment = false;
    this.enableSaveButton = false;
    this.maneuverGuideContent = '';
    // this.system.selected = this.selectFirstItem(this.system, 'plant', item.text);
  }
  selectSystem(item) {
    this.enableEquipment = true;
    this.data.system = item.text;
    this.enableSaveButton = false;
    // this.equipment.selected = this.selectFirstItem(this.equipment, 'system', item.text)
  }

  selectEquipment(item) {
    this.enableComponent = true;
    this.data.equipment = item.text;
    this.enableSaveButton = false;
    // this.equipment.selected = this.selectFirstItem(this.component, 'equipment', item.text);
  }

  selectComponent(item) {
    this.enableSaveButton = true;
    this.data.component = item.text;
  }

  selectTime(data: any, action?: string) {
    data.confirm.resolve();
    let _data = data.data;
    let _newData = data.newData;
    if (action === 'delete') {
      const deleteIndex = this.timeData.indexOf(_data);
      this.timeData.splice(deleteIndex, 1);
    }
    setTimeout(() => {
      this.data.time = new Set();
      for (let i = 0; i < this.timeData.length; i++) {
        this.timeData[i].hour = this.timeData[i].hour.replace(/\D/g, '') > 12 ? '12' :
          this.timeData[i].hour.replace(/\D/g, '');
        this.timeData[i].minute = this.timeData[i].minute.replace(/\D/g, '') > 59 ? '59' :
          this.timeData[i].minute.replace(/\D/g, '');
        this.data.time.add(`${this.timeData[i].hour}:${this.timeData[i].minute}`);
      }
      this.data.timer = Array.from(this.data.time).join(' - ');
      console.log(data, this.timeData, this.data.time, this.data.timer);
    }, 200);
  }

  selectFirstItem(data, filterProperty, filterValue) {
    const filteredData = data.selectItems.find(item => item[filterProperty] === filterValue);
    return filteredData.value;
  }

  saveChanges(dialog: NbDialogRef<any>) {
    this.disableAll();
    if (this.currentIndex != null) {
      this.tableData[this.currentIndex] = this.data;
      this.tableData = [...this.tableData];
      this.currentIndex = null;
    } else {
      this.tableData = [...this.tableData, ...[this.data]];
    }
    this.currentIndex = null;
    this.timeData = [];
    this.data = {
      plant: '',
      system: '',
      equipment: '',
      component: '',
      time: new Set(),
      timer: '',
    }
    dialog.close();
  }

  discardChanges(dialog: NbDialogRef<any>) {
    this.disableAll();
    this.timeData = [];
    this.data = {
      plant: '',
      system: '',
      equipment: '',
      component: '',
      time: new Set(),
      timer: '',
    }
    dialog.close();
  }

  disableAll() {
    this.enableEquipment = false;
    this.enableSystem = false;
    this.enableComponent = false;
    this.enableSaveButton = false;
  }

}
