const Card = props => {
  const OverlayIcon = props.overlayIcon;

  return (
    <a
      href={`https://www.imdb.com/title/${props.movie.imdbID}`}
      className="my-card"
    >
      <img className="my-card-image" src={props.movie.Poster} alt="movie"></img>

      <div
        className="my-overlay"
        onClick={() => props.handleOverlayClick(props.movie)}
      >
        <span className="me-2">{props.overlayText}</span>
        <OverlayIcon />
      </div>
    </a>
  );
};

export default Card;
