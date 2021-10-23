import jwt_decode from "jwt-decode";

const token = localStorage.getItem("user");
const decoded = token ? jwt_decode(token) : "";

export const userInfo = {
	name: decoded.name,
	email: decoded.email,
	_id: decoded._id,
};
