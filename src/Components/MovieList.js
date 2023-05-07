const MovieList = props => {
  return (
    <>
      {props.movies.map((movie, index) => (
          <div className="col">
              <p>{movie.Title}</p>
          <img src={movie.Poster} alt="movie"></img>
        </div>
      ))}
    </>
  );
};

export default MovieList;