import { Container, Dimmer, Form, Loader } from "semantic-ui-react";
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
import { VAPreset } from "../../interfaces/va";

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
    {
      ...VAPreset,
      id: 3,
    },
  ];

  const [presets, setPresets] = useState(presetsInitialState);
  const [mustShowOffCanvas, setMustShowOffCanvas] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  const getResult = () => {
    if (!!startTime && !!endTime) {
      let _result = null;

      if (activePreset.name === SouthBeverlyGrillPreset.name) {
        _result = southBeverlyGrillCalculator(
          {
            parkingLot: activePreset,
            startTime: startTime,
            endTime: endTime,
          },
          twoHours
        );
      } else {
        _result = defaultCalculator({
          parkingLot: activePreset,
          startTime: startTime,
          endTime: endTime,
        });
      }

      setResult(_result);
    }
  };

  useEffect(() => {
    getResult();
  }, [presets, startTime, endTime, dummy, activePreset]);


  useEffect(() => {
    setMustShowOffCanvas(false);
  }, [presets, dummy]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: calculator.tsx:137 ~ useEffect ~ isLoading:",
      isLoading
    );
  }, [isLoading]);
  return (
    <Container className="calculator">
      <Dimmer active={isLoading}>
        <Loader active={isLoading} />
      </Dimmer>
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
          beverlyHoursToUse: beverlyHoursToUse,
          setBeverlyHoursToUse: setBeverlyHoursToUse,
          getActivePreset: getActivePreset,
          mustShowOffCanvas: mustShowOffCanvas,
          setMustShowOffCanvas: setMustShowOffCanvas,
          setIsLoading: setIsLoading,
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
