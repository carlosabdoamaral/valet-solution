
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import { CalculatorResult } from "../interfaces/calculator-result";
import { notify } from "../utils/notify";
import { SaveResultModel, fromCalculatorResultToSaveResult } from "../interfaces/save-result";

export async function SaveResult(props: CalculatorResult, setIsLoading: Function) {
    setIsLoading(true)
    try {
        const docData: SaveResultModel = fromCalculatorResultToSaveResult(props)
        const docRef = await addDoc(collection(db, "parking"), {
            ...docData
        }).finally(() => {
            setIsLoading(false)
        })

        notify(`Document written with ID: ${docRef.id}`, 'success')
    } catch (e) {
        notify(`Error adding document: ${e}`, 'error')
    }
}