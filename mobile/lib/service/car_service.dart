import 'dart:convert';
import 'dart:ffi';

import 'package:valet_solution/models/car_model.dart';
import 'package:http/http.dart' as http;

Future<CarByIdResponseModel> doGetCarById(int id) async {
  final response = await http.post(
    Uri.parse('http://localhost:8080/car/details'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, int>{
      'id': id,
    }),
  );

  if (response.statusCode == 200) {
    return CarByIdResponseModel.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load album');
  }
}
