import moment from "moment";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Accordion, Card, Container, Grid, Icon } from "semantic-ui-react";
import { DateFormats } from "../../utils/date-formats";
import {
  SaveResultModel,
  fromCalculatorResultToSaveResult,
} from "../../interfaces/save-result";
import { CalculatorHandler } from "../../utils/calculator/handler";
import { StarbucksPreset } from "../../interfaces/starbucks";
import { PromenadePreset } from "../../interfaces/promenade";
import { SouthBeverlyGrillPreset } from "../../interfaces/south-beverly-grill";

export function DashboardView() {
  function generateMock(): SaveResultModel[] {
    let arr: SaveResultModel[] = [];

    for (let i = 0; i <= 10; i++) {
      let dateRangeOptions = [
        ["10:00", "12:00"],
        ["08:00", "09:30"],
        ["13:00", "15:23"],
        ["18:00", "22:11"],
        ["14:00", "23:30"],
        ["12:00", "15:30"],
      ];
      let dateRangeToUse =
        dateRangeOptions[Math.floor(Math.random() * dateRangeOptions.length)];

      let presets = [StarbucksPreset, PromenadePreset, SouthBeverlyGrillPreset];
      let presetToUse = presets[Math.floor(Math.random() * presets.length)];

      let dt = new Date();
      dt.setDate(i);

      let res = CalculatorHandler({
        parkingLot: presetToUse,
        startTime: dateRangeToUse[0],
        endTime: dateRangeToUse[1],
      });

      let obj = fromCalculatorResultToSaveResult(res);
      obj.created_at = dt;

      arr.push(obj);
    }

    return arr;
  }
  const [data, setData] = useState<SaveResultModel[]>(generateMock());
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleAccordionClick = (index: number) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Container style={{ marginTop: "80px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>Dashboard</h1>

      <Container
        style={{
          background: "#e6e6e6",
          borderRadius: "10px",
          marginTop: "30px",
          padding: "2em",
        }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            style={{ marginRight: "60px" }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="summary.amount"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>

      <Accordion styled fluid style={{ marginTop: "30px" }}>
        {/* {Object.entries(generateMock()).map((e, i) => (
          
        ))} */}
      </Accordion>
    </Container>
  );
}
