import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
	const cart = useSelector((state) => state.cartReducer.cart);

	return (
		<div className="nav">
			<Link to="/">
				<h2>MyCartGo</h2>
			</Link>
			<div className="nav__links">
				<Link to="/">
					<i className="fas fa-home"></i> Home
				</Link>
				{"  "}|{"  "}
				<Link to="/cart">
					<i className="fas fa-shopping-cart"></i>
					{` Cart(${cart.length})`}
				</Link>
			</div>
		</div>
	);
};

export default Nav;
