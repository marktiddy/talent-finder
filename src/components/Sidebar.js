import Filter from './Filter';

const Sidebar = ({ locations, filter, setFilter, ageFilter, setAgeFilter }) => {
  return (
    <div className="sidebar">
      <h1>Talent Finder</h1>
      <p>Use the search below to find talent</p>
      <Filter
        locations={locations}
        filter={filter}
        setFilter={setFilter}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
      />
    </div>
  );
};

export default Sidebar;
