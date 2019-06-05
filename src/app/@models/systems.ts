
export interface SystemList {
  id:         string;
  systemName: string;
  systemType: string;
  detail:     string;
  plant:      string;
  tag:        string;
  equipment:  string;
}

export interface SystemType {
  id:             number;
  typeSystemName: string;
  detail:         string;
}

export interface Equipment {
  id:            string;
  equipmentName: string;
  system:        string;
  detail:        string;
  attributes:    string;
  tag:           string;
  equipment:     string;
}

export interface MeasurementUnits {
  id:          number;
  measurement: string;
  detail:      string;
}
