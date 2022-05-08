const { check, getMovie, createMovie } = require("./movieController")

const create = async (req, res) => {
  const user = req.user
  if (!req.body.title) {
    return res.status(400).send({ message: "Title Required!" });
  }
  const [canAdd, List] = await check({ user })
  if (canAdd) {
    const movieCreateRes= await createMovie({title:req.body.title,user})
    if (movieCreateRes===null) {
      res.status(500).send({
        message: 'some thing went wrong'
      })
    } else {
      res.send({ message: 'movie created', movieCreateRes })
    }
  } else {
    res.status(500).send({
      message: 'User can not create more then 5 movies'
    })
  }
};

const findAll = async (req, res) => {
  const user = req.user
  const userMovies = await getMovie({ user })
  res.send({ 'movieData': userMovies })
};
module.exports = { findAll, create }