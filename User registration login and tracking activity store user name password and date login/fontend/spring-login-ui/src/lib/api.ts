const BASE_URL = "http://localhost:8080/api";

export const registerUser = async (user: { username: string; password: string }) =>
    fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(res => res.text())

export const loginUser = async (user: { username: string; password: string }) =>
    fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(res => res.text())

export const getAllUsers = async () =>
    fetch(`${BASE_URL}/users`).then(res => res.json())

export const getAllLogins = async () =>
    fetch(`${BASE_URL}/logins`).then(res => res.json())