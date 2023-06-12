import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import "./reset.css";
import "./Reservation.css";
const Reservation = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5001/reservations/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h1 className="error">Sorry! We can't find that reservation</h1>
        <Link to="/reservations" className="reservation-button">
          {"<-"} Back to reservations
        </Link>
      </div>
    );
  }

  return (
    <div className="reservation">
      <div className="reservation-container">
        <h1 className="reservation-title">{data.restaurantName}</h1>
        <p>{formatDate(data.date)}</p>
        <p className="reservation-partySize">Party Size: {data.partySize}</p>
      </div>
      <Link to="/reservations" className="reservation-button">
        {"<-"} Back to reservations
      </Link>
    </div>
  );
};

export default Reservation;
