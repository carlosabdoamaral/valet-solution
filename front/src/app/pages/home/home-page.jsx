import { useEffect, useState } from "react";
import { SpacerWidget } from "../../widgets/spacer-widget";
import "./home-page.scss";
import moment from "moment/moment";
import {
  Button,
  Container,
  Form,
  Grid,
  GridColumn,
  Header,
  Select,
} from "semantic-ui-react";
import { presetOptions } from "./presets";

export const HomePage = (_) => {
  const title = "Valet Solution";
  const [entranceAt, setEntranceAt] = useState(null);
  const [exitAt, setExitAt] = useState(null);
  const [result, setResult] = useState(null);
  const [totalParkingTime, setTotalParkingTime] = useState(null);

  const [presetToUse, setPresetToUse] = useState(presetOptions[0]);

  function getExtract() {
    let ms = moment(exitAt, "HH:mm:ss").diff(moment(entranceAt, "HH:mm:ss"));
    let date = moment.duration(ms);
    let hours = date._data.hours;
    let minutes = date._data.minutes;
    minutes += hours * 60;
    setTotalParkingTime(minutes);

    if (minutes <= 0) {
      setResult("Entrance must be greater than exit");
      return;
    }

    let min = presetToUse.min;
    let max = presetToUse.max;

    let intervalInMinutes = presetToUse.intervalInMinutes;
    let valuePerInterval = presetToUse.valuePerInterval;

    let intervals = Math.ceil(minutes / intervalInMinutes);
    let finalValue = intervals * valuePerInterval;

    let valueToRemoveWithValidation = 0;
    presetToUse.validations.forEach((v, i) => {
      if (v.isActive) {
        valueToRemoveWithValidation += v.valueToRemove;
      }
    });

    finalValue = finalValue - valueToRemoveWithValidation;

    if (finalValue >= max) {
      finalValue = max;
    } else if (finalValue <= min) {
      finalValue = 0;
    }

    setResult(finalValue);
  }

  function renderTitle() {
    return (
      <Header as="h1" textAlign="center">
        {title}
      </Header>
    );
  }

  function renderResult() {
    return (
      <>
        {typeof result === "string" ? (
          <Header as={"h3"} textAlign="center">
            {result}
          </Header>
        ) : (
          <Container>
            <>
              <Header textAlign="center">
                <Header.Subheader>Value to be paid</Header.Subheader>
              </Header>

              <Header
                textAlign="center"
                style={{
                  fontSize: "3rem",
                  color: `${presetToUse.resultColor}`,
                }}
              >
                U${result}
              </Header>
              <Header textAlign="center">{totalParkingTime} minutes</Header>
            </>

            <Header textAlign="center">
              <Header.Subheader>
                Payments by card: +$1,00 of convenience fee
              </Header.Subheader>
            </Header>
          </Container>
        )}
      </>
    );
  }

  function renderDateFilterArea() {
    return (
      <Container>
        <Form.Input
          type="time"
          label="Entrance"
          placeholder="Entrance"
          value={entranceAt}
          onChange={(e) => {
            setEntranceAt(e.target.value);
          }}
        />

        <Form.Input
          type="time"
          placeholder="saida"
          label="Exit"
          onChange={(e) => {
            setExitAt(e.target.value);
          }}
        />
      </Container>
    );
  }

  function renderValidationFilterArea() {
    return (
      <>
        {presetToUse.validations.map((v, i) => (
          <>
            <SpacerWidget height={10} />
            <Form.Group className="mb-3" key={i}>
              <Form.Checkbox
                type="checkbox"
                defaultChecked={false}
                value={v.name}
                label={v.name}
                onChange={(ev, data) => {
                  handleCheckValidation(ev, data, v);
                }}
              />
            </Form.Group>
          </>
        ))}
      </>
    );
  }

  function renderSubmitButton() {
    return (
      <Button
        fluid
        type="button"
        color="black"
        onClick={() => {
          getExtract();
        }}
      >
        Calculate
      </Button>
    );
  }

  function renderForm() {
    return (
      <Form>
        {renderDateFilterArea()}
        {renderValidationFilterArea()}
      </Form>
    );
  }

  function handleCheckValidation(ev, data, validation) {
    setPresetToUse((prev) => {
      let newValidationState = [];

      prev.validations.forEach((v, i) => {
        if (v.key === validation.key) {
          newValidationState.push({
            ...v,
            isActive: data.checked,
          });
        } else {
          newValidationState.push(v);
        }
      });

      return { ...prev, validations: newValidationState };
    });
  }

  function handleChangePreset(ev, data) {
    setPresetToUse(() => {
      let newPresetToUse = presetOptions.filter(
        (preset) => preset.value === data.value
      );

      return newPresetToUse[0];
    });
  }

  return (
    <Container>
      <SpacerWidget height={50} />
      {renderTitle()}

      <>
        <SpacerWidget height={20} />
        {result !== null && renderResult()}
        <SpacerWidget height={20} />

        <Select
          fluid
          options={presetOptions}
          placeholder={"Select preset"}
          onChange={handleChangePreset}
        />

        <SpacerWidget height={10} />

        {renderForm()}

        <SpacerWidget height={50} />

        {renderSubmitButton()}
      </>
    </Container>
  );
};
