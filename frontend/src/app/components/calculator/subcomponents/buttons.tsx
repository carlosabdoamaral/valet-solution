import { Form, Grid } from "semantic-ui-react";
import { CalculatorSubComponentProps } from "..";

export const RenderBtns = (props: CalculatorSubComponentProps) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Form.Button
          content={"Reset"}
          fluid
          color="black"
          type="button"
          onClick={() => {
            props.reset();
          }}
        />
      </Grid.Column>
      <Grid.Column>
        <Form.Button
          content={"Calculate"}
          fluid
          color="black"
          type="submit"
          style={{
            backgroundImage: "linear-gradient(to right, #62C1FC , #7879E2)",
          }}
        />
      </Grid.Column>
    </Grid>
  );
};
