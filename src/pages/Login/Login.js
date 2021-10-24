import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CustomLoader from "../../components/Loader/Loader";
import { loginFail, loginSuccess, logout } from "../../redux/Actions";
import "./Login.css";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	const [handleLoader, setHandleLoader] = useState(false);
	let history = useHistory();

	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();

		const loginData = {
			email,
			password,
		};

		setHandleLoader(true);

		axios
			.post(process.env.REACT_APP_BASE_URL + "/user/login", JSON.stringify(loginData), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				localStorage.setItem("user", response.data);
				setHandleLoader(false);
				dispatch(loginSuccess(response.data));
				history.push("/");
			})
			.catch((error) => {
				alert(error.response.data);
				setHandleLoader(false);
				dispatch(loginFail(null));
			});
	};

	return (
		<div className="login">
			{handleLoader && <CustomLoader />}
			{!isLoggedIn ? (
				<form className="card">
					<p>Login</p>
					<div className="inputs">
						<div>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								name="email"
								placeholder="Email"
							/>
							<i className="fas fa-envelope"></i>
						</div>
						<div>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								name="password"
								placeholder="Password"
							/>
							<i className="fas fa-lock"></i>
						</div>
					</div>
					<button onClick={handleLogin}>LOGIN</button>
					<p>
						Don't have an account? <Link to="/signup">Sign up now</Link>
					</p>
				</form>
			) : (
				<div className="card">
					<p>Already Logged IN</p>
					<button onClick={() => dispatch(logout(null), localStorage.removeItem("user"))}>Logout</button>
				</div>
			)}
		</div>
	);
};

export default Login;
