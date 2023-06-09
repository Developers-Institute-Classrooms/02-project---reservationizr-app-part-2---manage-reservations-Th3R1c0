const formatReservation = (reservation) => {
  return {
    id: reservation._id,
    partySize: reservation.partySize,
    restaurantName: reservation.restaurantName,
    date: reservation.date,
    userId: reservation.userId,
  };
};

module.exports = formatReservation;
