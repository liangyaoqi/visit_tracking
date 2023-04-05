import request from "../utils/axios";

const getVisitorRecord = () => request.get("/api/visitor/record");

const getVisitorByName = (data) => request.post("/api/visitor/visitors", data);

const addVisitor = (data) => request.post("/api/visitor/add", data);

const todayVisitor = () => request.get("/api/visitor/total");

export { getVisitorByName, addVisitor, todayVisitor };
