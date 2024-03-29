import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";
import { formatDate } from "../utils/formatDate";
const CreateReservation = ({ restaurantName }) => {
  const [date, setDate] = useState(new Date());
  const [partySize, setPartySize] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [disabled, isDisabled] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();

    const reservation = {
      partySize: partySize,
      date: date,
      restaurantName: restaurantName,
    };

    const response = await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      setErrorStatus(response.status);
      setIsError(true);
    } else {
      setIsLoading(false);
      navigate("/reservations");
    }
  };
  useEffect(() => {
    if (partySize <= 0) {
      isDisabled(true);
    } else {
      isDisabled(false);
    }
  }, [date, partySize]);
  const today = new Date();
  return (
    <>
      <h1 className="reservation-restaurant-name">Reserve {restaurantName}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reservation-guest-input">Number of guests</label>
        <input
          className="reservation-guest-input"
          type="text"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          required
        />
        <label htmlFor="datepicker">Date</label>
        <DatePicker
          id="datepicker"
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={today}
          showTimeSelect
        />

        <button className="submit-btn" type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateReservation;
