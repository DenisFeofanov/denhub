const MovieList = props => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="card">
          <img className="card-image" src={movie.Poster} alt="movie"></img>
        </div>
      ))}
    </>
  );
};

export default MovieList;
