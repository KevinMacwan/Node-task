# Movie Service

## API Reference

### Get all movies
```http
  GET /movies
```

#### Request

    curl --location --request GET 'http://localhost:3001/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>'

#### Response

    {
        "success": true,
        "movieData": [
            {
                "_id": "62361a4c53f1a4c3195fbb0a",
                "title": "The Batman",
                "releasedDate": "2022-03-04T00:00:00.000Z",
                "genre": "Action, Crime, Drama",
                "director": "Matt Reeves",
                "creator": 123,
                "createdAt": "2022-03-19T18:00:44.170Z"
            }
        ]
    }


### Create new movie

```http
  POST /movies
```
    curl --location --request POST 'http://localhost:3001/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data-raw '{
        "title": "1920"
    }'

#### Response

    {
        "success": true,
        "message": "movie created"
    }

#### NOTE
- `Basic` users are restricted to create 5 movies per month. 
- `Premium` users have no limits in creating movies.

## Run Locally

Clone the project

```bash
$ git clone <repository link>
```

Go to the movie directory

```bash
$ cd <project directory>/movie
```

Install dependencies

```bash
$ npm install
```

Start the server

```bash
$ npm run start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`MOVIE_URL`, `DATABASE_URL`, `KEY`

#### MOVIE URL

API URL to Get movie Information.

#### KEY

KEy for OMDB get movie info API.


#### PORT

Default `PORT` for Movie Service is 3001.



#### DB_NAME

Database name that is created when you connect to MongoDB. 
Default `DB_NAME` is `movies`. 


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
