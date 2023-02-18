import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/model/parkinglot.dart';

class UserModel {
  int accountId;
  String name;
  String role;
  ParkingLot parkingLotPreset = parkingLotsPresets[0];

  UserModel(
    this.accountId,
    this.name,
    this.role,
    this.parkingLotPreset,
  );
}
