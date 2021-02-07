import './App.css';
import Sidebar from './components/Sidebar';
import Talent from './components/Talent';
import { useState, useEffect } from 'react';
import Moment from 'moment';

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
  const [filter, setFilter] = useState(''); //Location filter
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const initTalent = async () => {
      var data = await loadTalent();
      data = dataWithAge(data);
      console.log(data);
      setTalent(data);
      setFilteredTalent(data);
    };

    //Call the function
    initTalent();
  }, []);

  useEffect(() => {
    findLocations();
  }, [talent]);

  const dataWithAge = (data) => {
    var newData = data.map((d) => {
      d.dob.realAge = Moment().diff(d.dob.date, 'years');
      return d;
    });
    return newData;
  };

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

  //Function to update our filter
  const updateAgeFilter = (age) => {
    setAgeFilter(age);

    //We need to filter the talent to only match the chosen age range
    var rangeStart;
    var rangeEnd;
    switch (age) {
      case 'kids':
        rangeStart = 0;
        rangeEnd = 20;
        break;
      case '20s':
        rangeStart = 21;
        rangeEnd = 30;
        break;
      case '30s':
        rangeStart = 31;
        rangeEnd = 50;
        break;
      case '50s':
        rangeStart = 51;
        rangeEnd = 200;
        //do something
        break;
      default:
        rangeStart = 0;
        rangeEnd = 200;
        break;
    }

    const newTalent = talent.filter((t) => {
      return t.dob.realAge >= rangeStart && t.dob.realAge <= rangeEnd;
    });
    setFilteredTalent(newTalent);
  };

  return (
    <div className="main-container">
      <Sidebar
        locations={locations}
        filter={filter}
        setFilter={updateFilter}
        setAgeFilter={updateAgeFilter}
        ageFilter={ageFilter}
      />
      <Talent error={error} talent={filteredTalent} />
    </div>
  );
};

export default App;
