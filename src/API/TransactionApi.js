import { URL } from "../utilities/url";

export async function addTransaction(transaction) {
    try {
        const response = await fetch(URL + "/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction)
        });

        if(response.ok) {
            return true
        } else {
            console.error(response.status);
            return null;
        }

    } catch (error) {
        console.error("Error transaction", error);
        return null;
    }
}