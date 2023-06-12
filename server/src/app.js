const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const formatResturant = require("./formatResturant");
const formatReservation = require("./formatReservation");

const app = express();

const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: `https://dev-zwy3jd28mlvn6shl.us.auth0.com/`,
});

app.use(cors());
app.use(express.json());

// create a new reservation
app.post(
  "/reservations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().min(1).required(),
      date: Joi.string().required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  checkJwt,
  async (req, res, next) => {
    try {
      const { body, auth } = req;
      console.log(body);
      const reservationBody = {
        userId: auth.payload.sub,
        ...body,
      };

      const reservation = new ReservationModel(reservationBody);
      await reservation.save();

      return res.status(201).send(formatReservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// View a single reservation
app.get("/reservations/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  const { auth } = req;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "invalid id provided" });
  }

  const reservation = await ReservationModel.findById(id);

  // check if the reservation exists
  if (reservation === null) {
    return res.status(404).send({ error: "not found" });
  }

  // check if they are trying to access a reservation they did not create
  const userId = auth.payload.sub;
  if (reservation.userId !== userId) {
    return res.status(403).send({
      error: "user does not have permission to access this reservation",
    });
  }

  return res.status(200).send(formatReservation(reservation));
});

// get all restaurants
app.get("/restaurants", async (req, res) => {
  const restaurant = await RestaurantModel.find({});
  return res.status(200).send(restaurant.map(formatResturant));
});
// get all reservations for the authenticated user
app.get("/reservations", checkJwt, async (req, res) => {
  const userId = req.auth.payload.sub; // get userId from the JWT
  const reservations = await ReservationModel.find({ userId: userId }); // filter the reservations by userId
  return res.status(200).send(reservations.map(formatReservation));
});

// View a single restaurant
app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "invalid id provided" });
  }

  const resturant = await RestaurantModel.findById(id);

  if (resturant === null) {
    return res.status(404).send({ error: "not found" });
  }

  return res.status(200).send(formatResturant(resturant));
});

app.use(errors());

module.exports = app;
