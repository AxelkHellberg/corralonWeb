export interface UserData {
  username: string;
  password: string;
  name: string;
  lastName: string;
  fileNumber: string;
  dni: string;
}

export interface UserBasicData {
  username: string;
  password: string;
}

export interface PlantData {
  descripcion: string;
  nombre: string;
}

export interface SystemData {
  descripcion: string;
  nombre: string;
  plantaId: number;
  tagId: number;
}

export interface EquipmentData {
  detalle: string;
  nombre: string;
  systemId: number;
}

export interface TagData {
  nombre: string;
  obligatorio: boolean;
}
export interface ManeuverGuideData {
  userId: number;
  nombre: string;
  plantillaGuiaManiobraId: number;
}
export interface ManeuverGuideFields {
  nombre: string;
  systemId: number;
  plantillaGuiaManiobraId: number;
}

export interface MeasurementUnitsData {
  nombre: string;
  systemId: number;
  plantillaGuiaManiobraId: number;
}

export interface RoundData {
  porcentaje:         number;
  tiempoRondaMinutos: number;
  userId:             number;
  estadoRondaId:      number;
  plantillaRondaId:   number;
}

export interface RoundFields {
  nombre: string;
  valorNormal: number;
  valorMax: number;
  valorMin: number;
  equipamientoId: number;
  tipoCampoRondaId: number;
  unidadMedidaId: number;
}

export interface RoundTemplateData {
  nombre: string;
  funcionamientoSistema: boolean;
  obligatorioSistema:    boolean;
  funcionamientoEquipo:  boolean;
  obligatorioEquipo:     boolean;
  campoRondaId:          number;
  horarioId:             number;
}
