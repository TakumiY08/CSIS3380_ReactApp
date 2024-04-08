import { URL } from "../utilities/url";

export async function signupUser(email, password) {
    try {
        const response = await fetch(URL + "/account/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

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

export async function loginUser(email, password) {
    try {
        const response = await fetch(URL + "/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if(response.ok) {
            return response.json();
        } else {
            console.error(response.status);
            return null;
        }
    } catch (error) {
        console.error("Error login user:", error);
        return null;
    }
}

export async function getEmails() {
    try {
        const response = await fetch(URL + "/account/signup/");
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching coffee data:", error);
        return [];
    }
}

export async function getUser(email) {
    try {
        const response = await fetch(URL + "/account/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

        if(response.ok) {
            const data = await response.json();
            return data.user;
        }
    } catch (error) {
        console.error("Error login user:", error);
        return null;
    }
}

export async function updateUser(userId, fullname, address, dob) {
    try {
        const response = await fetch(URL + "/account/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, fullname, address, dob})
        });

        if(response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error("Error update user:", error);
        return null;
    }
}