import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { registerFail, registerSuccess } from "../../redux/Actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const Signup = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit = (data) => {
		delete data["rePassword"];
		axios
			.post(process.env.REACT_APP_BASE_URL + "/user/register", JSON.stringify(data), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				dispatch(registerSuccess(null));
				console.log("Register Success", response.data);
				history.push("/login");
			})
			.catch((error) => {
				alert(error.response.data);
				dispatch(registerFail(null));
			});
	};

	return (
		<div className="signup">
			<form onSubmit={handleSubmit(onSubmit)} className="card">
				<p>Sign up</p>
				<div className="inputs">
					<div>
						<input
							{...register("name", {
								required: "Name is not valid!",
								maxLength: 30,
								minLength: 6,
								pattern: /^[A-Za-z]/,
							})}
							style={errors.name && { outline: "1px solid red" }}
							type="text"
							placeholder="Name"
						/>
						<i className="fas fa-signature"></i>
					</div>
					<div>
						<input
							{...register("email", {
								required: "Email is not valid!",
								pattern: /\S+@\S+\.\S+/,
								minLength: 10,
								maxLength: 100,
							})}
							style={errors.email && { outline: "1px solid red" }}
							type="text"
							placeholder="Email"
						/>
						<i className="fas fa-envelope"></i>
					</div>
					<div>
						<input
							{...register("password", {
								required: "Password is not valid!",
								pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
							})}
							style={errors.password && { outline: "1px solid red" }}
							type="password"
							placeholder="Password"
						/>
						<i className="fas fa-lock"></i>
					</div>
					<div>
						<input
							{...register("rePassword", {
								validate: {
									matchesPreviousPassword: (value) => {
										const { password } = getValues();
										return password === value || "Passwords should match!";
									},
								},
							})}
							style={errors.password && { outline: "1px solid red" }}
							type="password"
							placeholder="Re-enter Password"
						/>
						<i className="fas fa-lock"></i>
					</div>
					{errors.rePassword && <p>Passwords should match!</p>}
				</div>
				<button>Sign Up</button>
				<p>
					Already have an account? <Link to="/login">Log in now</Link>
				</p>
			</form>
		</div>
	);
};

export default Signup;
