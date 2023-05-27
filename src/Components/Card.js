const Card = props => {
  const OverlayIcon = props.overlayIcon;

  return (
    <div className="my-card">
      <img className="my-card-image" src={props.movie.Poster} alt="movie"></img>

      <div
        className="my-overlay"
        onClick={() => props.handleOverlayClick(props.movie)}
      >
        <span className="me-2">{props.overlayText}</span>
        <OverlayIcon />
      </div>
    </div>
  );
};

export default Card;
