import { Container, Grid } from "semantic-ui-react";
import { ParkingLot } from "../../interfaces/parking-lot";

export interface RenderValidationsProps {
  presets: ParkingLot[];
  activateValidationByID: Function;
}
export const RenderValidations = (props: RenderValidationsProps) => {
  return (
    <Grid columns={2} className="cell-list">
      {props.presets
        .filter((p) => p.active)
        .map((p) =>
          p.validations.map((v, i) => (
            <Grid.Column className="p-2" key={i}>
              <Container
                className={v.active ? "cell active" : "cell disabled"}
                onClick={() => {
                  props.activateValidationByID(i);
                }}
              >
                {v.name}
              </Container>
            </Grid.Column>
          ))
        )}
    </Grid>
  );
};
