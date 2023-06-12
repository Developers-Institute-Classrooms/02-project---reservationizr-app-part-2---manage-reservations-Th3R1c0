import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";
import "./reset.css";
const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5001/restaurants/${id}`);
      const data = await response.json();
      setRestaurant(data);

      setIsLoading(false);
    };
    fetchData();
  }, [id, restaurant]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="restaurant-container">
        <img src={restaurant.image} alt="fix me" />
        <div className="restaurant-text-container">
          <h1 className="restaurant-title">{restaurant.name}</h1>
          <p className="restaurant-description">{restaurant.description}</p>
        </div>
      </div>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
