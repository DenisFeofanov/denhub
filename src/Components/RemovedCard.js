import XIcon from "./XIcon";

const RemovedCard = ({
  width,
  height,
  movie,
  handleUndoClick,
  handleCloseClick,
}) => {
  return (
    <div
      className="my-removed-card"
      style={{
        width: width,
        height: height,
      }}
    >
      <XIcon
        className="my-removed-card-close"
        width={32}
        height={32}
        onClick={() => handleCloseClick(movie)}
      />
      <button
        className="my-removed-card-text"
        onClick={() => handleUndoClick(movie)}
      >
        Undo
      </button>
    </div>
  );
};

export default RemovedCard;
