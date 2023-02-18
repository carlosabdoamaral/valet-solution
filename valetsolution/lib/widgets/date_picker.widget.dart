import 'package:flutter/material.dart';
import 'package:valetsolution/common/date.dart';

class DatePickerWidget extends StatefulWidget {
  DatePickerWidget({
    super.key,
    required this.dateInput,
    required this.label,
  });

  TextEditingController dateInput = TextEditingController();
  final String label;

  @override
  State<DatePickerWidget> createState() => _DatePickerWidgetState();
}

class _DatePickerWidgetState extends State<DatePickerWidget> {
  void updateInputFieldValue() async {
    TimeOfDay? pickedDate = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );

    if (pickedDate != null) {
      setState(() {
        widget.dateInput.text = formatTimeOfDay(pickedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
      child: TextField(
        controller: widget.dateInput,
        decoration: InputDecoration(
            icon: const Icon(
              Icons.timer,
            ),
            labelText: widget.label),
        readOnly: true,
        onTap: updateInputFieldValue,
      ),
    );
  }
}
