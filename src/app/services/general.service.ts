import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentData, ManeuverGuideFields, PlantData, RoundData, RoundFields, RoundTemplateData, SystemData, TagData, UserBasicData, UserData } from '../@models/general';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) { }

  getRoundsQuantity(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports-custom/execute/1`, {}).toPromise();
  }
  getRoundsByUser(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports-custom/execute/2`, {}).toPromise();
  }
  login(userData: UserBasicData): Promise<any> {
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
  editTag(tagData: TagData): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/tags`, tagData).toPromise();
  }
  deleteTag(id: number): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/tags/${id}`).toPromise();
  }
  getTag(type: any): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tags?q=tipoTagId=${type}` ).toPromise();
  }
  createManeuverGuideTemplate(nombre: string): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/`, { nombre }).toPromise();
  }
  editManeuverGuideTemplate(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-guias-maniobra/${id}`, { nombre }).toPromise();
  }
  getManeuverGuide(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/guias-maniobra/?order=["id","DESC"]`).toPromise();
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
  createRoundFields(roundFieldsData: RoundFields): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/`, roundFieldsData).toPromise();
  }
  editRoundFields(roundFieldsData: RoundFields, id): Promise<any> {
    return this.http.patch(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/${id}`, roundFieldsData).toPromise();
  }
  deleteRoundFields(roundFieldsData: RoundFields, id): Promise<any> {
    return this.http.delete(`${EnvironmentService.currentEnvironment.url}/services/entities/campos-ronda/${id}`).toPromise();
  }
  createRoundTemplate(roundTemplateData: RoundTemplateData): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/entities/plantillas-ronda/`, roundTemplateData).toPromise();
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
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/rondas/?order=["id","DESC"]`).toPromise();
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
  editFailureType(id: number, nombre: string, codificacionDeFalla:string): Promise<any> {
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
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, {id: 3}).toPromise();
  }

  getUserInfo(): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, {id: 4}).toPromise();
  }

  // Jose A

  getDataType(): Promise<any> {
    return this.http.get(`${EnvironmentService.currentEnvironment.url}/services/entities/tipos-campo-ronda`).toPromise();
  }

  getFieldTemplate(id:any): Promise<any> {
    return this.http.post(`${EnvironmentService.currentEnvironment.url}/services/reports/execute`, {id: 6, filters:{plantillaRondaId: id}}).toPromise();
  }

}
