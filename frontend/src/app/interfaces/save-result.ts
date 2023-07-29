import { CalculatorResult } from "./calculator-result"

export interface SaveResultValidationModel {
    key: number,
    amount: number,
    name: string,
}

export interface SaveResultModel {
    summary: {
        start: string,
        end: string,
        amount: number,
        discount: number,
        validations_used: SaveResultValidationModel[] | string[],
    }

    parkinglot: {
        key: number,
        name: string
    }

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
        summary: {
            start: props.startTime,
            end: props.endTime,
            amount: props.amount,
            discount: props.discount,
            validations_used: !!validationsUsed ? validationsUsed : ["No validations used"],
        },

        parkinglot: {
            key: props.parkingLot.id,
            name: props.parkingLot.name
        },

        created_at: new Date(),
    }
}