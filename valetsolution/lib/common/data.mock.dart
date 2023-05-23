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
    1,
    "Deli",
    const Color.fromRGBO(156, 0, 0, 1),
    0,
    20,
    15,
    2,
    [
      ParkingLotValidation(0, "Validation", false, 18),
      ParkingLotValidation(1, "All day", false, 999999),
    ],
  ),
  ParkingLot(
    2,
    "South Beverly Grill",
    const Color.fromARGB(255, 0, 62, 156),
    10,
    25,
    15,
    5,
    [
      ParkingLotValidation(0, "TODO: MUDAR", false, 10),
    ],
  ),
];
