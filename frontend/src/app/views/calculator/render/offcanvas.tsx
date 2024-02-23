import { Button, Container, Icon } from "semantic-ui-react";
import { CalculatorResult } from "../../../interfaces/calculator-result";
import { southBeverlyGrillCalculator } from "../../../utils/calculator/south-beverly-grill";
import { getDiffInHours, hourAndHalf, twoHours } from "../../../utils/time";
import { Spacer } from "../../../components/spacer";
import { SouthBeverlyGrillPreset } from "../../../interfaces/south-beverly-grill";
import { SaveResult } from "../../../http/save-result";

export interface RenderOffCanvasProps {
  result: CalculatorResult | undefined;
  setResult: Function;

  startTime: string;
  endTime: string;

  beverlyHoursToUse: number;
  setBeverlyHoursToUse: Function;

  getActivePreset: Function;

  mustShowOffCanvas: boolean;
  setMustShowOffCanvas: Function;

  setIsLoading: Function;
}

export const RenderOffCanvas = (props: RenderOffCanvasProps) => {
  const getDetailsList = (): string[][] => {
    const preset = ["Preset: ", props.result?.parkingLot.name || ""];

    const parkingTime = [
      "Parking time: ",
      `${props.startTime}h - ${props.endTime}h`,
    ];

    const totalParkedTime = [
      "Total parked time: ",
      getDiffInHours(props.startTime, props.endTime).toString(),
    ];

    const discount = [
      "Discount applied",
      props.result?.discount === 0
        ? ` by valet`
        : `: $${props.result?.discount || 0}`,
    ];

    let res: string[][] = [preset, parkingTime, totalParkedTime, discount];

    return res;
  };

  const renderDetails = () => {
    return (
      <div className="result-details-list">
        {getDetailsList().map((v, i) => (
          <div
            className="result-details-container"
            key={`result-details-container-${i}`}
          >
            <h2 className="me-auto">
              {v[0]}
              {v[1]}
            </h2>
          </div>
        ))}
        <Button
          fluid
          color="black"
          style={{
            backgroundImage: "linear-gradient(to right, #62C1FC , #7879E2)",
          }}
          onClick={() => {
            if (!!props.result) {
              SaveResult(props.result, props.setIsLoading);
            }
          }}
        >
          Save result
        </Button>
      </div>
    );
  };

  const renderBeverlyGrillExtraButton = () => {
    const toggleHoursToUse = (): number => {
      let newHoursToUse =
        props.beverlyHoursToUse === twoHours ? hourAndHalf : twoHours;

      props.setBeverlyHoursToUse(newHoursToUse);

      return newHoursToUse;
    };

    return (
      <div
        className="result-details-container pointer"
        onClick={() => {
          let _hoursToUse = toggleHoursToUse();

          props.setResult(
            southBeverlyGrillCalculator(
              {
                parkingLot: props.getActivePreset(),
                startTime: props.startTime,
                endTime: props.endTime,
              },
              _hoursToUse
            )
          );
        }}
      >
        <h2>
          <Icon
            name={`toggle ${
              props.beverlyHoursToUse === hourAndHalf ? "off" : "on"
            }`}
          />{" "}
          Using {props.beverlyHoursToUse === hourAndHalf ? "1h30" : "2h"}{" "}
          interval
        </h2>
      </div>
    );
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${
        props.mustShowOffCanvas ? "show" : ""
      }`}
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close ms-auto"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => {
            props.setMustShowOffCanvas(false);
          }}
        />
      </div>

      <div className="offcanvas-body">
        <h1
          style={{
            fontSize: "48px",
            color: props.result?.parkingLot.resultColor || "green",
          }}
        >
          ${props.result?.amount || 0}
        </h1>
        {props.result?.parkingLot.name !== SouthBeverlyGrillPreset.name ? (
          <Container
            fluid
            style={{ textAlign: "center" }}
            className="text-secondary"
          >
            Payments by card: +$1,00 of convenience fee
          </Container>
        ) : null}

        {Spacer(0, 30)}
        {props.getActivePreset().id === 2 && renderBeverlyGrillExtraButton()}
        {renderDetails()}
      </div>
    </div>
  );
};
