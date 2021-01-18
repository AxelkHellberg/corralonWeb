import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { event } from 'jquery';
import { SmartTableSettings } from '../../../@models/smart-table';

import { GeneralService } from '../../../services/general.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';



@Component({
  selector: 'ngx-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  date = new Date;

  selectedDia = null;
  selectedRecurrencia = null;
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
      
    }
    
    
    botonApretado = null; 
    pulsar() {
      console.log("Se apreto el boton")
      this.botonApretado = 1;
    }
    
    agregarDia() {
    this.selectedDia = this.selectedDia? this.selectedDia:[];
    console.log("funcionanado");
    console.log(this.selectedDia);

  }

  recurrencia : any;
  agregarRecurrencia() {
    console.log(this.selectedRecurrencia)
    this.selectedRecurrencia = this.selectedRecurrencia? this.selectedRecurrencia: undefined;
    console.log("funcionanado");
    console.log(this.selectedRecurrencia);
    
  }
/////////////////////////////////////////////////////////////////////////////
  selectTimeInicio(): void {
    console.log(this.horaInicio)
    let moment = require("moment");
    let horaInicio = moment(this.horaInicio.hour, 'HH').format('HH');
    let minInicio = this.horaInicio.minute
    this.hora = {
      ...this.hora,
      horaInicio: horaInicio.toString(10) + ":" + ( (minInicio<10)? "0" + minInicio.toString(10): minInicio.toString(10)),


    }
    console.log("HORA INICIO: ")
    console.log(this.hora);
  }

  selectTimeFin(): void {

    console.log(this.horaFin);
    let moment = require("moment");
    let horaFin = moment(this.horaFin.hour, 'HH').format('HH');
    let minFin = this.horaFin.minute
    this.hora = {
      ...this.hora,
      horaFin: horaFin.toString(10) + ":" + ( (minFin<10)? "0" + minFin.toString(10): minFin.toString(10)),


    }
    console.log("HORA FIN: ")
    console.log(this.hora);
  }
  ronda: any;
  selectRonda(item: any) {
    console.log("selectRonda");
    console.log(item.data);
    this.ronda = item.data.id;
  }

  onClose(){
    this.cerrarAlerta = 2;
  }

  dia = "";
  hayDiaSeleccionado = "";
  async generarHorario() {
    this.selectTimeInicio();
    this.selectTimeFin();
    let dias = "";
    this.selectedDia.forEach(dia => { dias = dias == "" ? (dias.concat(dia)) : (dias.concat(",").concat(dia)) })
    ///  dd-mm-aaaa
    let d = this.dia.substring(0,2); 
    let m = this.dia.substring(3,5); 
    let a = this.dia.substring(6,10); 
    let auxDia = this.dia;
    this.dia = a +"-"+ m +"-"+ d;
    console.log(this.dia)

    this.hora = {
      ...this.hora,
      dias: dias,
      tipoRecurrencia: this.selectedRecurrencia,
      fechaInicio: this.dia,
      fechaFin: this.dia,
      plantillaId: this.ronda,
    }

    console.log(this.hora);
    console.log("horarioId");
    const response = await this.generalService.createHorario(this.hora);
    console.log("ID DEL HORARIO CREADO: ")
    console.log(response.id);
    const horaioId = response.id;
    const pueba = await this.generalService.createHorariosUsuarios(horaioId, this.Usuario);
     this.generalService.createRoundNuevo(this.hora.plantillaId, this.Usuario.id);
     let asd:any = this.generalService.ultimaRondaInsertada()
    console.log("RESSSSSSSSS")
    console.log(asd)
   // this.generalService.asignarTareas(this.hora.plantillaId,)
    console.log("NO SE QUE ME MOSTRARA ESTO: ")
    console.log(pueba)
    this.botonApretado = 0;
    this.cerrarAlerta = 0;
    this.mostrarTodos()
  }
  cerrarAlerta: any;
  rondaArray: any[];
  horariosArray: any[];
  usuariosArray: any[];
  HoraiosUsuariosArray: any[];
  
  async getAllData() {
    Promise.all([
      this.generalService.getRondas(),
      this.generalService.getHorarios(),
      this.generalService.getUser(),
      this.generalService.getHorariosUsuaruios(),

    ]).then(([ronda, horarios, usuarios, Horaiousuario]) => {
      this.horariosArray = horarios.items;
      console.log("horariosArray");
      console.log(this.horariosArray);
      this.rondaArray = ronda.items;
      console.log("RondaArray");
      console.log(this.rondaArray);
      this.usuariosArray = usuarios.items;
      console.log("UsuariosArray");
      console.log(this.usuariosArray);
      this.HoraiosUsuariosArray = Horaiousuario.items;
      console.log("HoraiosUsuariosArray");
      console.log(this.HoraiosUsuariosArray);
      let cont = 0;
      this.horariosArray.forEach(hora => {

        this.rondaArray.forEach(ronda => {
          if (hora.plantillaId == ronda.id) {
            console.log("ronda = hora");
            this.horariosArray[cont] = {
              ...this.horariosArray[cont],
              nombreRonda: ronda.nombre,
              fecha: (new Date(this.horariosArray[cont].fechaInicio)).getUTCDate() + '-' + ((new Date(this.horariosArray[cont].fechaInicio)).getMonth() + 1) + '-' + (new Date(this.horariosArray[cont].fechaInicio)).getUTCFullYear(),
            }
          }
        });
        cont += 1;
      });
      cont = 0;
      this.horariosArray.forEach(horario => {
        this.HoraiosUsuariosArray.forEach(usuario => {
          if (usuario.horarioId == horario.id) {
            this.horariosArray[cont] = {
              ...this.horariosArray[cont],
              usuario: usuario.userId,
            }
          }
        });
        cont += 1;
      })
      console.log("this.horariosArray");
      console.log(this.horariosArray);



      cont =0;
      this.horariosArray.forEach(horario => {
        this.usuariosArray.forEach(usuario => {
          if (horario.usuario == usuario.id) {
            this.horariosArray[cont] = {
              ...this.horariosArray[cont],
              usuarioNombre: usuario.name
            }
          }
        })
        cont+=1;
      })

/*       let i = 0;
     this.horariosArray.forEach(datos => {
     this.horariosArray[i].fecha = this.cambiarformatoFechaParaGuardar(this.horariosArray[i].fecha)
     i += 1;
    }) 
    console.log("ARRAY CON NUEVOS FORMATOS DE FECHA:")
    console.log(this.horariosArray); */
    
      this.arrayRondasFechaSeleccionada = [];
      this.source = new LocalDataSource(this.horariosArray);


    }).catch(() => { });

    



  }

  mostrarTodos(){
    this.getAllData();
    this.hayDiaSeleccionado = "";
  }


  Usuario: any = null;
  selectUsuario(usuario: any) {
    this.Usuario = usuario;

    console.log("this.Usuario");
    console.log(this.Usuario);
  }
  
  getUsuario() {
    return this.Usuario;
  }


  cambioDeFecha(fecha: Date) {
    this.obtenerDatosFiltradoPorFecha(fecha)
    this.dia = this.formatoFechaNuevo(fecha);
    this.hayDiaSeleccionado = "algo";
    console.log(this.dia);
  }

  selectDate(fecha: Date) {
    console.log("fecha: ");
    this.dia = this.formatoFecha(fecha);
    console.log(this.dia);
  }

  arrayRondasFechaSeleccionada = [];
  async obtenerDatosFiltradoPorFecha(fecha: any){
    this.arrayRondasFechaSeleccionada = [];
    let i = 0;
    let cont = 0;
    console.log("La fecha que se selecciono es: ")
    console.log(this.formatoFechaNuevo(fecha))
    console.log("La fecha del primer elemento del array es: ")
    console.log(this.horariosArray[i].fecha)
      this.horariosArray.forEach(dato => {
      /*         let ms = Date.parse(this.horariosArray[i].fecha)
        let date = new Date(ms);
        this.horariosArray[i].fecha = this.cambiarformatoFechaParaGuardar(date); */
        if(this.horariosArray[i].fecha === this.formatoFechaNuevo(fecha)){
          this.arrayRondasFechaSeleccionada[cont] = this.horariosArray[i]
          console.log("Entre una vez por lo menos")
          cont += 1;
        }
        i += 1;
      })
      console.log("Datos filtrados:")
      console.log(this.arrayRondasFechaSeleccionada)
      this.source = new LocalDataSource([]);
      this.source = new LocalDataSource(this.arrayRondasFechaSeleccionada);

  }


  formatoFecha(fecha: Date): any {

    return fecha.getFullYear().toString() + "-" + (((fecha.getUTCMonth() + 1) < 10) ? ("0" + fecha.getMonth().toString()) : fecha.getMonth().toString()) + "-" + ((fecha.getDate() < 10) ? ("0" + fecha.getDate().toString()) : fecha.getDate().toString()) + "T" + "00:00:00.000Z";

  }

  formatoFechaNuevo(fecha: Date): any {

    return ((fecha.getDate() < 10) ? ("0" + fecha.getDate().toString()) : fecha.getDate().toString()) + "-" + (((fecha.getMonth()) < 9) ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" +  fecha.getFullYear().toString();

  }
  
  cambiarformatoFechaParaGuardar(fecha: Date): any {

    return  fecha.getFullYear().toString() + "-" + (((fecha.getMonth()) < 9) ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" + ((fecha.getDate() < 10) ? ("0" + fecha.getDate().toString()) : fecha.getDate().toString());

  }

  source: LocalDataSource;
  settings: SmartTableSettings = {
    noDataMessage: 'No hay rondas para la fecha seleccionada.',
    mode: 'external',
    actions: false,
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
      fecha: {
        title: 'Fecha',
        type: 'text',
        width: '300px'
      },
      usuarioNombre: {
        title: 'Usuario',
        type: 'text',
        width: '300px'
      },
    }
  };


  horariosFiltrados: any[];
  async filtrarFechas(date: any) {
    console.log("date");
    console.log(date.getMonth());
    console.log(date.getMonth());

    await this.getAllData();

    if (date) {
      let fecha = this.formatoFechaNuevo(date);
      console.log(fecha);
      this.horariosArray.forEach(horario => {
        if (horario.fechaInicio == fecha) {
          this.horariosFiltrados = this.horariosFiltrados.concat(horario);
        }
      });
      this.horariosArray = this.horariosFiltrados
    }


  }

  

  setingsRonda: SmartTableSettings = {
    noDataMessage: '',
    mode: 'external',
    actions: false,
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
      nombre: {
        title: 'Ronda',
        type: 'text',
        width: '300px'
      },

    }
  };





}


