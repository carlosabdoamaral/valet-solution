import { ParkingLot } from "./parking-lot";

export interface CalculatorResult {
  licensePlate: string;
  parkingLot: ParkingLot;
  startTime: string;
  endTime: string;
  discount: number;
  amount: number;
}
