import request from "../utils/axios";

const getBlacklist = (idcar) =>
  request.get("/api/blacklist/findByName", { params: { idcar } });

export { getBlacklist };
