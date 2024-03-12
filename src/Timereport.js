import React, { useState } from 'react';
import './Timereport.css';

function Timereport() {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [comments, setComments] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datum:', date);
    console.log('Timmar:', hours);
    console.log('Kommentar:', comments);
    setDate('');
    setHours('');
    setComments('');
  };

  return (
    <div className="wrapper">
      <header className="header">
        <h1>Tidrapport</h1>
      </header>
      <form className="time-report" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Datum:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Timmar:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={handleHoursChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Kommentar:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
          />
        </div>
        <button type="submit">Skicka in tidrapport</button>
      </form>
      <footer className="footer">
        2024 Projekt.se. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}

export default Timereport;