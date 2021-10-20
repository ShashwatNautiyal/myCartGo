import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/Actions";
import "./Nav.css";

const Nav = () => {
	const cart = useSelector((state) => state.cartReducer.cart);
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();

	return (
		<div className="nav">
			<Link to="/">
				<h2>MyCartGo</h2>
			</Link>
			<div className="nav__links">
				{isLoggedIn ? (
					<Link onClick={() => dispatch(logout(null), localStorage.removeItem("user"))} to="/">
						<i className="fas fa-sign-in-alt"></i> Logout
					</Link>
				) : (
					<>
						<Link to="/login">
							<i className="fas fa-sign-in-alt"></i> Login
						</Link>
						<span style={{ margin: "8px" }}>|</span>
						<Link to="/signup">
							<i className="fas fa-user-plus"></i> Sign Up
						</Link>
					</>
				)}
				<span style={{ margin: "8px" }}>|</span>
				<Link to="/cart">
					<i className="fas fa-shopping-cart"></i>
					{` Cart(${cart.length})`}
				</Link>
			</div>
		</div>
	);
};

export default Nav;
