import 'package:valetsolution/common/utils.dart';
import 'package:valetsolution/model/parkinglot.dart';

CalculatorResultModel? calculateResult(CalculatorParamsModel params) {
  DateTime sd = ParseHHMMToDateTime(params.startDate.text);
  DateTime ed = ParseHHMMToDateTime(params.endDate.text);

  Duration diff = ed.difference(sd);
  int diffInMinutes = diff.inMinutes;

  double min = params.parkingLot.minValueToPay;
  double max = params.parkingLot.maxValueToPay;

  int intervalInMinutes = params.parkingLot.intervalInMinutes;
  double valuePerInterval = params.parkingLot.valuePerInterval;

  double valueToRemoveWithValidation = 0;
  for (var validation in params.validations) {
    if (validation.isActive == true) {
      valueToRemoveWithValidation += validation.valueToRemove;
    }
  }

  double intervals = (diffInMinutes / intervalInMinutes).ceilToDouble();
  double finalValue = intervals * valuePerInterval;
  finalValue -= valueToRemoveWithValidation;

  if (finalValue >= max) {
    finalValue = max;
  } else if (finalValue <= min) {
    finalValue = 0;
  }

  return CalculatorResultModel(
    params.startDate.text,
    params.endDate.text,
    finalValue,
    valueToRemoveWithValidation,
    params.parkingLot,
  );
}
