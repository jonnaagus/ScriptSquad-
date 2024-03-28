import React, { useEffect, useState } from 'react';
import '../styles/Timereport.css';
import axios from 'axios';

// Function to fetch reported time for a given day
function fetchReportedTimeForDay(date, callback) {
    const payload = {
        filter: {
          property: "Date",
          date: {
            equals: date       
          }
        }
      };
    axios.post('http://localhost:3002/api/timeReports', payload)
       .then(response => callback(response.data))
       .catch(error => console.error(error));
}

// Function to fetch reported time for a given week
function fetchReportedTimeForWeek(startDate, endDate, callback) {
    const payload = {
        filter: {
            and: [
              { property: "Date",
              date: {
                after: startDate       
              }},
              { property: "Date",
              date: {
                before: endDate       
              }}
            ]
          }
        };
    axios.post('http://localhost:3002/api/timeReports', payload)
        .then(response => callback(response.data))
        .catch(error => console.error(error));
}

function CalendarView(props) {
    // State for date, view type, reported time, people and projects
    const [date, setDate] = useState('');
    const [viewType, setViewType] = useState('day');
    const [reportedTime, setReportedTime] = useState([]);
    const [peopleMap, setPeopleMap] = useState({});
    const [projectsMap, setProjectsMap] = useState({});

    // Fetch people and projects from the API when the component mounts for the first time
    useEffect(() => {
        async function fetchData() {
            try {
                const peopleResponse = await axios.post('http://localhost:3002/api/people');
                const projectsResponse = await axios.post('http://localhost:3002/api/projects');

                // Create a map of people with their IDs as keys and name as values 
                const peopleMapData = {};
                peopleResponse.data.forEach(person => {
                    if (person.properties.Name) {
                        peopleMapData[person.id] = person.properties.Name.title[0].plain_text;
                    }
                });

                // Create a map of projects with their IDs as keys and names as values
                const projectsMapData = {};
                projectsResponse.data.forEach(project => {
                    if (project.properties.Projectname) {
                        projectsMapData[project.id] = project.properties.Projectname.title[0].plain_text;
                    }
                });

                // Update the state for people and projects 
                setPeopleMap(peopleMapData);
                setProjectsMap(projectsMapData);
            } catch (error) {
                console.error('Error fetching people and projects:', error);
            }
        }

        fetchData();
    }, []); // Use an empty array as the dependency to run the effect only once on mount

    // Fetch reported time when the date or view type changes
    useEffect(() => {
        if (viewType === 'day') {
            fetchReportedTimeForDay(date, setReportedTime);
        } else if (viewType === 'week') {
            // Calculate the start and end dates for the selected week
            const selectedDate = new Date(date);
            const firstDayOfWeek = new Date(selectedDate);
            firstDayOfWeek.setDate(selectedDate.getDate());
            const lastDayOfWeek = new Date(selectedDate);
            lastDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 7);
            const startDate = firstDayOfWeek.toISOString().split('T')[0];
            const endDate = lastDayOfWeek.toISOString().split('T')[0];

            fetchReportedTimeForWeek(startDate, endDate, setReportedTime);
        }
    }, [date, viewType]); // Update when the date or view type changes

    // Function to handle changes in the date field
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    // Function to handle changes in the view type dropdown
    const handleViewTypeChange = (event) => {
        setViewType(event.target.value);
    };
    
    return (
        <div className="wrapper">
            <header className="header">
                <h1>Tidrapporter</h1>
            </header>
            <div className="calendar-controls">
                <label htmlFor="date">Datum:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />

                <label htmlFor="viewType">Vy:</label>
                <select id="viewType" value={viewType} onChange={handleViewTypeChange}>
                    <option value="day">Dag</option>
                    <option value="week">Vecka</option>
                </select>
            </div>
            <div className="calendar">
                {/* Display reported time for the selected date or week */}
                <h2>Rapporterad tid</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Person</th>
                            <th>Timmar</th>
                            <th>Projekt</th>
                            <th>Kommentarer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedTime.map(report => (
                            <tr key={report.id}>
                                <td>{report.properties.Date.date.start}</td>
                                <td>{peopleMap[report.properties.Person.relation[0].id]}</td>
                                <td>{report.properties.Hours.number}</td>
                                <td>{projectsMap[report.properties.Project.relation[0].id]}</td>
                                <td>{report.properties.Note.title[0].plain_text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="footer">
                2024 Projekt.se. Alla rättigheter förbehållna.
            </footer>
        </div>
    );
}

export default CalendarView;