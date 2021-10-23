import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import { setProducts } from "./redux/Actions";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CustomLoader from "./components/Loader/Loader";

function App() {
	const dispatch = useDispatch();
	const [handleLoader, setHandleLoader] = useState(false);

	useEffect(() => {
		setHandleLoader(true);
		axios
			.get(process.env.REACT_APP_BASE_URL + "/products")
			.then((Response) => {
				dispatch(setProducts(Response.data));
				setHandleLoader(false);
			})
			.catch((error) => console.log(error));

		// eslint-disable-next-line
	}, []);

	return (
		<Router>
			<div className="app">
				{handleLoader && <CustomLoader />}
				<Nav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/cart" exact component={Cart} />
					<Route path="/:productId" exact component={ProductDetails} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
