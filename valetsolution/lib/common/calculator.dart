import 'dart:ffi';

import 'package:valetsolution/model/parkinglot.dart';

DateTime parseHHMMToDateTime(String s) {
  String dtHourStr = "";
  String dtMinuteStr = "";
  int doubleDotIndex = s.indexOf(":");
  for (int i = 0; i < s.length; i++) {
    String letter = s[i];
    if (i < doubleDotIndex) {
      dtHourStr = "$dtHourStr$letter";
    } else if (i > doubleDotIndex) {
      dtMinuteStr = "$dtMinuteStr$letter";
    }
  }

  int dtHourInt = int.parse(dtHourStr);
  int dtMinuteInt = int.parse(dtMinuteStr);

  DateTime now = DateTime.now();
  return DateTime(
    now.year,
    now.month,
    now.day,
    dtHourInt,
    dtMinuteInt,
  );
}

CalculatorResultModel? calculateResult(CalculatorParamsModel params) {
  DateTime sd = parseHHMMToDateTime(params.startDate.text);
  DateTime ed = parseHHMMToDateTime(params.endDate.text);

  Duration diff = ed.difference(sd);
  int diffInMinutes = diff.inMinutes;

  double min = params.parkingLot.minValueToPay;
  double max = params.parkingLot.maxValueToPay;

  int intervalInMinutes = params.parkingLot.intervalInMinutes;
  double valuePerInterval = params.parkingLot.valuePerInterval;

  double valueToRemoveWithValidation = 0;
  params.validations.forEach((validation) {
    if (validation.isActive == true) {
      valueToRemoveWithValidation += validation.valueToRemove;
    }
  });

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
