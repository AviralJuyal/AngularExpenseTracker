export interface Station {
  stationID: number;
  stationName: string;
  stationCode: string;
}

export interface ResponseModel {
  message: string;
  result: boolean;
  data: any;
}
