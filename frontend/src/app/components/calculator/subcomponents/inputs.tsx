import { Form } from "semantic-ui-react";
import { CalculatorSubComponentProps } from "..";

export const RenderInputs = (props: CalculatorSubComponentProps) => {
  return (
    <>
      <Form.Input
        placeholder={"License plate"}
        maxLength={3}
        type="text"
        label="License plate"
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
