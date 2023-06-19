import HeartIcon from "./HeartIcon";
import WishIcon from "./WishIcon";

const Card = ({
  card,
  onLeftClick,
  onRightClick,
  link = "https://www.imdb.com/title",
  isFavourite,
  isWishlisted,
}) => {
  return (
    <div className="my-card">
      <a href={`${link}/${card.imdbID}`} className="my-card">
        <img
          className="my-card-image"
          src={card.Poster}
          alt="Content card"
        ></img>
      </a>

      <div className="my-overlay">
        <div className="my-overlay-icon" onClick={onLeftClick}>
          <HeartIcon fill={isFavourite ? "red" : "white"} />
        </div>

        <div className="my-overlay-icon" onClick={onRightClick}>
          <WishIcon fill={isWishlisted ? "red" : "white"} />
        </div>
      </div>
    </div>
  );
};

export default Card;
