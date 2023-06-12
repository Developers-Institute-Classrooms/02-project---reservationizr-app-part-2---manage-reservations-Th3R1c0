import "./ReservationList.css";
import "./reset.css";
import { formatDate } from "../utils/formatDate";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      setIsLoading(true);
      const response = await fetch("http://localhost:5001/reservations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      setReservations(data);
      setIsLoading(false);

      setReservations(data);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <h1 className="reservationlist-title">Upcoming reservations</h1>
      <ul className="reservation-list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => {
            const formattedDate = formatDate(reservation.date);
            return (
              <li key={reservation._id} className="reservation">
                <h2 className="reservation-title">
                  {reservation.restaurantName}
                </h2>
                <p className="reservation-date"> {formattedDate}</p>
                <Link
                  to={`/reservations/${reservation.id}`}
                  className="reservation-details"
                >
                  View Details {"->"}
                </Link>
              </li>
            );
          })
        ) : (
          <div className="reservation-none">
            <p>You dont have any reservations</p>
            <Link className="reservation-details" to="/">
              View the restaurants
            </Link>
          </div>
        )}
      </ul>
    </>
  );
};

export default ReservationList;
