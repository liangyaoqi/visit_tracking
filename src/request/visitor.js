import request from "../utils/axios";

const getVisitorRecord = () => request.get("/api/visitor/record");
