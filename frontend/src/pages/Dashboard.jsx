import {useState} from 'react';
import { useEffect } from 'react';
import { redirect } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      redirect('/login');
    }
    else {
      setUser(user);
    }
  },[]);

  return(
    <>
      <h1>Hello {user.email}</h1>
    </>
  )
}

export default Dashboard;