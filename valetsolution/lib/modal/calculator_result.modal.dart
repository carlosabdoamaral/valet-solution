import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:valetsolution/model/parkinglot.dart';

class CalculatorResultModal extends StatefulWidget {
  const CalculatorResultModal({
    super.key,
    required this.result,
  });

  final CalculatorResultModel result;

  @override
  State<CalculatorResultModal> createState() => _CalculatorResultModalState();
}

class _CalculatorResultModalState extends State<CalculatorResultModal> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 1,
      decoration: const BoxDecoration(color: Colors.white),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const Spacer(),
          Text(
            'Valet Solution',
            style: GoogleFonts.poppins(
              color: Colors.black,
              fontWeight: FontWeight.w600,
              fontSize: 20,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              '${widget.result.startDate} - ${widget.result.endDate}',
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                color: Colors.black54,
                fontWeight: FontWeight.w300,
                fontSize: 18,
              ),
            ),
          ),
          const SizedBox(height: 25),
          Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  children: [
                    Text(
                      "Final value",
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                        color: widget.result.parkingLot.resultColor,
                        fontWeight: FontWeight.w300,
                        fontSize: 18,
                      ),
                    ),
                    Text(
                      "U\$${widget.result.valueToPay.toString()}",
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                        color: widget.result.parkingLot.resultColor,
                        fontWeight: FontWeight.w300,
                        fontSize: 50,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  children: [
                    Text(
                      "Discounted value: U\$${widget.result.discountValue.toString()}",
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                        color: Colors.red,
                        fontWeight: FontWeight.w300,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 50),
          const Spacer(),
        ],
      ),
    );
  }
}
