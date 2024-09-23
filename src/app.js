const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
app.use(express.json());
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

// post Mehtod
app.post("/restaurant", async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    const findAllrestaurant = await Restaurant.findAll();

    res.status(201).json(findAllrestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});
module.exports = app;
