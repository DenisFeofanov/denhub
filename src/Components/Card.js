const Card = props => {
  const LeftIcon = props.leftIcon;
  const RightIcon = props.rightIcon;

  return (
    <div className="my-card">
      <a
        href={`https://www.imdb.com/title/${props.movie.imdbID}`}
        className="my-card"
      >
        <img
          className="my-card-image"
          src={props.movie.Poster}
          alt="movie"
        ></img>
      </a>

      <div className="my-overlay">
        <LeftIcon onClick={() => props.onLeftClick(props.movie)} />

        <RightIcon onClick={() => props.onRightClick(props.movie)} />
      </div>
    </div>
  );
};

export default Card;
