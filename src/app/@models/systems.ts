
export interface SystemList {
  id?:         string;
  nombre: string;
  systemType?: string;
  detail?:     string;
  descripcion: string;
  plantaId:      number;
  plantaNombre?:      string;
  tagId:        string;
  equipment?:  string;
}

export interface SystemType {
  id:             number;
  typeSystemName: string;
  detail:         string;
}

export interface Equipment {
  id:            string;
  nombre: string;
  systemId:        string;
  detalle:        string;
  attributes:    string;
  tag:           string;
  equipment:     string;
}

export interface MeasurementUnits {
  id:          number;
  measurement: string;
  detail:      string;
}
