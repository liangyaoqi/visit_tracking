import request from "../utils/axios";

export const getDept = () => request.get("/api/dept/list");

export const addDept = (data) => request.post("/api/dept/add", data);

export const deleteDept = (id) => request.delete(`/api/dept/delete/${id}`);
