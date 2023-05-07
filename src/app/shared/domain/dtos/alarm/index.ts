export interface alarmDTO {
  alarmTime: string;
  userId: string;
}

export interface alarmCreatedDTO extends alarmDTO {
  id: string;
}
