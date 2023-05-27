const MovieList = props => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="card">
          <img className="card-image" src={movie.Poster} alt="movie"></img>
          <div className="overlay"></div>
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
