import jwt_decode from "jwt-decode";

export const userInfo = () => {
	const token = localStorage.getItem("user");
	const decoded = token ? jwt_decode(token) : "";

	return {
		_id: decoded._id,
		name: decoded.name,
		email: decoded.email,
	};
};
