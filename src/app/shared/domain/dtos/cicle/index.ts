import { Flow, Symptoms } from '../../enums';

export interface cicleDTO {
  startDate: string;
  endDate: string;
  flow: Flow;
  symptoms: Symptoms | undefined;
  duration: string;
  fertileDays: string;
  ovulationDay: string;
  userId: string;
}

export interface cicleUseCase {
  startDate: string;
  endDate: string;
  flow: Flow;
  symptoms?: Symptoms;
  userId: string;
}

export interface cicleCreatedDTO extends cicleDTO {
  id: string;
}
