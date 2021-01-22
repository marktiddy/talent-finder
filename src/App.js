import './App.css';
import Sidebar from './components/Sidebar';
import Talent from './components/Talent';
import { useState, useEffect } from 'react';

//Note - As this app scales we would remove a lot of logic from here and use this container as a router. This isnt needed for now

//Global variable for our API URL - We might store this in a .env long term
const APIURL = 'https://randomuser.me/api/?results=10';

const App = () => {
  const [talent, setTalent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const initTalent = async () => {
      const data = await loadTalent();
      console.log(data);
      setTalent(data);
    };

    //Call the function
    initTalent();
  }, []);

  //Function to load talent from our API
  const loadTalent = async () => {
    try {
      const data = await fetch(APIURL);
      const res = await data.json();
      return res.results;
    } catch (e) {
      setError('We had a problem loading the talent. Please try again later');
    }
  };

  return (
    <div className="main-container">
      <Sidebar />
      <Talent error={error} talent={talent} />
    </div>
  );
};

export default App;
