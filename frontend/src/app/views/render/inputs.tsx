import { Form } from "semantic-ui-react";

export interface RenderInputsProps {
  startTime: string;
  setStartTime: Function;

  endTime: string;
  setEndTime: Function;
}

export const RenderInputs = (props: RenderInputsProps) => {
  return (
    <>
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
