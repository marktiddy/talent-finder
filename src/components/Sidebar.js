import Filter from './Filter';

const Sidebar = ({ locations, filter, setFilter }) => {
  return (
    <div className="sidebar">
      <h1>Talent Finder</h1>
      <p>Use the search below to find talent</p>
      <Filter locations={locations} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Sidebar;
