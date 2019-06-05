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
  plant:     string;
  system:    string;
  equipment: string;
  component: string;
  timer?:     any;
  time?:      string;
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
