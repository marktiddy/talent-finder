//Note
//At the moment the filter uses a dropdown to ensure the place name will always match one of the talent selected
//This could be expanded in the long term to select a country then city or have a search box

const Filter = ({ locations, setFilter, filter }) => {
  return (
    <div className="filter">
      <h3>Filter Results</h3>
      <label htmlFor="location">Location:</label>
      <br />
      <select
        id="location"
        name="location"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        disabled={locations ? false : true}
      >
        {locations && <option value="show-all">Show All</option>},
        {locations &&
          locations.map((l, idx) => {
            return (
              <option key={idx} value={l}>
                {l}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Filter;
