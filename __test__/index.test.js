const request = require("supertest");
const app = require("../src/app");
const Restaurant = require("../models/Restaurant");
const { seedRestaurant } = require("../seedData");
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

describe("Restaurants Request", () => {
  test("get all restaurants", async () => {
    const response = await request(app).get("/restaurants"); // Use the correct endpoint

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(seedRestaurant.length);
    expect(response.body[0].name).toBe(seedRestaurant[0].name);
    expect(response.body[1].name).toBe(seedRestaurant[1].name);
  });

  test("get restaurant by id", async () => {
    const restaurantID = 1;
    const response = await request(app).get(`/restaurants/${restaurantID}`); // Use the correct endpoint
    const expectedRestaurant = await Restaurant.findByPk(1);
    console.log(response.body.name);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(expectedRestaurant.name);
  });
  test("post method new restaurant should be added", async () => {
    const newRestaurant = {
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
    };
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant)
      .then(200);
    expect(response.body.name).toEqual(newRestaurant.name);
    expect(response.body.cuisine).toEqual(newRestaurant.cuisine);
    expect(response.body.location).toEqual(newRestaurant.location);
  });

  //Put method should update a restaurant data
  test("Put method should update a restaurant", async () => {
    const mockData = {
      name: "Aghroume",
      location: "Philadelphia",
      cuisine: "Five Start restaurant",
    };
    const restaurantId = 2;
    const response = await request(app)
      .put(`/restaurants/${restaurantId}`)
      .send(mockData);
    expect(response.body.name).toBe(mockData.name);
    expect(response.body.cuisine).toBe(mockData.cuisine);
    expect(response.body.location).toBe(mockData.location);
  });

  test("delete methode should remove a restaurant from db", async () => {
    const restaurantId = 1;
    const createRestaurant = await request(app)
      .post("/restaurants")
      .send({
        name: "takfarinas",
        cuisine: "seksou",
        location: "mekla",
      })
      .expect(201)
      .then((res) => res.body);

    const deleteRestaurant = await request(app)
      .delete(`/restaurants/${createRestaurant.id}`)
      .expect(200);

  });
});
