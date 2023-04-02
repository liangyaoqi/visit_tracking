import request from "../utils/axios";

const getVisitorRecord = () => request.get("/api/visitor/record");

const getVisitorByName = (name) =>
  request.get("/api/visitor", { params: { name: name } });

const addVisitor = (data) => request.post("/api/visitor/add", data);

export { getVisitorByName, addVisitor };
