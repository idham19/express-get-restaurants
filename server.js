const app = require("./src/app");
const db = require("./db/connection");
const port = 3000;
const restaurantRouter = require("./routes/restaurants");
//TODO: Create your GET Request Route Below:

app.listen(port, () => {
  db.sync();
  console.log(`Listening at http://localhost:${port}/restaurants`);
});
