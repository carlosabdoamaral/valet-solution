import { CalculatorResult } from "../../interfaces/calculator-result";
import { getDiffInMinutes } from "../time";
import { CalculatorHandlerProps } from "./handler";

export function defaultCalculator(
  props: CalculatorHandlerProps
): CalculatorResult {
  const minutes = getDiffInMinutes(props.startTime, props.endTime);

  const intervals: number = Math.ceil(minutes / props.parkingLot.intervalMin);
  let amount: number = intervals * props.parkingLot.intervalAmount;

  let discount: number = 0;
  props.parkingLot.validations
    .filter((v) => v.active)
    .forEach((v) => (discount += v.amount));

  amount -= discount;

  if (amount >= props.parkingLot.max) amount = props.parkingLot.max;
  else if (amount <= props.parkingLot.min) amount = props.parkingLot.min;

  return {
    parkingLot: props.parkingLot,
    startTime: props.startTime,
    endTime: props.endTime,
    discount: discount,
    amount: amount,
  };
}
