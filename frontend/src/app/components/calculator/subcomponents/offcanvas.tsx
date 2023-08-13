import { Button, Container, Icon } from "semantic-ui-react";
import { CalculatorSubComponentProps } from "..";
import { getDiffInHours, hourAndHalf, twoHours } from "../../../common/time";
import { SaveResult } from "../../../http/save-result";
import { southBeverlyGrillCalculator } from "../calculatorservice/southbeverlygrill.calculator";
import { getSouthBeverlyGrillPreset } from "../../../common/presets";
import { useEffect, useState } from "react";

export const RenderOffCanvas = (props: CalculatorSubComponentProps) => {
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

    const licensePlate = ["License plate: ", props.licensePlate];

    let res: string[][] = [
      preset,
      parkingTime,
      totalParkedTime,
      discount,
      licensePlate,
    ];

    return res;
  };

  const [saveResultBtnDisabled, setSaveResultBtnDisabled] = useState(false);

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
              setSaveResultBtnDisabled(true);
              SaveResult(props.result, props.setIsLoading);
            }
          }}
          disabled={saveResultBtnDisabled}
        >
          Save result
        </Button>
      </div>
    );
  };

  const getActivePreset = () => {
    return props.presets.filter((p) => p.active)[0];
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
                licensePlate: props.licensePlate,
                parkingLot: getActivePreset(),
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

  useEffect(() => {
    setSaveResultBtnDisabled(false);
  }, [props.mustShowOffCanvas]);

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
        {props.result?.parkingLot.name !== getSouthBeverlyGrillPreset().name ? (
          <Container
            fluid
            style={{ textAlign: "center" }}
            className="text-secondary"
          >
            Payments by card: +$1,00 of convenience fee
          </Container>
        ) : null}

        <div style={{ height: "30px" }} />
        {getActivePreset().id === 2 && renderBeverlyGrillExtraButton()}
        {renderDetails()}
      </div>
    </div>
  );
};
