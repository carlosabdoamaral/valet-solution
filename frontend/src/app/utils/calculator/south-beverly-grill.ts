import moment from "moment";
import { CalculatorResult } from "../../interfaces/calculator-result";
import { CalculatorHandlerProps } from "./handler";
import { DateFormats } from "../date-formats";
import { getDiffInMinutes } from "../time";

export function southBeverlyGrillCalculator(
  props: CalculatorHandlerProps,
  extraInterval: number
): CalculatorResult {
  let minutes = getDiffInMinutes(props.startTime, props.endTime);
  let amount = 10;

  if (minutes > extraInterval) {
    minutes -= extraInterval;

    const intervals: number = Math.ceil(minutes / props.parkingLot.intervalMin);
    amount += intervals * props.parkingLot.intervalAmount;
  }

  if (amount >= props.parkingLot.max) amount = props.parkingLot.max;
  else if (amount <= props.parkingLot.min) amount = props.parkingLot.min;

  return {
    parkingLot: props.parkingLot,
    startTime: moment(props.startTime).format(DateFormats.TIME),
    endTime: moment(props.endTime).format(DateFormats.TIME),
    discount: 0,
    amount: amount,
  };
}
