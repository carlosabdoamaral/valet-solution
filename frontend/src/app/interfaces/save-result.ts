import { CalculatorResult } from "./calculator-result"

export interface SaveResultValidationModel {
    key: number,
    amount: number,
    name: string,
}

export interface SaveResultModel {
    license_plate: string,
    parkinglot: string,
    start: string,
    end: string,
    amount: number | string,
    discount: number,
    validations_used: SaveResultValidationModel[] | string[],
    created_at: Date,
}

export function fromCalculatorResultToSaveResult(props: CalculatorResult): SaveResultModel {
    const validationsUsed: SaveResultValidationModel[] = props.parkingLot.validations.filter(v => v.active === true).map(v => {
        return {
            key: v.key,
            amount: v.amount,
            name: v.name
        }
    })

    return {
        license_plate: props.licensePlate,
        parkinglot: props.parkingLot.name,

        start: props.startTime,
        end: props.endTime,

        amount: props.amount,
        discount: props.discount,

        validations_used: !!validationsUsed ? validationsUsed : ["No validations were used"],

        created_at: new Date(),
    }
}