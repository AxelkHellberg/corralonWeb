import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SmartTableSettings } from '../../../@models/smart-table';

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
   await this.getAllData();
    //this.selectDate(new Date());
    //this.filtrarFechas(new Date());
    


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
  ronda: any;
  selectRonda(item: any) {
    console.log("selectRonda");
    console.log(item);
    this.ronda = item.id;
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
      this.generalService.getHorarios(),


    ]).then(([ronda, horarios,]) => {
      this.horariosArray = horarios.items;
      console.log("horariosArray");
      console.log(this.horariosArray);
      this.rondaArray = ronda.items;
      console.log("RondaArray");
      console.log(this.rondaArray);
      let cont = 0;
      this.horariosArray.forEach(hora => {
  
        this.rondaArray.forEach(ronda => {
          if (hora.plantillaId == ronda.id) {
            console.log("ronda = hora");
            this.horariosArray[cont] = {
              ...this.horariosArray[cont],
              nombreRonda: ronda.nombre
            }
          }
  
        });
        cont += 1;
      });


    }).catch(() => { });
   

  }

  selectDate(fecha: Date) {
    console.log("fecha: ");
    this.dia = this.formatoFecha(fecha);
    console.log(this.dia);
  }


  formatoFecha(fecha: Date): any {

    return fecha.getFullYear().toString() + "-" + ((fecha.getMonth() < 10) ? ("0" + fecha.getMonth().toString()) : fecha.getMonth().toString()) + "-" + ((fecha.getDate() < 10) ? ("0" + fecha.getDate().toString()) : fecha.getDate().toString()) + "T" + ":00:00:00.000Z";

  }

  settings: SmartTableSettings = {
    noDataMessage: '',
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
      nombreRonda: {
        title: 'Ronda',
        type: 'text',
        width: '300px'
      },
      horaInicio: {
        title: 'Hora Inicio',
        type: 'text',
        width: '300px'
      },
      horaFin: {
        title: 'Hora Fin',
        type: 'text',
        width: '300px'
      },
    }
  };


  horariosFiltrados: any[];
  filtrarFechas(date: any) {
    console.log(date);
    if (date) {
      this.horariosFiltrados = this.horariosArray;
    } else {
      let fecha = this.formatoFecha(date);

      this.horariosArray.forEach(horario => {
        if (horario.fechaInicio == fecha) {
          this.horariosFiltrados = this.horariosFiltrados.concat(horario);
        }
      });
    }
  }



}


