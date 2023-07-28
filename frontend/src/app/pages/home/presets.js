export const starbucksPreset = {
  id: 1,
  key: "Starbucks",
  text: "Starbucks",
  value: "Starbucks",
  resultColor: "#206E14",
  min: 0,
  max: 25,
  intervalInMinutes: 20,
  valuePerInterval: 4,
  validations: [
    {
      key: 0,
      name: "Starbucks validation",
      isActive: false,
      valueToRemove: 4,
    },
    {
      key: 1,
      name: "20m",
      isActive: false,
      valueToRemove: 4,
    },
    {
      key: 2,
      name: "20m",
      isActive: false,
      valueToRemove: 4,
    },
    {
      key: 3,
      name: "20m",
      isActive: false,
      valueToRemove: 4,
    },
  ],
};

const deliPreset = {
  id: 2,
  name: "Deli",
  text: "Deli",
  value: "Deli",
  resultColor: "#7B1B13",
  min: 0,
  max: 20,
  intervalInMinutes: 15,
  valuePerInterval: 2,
  validations: [
    {
      key: 0,
      name: "Validation",
      isActive: false,
      valueToRemove: 18,
    },
    {
      key: 1,
      name: "All day",
      isActive: false,
      valueToRemove: 999,
    },
  ],
};

const southBeverlyGrillPreset = {
  id: 3,
  name: "South Beverly Grill",
  text: "South Beverly Grill",
  value: "South Beverly Grill",
  resultColor: "#7B1B13",
  min: 10,
  max: 25,
  intervalInMinutes: 15,
  valuePerInterval: 5,
  validations: [
    {
      key: 0,
      name: "Validation",
      isActive: false,
      valueToRemove: 0,
    },
  ],
};

export const presetOptions = [
  starbucksPreset,
  deliPreset,
  southBeverlyGrillPreset,
];
