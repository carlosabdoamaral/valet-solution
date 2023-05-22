import 'package:flutter/material.dart';
import 'package:valetsolution/model/parkinglot.dart';
import 'package:valetsolution/model/user.dart';

UserModel userMockData = UserModel(
  1,
  "Carlos Amaral",
  "ADMIN",
  parkingLotsPresets[0],
);

List<ParkingLot> parkingLotsPresets = [
  ParkingLot(
    0,
    "Starbucks",
    const Color.fromRGBO(0, 156, 0, 1), // TODO -> Mudar para #206E14
    0,
    20,
    20,
    4,
    [
      ParkingLotValidation(0, "Starbucks Validation", false, 4),
      ParkingLotValidation(1, "20m", false, 4),
      ParkingLotValidation(2, "20m", false, 4),
      ParkingLotValidation(3, "20m", false, 4),
    ],
  ),
  ParkingLot(
    1,
    "Deli",
    const Color.fromRGBO(156, 0, 0, 1),
    0,
    20,
    15,
    2,
    [
      ParkingLotValidation(0, "Validation", false, 18),
      ParkingLotValidation(1, "All day", false, 20),
    ],
  ),
];
