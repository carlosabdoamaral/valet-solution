import 'package:flutter/material.dart';
import 'package:valet_solution/pages/tests_page.dart';

void main() {
  runApp(const Controller());
}

class Controller extends StatefulWidget {
  const Controller({super.key});

  @override
  State<Controller> createState() => _ControllerState();
}

class _ControllerState extends State<Controller> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: const ColorScheme.dark(),
      ),
      home: TestsPage(),
    );
  }
}
