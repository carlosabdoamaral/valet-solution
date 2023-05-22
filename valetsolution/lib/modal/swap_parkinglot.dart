import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/common/utils.dart';
import 'package:valetsolution/model/parkinglot.dart';

class SwapParkingLotModal extends StatefulWidget {
  const SwapParkingLotModal({super.key});

  @override
  State<SwapParkingLotModal> createState() => _SwapParkingLotModalState();
}

class _SwapParkingLotModalState extends State<SwapParkingLotModal> {
  ParkingLot parkingLotSelected = parkingLotsPresets[0];

  int updateDropdownValue(presetNameSelected) {
    ParkingLot? pl = findParkingLotByName(presetNameSelected)!;
    if (pl.name.isEmpty) {
      return 0;
    }

    setState(() {
      parkingLotSelected = pl;
      userMockData.parkingLotPreset = pl;
    });

    return 1;
  }

  void handleSaveChanges() {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 1,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Color.fromRGBO(120, 121, 226, 1),
            Color.fromRGBO(98, 193, 252, 1)
          ],
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const Spacer(),
          Text(
            'Swap ParkingLot',
            style: GoogleFonts.poppins(
              color: Colors.white,
              fontWeight: FontWeight.w600,
              fontSize: 18,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              'Update which preset will be used on the valetsolution calc',
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                color: Colors.white54,
                fontWeight: FontWeight.w300,
                fontSize: 15,
              ),
            ),
          ),
          const SizedBox(height: 50),
          Container(
            width: 300,
            padding: const EdgeInsets.all(5),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.all(Radius.circular(5)),
            ),
            child: DropdownButton<String>(
              borderRadius: const BorderRadius.all(Radius.circular(5)),
              items: parkingLotsPresets.map((ParkingLot parkingLot) {
                return DropdownMenuItem<String>(
                  value: parkingLot.name,
                  child: Text(
                    parkingLot.name,
                    style: GoogleFonts.poppins(),
                  ),
                );
              }).toList(),
              value: parkingLotSelected.name,
              onChanged: updateDropdownValue,
            ),
          ),
          const SizedBox(height: 25),
          Container(
            width: 300,
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.all(Radius.circular(5)),
            ),
            child: GestureDetector(
              onTap: handleSaveChanges,
              child: Text(
                "Save changes!",
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const Spacer(),
          const SizedBox(height: 100),
        ],
      ),
    );
  }
}
