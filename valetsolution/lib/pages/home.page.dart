import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:valetsolution/common/data.mock.dart';
import 'package:valetsolution/common/shortcuts.dart';
import 'package:valetsolution/modal/swap_parkinglot.dart';
import 'package:valetsolution/model/parkinglot.dart';
import 'package:valetsolution/model/user.dart';
import 'package:valetsolution/widgets/sales_report_row.widget.dart';
import 'package:valetsolution/widgets/shortcut.widget.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  void goToReportsPage() {
    Navigator.pushNamed(context, '/reports');
  }

  void openToSwapParkingLotModal() {
    showModalBottomSheet<void>(
        context: context,
        builder: (BuildContext context) {
          return const SwapParkingLotModal();
        });
  }

  List<ShortcutWidget> shortcutsFiltered() {
    List<ShortcutWidget> arr = [];

    int x = 0;
    shortcuts.map((shortcut) {
      if (x < 3) {
        arr.add(shortcut);
      }

      x++;
    }).toList();

    return arr;
  }

  String getSalutMessage() {
    DateTime now = DateTime.now();

    if (now.hour >= 5 && now.hour <= 12) {
      return "Good morning,";
    } else if (now.hour >= 13 && now.hour <= 18) {
      return "Good evening,";
    } else {
      return "Good night,";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // TODO -> THIS IS THE *HEADER SECTION*
            Container(
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(30),
                  bottomLeft: Radius.circular(30),
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
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Spacer(),
                          GestureDetector(
                            onTap: openToSwapParkingLotModal,
                            child: const Icon(
                              Icons.swap_vert,
                              color: Colors.white,
                              size: 30,
                            ),
                          ),
                          GestureDetector(
                            onTap: goToReportsPage,
                            child: const Icon(
                              Icons.attach_money,
                              color: Colors.white,
                              size: 30,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 30),
                      Text(
                        getSalutMessage(),
                        style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontSize: 15,
                        ),
                      ),
                      Text(
                        userMockData.name,
                        style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 10),
                    ],
                  ),
                ),
              ),
            ),

            // TODO -> THIS IS THE *DASHBOARD SECTION*
            // const SizedBox(height: 10),
            // Padding(
            //   padding: const EdgeInsets.all(16.0),
            //   child: Column(
            //     children: [
            //       Row(
            //         children: [
            //           Text(
            //             "Dashboard",
            //             style: GoogleFonts.poppins(
            //               fontSize: 20,
            //               fontWeight: FontWeight.w600,
            //             ),
            //           ),
            //           const Spacer(),
            //           GestureDetector(
            //             child: Text(
            //               "Details",
            //               style: GoogleFonts.poppins(
            //                 color: Colors.grey,
            //               ),
            //             ),
            //           ),
            //         ],
            //       ),
            //     ],
            //   ),
            // ),

            // TODO -> THIS IS THE *SHORTCUTS SECTION*
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Row(
                    children: [
                      Text(
                        "Shortcuts",
                        style: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const Spacer(),
                      GestureDetector(
                        child: Text(
                          "See all (${shortcuts.length})",
                          style: GoogleFonts.poppins(
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: shortcutsFiltered(),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
