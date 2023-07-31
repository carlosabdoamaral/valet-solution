import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { SaveResultModel } from "../interfaces/save-result";

export async function FetchResult(): Promise<SaveResultModel[]> {
    await getDocs(collection(db, 'parking'))
        .then((querySnapshot) => {
            querySnapshot.forEach((element: { data: () => any; }) => {
                var data = element.data();
                console.log(data)
            });
        })

    return []
}