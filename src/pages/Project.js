import React, { useEffect, useState } from 'react';
import '../styles/Timereport.css';
import { useParams } from 'react-router-dom'
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

function Project() {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [comments, setComments] = useState('');
  const [timeReports, setTimeReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [peopleMap, setPeopleMap] = useState({});
  const [projectsMap, setProjectsMap] = useState({});

  //extracting the id parameter from the route
  const { id } = useParams();

  //fetch time reports associated with the project id when id changes
  useEffect(() => {
    async function getTimeReports() {
      try {
        const payload = {
          filter: {
            property: "Project",
            relation: {
              contains: id
            }
          }
        };
        const response = await axios.post(`http://localhost:3002/api/timeReports`, payload);
        setTimeReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching time reports:', error);
      }
    }
  
    getTimeReports();
  }, [id]);

  //fetch people and projects data when the component mounts
  useEffect(() => {
    async function fetchPeopleAndProjects() {
      try {
        const peopleResponse = await axios.post('http://localhost:3002/api/people');
        const projectsResponse = await axios.post('http://localhost:3002/api/projects');
    
        //extracting people data and creating a map
        const peopleMapData = {};
        peopleResponse.data.forEach(person => {
          if (person.properties.Name) {
            peopleMapData[person.id] = person.properties.Name.title[0].plain_text;
          }
        });
    
        //extracting projects data and creating a map
        const projectsMapData = {};
        projectsResponse.data.forEach(project => {
          if (project.properties.Projectname) {
            projectsMapData[project.id] = project.properties.Projectname.title[0].plain_text;
          }
        });
    
        //setting state variables for people and projects maps
        setPeopleMap(peopleMapData);
        setProjectsMap(projectsMapData);
      } catch (error) {
        console.error('Error fetching people and projects:', error);
      }
    }

    //call the fetchPeopleAndProjects function when the component mounts
    fetchPeopleAndProjects();
  }, []);

  const { auth } = useAuth();
  //start function to get user id from people table
  useEffect(() => {
    GetPeople(auth);
  });

  //function to handle changes in the date input field
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  //function to handle changes in the hours input field
  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  //function to handle changes in the comments input field
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  //function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datum:', date);
    console.log('Timmar:', hours);
    console.log('Kommentar:', comments);
    setDate('');
    setHours('');
    setComments('');
    postDatatoNotion(parseInt(hours), date.toString(), id, window.localStorage.getItem("people"), comments.toString())
  };

  return (
    <div className="wrapper">
      {/* Project name and description */}
      <div className="project-info">
        <h2>{projectsMap[id]}</h2>
        
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
        <button type="submit">Skicka in tidrapport</button>
      </form>
      <div className="table-container">
  <h1 style={{ fontSize: '24px', textAlign: 'center' }}>Tidrapporter</h1>
  {/* Render loading message or time reports table */}
  {loading ? (
    <p>Loading...</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Projekt</th>
          <th>Person</th>
          <th>Datum</th>
          <th>Timmar</th>
          <th>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through timeReports and render each report */}
        {timeReports.map(report => (
          <tr key={report.id}>
            <td>{projectsMap[report.properties.Project.relation[0].id]}</td>
            <td>{peopleMap[report.properties.Person.relation[0].id]}</td>
            <td>{report.properties.Date.date.start}</td>
            <td>{report.properties.Hours.number}</td>
            <td>{report.properties.Note.title[0].plain_text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
);
}

export default Project;