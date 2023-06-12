const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantModel = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Restaurant = mongoose.model("restaurants", RestaurantModel);
module.exports = Restaurant;
