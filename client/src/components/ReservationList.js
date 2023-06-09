import "./ReservationList.css";
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
      setReservations(data); //map and apply formatDate
      setIsLoading(false);

      // const userReservations = data.filter(
      //   (reservation) => reservation.userId === user.sub
      // );

      console.log(await getAccessTokenSilently());
      setReservations(data);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <h1>Upcoming reservations</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation._id}>
            <h2>{reservation.restaurantName}</h2>
            <p>Party size: {reservation.partySize}</p>
            <p>Date: {formatDate(reservation.date)}</p>
          </div>
        ))
      ) : (
        <div>
          <p>You dont have any reservations</p>
          <Link to="Restaurantlist">View the restaurants</Link>
        </div>
      )}
      {/* display all of users reservations here */}
    </>
  );
};

export default ReservationList;
