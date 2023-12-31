const SearchBox = props => {
  return (
    <input
      className="my-input"
      value={props.value}
      onChange={event => props.setSearchValue(event.target.value)}
      placeholder="Type to search..."
    ></input>
  );
};

export default SearchBox;
