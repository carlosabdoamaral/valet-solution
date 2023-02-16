import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:valetsolution/widgets/sales_report_row.widget.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({super.key});

  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Recent Sales",
          style: GoogleFonts.poppins(
            color: Colors.black87,
            fontWeight: FontWeight.w300,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        centerTitle: true,
        iconTheme: const IconThemeData(
          color: Colors.black87,
          size: 20,
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (int i = 0; i <= 10; i++)
                  SalesReportRowWidget(
                    plate: "TEST-123",
                    value: i * 8.532 * 100,
                    date: DateTime.now(),
                  ),
                for (int i = 0; i <= 10; i++)
                  SalesReportRowWidget(
                    plate: "TEST-123",
                    value: i * 8.532 * -100,
                    date: DateTime.now(),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
