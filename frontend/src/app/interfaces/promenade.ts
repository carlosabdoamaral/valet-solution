import { ParkingLot, Validation } from "./parking-lot";

export const PromenadeValidations: Validation[] = [
  {
    key: 0,
    name: "Validation",
    active: false,
    amount: 18,
  },
  {
    key: 1,
    name: "All day",
    active: false,
    amount: 20,
  },
];

export const PromenadePreset: ParkingLot = {
  id: 1,
  name: "Promenade",
  resultColor: "#7B1B13",
  min: 0,
  max: 20,
  intervalMin: 15,
  intervalAmount: 2,
  validations: PromenadeValidations,
  active: false,
};
