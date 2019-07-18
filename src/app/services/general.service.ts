import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EquipmentData, ManeuverGuideData, ManeuverGuideFields, PlantData, RoundData, RoundFields, RoundTemplateData, SystemData, TagData, UserBasicData, UserData } from '../@models/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  createUser(userData: UserData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/users/`, userData).toPromise();
  }
  login(userData: UserBasicData): Promise<any> {
    return this.http.post(`${environment.url}/services/auth/login/`, userData).toPromise();
  }
  getUser(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/users/`).toPromise();
  }

  createPlant(plantData: PlantData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/plantas`, plantData).toPromise();
  }
  getPlants(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/plantas`).toPromise();
  }

  deletePlant(id: number): Promise<any> {
    return this.http.delete(`${environment.url}/services/entities/plantas/${id}`).toPromise();
  }
  editPlant(id: number, plantData: PlantData): Promise<any> {
    return this.http.patch(`${environment.url}/services/entities/plantas/${id}`, plantData).toPromise();
  }
  createSystem(systemData: SystemData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/sistemas`, systemData).toPromise();
  }

  editSystem(id: number, systemData: SystemData): Promise<any> {
    return this.http.patch(`${environment.url}/services/entities/sistemas/${id}`, systemData).toPromise();
  }
  deleteSystem(id: number): Promise<any> {
    return this.http.delete(`${environment.url}/services/entities/sistemas/${id}`).toPromise();
  }
  getSystems(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/sistemas`).toPromise();
  }
  createEquipment(equipmentData: EquipmentData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/equipamientos`, equipmentData).toPromise();
  }
  editEquipment(id: number, equipmentData: EquipmentData): Promise<any> {
    return this.http.patch(`${environment.url}/services/entities/equipamientos/${id}`, equipmentData).toPromise();
  }
  deleteEquipment(id: number): Promise<any> {
    return this.http.delete(`${environment.url}/services/entities/equipamientos/${id}`).toPromise();
  }
  getEquipments(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/equipamientos`).toPromise();
  }
  createTag(tagData: TagData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/tags`, tagData).toPromise();
  }
  createManeuverGuideTemplate(nombre: string): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/plantillas-guias-maniobra/`, { nombre }).toPromise();
  }
  editManeuverGuideTemplate(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${environment.url}/services/entities/plantillas-guias-maniobra/${id}`, { nombre }).toPromise();
  }
  getManeuverGuideTemplates(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/plantillas-guias-maniobra/`).toPromise();
  }
  createManeuverGuide(maneuverGuideData: ManeuverGuideData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/guias-maniobra/`, maneuverGuideData).toPromise();
  }
  createManeuverGuideFields(maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/campos-maniobra/`, maneuverGuideFieldsData).toPromise();
  }
  editManeuverGuideFields(id: number, maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.patch(`${environment.url}/services/entities/campos-maniobra/${id}`, maneuverGuideFieldsData).toPromise();
  }
  deleteManeuverGuideField(id: number): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(`${environment.url}/services/entities/campos-maniobra/${id}`).toPromise();
  }
  getMeasurementUnits(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/unidades-medida/`).toPromise();
  }
  editMeasurementUnits(id: number, nombre: string): Promise<any> {
    return this.http.patch(`${environment.url}/services/entities/unidades-medida/${id}`, { nombre }).toPromise();
  }
  deleteMeasurementUnits(id: number): Promise<any> {
    return this.http.delete(`${environment.url}/services/entities/unidades-medida/${id}`).toPromise();
  }
  createMeasurementUnits(nombre: string): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/unidades-medida/`, { nombre }).toPromise();
  }
  createSchedule(hora: number, minuto: number): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/horarios/`, { hora, minuto }).toPromise();
  }
  createRoundFields(roundFieldsData: RoundFields): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/campos-ronda/`, roundFieldsData).toPromise();
  }
  createRoundTemplate(roundTemplateData: RoundTemplateData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/plantillas-ronda/`, roundTemplateData).toPromise();
  }
  createRound(roundData: RoundData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/rondas/`, roundData).toPromise();
  }
  createValueRoundFields(maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/campos-maniobra/`, maneuverGuideFieldsData).toPromise();
  }




  // Custom reports

  getManeuverGuideFieldsWithPlants(plantillaGuiaManiobraId: number): Promise<any> {
    return this.http.post(`${environment.url}/services/reports/execute`, { "id": 1, "filters": { plantillaGuiaManiobraId } }).toPromise();
  }

}
