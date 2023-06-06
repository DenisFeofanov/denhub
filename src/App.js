import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";

import HeartIcon from "./Components/HeartIcon";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import Card from "./Components/Card";
import XIcon from "./Components/XIcon";
import RemovedCard from "./Components/RemovedCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async searchValue => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aaa5906c`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites =
      JSON.parse(localStorage.getItem("DenHub-favourites")) || [];

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = items => {
    localStorage.setItem("DenHub-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = movie => {
    const existingFavourite = favourites.find(
      fav => fav.imdbID === movie.imdbID
    );

    if (existingFavourite) {
      if (existingFavourite.isSoftRemoved) undoSoftRemoveFromFavourites(movie);
      return;
    }

    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const softRemoveFromFavourites = movie => {
    // take favourites without softRemove flag from local storage
    const currFavourites =
      JSON.parse(localStorage.getItem("DenHub-favourites")) || [];

    // create a list with the movie removed
    saveToLocalStorage(
      currFavourites.filter(fav => fav.imdbID !== movie.imdbID)
    );

    // create a list with the removed movie marked as softRemoved
    setFavourites(
      currFavourites.map(fav => {
        if (fav.imdbID === movie.imdbID) {
          return { ...fav, isSoftRemoved: true };
        }
        return fav;
      })
    );
  };

  const undoSoftRemoveFromFavourites = movie => {
    const newFavouriteList = favourites.map(fav => {
      // omit isSoftRemoved property
      if (fav.imdbID === movie.imdbID) {
        let { isSoftRemoved, ...newFav } = fav;
        return newFav;
      }
      return fav;
    });

    saveToLocalStorage(newFavouriteList);
    setFavourites(newFavouriteList);
  };

  const removeFromFavourites = movie => {
    const newFavouriteList = favourites.filter(
      fav => fav.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  return (
    <div className="my-container">
      <div className="my-row">
        <MovieListHeading heading="Movies" />

        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="my-cards">
        {movies.map(movie => (
          <Card
            key={movie.imdbID}
            movie={movie}
            handleOverlayClick={addFavouriteMovie}
            overlayText="Add to Favourites"
            overlayIcon={HeartIcon}
          />
        ))}
      </div>

      <MovieListHeading heading="Favourites" />
      <div className="my-cards">
        {favourites.map(movie =>
          movie.isSoftRemoved ? (
            <RemovedCard
              key={movie.imdbID}
              width={202.25}
              height={300}
              movie={movie}
              handleUndoClick={undoSoftRemoveFromFavourites}
              handleCloseClick={removeFromFavourites}
            />
          ) : (
            <Card
              key={movie.imdbID}
              movie={movie}
              handleOverlayClick={softRemoveFromFavourites}
              overlayText="Remove from favourites"
              overlayIcon={XIcon}
            />
          )
        )}
      </div>
    </div>
  );
};

export default App;
