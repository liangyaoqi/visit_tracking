import request from "../utils/axios";

export const registry = (data) => request.post("/api/operator/registry", data);

export const login = (data) => request.post("/api/operator/login", data);

export const getOperator = () => request.get("/api/operator/getOperatorInfo");

export const listOprator = () => request.get("/api/operator/list");

export const deleteOperator = (id) =>
  request.delete(`/api/operator/delete/${id}`);

export const updateOperator = (data) =>
  request.post("/api/operator/update", data);

export const getOperatorById = (id) =>
  request.get(`/api/operator/getOperatorById/${id}`);
