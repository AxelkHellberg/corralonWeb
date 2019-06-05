import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-maneuver-guide-template',
  templateUrl: './maneuver-guide-template.component.html',
  styleUrls: ['./maneuver-guide-template.component.scss']
})
export class ManeuverGuideTemplateComponent implements OnInit {
  showNewTemplate: boolean;
  data = [
    {
      id: 1,
      maneuverGuide: 'Nombreeee',
      indexEdited: 0,
      full: {
        tableData: [
          { plant: 'Planta B', system: 'System B1', maneuverGuide: 'Nombre 1' },
          { plant: 'Planta A', system: 'System A2', maneuverGuide: 'Nombre 2' }
        ],
      },
    },
  ];

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
      id: {
        title: 'ID',
        type: 'text',
        width: '150px'
      },
      maneuverGuide: {
        title: 'Guía de Maniobra',
        type: 'text',
        width: '300px'
      }
    }
  };
  fullData: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || queryParam.edit) {
        this.showNewTemplate = true;
      } else {
        this.showNewTemplate = false;
      }
    });
  }

  ngOnInit() {}

  createTemplate(row) {
    this.router.navigate(['pages/maneuver-guide-template'], {
      queryParams: {
        create: true
      }
    });
  }
  editTemplate(data) {
    this.fullData = data;
    this.router.navigate(['pages/maneuver-guide-template'], {
      queryParams: {
        edit: true
      }
    });
  }

  deleteTemplate(row) {
    delete this.data[row.index];
    this.data = [...this.data];
  }

  getTemplate(data) {
    if (data.indexEdited != null) {
      this.data[data.indexEdited] = { ...this.data[data.indexEdited], ...data };
      this.data = [...this.data];
    } else {
      const template = {
        id: this.data.length + 1,
        ...data
      };
      this.data = [...this.data, ...[template]];
    }
    this.router.navigate(['pages/maneuver-guide-template']);
  }
}
