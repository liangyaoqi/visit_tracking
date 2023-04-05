import request from "../utils/axios";

export const addAnnounce = (data) => request.post("/api/announce/add", data);

export const getAnnounce = () => request.get("/api/announce");
