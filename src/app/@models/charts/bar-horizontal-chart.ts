export interface BarHorizontalChartData {
  labels:   string[];
  datasets: Dataset[];
}

export interface Dataset {
  label:           string;
  backgroundColor: string;
  borderWidth?:    number;
  data:            number[];
}
