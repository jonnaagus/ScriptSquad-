import React, { useEffect, useState } from 'react';
import '../styles/Timereport.css';
import axios from 'axios';

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
    const [date, setDate] = useState('');
    const [viewType, setViewType] = useState('day');
    const [reportedTime, setReportedTime] = useState([]);
    const [peopleMap, setPeopleMap] = useState({});
    const [projectsMap, setProjectsMap] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const peopleResponse = await axios.post('http://localhost:3002/api/people');
                const projectsResponse = await axios.post('http://localhost:3002/api/projects');

                const peopleMapData = {};
                peopleResponse.data.forEach(person => {
                    if (person.properties.Name) {
                        peopleMapData[person.id] = person.properties.Name.title[0].plain_text;
                    }
                });

                const projectsMapData = {};
                projectsResponse.data.forEach(project => {
                    if (project.properties.Projectname) {
                        projectsMapData[project.id] = project.properties.Projectname.title[0].plain_text;
                    }
                });

                setPeopleMap(peopleMapData);
                setProjectsMap(projectsMapData);
            } catch (error) {
                console.error('Error fetching people and projects:', error);
            }
        }

        fetchData();
    }, []); 

    useEffect(() => {
        if (viewType === 'day') {
            fetchReportedTimeForDay(date, setReportedTime);
        } else if (viewType === 'week') {
            const selectedDate = new Date(date);
            const firstDayOfWeek = new Date(selectedDate);
            firstDayOfWeek.setDate(selectedDate.getDate());
            const lastDayOfWeek = new Date(selectedDate);
            lastDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 7);
            const startDate = firstDayOfWeek.toISOString().split('T')[0];
            const endDate = lastDayOfWeek.toISOString().split('T')[0];

            fetchReportedTimeForWeek(startDate, endDate, setReportedTime);
        }
    }, [date, viewType]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleViewTypeChange = (event) => {
        setViewType(event.target.value);
    };
    
    return (
        <div className="wrapper">
            <header className="header">
                <h1>Rapporterad tid</h1>
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
                            <th>Date</th>
                            <th>Person</th>
                            <th>Hours</th>
                            <th>Project</th>
                            <th>Note</th>
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