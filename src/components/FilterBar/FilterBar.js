import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryFilter, priceFilter, rangeFilter } from "../../redux/Actions";
import "./FilterBar.css";

const FilterBar = () => {
   const dispatch = useDispatch();
   const [categories, setCategories] = useState([]);
   const products = useSelector((state) => state.cartReducer.products);
   const filter = useSelector((state) => state.filterReducer);

   const [filters, setFilters] = useState({
      price: "",
      category: "",
      range: "",
   });

   useEffect(() => {
      if (products) {
         let _category = products.map((item) => item.category);
         setCategories([...new Set(_category)]);
      }

      if (filter) {
         setFilters(filter);
      }
   }, [products]);

   useEffect(() => {
      if (filters.price) {
         dispatch(priceFilter(filters.price));
      }
      if (filters.category) {
         dispatch(categoryFilter(filters.category));
      }
      if (filters.range) {
         dispatch(rangeFilter(filters.range));
      }
   }, [filters]);

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setFilters((prevState) => {
         return {
            ...prevState,
            [name]: value,
         };
      });
   };

   function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   return (
      <form className="filter">
         <div className="filter__price">
            <label> Order By - </label>
            <select name="price" value={filters.price} onChange={handleChange}>
               <option value="default"> Default</option>
               <option value="asc"> Low to High</option>
               <option value="desc"> High to Low</option>
            </select>
         </div>
         <div className="filter__category">
            <label> Category - </label>
            <select name="category" value={filters.category} onChange={handleChange}>
               <option value="all"> All</option>
               {categories.map((category, index) => (
                  <option key={index} value={category}>
                     {capitalizeFirstLetter(category)}
                  </option>
               ))}
            </select>
         </div>
         <div className="filter__range">
            <label> Price Range - </label>
            <select name="range" value={filters.range} onChange={handleChange}>
               <option value="none"> None</option>
               <option value="0-20">$0 - $20</option>
               <option value="20-50"> $20 - $50</option>
               <option value="50-100"> $50 - $100</option>
               <option value="100-500"> $100 - $500</option>
               <option value="500-1000"> $500 - $1000</option>
            </select>
         </div>
      </form>
   );
};

export default FilterBar;
