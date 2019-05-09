import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  data = [
    {
      id: 1,
      profileType: 'Administrador',
    },
    {
      id: 2,
      profileType: 'Operador',
    },
    {
      id: 3,
      profileType: 'Jefe de turno',
    },
    {
      id: 4,
      profileType: 'Jefe de operaciones',
    },
    {
      id: 5,
      profileType: 'Supervisor de mantenimiento',
    },
    {
      id: 6,
      profileType: 'Jefe de mantenimiento',
    },
    {
      id: 7,
      profileType: 'Técnico de mantenimiento',
    },
    {
      id: 8,
      profileType: 'Jefe de Planta',
    },
  ];
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
        width: '200px',
      },
      profileType: {
        title: 'Tipo de perfil',
        type: 'text',
        width: '230px',
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
