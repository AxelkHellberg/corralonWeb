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
  users: any;

  constructor(private dialogService: NbDialogService, private generalService: GeneralService) { }

  async ngOnInit() {
    try {
      const response = await this.generalService.getStatusFailures();
      this.statusList = response.items;
    } catch (error) {

    }

    try {
      const response = await this.generalService.getUser();
      this.users = response.items;
      console.log(this.users);
    } catch (error) {

    }
    this.data = { ...this.data, operator: this.findUser() };
    console.log(this.data)
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
  findUser() {
    let user: string;
    const { valoresCamposRonda, valoresCamposManiobras, fallasSistema, fallasEquipamiento } = this.data;
    if (valoresCamposRonda.length) {
      const { userId } = this.data.valoresCamposRonda[0].ronda;
      const { name, lastName } = this.users.find(_user => _user.id === userId);
      user = `${name} ${lastName}`;
    }

    if (valoresCamposManiobras.length) {
      const { userId } = this.data.valoresCamposManiobras[0].guiaManiobra.userId;
      const { name, lastName } = this.users.find(_user => _user.id === userId);
      user = `${name} ${lastName}`;
    }

    if (fallasSistema) {

    }

    if (fallasEquipamiento) {

    }
    return user;
  }

  close() {
    this.onClose.emit(this.data);
  }

}
