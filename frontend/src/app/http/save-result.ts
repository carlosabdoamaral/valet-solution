
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import { CalculatorResult } from "../interfaces/calculator-result";
import { notify } from "../utils/notify";

export async function SaveResult(props: CalculatorResult) {
    try {
        const validationsUsed = props.parkingLot.validations.filter(v => v.active === true).map(v => {
            return {
                key: v.key,
                amount: v.amount,
                name: v.name
            }
        })

        const summary = {
            start: props.startTime,
            end: props.endTime,
            amount: props.amount,
            discount: props.discount,
            validations_used: !!validationsUsed ? validationsUsed : ["No validations used"]
        }

        const parkinglot = {
            key: props.parkingLot.id,
            name: props.parkingLot.name,
        }

        const docRef = await addDoc(collection(db, "parking"), {
            summary: summary,
            parkinglot: parkinglot
        });

        notify(`Document written with ID: ${docRef.id}`, 'success')
    } catch (e) {
        notify(`Error adding document: ${e}`, 'error')
    }
}