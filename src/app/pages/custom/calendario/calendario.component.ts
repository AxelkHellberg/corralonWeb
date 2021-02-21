import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { event } from 'jquery';
import { SmartTableSettings } from '../../../@models/smart-table';

import { GeneralService } from '../../../services/general.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { exit } from 'process';
import { NewRoundTemplateComponent } from '../new-round-template/new-round-template.component';
import { tryCatch } from 'rxjs/internal/util/tryCatch';



@Component({
  selector: 'ngx-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  date = new Date;
  min: Date;
  dateRecurrencia = new Date
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
      this.onClose()
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

  recurrenciaSeleccionada = null;
  SemanaDiaMes() {

      console.log(this.recurrenciaSeleccionada)
      this.recurrenciaSeleccionada = this.recurrenciaSeleccionada? this.recurrenciaSeleccionada: undefined;
      console.log("funcionanado");
      console.log(this.recurrenciaSeleccionada);
      if(this.recurrenciaSeleccionada == 1 || this.recurrenciaSeleccionada == 3)
      {
      this.diasRepetir = [this.diaSemanaSeleccionado];
      }

  
    
  }

  OnInitRecurrencia()
  {
    if(this.recurrenciaSeleccionada == 2)
    {
        let n = document.getElementById(this.diaSemanaSeleccionado.toString())
        console.log(n)
       // n.value = true;

    }
  }
  diaSemanaSeleccionado: any ;

  diasRepetir:number[]= []
  recurrenciaSemanas(seleccion:any,dia:number)
  {

    console.log(this.diasRepetir.includes(dia))
    if(!this.diasRepetir.includes(dia))
    {
      console.log("Dia a meter" + dia.toString() )
      this.diasRepetir.push(dia)
    }
    else
    {
      console.log("Dia a a sacar" + dia.toString() )
      var i = this.diasRepetir.indexOf( dia );
      this.diasRepetir.splice( i, 1 );
    }
    console.log(this.diasRepetir)
  }

  conRecurrencia:number = 0;
  habilitarRecurrencia(evento){
      this.conRecurrencia = 1;

  }
  deshabilitarRecurrencia(evento){
    this.conRecurrencia = 0;
}

  cantidadRecurrencia:number = 1;
  cambiarCantidadRecurrencia(data:any)
  {
    let num = data.srcElement.value
    console.log(num)
    if(num<1)
    {
      data.srcElement.value = 1
      this.cantidadRecurrencia = 1
    }
    else
    {
      this.cantidadRecurrencia = num
    }
    console.log(this.cantidadRecurrencia)
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
    this.creandoRonda = 0;
  }

  dia = "";
  hayDiaSeleccionado = "";

  valueBar: number = 0;
  async generarHorario() {
    this.creandoRonda = 1
    this.selectTimeInicio();
    this.selectTimeFin();

    this.valueBar = 10;
    let dias = "";    

    console.log("Este es el dia sin petiar")
    console.log(this.dia)

    this.hora = {
      ...this.hora,
      dias: dias,
      tipoRecurrencia: this.recurrenciaSeleccionada||0,
      fechaInicio: new Date(this.dia),
      fechaFin: new Date(this.fechaHastaRecurrencia),
      plantillaId: this.ronda, ///En la base de datos se encuentra como plantillaId, pero se trata de la RONDA ID.
    }
    this.valueBar = 20;
    console.log("Ronda a crear:");
    console.log(this.hora);
    let currentDateString = this.formatoFechaNuevo(this.fechaTipoDate);
    let currentDateDate = this.fechaTipoDate
    let response2 = undefined
    this.botonApretado = 0;
    this.cerrarAlerta = 0;
/*     while(response2 === undefined){ */
     let promesa = this.generalService.createRoundNuevo(this.hora.plantillaId, this.Usuario.id).then(function(value) {
        
        response2 = value.insertId
        
        
      }).catch(function(error) {
        console.log("ERROR:")
        console.log(error)
      });
/*     } */
      if(response2==undefined){
            let i = 0;
            while(i<500){
              i++;
              console.log("esperando respuesta............")
            }
          }
          
      if(response2==undefined){
            let i = 0;
            while(i<500){
              i++;
              console.log("esperando respuesta............")
            }
          }
      
     let responseTareas = await this.generalService.traerIdTareas(this.hora.plantillaId)
              
     this.valueBar = 50;
      let fechaWhile = new Date(this.fechaHastaRecurrenciaDate)
      while(currentDateDate.getTime() <= fechaWhile.getTime()){
  
        this.hora.fechaFin = currentDateString
        this.hora.fechaInicio = currentDateString

        let horarioId;

        if(this.recurrenciaSeleccionada==2){
          let auxFechaInicio = new Date(this.fechaTipoDate)
          let diaFecha =  auxFechaInicio.getDay()
          auxFechaInicio.setDate(auxFechaInicio.getDate() - parseInt(diaFecha.toString(),10))

          this.diasRepetir.forEach(async dia => {
            this.hora = {
              ...this.hora,
              rondaId: response2,
              dias: dia
            }
            auxFechaInicio.setDate(auxFechaInicio.getDate() + dia)

            this.hora.fechaInicio = this.formatoFechaNuevo(auxFechaInicio)
            diaFecha =  auxFechaInicio.getDay()
            auxFechaInicio.setDate(auxFechaInicio.getDate() - parseInt(diaFecha.toString(),10))

            const response = await this.generalService.createHorario(this.hora);
            horarioId = response.insertId;

            try{
              let general : GeneralService
                this.generalService.asignarTareas(response2,responseTareas,horarioId)
                //Este servicio tira error al llamarlo, pero funciona correctamente. Se asginan todas las tareas correctamente.
                this.generalService.createHorariosUsuarios(horarioId, this.Usuario.id);
            }catch (error) {
            }
          })
  
        }
        else{

          this.hora = {
            ...this.hora,
            rondaId: response2,
            dias: null
          }
          console.log(this.hora)
          const response = await this.generalService.createHorario(this.hora);
          horarioId = response.insertId;

        
          try{
            let general : GeneralService
            //Este servicio 'asignarTareas' tira error al llamarlo, pero funciona correctamente. Se asginan todas las tareas correctamente.
              this.generalService.asignarTareas(response2,responseTareas,horarioId)
              this.generalService.createHorariosUsuarios(horarioId, this.Usuario.id);
          }catch (error) {
          }
        }


          
          let fechaWhileAux = fechaWhile
  
  
          if(this.recurrenciaSeleccionada == 1){
            ///Para una recurrencia entre 'x' dias...
            currentDateDate.setDate(currentDateDate.getDate() + parseInt(this.cantidadRecurrencia.toString(),10))
          }
          else{
            if(this.recurrenciaSeleccionada == 3){
              ///Para una recurrencia entre 'x' meses...
              currentDateDate.setDate( (currentDateDate.getDate()+(30*parseInt(this.cantidadRecurrencia.toString(),10))) )
            }
            else{
              ///Para una recurrencia entre 'x' semanas...
              currentDateDate.setDate( (currentDateDate.getDate()+ (parseInt(this.cantidadRecurrencia.toString(),10)*7)) )
            }
          }
          fechaWhile.setDate(fechaWhileAux.getDate())
        currentDateString = this.formatoFechaNuevo(currentDateDate);
        this.valueBar = 80;

      }

      let j = 0
      this.valueBar = 100;
      while(j<1000){
        console.log("ESPERANDO....")
        if(j==998){
          this.mostrarTodos()
          this.hayDiaSeleccionado = '';
        }
        j++;
      }
  
  }


  creandoRonda: number = 0;
  cerrarAlerta: any;
  rondaArray: any[];
  plantillasRondaArray:any[];
  horariosArray: any[];
  usuariosArray: any[];
  HoraiosUsuariosArray: any[];
  
  async getAllData() {
    Promise.all([
      this.generalService.getRondas(),
      this.generalService.getHorarios(),
      this.generalService.getUser(),
      this.generalService.getHorariosUsuaruios(),
      this.generalService.getPlantillasRondas()

    ]).then(([ronda, horarios, usuarios, Horaiousuario,plantillasRonda]) => {
      this.horariosArray = horarios.items;
      console.log("horariosArray");
      console.log(this.horariosArray);
      this.rondaArray = ronda;
      console.log("RondaArray");
      console.log(this.rondaArray);
      this.usuariosArray = usuarios.items;
      this.plantillasRondaArray = plantillasRonda
      console.log("PLANTILLAS")
      console.log(this.plantillasRondaArray)
      console.log("UsuariosArray");
      console.log(this.usuariosArray);
      this.HoraiosUsuariosArray = Horaiousuario.items;
      console.log("HoraiosUsuariosArray");
      console.log(this.HoraiosUsuariosArray);
      let cont = 0;
      this.horariosArray.forEach(hora => {

        this.rondaArray.forEach(ronda => {
          if (hora.plantillaId == ronda.rondaId) {
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

      this.sourcePlantillaRonda = new LocalDataSource([]);
      this.sourcePlantillaRonda = new LocalDataSource(this.plantillasRondaArray);
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

  fechaTipoDate: Date;
  cambioDeFecha(fecha: Date) {
    console.log(fecha)
    this.fechaTipoDate= fecha 
    this.obtenerDatosFiltradoPorFecha(fecha)
    this.min = fecha;
    this.dia = this.formatoFechaNuevo(fecha);
    this.fechaHastaRecurrencia = this.dia
    this.fechaHastaRecurrenciaDate = fecha
    this.hayDiaSeleccionado = "algo";
    console.log(this.dia);
    this.diaSemanaSeleccionado = fecha.getDay()
    this.diasRepetir = [this.diaSemanaSeleccionado]
    this.onClose()
  }



  seleccionFechaRecurrencia(fecha: Date) {
    this.dia = this.formatoFechaNuevo(fecha);
    console.log(this.dia);
  }

  fechaHastaRecurrencia: any = undefined;
  seleccionFechaRecurrenciaHasta(fecha: Date) {
    this.fechaHastaRecurrencia = this.formatoFechaNuevo(fecha);
    console.log(this.fechaHastaRecurrencia);
    this.fechaHastaRecurrenciaDate = fecha
  }

  fechaHastaRecurrenciaDate: Date;





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

    return ((fecha.getDate() < 10) ? (fecha.getDate().toString()) : fecha.getDate().toString()) + "-" + (((fecha.getMonth()) < 9) ?  (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" +  fecha.getFullYear().toString();

  }
  
  cambiarformatoFechaParaGuardar(fecha: Date): any {

    return  fecha.getFullYear().toString() + "-" + (((fecha.getMonth()) < 9) ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" + ((fecha.getDate() < 10) ? ("0" + fecha.getDate().toString()) : fecha.getDate().toString());

  }

  source: LocalDataSource;
  sourcePlantillaRonda: LocalDataSource;
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


