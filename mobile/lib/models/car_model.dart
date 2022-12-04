import 'dart:ffi';

class CarByIdResponseModel {
  final int id;
  final String licensePlate;
  final String entranceAt;
  final String exitAt;
  final BasicParkingLotModel parkingLot;
  final DiscountTierModel discountTier;

  const CarByIdResponseModel({
    required this.id,
    required this.licensePlate,
    required this.entranceAt,
    required this.exitAt,
    required this.parkingLot,
    required this.discountTier,
  });

  factory CarByIdResponseModel.fromJson(Map<String, dynamic> json) {
    return CarByIdResponseModel(
      id: json['id'],
      licensePlate: json['license_plate'],
      entranceAt: json['entrance_at'],
      exitAt: json['exit_at'],
      parkingLot: json['parking_lot'],
      discountTier: json['discount_tier'],
    );
  }
}

class BasicParkingLotModel {
  final int id;
  final String name;

  const BasicParkingLotModel({
    required this.id,
    required this.name,
  });

  factory BasicParkingLotModel.fromJson(Map<String, dynamic> json) {
    return BasicParkingLotModel(
      id: json['id'],
      name: json['name'],
    );
  }
}

class DiscountTierModel {
  final int id;
  final String title;
  final Float value;

  const DiscountTierModel({
    required this.id,
    required this.title,
    required this.value,
  });

  factory DiscountTierModel.fromJson(Map<String, dynamic> json) {
    return DiscountTierModel(
      id: json['id'],
      title: json['title'],
      value: json['value'],
    );
  }
}

// {
// 	"id": 1,
// 	"license_plate": "ABC-1234",
// 	"entrance_at": "2022-11-28T15:20:00.324Z",
// 	"exit_at": "2022-11-28T19:40:00.324Z",
// 	"parking_lot": {
// 		"id": 1,
// 		"name": "[insomnia] Estacionamento Xyz"
// 	},
// 	"discount_tier": {
// 		"id": 1,
// 		"title": "SILVER",
// 		"value": 2
// 	}
// }