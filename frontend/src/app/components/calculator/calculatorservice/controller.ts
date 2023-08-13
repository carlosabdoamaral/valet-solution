import { CalculatorResult } from "../../../interfaces/calculator-result";
import { ParkingLot } from "../../../interfaces/parking-lot";
import { defaultCalculator } from "./default.calculator";

export interface CalculatorControllerProps {
  licensePlate: string
  parkingLot: ParkingLot;
  startTime: string;
  endTime: string;
}

export function CalculatorController(
  props: CalculatorControllerProps
): CalculatorResult {
  switch (props.parkingLot.id) {
    default:
      return defaultCalculator(props);
  }
}
