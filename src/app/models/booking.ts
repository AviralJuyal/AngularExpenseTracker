import { User } from './user';

export interface Booking {
  passengers: User[];
  bookingId: number;
  time: string;
  totalAmount: number;
  TrainName: string;
  Source: string;
  Destination: string;
}
