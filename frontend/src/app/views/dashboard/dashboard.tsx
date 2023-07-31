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
import {
  Accordion,
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Table,
} from "semantic-ui-react";
import { DateFormats } from "../../utils/date-formats";
import {
  SaveResultModel,
  fromCalculatorResultToSaveResult,
} from "../../interfaces/save-result";
import { CalculatorHandler } from "../../utils/calculator/handler";
import { StarbucksPreset } from "../../interfaces/starbucks";
import { PromenadePreset } from "../../interfaces/promenade";
import { SouthBeverlyGrillPreset } from "../../interfaces/south-beverly-grill";
import { db } from "../../http/firebase";
import { FetchResult } from "../../http/fetch-result";

export function DashboardView() {
  const USE_MOCK = false;
  const [data, setData] = useState<SaveResultModel[]>([]);

  const dataFormatted = Object.values(data).map((v, i) => {
    return [
      i,
      v.parkinglot.name,
      moment(v.created_at).format(DateFormats.DATE),
      `${v.summary.start} - ${v.summary.end}`,
      toAmount(v.summary.amount),
      v.summary.discount,
    ];
  });

  const columns = [
    "Id",
    "Parkinlot",
    "Date",
    "Parked time",
    "Amount",
    "Discount",
  ];

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
      // dt.setDate(i);

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

  function toAmount(s: number): string {
    return s.toLocaleString("en-IN", {
      maximumSignificantDigits: 3,
      style: "currency",
      currency: "USD",
    });
  }

  function handleExportCSV(headers: string[], content: any[]) {
    let csv = `${headers}\n`;
    content.forEach((row) => {
      csv += row.join(",");
      csv += "\n";
    });

    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = "ValetSolutionHistoric.csv";
    hiddenElement.click();
  }

  function renderChart(data: SaveResultModel[]) {
    return (
      <Container
        style={{
          background: "#e6e6e6",
          padding: "2em",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            style={{ marginRight: "60px" }}
          >
            <CartesianGrid strokeDasharray="1 1" />
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
    );
  }

  function renderTable(data: SaveResultModel[]) {
    return (
      <div style={{ marginTop: "30px" }}>
        <Table striped>
          <Table.Body>
            {dataFormatted.map((e) => (
              <Table.Row>
                {e.map((item) => (
                  <Table.Cell active>
                    <p style={{ color: "#0008" }}>{item}</p>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  function renderTopChartData(data: SaveResultModel[]) {
    function getGridMap(data: SaveResultModel[]): Object {
      let baseGridMap = {
        "Total amount": 0,
        "Total of Cars": data.length,
        "Most lucrative parkinglot": "",
      };

      let parkingLotsCounter = {
        Starbucks: 0.0,
        Promenade: 0.0,
        "South Beverly Grill": 0.0,
      };

      let starbucks = StarbucksPreset.name.toUpperCase();
      let promenade = PromenadePreset.name.toUpperCase();
      let southBeverlyGrill = SouthBeverlyGrillPreset.name.toUpperCase();

      data.forEach((row, index) => {
        baseGridMap["Total amount"] += row.summary.amount;

        if (row.parkinglot.name.toUpperCase() === starbucks.toUpperCase()) {
          parkingLotsCounter.Starbucks += row.summary.amount;
        } else if (
          row.parkinglot.name.toUpperCase() === promenade.toUpperCase()
        ) {
          parkingLotsCounter.Promenade += row.summary.amount;
        } else if (
          row.parkinglot.name.toUpperCase() === southBeverlyGrill.toUpperCase()
        ) {
          parkingLotsCounter["South Beverly Grill"] += row.summary.amount;
        }
      });

      baseGridMap["Most lucrative parkinglot"] =
        Object.entries(parkingLotsCounter).sort()[2][0];

      return {
        ...baseGridMap,
        "Total amount": toAmount(baseGridMap["Total amount"]),
      };
    }

    return (
      <Grid columns={3}>
        {Object.entries(getGridMap(data)).map((e) => (
          <Grid.Column>
            <div
              style={{
                textAlign: "center",
                margin: "0",
                background: "#e6e6e6",
                color: "#0008",
                borderRadius: "10px",
                marginBottom: "30px",
                padding: "40px 0",
              }}
            >
              <h1>{e[1].toString()}</h1>
              <p>{e[0].toString()}</p>
            </div>
          </Grid.Column>
        ))}
      </Grid>
    );
  }

  useEffect(() => {
    document.title = "Dashboard";

    if (USE_MOCK) {
      setData(generateMock());
    } else {
      FetchResult().then((res) => setData(res));
    }
  }, []);

  return (
    <Container style={{ marginTop: "80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>Dashboard</h1>
        <Button
          color="green"
          onClick={() => {
            handleExportCSV(columns, dataFormatted);
          }}
        >
          Export to CSV
        </Button>
      </div>
      {renderTopChartData(data)}
      {renderChart(data)}
      {renderTable(data)}
    </Container>
  );
}
