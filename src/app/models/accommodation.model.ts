import { Review } from './review.model';
import { TypeAccommodation } from './type-accommodation.model';

export class Accommodation {
  id!: number;
  name!: string;
  price!: number;
  surface!: number;
  description!: string;
  address!: string;
  zip_code!: string;
  city!: string;
  region!: string;
  nbSleeping!: number;
  capacityAdult!: number;
  capacityChild!: number;
  typeAccommodation!: TypeAccommodation;
  reviews!: Review[];
}
