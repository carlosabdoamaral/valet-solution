import { Container, Grid } from "semantic-ui-react";
import { ParkingLot } from "../../../interfaces/parking-lot";
import { CalculatorSubComponentProps } from "..";

export const RenderValidations = (props: CalculatorSubComponentProps) => {
  const activateValidationByID = (id: number) => {
    const presetID = props.presets.filter((p) => p.active)[0].id;

    const newPresetsState = props.presets;
    newPresetsState[presetID].validations[id].active =
      !newPresetsState[presetID].validations[id].active;

    props.setPresets(newPresetsState);
    props.forceRerender();
  };

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
                  activateValidationByID(i);
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
