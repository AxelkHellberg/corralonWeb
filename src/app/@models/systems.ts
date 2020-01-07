
export interface SystemList {
  id?:         string;
  nombre: string;
  tipoSistema?: string;
  detail?:     string;
  descripcion: string;
  plantaId:      number;
  tipoSistemaId:      number;
  plantaNombre?:      string;
  tagId:        string;
  tagNombre: string;
  equipment?:  string;
}

export interface SystemType {
  id:             number;
  nombre: string;
  detail:         string;
}

export interface Equipment {
  id:            string;
  nombre: string;
  sistemaId:        string;
  detalle:        string;
  attributes:    string;
  tag:           string;
  tagId:           string;
  equipment:     string;
}

export interface MeasurementUnits {
  id:          number;
  measurement: string;
  detail:      string;
}
