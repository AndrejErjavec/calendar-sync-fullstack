import {useState} from 'react';
import { useEffect } from 'react';
import calendarService from '../../features/calendarService';
import './Subjects.css';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    calendarService.getSubjects()
    .then((data) => {
      setSubjects(data);
      setLoading(false);
    })
    .catch((err) => {
      setMessage(err.response.data.message);
      setIsError(true);
      setLoading(false);
    })
    
  }, []);

  const handleCheck = (e) => {
    let list = subjects;
    if (e.target.checked) {
      list.push(e.target.value);
    }
    else {
      list.splice(list.indexOf(e.target.valaue), 1);
    }
    console.log(list);
    setSubjects(list);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section>
      <h3>My subjects</h3>
      <div className="subject-list">
        {loading ? (<div>loading...</div>) : (
          <div>
            {subjects.length > 0 ? (
              <form onSubmit={handleSubmit}>
                {subjects.map((subject) => (
                <div>
                  <input type="checkbox" key={subject} name={subject} value={subject} onChange={handleCheck}></input>
                  <label htmlFor={subject}>{subject}</label>
                </div>
              ))}
              <button type="submit">apply</button>
              </form>
        ):(<div>Can not get subjects for your calendars</div>)}
          </div>
        )}
      </div> 
    </section>
  )
}

export default SubjectList;