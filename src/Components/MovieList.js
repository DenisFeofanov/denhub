const MovieList = props => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="my-card">
          <img className="my-card-image" src={movie.Poster} alt="movie"></img>
          <div className="my-overlay">
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
