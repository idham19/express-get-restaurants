const express = require("express");
const { Router } = require("express");
const Restaurant = require("../models/index");
const { check, validationResult } = require("express-validator");
const router = Router();

router.get("/", async (request, response) => {
  const findAllRestaurants = await Restaurant.findAll();
  return response.json(findAllRestaurants);
});
router.get("/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const getRestaurantById = await Restaurant.findByPk(restaurantId);
  if (getRestaurantById) {
    res.json(getRestaurantById);
  } else {
    res.status(404).send({ message: "Restaurant not found" });
  }
});

// post Mehtod
router.post(
  "/",
  [check("name").not().isEmpty().trim().withMessage("Name is required").isLength({min:10,max:30}).withMessage("name length should be at least 10 and max 30")],
  [
    check("location")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Location is required"),
  ],
  [check("cuisine").not().isEmpty().trim().withMessage("Cuisine is required")],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const newRestaurant = await Restaurant.create(req.body);

      const findAllrestaurant = await Restaurant.findAll();

      res.status(201).json(newRestaurant);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//update Method
router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurantData = req.body;
    const restaurantId = req.params.id;
    const restaurantToUpdate = await Restaurant.findByPk(restaurantId);

    await restaurantToUpdate.update(updatedRestaurantData);

    const allRestaurants = await Restaurant.findAll();
    res.status(200).json(restaurantToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Inter server error" });
  }
});

//delet Method
router.delete("/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const findRestaurant = await Restaurant.findByPk(restaurantId);

    await findRestaurant.destroy();

    const allRestaurant = await Restaurant.findAll();
    res.status(200).json(allRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
