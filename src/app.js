const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (request, response) => {
  const findAllRestaurants = await Restaurant.findAll();
  return response.json(findAllRestaurants);
});
app.get("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const getRestaurantById = await Restaurant.findByPk(restaurantId);
  if (getRestaurantById) {
    res.json(getRestaurantById);
  } else {
    res.status(404).send({ message: "Restaurant not found" });
  }
});
module.exports = app;
