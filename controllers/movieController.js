const { movie } = require('../model/model')
const Omdbapi = require('../OMDBAPI')
async function check({user}){
    const list = await getMovie({user})
    if ((userMovies.length < 5 && user.role === 'basic') || user.role === 'Premium') {
    return [true,list]
    }
    return [false] 

}

async function createMovie({title,user}){

    const movieRes = await Omdbapi.getByTitle(title);
    const { Title, Released, Genre, Director } = movieRes;
    const movieData = {
      title: Title,
      released: Released,
      genre: Genre,
      director: Director,
      userId: user.userId,
      createdAt: new Date()
    };

    const movieDB = new movie(movieData)
    movieDB.save(movieDB).then(data => {
        console.log('in sucess',data);
        return data
      }).catch(error => {
        console.log('in fail',error);

       return null
      })
}
async function getMovie ({user}) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
     return userMovies = await movie.find({
        userId: user.userId,
        createdAt: {
          $gte: firstDayOfMonth,
          $lte: lastDayOfMonth
        }
      });
}
module.exports={check,createMovie,getMovie}