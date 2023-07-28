import { ParkingLot, Validation } from "./parking-lot";

export const StarbucksValidations: Validation[] = [
  {
    key: 0,
    name: "Validation",
    active: false,
    amount: 4,
  },
  {
    key: 1,
    name: "20m",
    active: false,
    amount: 4,
  },
  {
    key: 2,
    name: "20m",
    active: false,
    amount: 4,
  },
  {
    key: 3,
    name: "20m",
    active: false,
    amount: 4,
  },
];

export const StarbucksPreset: ParkingLot = {
  id: 0,
  name: "Starbucks",
  resultColor: "#206E14",
  min: 0,
  max: 25,
  intervalMin: 20,
  intervalAmount: 4,
  validations: StarbucksValidations,
  active: true,
};
