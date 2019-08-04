import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'ngx-failure-detail',
  templateUrl: './failure-detail.component.html',
  styleUrls: ['./failure-detail.component.scss']
})
export class FailureDetailComponent implements OnInit {
  @Input() data: any;
  @Output() onClose = new EventEmitter<void>();
  statusList: any;
  @ViewChild('changestatus') changeStatusTemplate: TemplateRef<any>;

  constructor(private dialogService: NbDialogService, private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getStatusFailures();
      this.statusList = response.items;
      console.log(response, this.statusList);
    } catch (error) {

    }
  }

  async changeStatus(status: any) {
    this.dialogService.open(this.changeStatusTemplate);
    this.data.estadoFallaNombre = status.nombre;
    const data = {
      descripcion: this.data.descripcion,
      estadoFallaId: status.id,
      tipoFallaId: this.data.tipoFallaId,
    };
    console.log(data);
    try {
      const response = await this.generalService.editNotificationsFailures(this.data.id, data);
      console.log(response);
    } catch (error) {

    }
  }
  findUser(data) {
    if (data) {
      const name = data.valoresCamposManiobras.length ?
                   data.valoresCamposManiobras[0].guiaManiobra.user.name : '';
      const lastName = data.valoresCamposManiobras.length ?
                       data.valoresCamposManiobras[0].guiaManiobra.user.lastName : '';
      return `${name} ${lastName}`;
    }
  }

  close() {
    this.onClose.emit(this.data);
  }

}
