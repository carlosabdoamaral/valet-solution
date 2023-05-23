import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/model/parkinglot.dart';

ParkingLot? findParkingLotByName(String name) {
  return parkingLotsPresets.firstWhere((e) => e.name == name);
}
