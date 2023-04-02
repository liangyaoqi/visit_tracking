import request from "../utils/axios";

export const registry = (data) => request.post("/api/operator/registry", data);

export const login = (data) => request.post("/api/operator/login", data);

export const getOperator = () => request.get("/api/operator/getOperatorInfo");

export const listOprator = () => request.get("/api/operator/list");
