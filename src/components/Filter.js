//Note
//At the moment the filter uses a dropdown to ensure the place name will always match one of the talent selected
//This could be expanded in the long term to select a country then city or have a search box

const Filter = ({ locations, setFilter, filter, ageFilter, setAgeFilter }) => {
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
      <label htmlFor="age">Age:</label>
      <br />
      <select
        id="age"
        name="age"
        onChange={(e) => setAgeFilter(e.target.value)}
        value={ageFilter}
      >
        <option value="show-all">Show All Ages</option>
        <option value="kids">0 - 20</option>
        <option value="20s">21 - 30</option>
        <option value="30s">31-50</option>
        <option value="50s">51+</option>
      </select>
    </div>
  );
};

export default Filter;
