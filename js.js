
//homework 18

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let movies = [
  { id: 1, title: "The Shawshank Redemption", genre: "Drama", director: "Frank Darabont", year: 1994 },
  { id: 2, title: "The Godfather", genre: "Crime", director: "Francis Ford Coppola", year: 1972 },
  { id: 3, title: "Pulp Fiction", genre: "Crime", director: "Quentin Tarantino", year: 1994 },
  { id: 4, title: "The Dark Knight", genre: "Action", director: "Christopher Nolan", year: 2008 },
  { id: 5, title: "Inception", genre: "Action", director: "Christopher Nolan", year: 2010 }
];

app.use(bodyParser.json());

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedMovie = req.body;
  const index = movies.findIndex(movie => movie.id === id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedMovie };
    res.json(movies[index]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.patch('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedFields = req.body;
  const index = movies.findIndex(movie => movie.id === id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedFields };
    res.json(movies[index]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = movies.findIndex(movie => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Movie not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



  