import React, { useEffect, useState } from 'react';
import '../styles/Timereport.css';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import useAuth from '../hooks/useAuth';

function postDatatoNotion(hours, date, projId, personId, Note) {
  //json to add to notion in this example timereports
  const payload =
  {
    //id to table
    "parent": {
      "type": "database_id",
      "database_id": "c2dcd975b12248588431b2de1d1022c9"
    },

    //data to add as row in tablew
    "properties": {
      "Hours": {
        "type": "number",
        "number": hours
      },
      "Date": {
        "type": "date",
        "date": {
          "start": date
        }
      },
      "Project": {
        "relation": [
          {
            //id from project in project table
            "id": projId
          }
        ],

      },
      "Person": {
        "relation": [
          {
            //id from user in people table
            "id": personId
          }
        ],
      },
      "Note": {
        "title": [
          {
            "type": "text",
            "text": {
              "content": Note
            }
          }
        ]
      }
    }
  }

  //post json to server as payload
  axios.post(`http://localhost:3002/api/addRow`, payload)

};

function GetPeople(auth) {
  //get username of current user

 // const user = JSON.parse(window.localStorage.getItem("user")).bot.owner.user.name

  //add username to filter
  const payload = {
    filter: {
      property: "Name",
      title: {
        contains: auth.userName
       
      }
    }
  };
  //query people database for username
  axios.post('http://localhost:3002/api/people', payload).then((resp) => {
    
  console.log(resp.data)
    //if username found get id from first result
    if (resp.data.length > 0) {
      const people = resp.data[0].id;
      console.log("PERSON RESULT:", people);
      window.localStorage.setItem("people", people);

    }
    //if no results found add id from user "unknown"
    else {
      console.log("NO USER FOUND")
      window.localStorage.setItem("people", "49958f3d-710b-43c2-93ee-103691e4123e");
    }

  });



}

function Timereport(props) {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [comments, setComments] = useState('');

  const { auth } = useAuth();
  //start function to get user id from people table
  useEffect(() => {
    GetPeople(auth);
  });

  // Function to handle changes in the date input field
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Function to handle changes in the hours input field
  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  // Function to handle changes in the comments input field
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datum:', date);
    console.log('Timmar:', hours);
    console.log('Kommentar:', comments);
    setDate('');
    setHours('');
    setComments('');
  };

  const location = useLocation()
  const state = location.state;
  console.log(state);


  return (
    <div className="wrapper">
      {/* Project name and description */}
      <div className="project-info">
        <h2>Project Name</h2>
        <p>Project Description</p>
      </div>
      {/* Form for submitting time report */}
      <form className="time-report" onSubmit={handleSubmit}>
        {/* Grey box around the form elements */}
        <div className="form-container">
          {/* Date input field */}
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
          {/* Hours input field */}
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
          {/* Comments input field */}
          <div className="form-group">
            <label htmlFor="comments">Kommentar:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={handleCommentsChange}
            />
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" onClick={() => postDatatoNotion(parseInt(hours), date.toString(), state.toString(), window.localStorage.getItem("people"), comments.toString())}>Skicka in tidrapport</button>
      </form>
    </div>
  );
}

export default Timereport;