import { ParkingLot } from "./parking-lot";

export interface CalculatorResult {
  parkingLot: ParkingLot;
  startTime: string;
  endTime: string;
  discount: number;
  amount: number;
}
