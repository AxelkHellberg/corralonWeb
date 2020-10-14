import { Component, OnInit } from '@angular/core';
import { SmartTableSettings, ConfirmData } from '../../../@models/smart-table';

@Component({
  selector: 'ngx-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
  data: any[];
  Nueva= false;
  settings: SmartTableSettings = {
    attr: {
      class: 'general-table',
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
    
      Tarea: {
        title: 'Tarea',
        type: 'text',
        width: '200px',
      },
      

    }
  };
  prueba(){console.log("hola");
this.Nueva=true;}
  constructor() { }

  ngOnInit() {
  }

}
