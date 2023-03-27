import request from "../utils/axios";

export const registry = (data) => request.post("/api/operator/registry", data);

export const login = (data) => request.post("/api/operator/login", data);
