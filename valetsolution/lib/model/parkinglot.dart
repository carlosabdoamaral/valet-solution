import 'package:flutter/material.dart';

class ParkingLot {
  int? key;
  String name;
  Color resultColor;
  double minValueToPay;
  double maxValueToPay;
  int intervalInMinutes;
  double valuePerInterval;
  List<ParkingLotValidation> validations;

  ParkingLot(
    this.key,
    this.name,
    this.resultColor,
    this.minValueToPay,
    this.maxValueToPay,
    this.intervalInMinutes,
    this.valuePerInterval,
    this.validations,
  );
}

class ParkingLotValidation {
  int? key;
  String name;
  bool? isActive;
  double valueToRemove;

  ParkingLotValidation(
    this.key,
    this.name,
    this.isActive,
    this.valueToRemove,
  );
}

class CalculatorParamsModel {
  final TextEditingController startDate;
  final TextEditingController endDate;
  final ParkingLot parkingLot;
  final List<ParkingLotValidation> validations;

  CalculatorParamsModel(
    this.startDate,
    this.endDate,
    this.parkingLot,
    this.validations,
  );
}

class CalculatorResultModel {
  final String startDate;
  final String endDate;
  final double valueToPay;
  final double discountValue;
  final ParkingLot parkingLot;

  CalculatorResultModel(
    this.startDate,
    this.endDate,
    this.valueToPay,
    this.discountValue,
    this.parkingLot,
  );
}
