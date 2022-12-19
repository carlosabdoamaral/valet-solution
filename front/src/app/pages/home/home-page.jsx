import React, { useState } from "react";
import { TitleWidget } from "../../widgets/title/title-widget";
import { Form, Button } from "react-bootstrap";
import "./home-page.scss";
import moment from "moment/moment";

export const HomePage = (_) => {
  const title = "Valet Solution";
  const [entranceAt, setEntranceAt] = useState(null);
  const [exitAt, setExitAt] = useState(null);
  const [result, setResult] = useState(null);
  const checksLabels = ["Starbucks Validation", "20 min", "20 min", "20 min"];
  const [checksValues, setChecksValues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [totalParkingTime, setTotalParkingTime] = useState(null);

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

    let min = 0;
    let max = 20;

    let intervalInMinutes = 20;
    let valuePerInterval = 4;

    let intervals = Math.ceil(minutes / intervalInMinutes);
    let finalValue = intervals * valuePerInterval;

    checksValues.forEach((isTrue) => {
      if (isTrue) {
        finalValue = finalValue - 4;
      }
    });

    if (finalValue >= max) {
      finalValue = max;
    } else if (finalValue <= min) {
      finalValue = 0;
    }

    setResult(finalValue);
  }

  return (
    <div className="bg-light content">
      <TitleWidget title={title} />

      <div className="w-100 mx-auto p-4">
        {result !== null ? (
          <div className="text-center p-5">
            {typeof result === "string" ? (
              <h1 className="text-danger">{result}</h1>
            ) : (
              <div>
                <div className="my-4">
                  <small className="text-muted">Value to be paid</small>
                  <h1 className="text-success">U${result}</h1>
                  <small className="text-muted fw-bold ">
                    {totalParkingTime} minutes
                  </small>
                </div>
                <small className="text-muted">
                  Payments by card: +$1,00 of convenience fee
                </small>
              </div>
            )}
          </div>
        ) : null}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Entrance</Form.Label>
            <Form.Control
              type="time"
              placeholder="entrada"
              onChange={(e) => {
                setEntranceAt(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Exit</Form.Label>
            <Form.Control
              type="time"
              placeholder="saida"
              onChange={(e) => {
                setExitAt(e.target.value);
              }}
            />
          </Form.Group>

          {checksLabels.map((label, i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Check
                type="checkbox"
                defaultChecked={false}
                value={checksValues[i]}
                onChange={() => {
                  let newList = checksValues;

                  checksValues.forEach((check, k) => {
                    if (k === i) {
                      newList[k] = !newList[k];
                    }
                  });

                  setChecksValues(newList);
                }}
                label={label}
              />
            </Form.Group>
          ))}
          <Button
            className="w-100 mt-5"
            variant="dark"
            type="button"
            onClick={() => {
              getExtract();
            }}
          >
            Text...
          </Button>
        </Form>
      </div>
    </div>
  );
};
