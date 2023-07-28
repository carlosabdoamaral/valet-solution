import moment from "moment";
import { CalculatorResult } from "../../interfaces/calculator-result";
import { getDiffInMinutes } from "../time";
import { CalculatorHandlerProps } from "./handler";
import { DateFormats } from "../date-formats";

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
    startTime: moment(props.startTime).format(DateFormats.TIME),
    endTime: moment(props.endTime).format(DateFormats.TIME),
    discount: discount,
    amount: amount,
  };
}
