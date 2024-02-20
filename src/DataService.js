import http from "./http";
const getAll = () => {
  return http.get("/members");
};

const get = id => {
  return http.get(`/members/${id}`);
};

const create = data => {
  return http.post("/members", data);
};

const update = (id, data) => {
  return http.put(`/members/${id}`, data);
};

const remove = id => {
  return http.delete(`/members/${id}`);
};


const MemberService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default MemberService;