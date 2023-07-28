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
    1,
    "Starbucks",
    const Color.fromRGBO(0, 156, 0, 1),
    0,
    25,
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
    2,
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
  ParkingLot(
    3,
    "South Beverly Grill",
    const Color.fromARGB(255, 0, 62, 156),
    0,
    25,
    15,
    5,
    [
      ParkingLotValidation(0, "30m", false, 10),
    ],
  ),
];
