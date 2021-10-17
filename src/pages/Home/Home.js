import Product from "../../components/Product/Product";
import { useSelector } from "react-redux";
import "./Home.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useEffect, useState } from "react";

const Home = () => {
	const products = useSelector((state) => state.cartReducer.products);
	const filter = useSelector((state) => state.filterReducer);
	const [finalProducts, setFinalProducts] = useState();

	useEffect(() => {
		if (finalProducts) {
			let temp = [...products];
			if (filter.price === "default" && filter.range === "none" && filter.category === "all") {
				setFinalProducts([...products]);
				return;
			}
			if (filter.price === "asc") {
				setFinalProducts(() => {
					temp.sort((a, b) => a.price - b.price);
					return [...temp];
				});
			} else if (filter.price === "desc") {
				setFinalProducts(() => {
					temp.sort((a, b) => b.price - a.price);
					return [...temp];
				});
			} else {
				setFinalProducts((state) => {
					return [...state];
				});
			}

			if (filter.category && filter.category !== "all") {
				let tempCat = [...temp.filter((item) => item.category === filter.category)];
				temp = [...tempCat];
				setFinalProducts(() => {
					return [...temp];
				});
			} else {
				setFinalProducts((state) => {
					return [...state];
				});
			}

			if (filter.range && filter.range !== "none") {
				const range = filter.range.split("-");
				let lower = range[0];
				let upper = range[1];
				setFinalProducts(() => {
					return [...temp.filter((item) => item.price > lower && item.price < upper)];
				});
			} else {
				setFinalProducts((state) => {
					return [...state];
				});
			}
		}
	}, [filter]);

	useEffect(() => {
		if (products) {
			setFinalProducts([...products]);
		}
	}, [products]);

	return (
		<div className="home">
			<FilterBar />
			<div className="home__products">
				{finalProducts && finalProducts.length !== 0 ? (
					finalProducts.map((product) => <Product key={product._id} product={product} />)
				) : (
					<h2>Nothing found!</h2>
				)}
			</div>
		</div>
	);
};

export default Home;
