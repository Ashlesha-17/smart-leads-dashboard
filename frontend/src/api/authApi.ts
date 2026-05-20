import API from "./axios";

export const loginUser = (data: any) => API.post("/auth/login", data);

export const registerUser = (data: any) => API.post("/auth/register", data);