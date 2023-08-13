import { Container, Dimmer, Form, Loader } from "semantic-ui-react";
import "./index.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ParkingLot } from "../../interfaces/parking-lot";
import { CalculatorResult } from "../../interfaces/calculator-result";
import { southBeverlyGrillCalculator } from "./calculatorservice/southbeverlygrill.calculator";
import { defaultCalculator } from "./calculatorservice/default.calculator";
import { twoHours } from "../../common/time";
import { RenderBtns } from "./subcomponents/buttons";
import {
  getPromenadePreset,
  getSouthBeverlyGrillPreset,
  getStarbucksPreset,
} from "../../common/presets";
import { RenderOffCanvas } from "./subcomponents/offcanvas";
import { RenderPresets } from "./subcomponents/presets";
import { RenderInputs } from "./subcomponents/inputs";
import { RenderValidations } from "./subcomponents/validations";

export interface CalculatorSubComponentProps {
  presetsInitialState: ParkingLot[];

  presets: ParkingLot[];
  setPresets: Dispatch<SetStateAction<ParkingLot[]>>;

  mustShowOffCanvas: boolean;
  setMustShowOffCanvas: Dispatch<SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;

  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;

  licensePlate: string;
  setLicensePlate: Dispatch<SetStateAction<string>>;

  result: CalculatorResult | undefined;
  setResult: Dispatch<SetStateAction<CalculatorResult | undefined>>;

  dummy: boolean;
  setDummy: Dispatch<SetStateAction<boolean>>;

  beverlyHoursToUse: number;
  setBeverlyHoursToUse: Dispatch<SetStateAction<number>>;

  forceRerender: Function;
  reset: Function;
  activatePresetByID: Function;
}

export function CalculatorComponent() {
  const presetsInitialState = [
    {
      ...getStarbucksPreset(),
      id: 0,
    },
    {
      ...getPromenadePreset(),
      id: 1,
    },
    {
      ...getSouthBeverlyGrillPreset(),
      id: 2,
    },
  ];
  const [presets, setPresets] = useState<ParkingLot[]>(presetsInitialState);
  const [mustShowOffCanvas, setMustShowOffCanvas] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [result, setResult] = useState<CalculatorResult>();
  const [dummy, setDummy] = useState<boolean>(false);
  const [beverlyHoursToUse, setBeverlyHoursToUse] = useState<number>(twoHours);

  function getSubComponentsProps(): CalculatorSubComponentProps {
    return {
      presetsInitialState,
      presets,
      setPresets,
      mustShowOffCanvas,
      setMustShowOffCanvas,
      isLoading,
      setIsLoading,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      licensePlate,
      setLicensePlate,
      result,
      setResult,
      dummy,
      setDummy,
      beverlyHoursToUse,
      setBeverlyHoursToUse,
      forceRerender,
      reset,
      activatePresetByID,
    };
  }

  const forceRerender = () => {
    setDummy(!dummy);
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

  const getActivePreset = () => {
    return presets.filter((p) => p.active)[0];
  };

  const getResult = () => {
    if (!!startTime && !!endTime) {
      let _result = null;

      if (getActivePreset().name === getSouthBeverlyGrillPreset().name) {
        _result = southBeverlyGrillCalculator(
          {
            licensePlate: licensePlate,
            parkingLot: getActivePreset(),
            startTime: startTime,
            endTime: endTime,
          },
          twoHours
        );
      } else {
        _result = defaultCalculator({
          licensePlate: licensePlate,
          parkingLot: getActivePreset(),
          startTime: startTime,
          endTime: endTime,
        });
      }

      setResult(_result);
    }
  };

  useEffect(() => {
    getResult();
  }, [presets, licensePlate, startTime, endTime, dummy]);

  useEffect(() => {
    setMustShowOffCanvas(false);
  }, [presets, dummy]);

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

        {RenderOffCanvas(getSubComponentsProps())}
        {RenderPresets(getSubComponentsProps())}
        {RenderInputs(getSubComponentsProps())}
        {RenderValidations(getSubComponentsProps())}
        {RenderBtns(getSubComponentsProps())}
      </Form>
    </Container>
  );
}
