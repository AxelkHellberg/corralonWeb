import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-round-template',
  templateUrl: './round-template.component.html',
  styleUrls: ['./round-template.component.scss']
})
export class RoundTemplateComponent implements OnInit {
  fullData: any;
  data = [
    {
      id: 1,
      roundName: 'Plantilla 1',
      time: '9:00 - 12:20',
      indexEdited: 1,
      full: {
        tableData: [
          {
            plant: 'Planta A',
            system: 'System A2',
            equipment: 'Equipment A20',
            component: 'Component A20',
            timer: {},
            time: '',
          },
          {
            plant: 'Planta B',
            system: 'System B1',
            equipment: 'Equipment B10',
            component: 'Component B10',
            timer: {},
            time: '',
          },
        ],
        timeData: { timer: {}, time: '9:00 - 12:20' },
        tableTimeData: [{ hour: '9', minute: '00' }, { hour: '12', minute: '20' }],
        templateConfig: { systemMandatory: true, equipmentFunctionality: true },
      }
    },
    {
      id: 2,
      roundName: 'Plantilla 2',
      time: '9:00',
      indexEdited: 2,
      full: {
        tableData: [
          {
            plant: 'Planta A',
            system: 'System A2',
            equipment: 'Equipment A20',
            component: 'Component A20',
            timer: {},
            time: '',
          },
          {
            plant: 'Planta B',
            system: 'System B1',
            equipment: 'Equipment B10',
            component: 'Component B10',
            timer: {},
            time: '',
          },
        ],
        timeData: { timer: {}, time: '9:00' },
        tableTimeData: [{ hour: '9', minute: '00' }],
        templateConfig: { systemMandatory: true, equipmentFunctionality: true },
      }
    }
  ];

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
      id: {
        title: 'ID',
        type: 'text',
        width: '150px'
      },
      roundName: {
        title: 'Nombre de Ronda',
        type: 'text',
        width: '200px'
      },
      time: {
        title: 'Horario',
        type: 'text',
        width: '300px'
      }
    }
  };
  showRoundTemplate: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || queryParam.edit) {
        this.showRoundTemplate = true;
      } else {
        this.showRoundTemplate = false;
      }
    });
  }

  ngOnInit() {}

  createTemplate() {
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        create: true,
      }
    });
  }

  editTemplate(data) {
    this.fullData = data;
    this.router.navigate(['/pages/round-template'], {
      queryParams: {
        edit: true,
      }
    });
  }

  deleteTemplate(row) {
    delete this.data[row.index];
    this.data = [...this.data];
  }

  onSaveData(data) {
    if (data.indexEdited != null) {
      this.data[data.indexEdited] = data;
      this.data = [...this.data];
    } else {
      data = {
        ...data,
        id: this.data.length + 1
      };
      this.data = [...this.data, ...[data]];
    }
  }
}
