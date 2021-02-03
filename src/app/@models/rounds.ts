export interface Round {
  id:          number;
  roundName:   string;
  time:        string;
  indexEdited: number;
  full:        FullData;
}

export interface FullData {
  tableData:      RoundsDetails[];
  timeData:       TimeData;
  tableTimeData:  TableTimeData[];
  templateConfig: TemplateConfig;
}

export interface RoundsDetails {
  plant?:     string;
  system?:    string;
  equipment?: string;
  unit?: string;
  type?: any;
  plantId?:     string;
  systemId?:    string;
  equipmentId?: string;
  unitId?: string;
  typeId?: string;
  timer?:     any;
  time?:      string;
  name?: string;
  minValue?: string;
  maxValue?: string;
  normalValue?: string;
  roundFieldId?: string;
  roundTemplateId?: string;
  descripcion?: string;
}

export interface TableTimeData {
  hour:   string;
  minute: string;
}

export interface TemplateConfig {
  systemMandatory:        boolean;
  equipmentFunctionality: boolean;
}

export interface TimeData {
  timer: any;
  time:  string;
}
