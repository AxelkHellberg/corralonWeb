import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentData, infoGuia, ManeuverGuideFields, PlantData, RoundData, RoundFields, RoundTemplateData, SystemData, TagData, UserBasicData, UserData } from '../@models/general';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) { }

  //nuevo---------------------------

  getHorarios(): Promise<any> { return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/horario/`).toPromise(); }

  createHorariosUsuarios(horarioId: any, usuarioId: any): Promise<any> { return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/enlace-horario-usuario`, { "horarioId": horarioId, "userId": usuarioId }).toPromise(); }


  getHorariosUsuaruios(): Promise<any> { return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/enlace-horario-usuario`).toPromise(); }


  getTareaCompleta(): Promise<any> { return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/campos-ronda`, { id: 4 }).toPromise(); }

  getTareaCompletaNuevo(): Promise<any> { return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/traerTareas`).toPromise(); }

  getFallasEquipo(): Promise<any> { return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/falla-equipo`, { id: 4 }).toPromise(); }

  getFallasSistema(): Promise<any> { return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/falla-sistema`, { id: 4 }).toPromise(); }


  getTarea(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda`).toPromise();
  }

  createRonda(tareaId: any, rondaId: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/enlace-tarea-plantilla`, { campoRondaId: tareaId, plantillaRondaId: rondaId }).toPromise();
  }


  getRondas(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda`).toPromise();
  }

  getGuiaManiobraCampos(Guia: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, Guia).toPromise();
  }
  getRondasCompletas(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/plantillas-con-camposronda`, { "id": 4, "filters": {} }).toPromise();
  }
  getNombreDescripcionRonda(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/NombreDescripcionRondas`, { "id": 4 }).toPromise();
  }
  getRondasCompletas1(idB: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/plantillas-con-camposronda`, {
      "id": 0, "filters": {
        "id": idB
      }
    }).toPromise();
  }

  createHorario(horario: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/horario`, horario).toPromise();
  }

  //--------------------------------------



  getRoundsQuantity(tipo: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/cantidades/estado`, { id : tipo }).toPromise();
  }
  getRoundsByUser(tipo: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/cantidades/usuario`, { id: tipo }).toPromise();
  }
  login(userData: UserBasicData): Promise<any> {
    //return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/auth/login/`, userData).toPromise();
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/auth/login/`, userData).toPromise();
  }
  getUser(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/users/`).toPromise();
  }
  createUser(userData: UserData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/users/`, userData).toPromise();
  }
  editUser(id: number, userData: UserData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/users/${id}`, userData).toPromise();
  }
  deleteUser(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/users/${id}`).toPromise();
  }
  createPlant(plantData: PlantData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantas`, plantData).toPromise();
  }
  getPlants(filter: string = ''): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/plantas?q=${filter}`).toPromise();
  }
  deletePlant(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/plantas/${id}`).toPromise();
  }
  editPlant(id: number, plantData: PlantData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/plantas/${id}`, plantData).toPromise();
  }
  createSystem(systemData: SystemData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/sistemas`, systemData).toPromise();
  }
  deshabilitarTagSeleccionado(idTag: number): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/tags/deshabilitarTagSeleccionado`, {id:idTag}).toPromise();
  }
  getTypeSystems(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-sistema`).toPromise();
  }
  createTypeSystems(nombre: string, posicion: number = 1): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-sistema`, { nombre, posicion }).toPromise();
  }
  editTypeSystems(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-sistema/${id}`, { nombre }).toPromise();
  }
  deleteTypeSystems(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-sistema/${id}`).toPromise();
  }
  editSystem(id: number, systemData: SystemData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/sistemas/${id}`, systemData).toPromise();
  }
  deleteSystem(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/sistemas/${id}`).toPromise();
  }
  getSystems(filter: string = ''): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/sistemas?q=${filter}`).toPromise();
  }
  createEquipment(equipmentData: EquipmentData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/equipamientos`, equipmentData).toPromise();
  }
  editEquipment(id: number, equipmentData: EquipmentData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/equipamientos/${id}`, equipmentData).toPromise();
  }
  deleteEquipment(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/equipamientos/${id}`).toPromise();
  }
  getEquipments(filter: string = ''): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/equipamientos?q=${filter}`).toPromise();
  }
  createTag(tagData: TagData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/tags`, tagData).toPromise();
  }
  editTag(id: number, tagData: TagData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/tags/${id}`, tagData).toPromise();
  }
  deleteTag(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/tags/${id}`).toPromise();
  }
  getTag(type: any): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tags?q=tipoTagId=${type}`).toPromise();
  }
  getTagNoAsignadosSistemas(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/TagsNoAsignadosSistemas`, {id:1}).toPromise();
  }
  getTagNoAsignadosEquipos(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute/TagsNoAsignadosEquipos`, {id:1}).toPromise();
  }
  createManeuverGuideTemplate(nombre: string): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/`, { nombre }).toPromise();
  }
  editManeuverGuideTemplate(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/${id}`, { nombre }).toPromise();
  }
  getManeuverGuide(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/guias-maniobra/`).toPromise();//?order=["id","DESC"]
  }
  deleteManeuverGuideTemplate(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/${id}`).toPromise();
  }
  getManeuverGuideTemplates(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/`).toPromise();
  }
  createManeuverGuideFields(maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-maniobra/`, maneuverGuideFieldsData).toPromise();
  }
  editManeuverGuideFields(id: number, maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-maniobra/${id}`, maneuverGuideFieldsData).toPromise();
  }
  deleteManeuverGuideField(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-maniobra/${id}`).toPromise();
  }
  getMeasurementUnits(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/unidades-medida/`).toPromise();
  }
  editMeasurementUnits(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/unidades-medida/${id}`, { nombre }).toPromise();
  }
  deleteMeasurementUnits(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/unidades-medida/${id}`).toPromise();
  }
  createMeasurementUnits(nombre: string): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/unidades-medida/`, { nombre }).toPromise();
  }
  createSchedule(hora: number, minuto: number): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/horarios/`, { hora, minuto }).toPromise();
  }
  getSchedule(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/horarios/`).toPromise();
  }

  createRoundFields(roundFieldsData: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/`, roundFieldsData).toPromise();
  }

  crearTarea(roundFieldsData: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/crearTarea`, roundFieldsData).toPromise();
  }

  editRoundFields(roundFieldsData: any, id): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/${id}`, roundFieldsData).toPromise();
  }
  deleteRoundFields(id): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/${id}`).toPromise();
  }
  createRoundTemplate(roundTemplateData: any, descripcionData: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/crearPlantillaRonda`, { nombre: roundTemplateData, descripcion: descripcionData }).toPromise();
  }
  asociarTareasEnRondas(idTareaData: any, idInsertadoData: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/asociarTareasEnRonda`, { idTarea: idTareaData, idInsertado: idInsertadoData }).toPromise();
  }
  editRoundTemplate(id: number, roundTemplateData: RoundTemplateData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/${id}`, roundTemplateData).toPromise();
  }
  deleteRoundTemplate(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/${id}`).toPromise();
  }
  getRoundTemplate(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/`).toPromise();
  }
  createRound(roundData: RoundData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/rondas/`, roundData).toPromise();
  }
  getRounds(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/rondas/`).toPromise();//?order=["id","DESC"]
  }
  getRoundsStatus(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/estados-ronda/`).toPromise();
  }
  createValueRoundFields(maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-maniobra/`, maneuverGuideFieldsData).toPromise();
  }
  getNotificationsFailures(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/notificaciones-falla/`).toPromise();
  }
  editNotificationsFailures(id: number, data: any): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/notificaciones-falla/${id}`, data).toPromise();
  }
  getStatusFailures(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/estados-falla/`).toPromise();
  }
  createFailureType(nombre: string, codificacionDeFalla: string, posicion: number = 1): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-falla/`, { nombre, codificacionDeFalla, posicion }).toPromise();
  }
  getFailureType(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-falla/`).toPromise();
  }
  editFailureType(id: number, nombre: string, codificacionDeFalla: string): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-falla/${id}`, { nombre, codificacionDeFalla }).toPromise();
  }
  deleteFailureType(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-falla/${id}`).toPromise();
  }

  getProfile(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/profiles/`).toPromise();
  }
  createProfile(name: string): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/profiles/`, { name }).toPromise();
  }
  editProfile(id: number, name: any): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/profiles/${id}`, { name }).toPromise();
  }
  deleteProfile(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/profiles/${id}`).toPromise();
  }




  // Custom reports

  getManeuverGuideFieldsWithPlants(plantillaGuiaManiobraId: number): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, { id: 1, filters: { plantillaGuiaManiobraId } }).toPromise();
  }

  getNotificationsFailuresReport(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, { id: 3 }).toPromise();
  }

  getUserInfo(): Promise<any> {
   return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, { id: 4 }).toPromise();
  }

  // Jose A

  getDataType(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-campo-ronda`).toPromise();
  }

  getFieldTemplate(id: any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, { id: 6, filters: { plantillaRondaId: id } }).toPromise();
  }


}
