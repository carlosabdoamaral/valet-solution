import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:valetsolution/common/calculator.dart';
import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/common/utils.dart';
import 'package:valetsolution/modal/calculator_result.modal.dart';
import 'package:valetsolution/model/parkinglot.dart';
import 'package:valetsolution/widgets/date_picker.widget.dart';

class CalculatorPage extends StatefulWidget {
  const CalculatorPage({super.key});

  @override
  State<CalculatorPage> createState() => _CalculatorPageState();
}

class _CalculatorPageState extends State<CalculatorPage> {
  ParkingLot parkingLotSelected = parkingLotsPresets[0];
  TextEditingController startDate = TextEditingController();
  TextEditingController endDate = TextEditingController();

  int updateParkingLotInputValue(String? parkingLotName) {
    ParkingLot? pl = findParkingLotByName(parkingLotName!)!;
    if (pl.name.isEmpty) {
      return 0;
    }

    setState(() {
      for (var v in parkingLotSelected.validations) {
        v.isActive = false;
      }

      parkingLotSelected = pl;
      userMockData.parkingLotPreset = pl;
    });

    return 1;
  }

  void openCalculatorResultModal() {
    if (startDate.text == "" || endDate.text == "") {
      showAlertDialog("Error", "Start date and/or End date mustn't be empty");
      return;
    }
    DateTime sd = parseHHMMToDateTime(startDate.text);
    DateTime ed = parseHHMMToDateTime(endDate.text);

    Duration diff = ed.difference(sd);
    int diffInMinutes = diff.inMinutes;

    if (diffInMinutes <= 0) {
      showAlertDialog("Error!", "Invalid difference between dates");
      return;
    }

    showModalBottomSheet<void>(
        context: context,
        builder: (BuildContext context) {
          return CalculatorResultModal(
            result: calculateResult(
              CalculatorParamsModel(
                startDate,
                endDate,
                parkingLotSelected,
                parkingLotSelected.validations,
              ),
            )!,
          );
        });
  }

  void handleValidationCheckboxChange(bool? value, int index) {
    setState(() {
      parkingLotSelected.validations[index].isActive = value;
    });
  }

  void handleClearFilters() {
    setState(() {
      startDate = TextEditingController();
      endDate = TextEditingController();

      for (var v in parkingLotSelected.validations) {
        v.isActive = false;
      }
    });
  }

  void showAlertDialog(String title, String msg) {
    Widget okButton = GestureDetector(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(5.0)),
          color: Colors.black,
        ),
        child: Text(
          "Close",
          style: GoogleFonts.poppins(
            color: Colors.white,
          ),
        ),
      ),
      onTap: () {
        Navigator.pop(context);
      },
    );

    AlertDialog alerta = AlertDialog(
      title: Text(title),
      content: Text(msg),
      actions: [
        okButton,
      ],
    );
    // exibe o dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alerta;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: Colors.transparent,
        title: Text(
          "Calculator",
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w300,
            fontSize: 20,
            color: Colors.black,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(16.0),
          width: MediaQuery.of(context).size.width * 1,
          height: MediaQuery.of(context).size.height * 1,
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(30),
              topLeft: Radius.circular(30),
            ),
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
            children: [
              const SizedBox(height: 16),
              Container(
                width: MediaQuery.of(context).size.width,
                padding: const EdgeInsets.all(16),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
                child: DropdownButton<String>(
                  borderRadius: const BorderRadius.all(Radius.circular(10)),
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
                  onChanged: updateParkingLotInputValue,
                ),
              ),
              const SizedBox(height: 20),
              DatePickerWidget(
                dateInput: startDate,
                label: "Start date",
              ),
              const SizedBox(height: 20),
              DatePickerWidget(
                dateInput: endDate,
                label: "End date",
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(8.0),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(10.0)),
                ),
                child: Column(children: [
                  for (int i = 0;
                      i < parkingLotSelected.validations.length;
                      i++)
                    CheckboxListTile(
                      contentPadding: const EdgeInsets.all(0),
                      controlAffinity: ListTileControlAffinity.leading,
                      value: parkingLotSelected.validations[i].isActive,
                      onChanged: (bool? value) {
                        handleValidationCheckboxChange(value, i);
                      },
                      title: Text(parkingLotSelected.validations[i].name),
                    ),
                ]),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  GestureDetector(
                    onTap: handleClearFilters,
                    child: Container(
                      width: MediaQuery.of(context).size.width * 0.45,
                      padding: const EdgeInsets.all(16),
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                      ),
                      child: Text(
                        "Clear!",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                  const Spacer(),
                  GestureDetector(
                    onTap: openCalculatorResultModal,
                    child: Container(
                      width: MediaQuery.of(context).size.width * 0.45,
                      padding: const EdgeInsets.all(16),
                      decoration: const BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                      ),
                      child: Text(
                        "Calculate!",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
