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
  id?: number;
  descripcion?: string;
  nombre?: string;
}

export interface SystemData {
  id?: number;
  descripcion: string;
  nombre: string;
  plantaId: number;
  tipoSistemaId: number;
  tagId: number;
  KKS: string;
}

export interface EquipmentData {
  detalle: string;
  nombre: string;
  sistemaId: number;
  tagId: number;
}

export interface TagData {
  nombre: string;
  obligatorio: boolean;
  tipoTagId: number;
  status: string;
}
export interface ManeuverGuideData {
  userId: number;
  nombre: string;
  plantillaGuiaManiobraId: number;
}
export interface ManeuverGuideFields {
  nombre: string;
  descripcion: string;
  sistemaId: number;
  plantaId?: number;
  plantillaGuiaManiobraId?: number;
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
  valorNormal: string;
  valorMax: string;
  valorMin: string;
  equipamientoId: string;
  tipoCampoRondaId: string;
  unidadMedidaId: string;
  plantillaRondaId: string;
}

export interface RoundTemplateData {
  nombre: string;
  funcionamientoSistema: boolean;
  obligatorioSistema:    boolean;
  funcionamientoEquipo:  boolean;
  obligatorioEquipo:     boolean;
  campoRondaId?:          number;
  horarios:              any;
}
