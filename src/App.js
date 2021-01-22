import './App.css';
import Sidebar from './components/Sidebar';
import Talent from './components/Talent';
import { useState, useEffect } from 'react';

//Note - As this app scales we would remove a lot of logic from here and use this container as a router. This isnt needed for now
//Note - As the project scales it would probably make more sense to store the data in a Context rather than state

//Global variable for our API URL - We might store this in a .env long term
//const APIURL = 'https://randomuser.me/api/?results=10';
const APIURL = 'http://localhost:5000/results';

const App = () => {
  const [talent, setTalent] = useState([]);
  const [filteredTalent, setFilteredTalent] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const initTalent = async () => {
      const data = await loadTalent();
      setTalent(data);
      setFilteredTalent(data);
    };

    if (talent) {
      findLocations();
    }

    //Call the function
    initTalent();
  }, []);

  //Function to load talent from our API
  const loadTalent = async () => {
    try {
      const data = await fetch(APIURL);
      const res = await data.json();
      return res;
    } catch (e) {
      setError('We had a problem loading the talent. Please try again later');
    }
  };

  //Function to get a list of locations
  const findLocations = () => {
    const locationArray = [];
    talent.forEach((profile) => {
      if (!locationArray.includes(profile.location.city)) {
        //City is unique
        locationArray.push(profile.location.city);
      }
    });
    locationArray.sort();
    setLocations(locationArray);
  };

  //Function to update our filter
  const updateFilter = (location) => {
    setFilter(location);
    if (location == 'show-all') {
      setFilteredTalent(talent);
    } else {
      //We need to filter the talent to only match the chosen location
      const newTalent = talent.filter((t) => {
        return t.location.city == location;
      });
      setFilteredTalent(newTalent);
    }
  };

  return (
    <div className="main-container">
      <Sidebar locations={locations} filter={filter} setFilter={updateFilter} />
      <Talent error={error} talent={filteredTalent} />
    </div>
  );
};

export default App;
