import {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header/Header';
import CalendarList from '../components/Calendar/CalendarList';
import SubjectList from '../components/Subjects/SubjectList';
import '../index.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setLoading(true);
    if (!user) {
      navigate('/login');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <h3>loading...</h3>
    )
  }

  return(
    <section className="dashboard">
      <Header user={user}></Header>
      <div className="container">
        <CalendarList></CalendarList>
        <SubjectList></SubjectList>
      </div>
    </section>
    )
}

export default Dashboard;