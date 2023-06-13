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

const FAVOURITES = "favourites";
const WISHLIST = "wishlist";

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
    const movieFavourites = JSON.parse(localStorage.getItem(FAVOURITES)) || [];

    setFavourites(movieFavourites);

    const movieWishlist = JSON.parse(localStorage.getItem(WISHLIST)) || [];

    setWishlist(movieWishlist);
  }, []);

  const saveToLocalStorage = (listName, items) => {
    localStorage.setItem(listName, JSON.stringify(items));
  };

  const addFavouriteMovie = movie => {
    const existingFavourite = isAlreadyExist(movie, favourites);

    if (existingFavourite) {
      if (existingFavourite.isSoftRemoved)
        undoCardSoftRemove(movie, FAVOURITES);
      return;
    }

    const newFavouriteList = [...favourites, movie];

    setFavourites(newFavouriteList);
    saveToLocalStorage(FAVOURITES, newFavouriteList);
  };

  const softRemoveCard = (cardToRemove, list) => {
    let saveToState = null;

    switch (list) {
      case FAVOURITES:
        saveToState = setFavourites;
        break;
      case WISHLIST:
        saveToState = setWishlist;
        break;
      default:
        console.log("cannot save to state, unknown name");
    }

    // take items without softRemove flag from local storage
    const currentList = JSON.parse(localStorage.getItem(list)) || [];

    // create a list with the card removed
    saveToLocalStorage(
      list,
      currentList.filter(
        currentCard => currentCard.imdbID !== cardToRemove.imdbID
      )
    );

    // create a list with the removed card marked as softRemoved
    saveToState(
      currentList.map(currentCard => {
        if (currentCard.imdbID === cardToRemove.imdbID) {
          return { ...currentCard, isSoftRemoved: true };
        }
        return currentCard;
      })
    );
  };

  const undoCardSoftRemove = (cardToUndo, list) => {
    let currentList = null,
      setNewState = null;
    switch (list) {
      case FAVOURITES:
        currentList = favourites;
        setNewState = setFavourites;
        break;
      case WISHLIST:
        currentList = wishlist;
        setNewState = setWishlist;
        break;
      default:
        console.log("incorrect list for undoCardSoftRemove");
    }

    const newList = currentList.map(currentCard => {
      if (currentCard.imdbID === cardToUndo.imdbID) {
        // omit isSoftRemoved property
        let { isSoftRemoved, ...newCard } = currentCard;
        return newCard;
      }
      return currentCard;
    });

    saveToLocalStorage(list, newList);
    setNewState(newList);
  };

  const completeRemoveFromFavourites = movie => {
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
    saveToLocalStorage(WISHLIST, newWishlist);
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
              handleUndoClick={() => undoCardSoftRemove(movie, FAVOURITES)}
              handleCloseClick={completeRemoveFromFavourites}
            />
          ) : (
            <Card
              key={movie.imdbID}
              movie={movie}
              leftIcon={XIcon}
              rightIcon={WishIcon}
              onLeftClick={() => softRemoveCard(movie, FAVOURITES)}
              onRightClick={addToWishlist}
            />
          )
        )}
      </div>

      <MovieListHeading heading="Wishlist" />
      <div className="my-cards">
        {wishlist.map(movie =>
          movie.isSoftRemoved ? (
            <RemovedCard
              key={movie.imdbID}
              width={202.25}
              height={300}
              movie={movie}
              handleUndoClick={() => undoCardSoftRemove(movie, WISHLIST)}
              handleCloseClick={() => {}}
            />
          ) : (
            <Card
              key={movie.imdbID}
              movie={movie}
              leftIcon={XIcon}
              rightIcon={WishIcon}
              onLeftClick={() => {}}
              onRightClick={() => softRemoveCard(movie, WISHLIST)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default App;
