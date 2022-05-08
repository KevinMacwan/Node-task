const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const connectDB = require("./Database/connections");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express')

const PORT = 3001;
const app = express();
app.use(bodyParser.json());
connectDB()

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node.js recruitment task." });
});
require("./routes/movie.route")(app);

app.listen(PORT, () => {
  console.log(`Movie miscro service is running at port ${PORT}`);
});

module.exports = app;