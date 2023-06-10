import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";

import HeartIcon from "./Components/HeartIcon";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import Card from "./Components/Card";
import XIcon from "./Components/XIcon";
import RemovedCard from "./Components/RemovedCard";
import WishIcon from "./Components/WishIcon";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

    const movieWishlist =
      JSON.parse(localStorage.getItem("DenHub-wishlist")) || [];

    setWishlist(movieWishlist);
  }, []);

  const saveToLocalStorage = ({ favourites, wishlist }) => {
    if (favourites)
      localStorage.setItem("DenHub-favourites", JSON.stringify(favourites));
    if (wishlist)
      localStorage.setItem("DenHub-wishlist", JSON.stringify(wishlist));
  };

  const addFavouriteMovie = movie => {
    const existingFavourite = isAlreadyExist(movie, favourites);

    if (existingFavourite) {
      if (existingFavourite.isSoftRemoved) undoSoftRemoveFromFavourites(movie);
      return;
    }

    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage({ favourites: newFavouriteList });
  };

  const softRemoveFromFavourites = movie => {
    // take favourites without softRemove flag from local storage
    const currFavourites =
      JSON.parse(localStorage.getItem("DenHub-favourites")) || [];

    // create a list with the movie removed
    saveToLocalStorage({
      favourites: currFavourites.filter(fav => fav.imdbID !== movie.imdbID),
    });

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

    saveToLocalStorage({ favourites: newFavouriteList });
    setFavourites(newFavouriteList);
  };

  const removeFromFavourites = movie => {
    const newFavouriteList = favourites.filter(
      fav => fav.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  const isAlreadyExist = (item, list) => {
    return list.find(listItem => listItem.imdbID === item.imdbID);
  };

  const addToWishlist = movie => {
    if (isAlreadyExist(movie, wishlist)) {
      return;
    }

    const newWishlist = [...wishlist, movie];

    setWishlist(newWishlist);
    saveToLocalStorage({ wishlist: newWishlist });
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
            rightIcon={WishIcon}
            leftIcon={HeartIcon}
            onLeftClick={addFavouriteMovie}
            onRightClick={addToWishlist}
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
              leftIcon={XIcon}
              rightIcon={WishIcon}
              onLeftClick={softRemoveFromFavourites}
              onRightClick={addToWishlist}
            />
          )
        )}
      </div>

      <MovieListHeading heading="Wishlist" />
      <div className="my-cards">
        {wishlist.map(movie => (
          <Card
            key={movie.imdbID}
            movie={movie}
            leftIcon={XIcon}
            rightIcon={WishIcon}
            onLeftClick={() => {}}
            onRightClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
