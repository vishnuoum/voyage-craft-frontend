
const BASE_URL = "http://localhost:8080"

export const authenticateUser = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    return response.json();
}

export const registerNewUser = async ({ username, mail, phone, password }) => {
    const response = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            mail: mail,
            phone: phone,
            password: password
        })
    });
    return response.json();
}

export const fetchJoinedGroup = async ({ token }) => {
    const response = await fetch(`${BASE_URL}/group/fetchJoinedGroups`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export const createNewGroup = async ({ groupName, groupDescription, token }) => {
    const response = await fetch(`${BASE_URL}/group/createNewGroup`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            groupName: groupName,
            description: groupDescription,
        })
    });
    return response.json();
}