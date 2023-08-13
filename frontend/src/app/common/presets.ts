import { ParkingLot } from "../interfaces/parking-lot";

export function getStarbucksPreset(): ParkingLot {
    return {
        id: 0,
        name: "Starbucks",
        resultColor: "#206E14",
        min: 0,
        max: 25,
        intervalMin: 20,
        intervalAmount: 4,
        validations: [
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
        ],
        active: true,
    };
}

export function getSouthBeverlyGrillPreset(): ParkingLot {
    return {
        id: 2,
        name: "South Beverly Grill",
        resultColor: "#7B1B13",
        min: 10,
        max: 25,
        intervalMin: 15,
        intervalAmount: 5,
        validations: [],
        active: false,
    }
}

export function getPromenadePreset(): ParkingLot {
    return {
        id: 1,
        name: "Promenade",
        resultColor: "#7B1B13",
        min: 0,
        max: 20,
        intervalMin: 15,
        intervalAmount: 2,
        validations: [
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
        ],
        active: false,
    }
}