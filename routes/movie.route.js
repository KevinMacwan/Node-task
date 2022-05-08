const router = require("express").Router()

const movies = require("../controllers/movie");
const auth  = require('../middleware/auth');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express')


module.exports = app => {

    router.post("/", auth,  movies.create);
    router.get("/", auth, movies.findAll);
    app.use("/movies", router);

}; 