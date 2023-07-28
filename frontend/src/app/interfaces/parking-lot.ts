export interface ParkingLot {
  id: number;
  name: string;
  resultColor: string;
  min: number;
  max: number;
  intervalMin: number;
  intervalAmount: number;
  validations: Validation[];
  active: boolean;
}

export interface Validation {
  key: number;
  name: string;
  active: boolean;
  amount: number;
}
