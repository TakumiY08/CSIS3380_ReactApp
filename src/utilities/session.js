const SESSION_KEY = "SESSIONKEY";

export async function setSession(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export async function getSession() {
    const data = sessionStorage.getItem(SESSION_KEY);
    if(data !== null) {
        const jsonData = JSON.parse(data);
        return jsonData;
    } else {
        return null;
    }
}