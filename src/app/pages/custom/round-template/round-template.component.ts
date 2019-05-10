import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-round-template',
  templateUrl: './round-template.component.html',
  styleUrls: ['./round-template.component.scss']
})
export class RoundTemplateComponent implements OnInit {

  data = [
    {
      id: 1,
      roundName: 'Plantilla 1',
      time: '15:00 - 17:00 - 20:00',
    },
    {
      id: 2,
      roundName: 'Plantilla 2',
      time: '22:00 - 02:00 - 04:00',
    },
  ]

  settings = {
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
      roundName: {
        title: 'Nombre de Ronda',
        type: 'text',
        width: '200px',
      },
      time: {
        title: 'Horario',
        type: 'text',
        width: '300px',
      },
    }
  };

  constructor() { }

  ngOnInit() {
  }
}
