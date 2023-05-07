import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MovieList from "./Components/MovieList";

const App = () => {
  const [movies, setMovies] = useState([
    {
      Title: "The Expanse",
      Year: "2015–2022",
      imdbID: "tt3230854",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZDVmMDljM2QtZDkzZC00ZDg2LWFiMGItZjNiNjliZjg2MGEzXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
    },
    {
      Title: "The Expanse: One Ship",
      Year: "2021–2022",
      imdbID: "tt16442600",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZGFkYzIyYTctOGZhNC00NDQ5LWJjZmMtYmM2OTg2ZjFmNWFkXkEyXkFqcGdeQXVyNTI4MzI4NTQ@._V1_SX300.jpg",
    },
    {
      Title: "The Expanse: Expanded",
      Year: "2016",
      imdbID: "tt6583652",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzRkYTdjZmMtZjcyOC00ZDJkLTg0ZmMtMzBiNjc5OTE2YjExXkEyXkFqcGdeQXVyNDgwODk3MA@@._V1_SX300.jpg",
    },
    {
      Title: "The Expanse Aftershow",
      Year: "2020–",
      imdbID: "tt13845484",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BODM1ZDNkMDItMDNlYi00OGY3LWI5M2ItZDcwOWZiNzQ3MGQ1XkEyXkFqcGdeQXVyNTI4MzI4NTQ@._V1_SX300.jpg",
    },
    {
      Title: "The Pull Expanse",
      Year: "2017",
      imdbID: "tt6814828",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZGU0MzBmYzUtMGZhOS00YTA2LTg2NWMtM2U0MmY0NjFkNDBhXkEyXkFqcGdeQXVyNjk1MjM0MTk@._V1_SX300.jpg",
    },
    {
      Title: "Blind Wave: The Expanse Reaction",
      Year: "2020–2022",
      imdbID: "tt13561758",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYmVlOWM1MWYtMGYwYS00MmY1LWE1OTMtZmEyYTQxODk2ODEwXkEyXkFqcGdeQXVyMTExMTAxNjA2._V1_SX300.jpg",
    },
    {
      Title: "The Great Expanse",
      Year: "2021",
      imdbID: "tt13820210",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNTQ1ODQ2YWItNTg2My00OGJiLTgwZWYtMmUzZTFmZTk5MjdlXkEyXkFqcGdeQXVyMTA0ODc3Njg1._V1_SX300.jpg",
    },
  ]);

  return (
    <div className="container-fluid movie app">
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;