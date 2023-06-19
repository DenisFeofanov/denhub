import Card from "./Card";

const MovieCard = ({ ...rest }) => {
  return <Card link="https://www.imdb.com/title" {...rest} />;
};

export default MovieCard;
