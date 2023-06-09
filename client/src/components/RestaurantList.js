import "./RestaurantList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const RestaurantList = () => {
  const [resturants, setResturants] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/restaurants");
      const data = await response.json();
      setResturants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <h1 className="restaurant-list-title">Restaurants</h1>
      <ul className="restaurant-list">
        {resturants.map((restaurant) => {
          return (
            <li className="restaurant" key={restaurant.id}>
              <img src={restaurant.image} alt="fix me" />
              <div className="restaurant-text-container">
                <h1 className="restaurant-title">{restaurant.name}</h1>
                <p className="restaurant-description">
                  {restaurant.description}
                </p>
                <Link to={`/restaurants/${restaurant.id}`}>
                  <button className="restaurant-reservenow-btn">
                    <p>Reserve now</p>
                    <div>-></div>
                  </button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
