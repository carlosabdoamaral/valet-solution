import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class SalesReportRowWidget extends StatefulWidget {
  const SalesReportRowWidget(
      {super.key,
      required this.plate,
      required this.value,
      required this.date});

  final String plate;
  final double value;
  final DateTime date;

  @override
  State<SalesReportRowWidget> createState() => _SalesReportRowWidgetState();
}

class _SalesReportRowWidgetState extends State<SalesReportRowWidget> {
  final dateFormat = DateFormat("dd/MM/yyyy HH:mm");

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 15),
        Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.plate,
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
                Text(
                  dateFormat.format(widget.date),
                  style: GoogleFonts.poppins(
                    color: Colors.black54,
                    fontWeight: FontWeight.w300,
                  ),
                ),
              ],
            ),
            const Spacer(),
            Text(
              "${widget.value.isNegative ? "-" : "+"}\$${widget.value.round().toString().replaceAll("-", "")}",
              style: GoogleFonts.poppins(
                  color: widget.value.isNegative ? Colors.red : Colors.green),
            ),
          ],
        ),
        const SizedBox(height: 15),
        const Divider(),
      ],
    );
  }
}
