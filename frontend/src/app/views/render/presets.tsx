import { Container, Grid } from "semantic-ui-react";
import { ParkingLot } from "../../interfaces/parking-lot";

export interface RenderPresetsProps {
  presets: ParkingLot[];
  activatePresetByID: Function;
}

export const RenderPresets = (props: RenderPresetsProps) => {
  return (
    <Grid columns={2} className="cell-list">
      {props.presets.map((preset, i) => (
        <Grid.Column className="p-2" key={i}>
          <Container
            onClick={() => {
              props.activatePresetByID(i);
            }}
            className={preset.active ? "cell active" : "cell disabled"}
          >
            {preset.name}
          </Container>
        </Grid.Column>
      ))}
    </Grid>
  );
};
