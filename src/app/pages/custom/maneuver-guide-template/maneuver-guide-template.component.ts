import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      maneuverGuide: 'Plantilla 1',
    },
    {
      id: 2,
      maneuverGuide: 'Plantilla 2',
    },
  ]

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
      id: {
        title: 'ID',
        type: 'text',
        width: '150px',
      },
      maneuverGuide: {
        title: 'Guía de Maniobra',
        type: 'text',
        width: '300px',
      },
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.create) {
        this.showNewTemplate = true;
      } else {
        this.showNewTemplate = false;
      }
    })
  }

  ngOnInit() {
  }

  createTemplate(event) {
    this.router.navigate(['pages/maneuver-guide-template'], {
      queryParams: {
        create: true,
      },
    });
  }

}
