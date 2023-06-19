import HeartIcon from "./HeartIcon";
import WishIcon from "./WishIcon";

const Card = ({
  card,
  onLeftClick,
  onRightClick,
  link = "https://www.imdb.com/title",
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
        <HeartIcon onClick={onLeftClick()} />

        <WishIcon onClick={onRightClick()} />
      </div>
    </div>
  );
};

export default Card;
