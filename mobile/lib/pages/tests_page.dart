import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:http/http.dart' as http;
import 'package:valet_solution/models/car_model.dart';
import 'package:valet_solution/service/car_service.dart';
import 'package:valet_solution/widgets/default_row_widget.dart';

class TestsPage extends StatefulWidget {
  const TestsPage({super.key});

  @override
  State<TestsPage> createState() => _TestsPageState();
}

class _TestsPageState extends State<TestsPage> {
  @override
  void initState() {
    super.initState();
    doGetCarById(1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("TEST PAGE"),
        actions: [],
      ),
      body: SafeArea(
        child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: ListView(
              children: const [
                DefaultRowWidget(title: "TESTE", value: "VALUE"),
                DefaultRowWidget(title: "TESTE", value: "VALUE"),
                DefaultRowWidget(title: "TESTE", value: "VALUE"),
                DefaultRowWidget(title: "TESTE", value: "VALUE"),
                DefaultRowWidget(title: "TESTE", value: "VALUE"),
              ],
            )),
      ),
    );
  }
}
