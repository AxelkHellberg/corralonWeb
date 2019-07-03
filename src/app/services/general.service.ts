import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlantData, EquipmentData, SystemData, UserData, UserBasicData, TagData, ManeuverGuideData, ManeuverGuideFields, RoundFields, RoundTemplateData, RoundData } from '../@models/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  createUser(userData: UserData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/users/`, userData).toPromise();
  }
  login(userData: UserBasicData): Promise<any> {
    return this.http.post(`${environment.url}/services/auth/login/`, userData, {headers: this.headers}).toPromise();
  }
  getUser(): Promise<any> {
    return this.http.get(`${environment.url}/services/entities/users/`).toPromise();
  }

  createPlant(plantData: PlantData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/plantas`, plantData).toPromise();
  }
  createSystem(systemData: SystemData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/sistemas`, systemData).toPromise();
  }
  createEquipment(equipmentData: EquipmentData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/equipamientos`, equipmentData).toPromise();
  }
  createTag(tagData: TagData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/tags`, tagData).toPromise();
  }
  createManeuverGuideTemplate(nombre: string): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/plantillas-guias-maniobra/`, {nombre}).toPromise();
  }
  createManeuverGuide(maneuverGuideData: ManeuverGuideData): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/guias-maniobra/`, maneuverGuideData).toPromise();
  }
  createManeuverGuideFields(maneuverGuideFieldsData: ManeuverGuideFields): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/campos-maniobra/`, maneuverGuideFieldsData).toPromise();
  }
  createMeasurementUnits(nombre: string): Promise<any> {
    return this.http.post(`${environment.url}services/entities/unidades-medida/`, {nombre}).toPromise();
  }
  createSchedule(hora: number, minuto: number): Promise<any> {
    return this.http.post(`${environment.url}/services/entities/horarios/`, {hora, minuto}).toPromise();
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

}
