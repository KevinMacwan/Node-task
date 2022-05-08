const axios = require('axios');
const Omdbapi = {
  getByTitle: async function (title) {
    const request = `${process.env.MOVIE_URL}?t=${title}&apikey=${process.env.URL_KEY}`;
    const movieDetails = await axios.get(request);
    if (movieDetails.data.Error) {
      throw new Error('The movie details could not be fetched');
    }

    return movieDetails.data;
  }
};

module.exports = Omdbapi;