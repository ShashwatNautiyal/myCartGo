import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/Actions";
import "./ProductDetails.css";

const ProductDetails = () => {
	const [productDetails, setProductDetails] = useState(null);
	let { productId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line
	}, []);

	const fetchProducts = () => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/products/" + productId)
			.then((Response) => setProductDetails(Response.data))
			.catch((error) => console.log(error));
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<>
			{productDetails && (
				<div className="productDetails">
					<img src={productDetails.image} alt="" />
					<div className="productDetails__info">
						<h2>{productDetails.title}</h2>
						<p className="productDetails__tagline">{productDetails.category.toLocaleUpperCase()}</p>
						<p>{capitalizeFirstLetter(productDetails.description)}</p>
						<h2>${productDetails.price}</h2>
						<p>Dispatched in 7 working days</p>
						<div className="productDetails__buttons">
							<button
								onClick={() => {
									dispatch(addToCart(productDetails));
								}}
							>
								ADD TO CART
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
