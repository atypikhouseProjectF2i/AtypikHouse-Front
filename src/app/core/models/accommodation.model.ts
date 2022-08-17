import { Review } from './review.model';
import { TypeAccommodation } from './type-accommodation.model';
import { Region } from './region.model';
import { Activity } from './activity.model';
import { ServiceAccommodation } from './service-accommodation.model';
import { Equipement } from './equipement.model';
import { User } from './user.model';

export class Accommodation {
  id!: number;
  name!: string;
  price!: number;
  surface!: number;
  description!: string;
  address!: string;
  zipCode!: string;
  city!: string;
  region!: Region;
  nbSleeping!: number;
  capacityAdult!: number;
  capacityChild!: number;
  imageUrl!: string;
  typeAccommodation?: TypeAccommodation;
  reviews?: Review[];
  activity?: Activity[];
  service?: ServiceAccommodation[];
  equipement?: Equipement[];
  user?: User;
}
