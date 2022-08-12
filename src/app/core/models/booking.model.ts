import { Accommodation } from './accommodation.model';

export class Booking {
  id!: number;
  total!: number;
  startDate!: Date;
  endDate!: Date;
  accommodation?: Accommodation;
}
