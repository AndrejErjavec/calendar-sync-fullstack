import {useState} from 'react';
import { useEffect } from 'react';
import calendarService from '../../features/calendarService';
import CalendarItem from './CalendarItem.jsx';
import './Calendar.css';

const CalendarList = () => {
  const [url, setUrl] = useState('');

  const [calendars, setCalendars] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    calendarService.getCalendarUrls()
    .then((data) => {
      setCalendars(data.calendar_urls);
      setLoading(false);
    })
    .catch((err) => {
      setMessage(err.response.data.message);
      setIsError(true);
      setLoading(false);
    })
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await calendarService.addCalendar(url);
    console.log(response);
    setUrl('');
  }

  if (loading) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <>
      <h3>My calendars</h3>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text"
            id="url"
            name="url"
            value={url}
            placeholder="paste calendar URL here"
            onChange={(e) => setUrl(e.target.value)} />
          </div>
          <button type="submit" enabled={url === '' ? 'true' : 'false'}>add calendar</button>
        </form>
        <div className="calendar-list">
          {loading ? (<p>loading...</p>) : (
            <div>
            {calendars.length > 0 ? (
              calendars.map((calendar) => (
                <CalendarItem key={calendar._id} calendar={calendar}></CalendarItem>
              ))
            ):(<div>no calendars added</div>)}
            </div>
          )}
        </div>
      </>
  )
}

export default CalendarList;