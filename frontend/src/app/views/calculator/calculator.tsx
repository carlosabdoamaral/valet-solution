import { Container, Form } from "semantic-ui-react";
import "./calculator.scss";
import { useEffect, useState } from "react";
import { StarbucksPreset } from "../../interfaces/starbucks";
import { PromenadePreset } from "../../interfaces/promenade";
import { SouthBeverlyGrillPreset } from "../../interfaces/south-beverly-grill";
import { ParkingLot } from "../../interfaces/parking-lot";
import { CalculatorResult } from "../../interfaces/calculator-result";
import { southBeverlyGrillCalculator } from "../../utils/calculator/south-beverly-grill";
import { defaultCalculator } from "../../utils/calculator/default";
import { RenderValidations } from "./render/validations";
import { RenderOffCanvas } from "./render/offcanvas";
import { twoHours } from "../../utils/time";
import { RenderPresets } from "./render/presets";
import { RenderInputs } from "./render/inputs";
import { RenderBtns } from "./render/buttons";

export function CalculatorView() {
  const presetsInitialState = [
    {
      ...StarbucksPreset,
      id: 0,
    },
    {
      ...PromenadePreset,
      id: 1,
    },
    {
      ...SouthBeverlyGrillPreset,
      id: 2,
    },
  ];

  const [presets, setPresets] = useState(presetsInitialState);
  const [mustShowOffCanvas, setMustShowOffCanvas] = useState(true);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const [result, setResult] = useState<CalculatorResult>();
  const [dummy, setDummy] = useState(false);

  const [beverlyHoursToUse, setBeverlyHoursToUse] = useState<number>(twoHours);

  const forceRerender = () => {
    setDummy(!dummy);
  };

  const activatePresetByID = (id: number) => {
    setPresets((prev: ParkingLot[]) => {
      return prev.map((p, i) => {
        return {
          ...p,
          active: i === id ? true : false,
        };
      });
    });
  };

  const activateValidationByID = (id: number) => {
    const presetID = presets.filter((p) => p.active)[0].id;

    const newPresetsState = presets;
    newPresetsState[presetID].validations[id].active =
      !newPresetsState[presetID].validations[id].active;

    setPresets(newPresetsState);
    forceRerender();
  };

  const getActivePreset = () => {
    return presets.filter((p) => p.active)[0];
  };

  const reset = () => {
    setStartTime("");
    setEndTime("");
    setLicensePlate("");

    const presetsReseted = presets.map((parking, i) => {
      return {
        ...parking,
        active: i === 0 ? true : false,
        validations: parking.validations.map((validation) => {
          return {
            ...validation,
            active: false,
          };
        }),
      };
    });

    setPresets(presetsReseted);
  };

  const activePreset = getActivePreset();
  useEffect(() => {
    if (!!startTime && !!endTime) {
      let _result = null;

      if (activePreset.name === SouthBeverlyGrillPreset.name) {
        _result = southBeverlyGrillCalculator(
          {
            licensePlate: licensePlate,
            parkingLot: activePreset,
            startTime: startTime,
            endTime: endTime,
          },
          twoHours
        );
      } else {
        _result = defaultCalculator({
          licensePlate: licensePlate,
          parkingLot: activePreset,
          startTime: startTime,
          endTime: endTime,
        });
      }

      setResult(_result);
    }
  }, [presets, startTime, endTime, dummy, activePreset]);

  useEffect(() => {
    setMustShowOffCanvas(false);
  }, [presets, dummy]);

  return (
    <Container className="calculator">
      <Form
        className="content"
        onSubmit={() => {
          setMustShowOffCanvas(true);
        }}
      >
        <h1>ValetSolution</h1>

        {RenderOffCanvas({
          result: result,
          setResult: setResult,
          startTime: startTime,
          endTime: endTime,
          licensePlate: licensePlate,
          beverlyHoursToUse: beverlyHoursToUse,
          setBeverlyHoursToUse: setBeverlyHoursToUse,
          getActivePreset: getActivePreset,
          mustShowOffCanvas: mustShowOffCanvas,
          setMustShowOffCanvas: setMustShowOffCanvas,
        })}

        {RenderPresets({
          presets: presets,
          activatePresetByID: activatePresetByID,
        })}

        {RenderInputs({
          startTime: startTime,
          setStartTime: setStartTime,
          endTime: endTime,
          setEndTime: setEndTime,
          licensePlate: licensePlate,
          setLicensePlate: setLicensePlate,
        })}

        {RenderValidations({
          presets: presets,
          activateValidationByID: activateValidationByID,
        })}

        {RenderBtns({ reset: reset })}
      </Form>
    </Container>
  );
}
