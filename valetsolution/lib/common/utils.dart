import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/model/parkinglot.dart';

ParkingLot? findParkingLotByName(String name) {
  return parkingLotsPresets.firstWhere((e) => e.name == name);
}

DateTime ParseHHMMToDateTime(String s) {
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
