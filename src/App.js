import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";

import SearchBox from "./Components/SearchBox";
import RemovedCard from "./Components/RemovedCard";
import MovieCard from "./Components/MovieCard";

const FAVOURITES = "favourites";
const WISHLIST = "wishlist";

const App = () => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const getMovieRequest = async searchValue => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aaa5906c`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setSearchedCards(responseJson.Search);
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

  const saveToLocalStorage = (cards, list) => {
    localStorage.setItem(list, JSON.stringify(cards));
  };

  const doesExist = (givenCard, targetList) => {
    let currentList = null;

    switch (targetList) {
      case FAVOURITES:
        currentList = favourites;
        break;
      case WISHLIST:
        currentList = wishlist;
        break;
      default:
        console.log("incorrect targetList for doesExist method");
    }

    return currentList.find(
      currentCard => currentCard.imdbID === givenCard.imdbID
    );
  };

  const toggleList = (card, targetList) => {
    let currentList = null,
      setNewState = null;

    switch (targetList) {
      case FAVOURITES:
        currentList = favourites;
        setNewState = setFavourites;
        break;
      case WISHLIST:
        currentList = wishlist;
        setNewState = setWishlist;
        break;
      default:
        console.log("incorrect targetList for toggleList method");
    }

    const existingCard = doesExist(card, targetList);

    if (existingCard) {
      if (existingCard.isSoftRemoved) {
        undoCardSoftRemove(card, targetList);
      } else completeRemoveCard(card, targetList);
    } else {
      const newList = [...currentList, card];

      setNewState(newList);
      saveToLocalStorage(newList, targetList);
    }
  };

  const softRemoveCard = (cardToRemove, targetList) => {
    let saveToState = null;

    switch (targetList) {
      case FAVOURITES:
        saveToState = setFavourites;
        break;
      case WISHLIST:
        saveToState = setWishlist;
        break;
      default:
        console.log("incorrect targetList for softRemoveCard method");
    }

    // take card without softRemove flag from local storage
    const currentList = JSON.parse(localStorage.getItem(targetList)) || [];

    // create a list with the card removed
    saveToLocalStorage(
      currentList.filter(
        currentCard => currentCard.imdbID !== cardToRemove.imdbID
      ),
      targetList
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

  const undoCardSoftRemove = (cardToUndo, targetList) => {
    let currentList = null,
      setNewState = null;

    switch (targetList) {
      case FAVOURITES:
        currentList = favourites;
        setNewState = setFavourites;
        break;
      case WISHLIST:
        currentList = wishlist;
        setNewState = setWishlist;
        break;
      default:
        console.log("incorrect targetList for undoCardSoftRemove method");
    }

    const newList = currentList.map(currentCard => {
      if (currentCard.imdbID === cardToUndo.imdbID) {
        // omit isSoftRemoved property
        let { isSoftRemoved, ...newCard } = currentCard;
        return newCard;
      }
      return currentCard;
    });

    saveToLocalStorage(newList, targetList);
    setNewState(newList);
  };

  const completeRemoveCard = (cardToRemove, targetList) => {
    let currentList = null,
      setNewState = null;

    switch (targetList) {
      case FAVOURITES:
        currentList = favourites;
        setNewState = setFavourites;
        break;
      case WISHLIST:
        currentList = wishlist;
        setNewState = setWishlist;
        break;
      default:
        console.log("incorrect targetList for completeRemoveCard method");
    }

    const newList = currentList.filter(
      currentCard => currentCard.imdbID !== cardToRemove.imdbID
    );

    setNewState(newList);
    saveToLocalStorage(newList, targetList);
  };

  return (
    <div className="my-container">
      <Tabs className="my-tabs">
        <TabList>
          <Tab>Wishlist</Tab>
          <Tab>Favourites</Tab>
          <Tab>Search</Tab>
        </TabList>

        <TabPanel>
          <div className="my-cards">
            {wishlist.map(card => {
              const existingFavouriteCard = doesExist(card, FAVOURITES);

              return card.isSoftRemoved ? (
                <RemovedCard
                  key={card.imdbID}
                  width={202.25}
                  height={300}
                  card={card}
                  handleUndoClick={() => undoCardSoftRemove(card, WISHLIST)}
                  handleCloseClick={() => {
                    completeRemoveCard(card, WISHLIST);
                  }}
                />
              ) : (
                <MovieCard
                  key={card.imdbID}
                  card={card}
                  onLeftClick={() => toggleList(card, FAVOURITES)}
                  onRightClick={() => softRemoveCard(card, WISHLIST)}
                  isFavourite={
                    existingFavouriteCard &&
                    !existingFavouriteCard.isSoftRemoved
                  }
                  isWishlisted={true}
                />
              );
            })}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="my-cards">
            {favourites.map(card => {
              const existingWishlistCard = doesExist(card, WISHLIST);

              return card.isSoftRemoved ? (
                <RemovedCard
                  key={card.imdbID}
                  width={202.25}
                  height={300}
                  card={card}
                  handleUndoClick={() => undoCardSoftRemove(card, FAVOURITES)}
                  handleCloseClick={() => completeRemoveCard(card, FAVOURITES)}
                />
              ) : (
                <MovieCard
                  key={card.imdbID}
                  card={card}
                  onLeftClick={() => softRemoveCard(card, FAVOURITES)}
                  onRightClick={() => toggleList(card, WISHLIST)}
                  isFavourite={true}
                  isWishlisted={
                    existingWishlistCard && !existingWishlistCard.isSoftRemoved
                  }
                />
              );
            })}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="my-cards">
            {searchedCards.map(card => {
              const existingFavouriteCard = doesExist(card, FAVOURITES);
              const existingWishlistCard = doesExist(card, WISHLIST);

              return (
                <MovieCard
                  key={card.imdbID}
                  card={card}
                  onLeftClick={() => toggleList(card, FAVOURITES)}
                  onRightClick={() => toggleList(card, WISHLIST)}
                  isFavourite={
                    existingFavouriteCard &&
                    !existingFavouriteCard.isSoftRemoved
                  }
                  isWishlisted={
                    existingWishlistCard && !existingWishlistCard.isSoftRemoved
                  }
                />
              );
            })}
          </div>
        </TabPanel>
      </Tabs>

      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
};

export default App;
