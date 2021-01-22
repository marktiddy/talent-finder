import './App.css';
import Sidebar from './components/Sidebar';
import Talent from './components/Talent';
import { useState, useEffect } from 'react';

//Global variable for our API URL - We might store this in a .env long term
const APIURL = 'http://localhost:5000/talent';

const App = () => {
  const [talent, setTalent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const initTalent = async () => {
      const data = await loadTalent();
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
      return res;
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
