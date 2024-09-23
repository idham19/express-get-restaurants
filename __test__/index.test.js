
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
    expect(response.body[0].name).toBe(seedRestaurant[0].name)
  });
  test("get restaurant by id",async()=>{
    const restaurantID=1
    const response = await request(app).get(`/restaurants/${restaurantID}`); // Use the correct endpoint
    const expectedRestaurant = await Restaurant.findByPk(1);
      console.log(response.body.name);
      
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(expectedRestaurant.name)
  })
});