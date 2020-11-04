import { ChangeDetectorRef, Component,  OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  NbDialogService } from '@nebular/theme';

import { GeneralService } from '../../../services/general.service';




@Component({
  selector: 'ngx-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  date = new Date;

  selectedDia = [];
  selectedRecurrencia = [];
  horaInicio: any;
  horaFin: any;
  hora: any = {
    dias: String,
    tiporRecurrencia: Number,
    horaInicio: String,
    horaFin: String,
    fechaInicio: String,
    fechaFin: String,
    plantillaId: Number,
  }




  constructor(private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private changeDetectorRef: ChangeDetectorRef,) {
    
  }

  async ngOnInit() {
    this.getAllData();
    this.selectDate(new Date());
    const res = await this.generalService.getHorarios();
    this.horariosArray = res.items;
    console.log("Horarios");
    console.log(this.horariosArray);
  
  }
  



  agregarDia() {
    console.log("funcionanado");
    console.log(this.selectedDia);
  }

  agregarRecurrencia() {
    console.log("funcionanado");
    console.log(this.selectedRecurrencia);
  }

  selectTimeInicio(): void {
    console.log(this.horaInicio)
    let moment = require("moment");
    let horaInicio = moment(this.horaInicio.hour, 'HH').format('HH');
    let minInicio = moment(this.horaInicio.minute, 'MM').format('MM');
    this.hora = {
      ...this.hora,
      horaInicio: horaInicio.toString(10) + ":" + minInicio.toString(10),


    }
    console.log(this.hora);
  }

  selectTimeFin(): void {

    console.log(this.horaFin);
    let moment = require("moment");
    let horaFin = moment(this.horaFin.hour, 'HH').format('HH');
    let minFin = moment(this.horaFin.minute, 'MM').format('MM');
    this.hora = {
      ...this.hora,
      horaFin: horaFin.toString(10) + ":" + minFin.toString(10),


    }
    console.log(this.hora);
  }
  ronda : any;
selectRonda(item : any){
  console.log("selectRonda");
  console.log(item);
  this.ronda= item.id;
}



  dia = "";
  generarHorario() {
     this.selectTimeInicio();
     this.selectTimeFin();
     let dias = "";
     this.selectedDia.forEach(dia => { dias = dias == "" ? (dias.concat(dia)) : (dias.concat(",").concat(dia)) })
     this.hora = {
           ...this.hora,
           dias: dias,
           tipoRecurrencia: this.selectedRecurrencia,
           fechaInicio: this.dia,
           fechaFin: this.dia,
           plantillaId: this.ronda,
         }
    
    console.log(this.hora);
    this.generalService.createHorario(this.hora);
  }
  rondaArray: any[];
  horariosArray: any[];
  async getAllData() {
    Promise.all([
      this.generalService.getRondas(),
      

    ]).then(([ronda, horarios,]) => {

      this.rondaArray = ronda.items;
      console.log("RondaArray");
      console.log(this.rondaArray);
     
  
    }).catch(() => { });

  }
 
  selectDate(fecha: Date) {
    console.log("fecha: ");
    this.dia= fecha.getFullYear().toString()+"-"+((fecha.getMonth()<10)?("0"+fecha.getMonth().toString()):fecha.getMonth().toString())+"-"+((fecha.getDay()<10)?("0"+fecha.getDay().toString()):fecha.getDay().toString())+":00:00.00";
    console.log(this.dia);
  }

}


