import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';

class ShortcutWidget extends StatefulWidget {
  const ShortcutWidget({
    super.key,
    required this.title,
    required this.subtitle,
    required this.onTap,
    required this.color,
  });

  final String title;
  final String subtitle;
  final Function onTap;
  final Color color;

  @override
  State<ShortcutWidget> createState() => _ShortcutWidgetState();
}

class _ShortcutWidgetState extends State<ShortcutWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 10),
        Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.title,
                  style: GoogleFonts.poppins(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  widget.subtitle,
                  style: GoogleFonts.poppins(
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                    color: Colors.black54,
                  ),
                ),
              ],
            ),
            const Spacer(),
            GestureDetector(
                onTap: () {
                  widget.onTap();
                },
                child: const Text(
                  "Run",
                ))
          ],
        ),
        const SizedBox(height: 10),
        const Divider(),
      ],
    );
  }
}
