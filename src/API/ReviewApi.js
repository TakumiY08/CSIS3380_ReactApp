import { URL } from "../utilities/url";

export async function fetchReivews(id) {
    try {
        const response = await fetch(URL + `/reivew/${id}`);
        
        if(response.ok) {
            return response.json();
        } else {
            console.error(response.status);
            return null;
        }
    } catch (error) {
        console.error("Error signing up user:", error);
        return null;
    }
}

export async function addReview(review) {
    try {
        const response = await fetch(URL + "/reivew/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        if(response.ok) {
            return true;
        } else {
            console.error(response.status);
            return null;
        }
    } catch(error) {
        console.error("Error signing up user:", error);
        return null;
    }
}