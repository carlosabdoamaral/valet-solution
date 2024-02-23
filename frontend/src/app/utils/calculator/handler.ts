import { CalculatorResult } from "../../interfaces/calculator-result";
import { ParkingLot } from "../../interfaces/parking-lot";
import { defaultCalculator } from "./default";

export interface CalculatorHandlerProps {
  parkingLot: ParkingLot;
  startTime: string;
  endTime: string;
}

export function CalculatorHandler(
  props: CalculatorHandlerProps
): CalculatorResult {
  switch (props.parkingLot.id) {
    default:
      return defaultCalculator(props);
  }
}
