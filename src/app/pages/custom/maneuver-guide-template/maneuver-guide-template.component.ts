import { ConfirmData } from './../../../@models/smart-table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableSettings } from '../../../@models/smart-table';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-maneuver-guide-template',
  templateUrl: './maneuver-guide-template.component.html',
  styleUrls: ['./maneuver-guide-template.component.scss']
})
export class ManeuverGuideTemplateComponent implements OnInit {
  showNewTemplate: boolean;
  data = [
    // {
    //   id: 1,
    //   nombre: 'Nombreeee',
    //   indexEdited: 0,
    //   full: {
    //     tableData: [
    //       { plant: 'Planta B', system: 'System B1', maneuverGuide: 'Nombre 1' },
    //       { plant: 'Planta A', system: 'System A2', maneuverGuide: 'Nombre 2' }
    //     ],
    //   },
    // },
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
      // id: {
      //   title: 'ID',
      //   type: 'text',
      //   width: '150px'
      // },
      nombre: {
        title: 'Guía de Maniobra',
        type: 'text',
        width: '300px'
      }
    }
  };
  fullData: any;

  constructor(private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create || (queryParam.id && queryParam.nombre)) {
        this.showNewTemplate = true;
        this.fullData = { id: queryParam.id, nombre: queryParam.nombre };
      } else {
        this.showNewTemplate = false;
      }
    });
  }

  ngOnInit() {
    this.getManeuverGuideTemplates();
  }

  async getManeuverGuideTemplates() {
    try {
      const data = await this.generalService.getManeuverGuideTemplates();
      this.data = data.items;
    } catch (e) {

    }
  }

  createTemplate(row) {
    this.router.navigate(['pages/maneuver-guide-template'], {
      queryParams: {
        create: true
      }
    });
  }
  editTemplate({data}) {
    this.fullData = data;
    this.router.navigate(['pages/maneuver-guide-template'], {
      queryParams: {
        id: data.id,
        nombre: data.nombre,
      }
    });
  }

  async deleteTemplate(data: ConfirmData) {
    try {
      const response = await this.generalService.deleteManeuverGuideTemplate(data.data.id);
      console.log(response)
      data.confirm.resolve();
    } catch (e) {
      console.log(e)
      data.confirm.reject();
    }
  }

  getTemplate(data) {
    this.getManeuverGuideTemplates();
    this.router.navigate(['pages/maneuver-guide-template']);
  }
}
