import axios from "axios";

export const URL = "http://localhost:8080/";

export const BackendService = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
    },
});