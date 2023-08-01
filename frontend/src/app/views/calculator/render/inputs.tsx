import { Form, Grid } from "semantic-ui-react";

export interface RenderInputsProps {
  startTime: string;
  setStartTime: Function;

  endTime: string;
  setEndTime: Function;

  licensePlate: string;
  setLicensePlate: Function;
}

export const RenderInputs = (props: RenderInputsProps) => {
  return (
    <>
      <Form.Input
        placeholder={"xyz"}
        required
        type="text"
        label="License plase"
        value={props.licensePlate}
        onChange={(ev, data) => {
          props.setLicensePlate(data.value);
        }}
      />

      <Form.Input
        placeholder={"Entrance"}
        required
        type="time"
        label="Entrance"
        value={props.startTime}
        onChange={(ev, data) => {
          props.setStartTime(data.value);
        }}
      />

      <Form.Input
        placeholder={"Exit"}
        required
        type="time"
        label="Exit"
        min={props.startTime}
        value={props.endTime}
        onChange={(ev, data) => {
          props.setEndTime(data.value);
        }}
      />
    </>
  );
};
