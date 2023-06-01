import XIcon from "./XIcon";

const RemovedCard = ({ width, height }) => {
  return (
    <div
      className="my-removed-card"
      style={{
        width: width,
        height: height,
      }}
    >
      <XIcon customClassName="my-removed-card-close" width={32} height={32} />
      <p className="my-removed-card-text">Undo</p>
    </div>
  );
};

export default RemovedCard;
