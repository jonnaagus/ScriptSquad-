import React, { useState, useEffect } from 'react';
import '../styles/overview.css';
import axios from 'axios';
import { Link } from "react-router-dom";

// OverviewTable-component
const OverviewTable = () => {

    // Variables that manage information about projects. Also contains loading state, error state, and viewing options

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    // Fetch data from Notion with Notion Database ID

    const fetchDataFromNotion = async () => {
        // Post to server - Returns Json

        try {
            const response = await axios.post(`http://localhost:3002/api/projects`);
            // Update state with fetched project data

            setProjects(response.data);

            // Update loading state to false

            setLoading(false);

            // Log success message to the console

            console.log('Data hämtad från Notion', response.data);
        } catch (error) {

            // If an error occurs, update error state with an error message

            setError('Fel vid hämtning från Notion: ' + error.message);

            // Update loading state to false

            setLoading(false);
        }
    };
    
    // Run fetchDataFromNotion when the 'showAll' state changes

    useEffect(() => {
        fetchDataFromNotion();
    }, [showAll]);

    // Table with selected projects, with status ' active' as default. Also contains loading message and error handling
    return (
        <header className="App-header">
            <div className="overview-header">
                <h1>Projektöversikt</h1>
                <div className='projectOverview'>
                    {/* Display loading message if data is still loading */}
                    {loading && <p>Laddar dina projekt...</p>}
                    {/* Display error message if an error occurred */}
                    {error && <p>{error}</p>}
                    {/* If there is no loading and no error, the project info will show */}
                    {!loading && !error && (
                        <div classname="dropDown">
                            <label>
                                {/* Dropdown for selecting 'all projects' or only 'active projects' */}
                                Visa:
                                <select value={showAll.toString()} onChange={() => setShowAll(!showAll)}>
                                    <option value="false">Aktiva projekt</option>
                                    <option value="true">Alla projekt</option>
                                </select>
                            </label>
                        </div>
                    )}
                    {/* Show overviewtable if is not loading and no errors occur */}
                    {!loading && !error && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Projektnamn</th>
                                    <th>Status</th>
                                    <th>Timmar</th>
                                    <th>Arbetade timmar</th>
                                    <th>Kvarstående timmar</th>
                                    <th>Tid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map through filtered and sorted projects */}
                                {projects
                                    .filter(project => (showAll ? true : project.properties.Status?.select?.name === 'Active'))
                                    .sort((a, b) => {
                                        // Order projects according to status
                                        const statusOrder = {
                                            'Active': 1,
                                            'Next up': 2,
                                            'Done': 3
                                        };
                                        return statusOrder[a.properties.Status?.select?.name] - statusOrder[b.properties.Status?.select?.name];
                                    })
                                    .map(project => (
                                        <tr key={project.id}>
                                            {/* Display project information in each cell and display an alternative text if no data is found */}
                                            <td>{project.properties.Projectname.title[0]?.plain_text || 'Ingen titel'}</td>
                                            <td>{project.properties.Status?.select?.name || 'Okänd status'}</td>
                                            <td>{project.properties.Hours?.number || 'Inga timmar'}</td>
                                            <td>{project.properties['Worked hours']?.rollup?.number || 'Inga arbetade timmar'}</td>
                                            <td>{project.properties["Hours left"]?.formula?.number || 'Inga kvarvarande timmar'}</td>
                                            <td>{project.properties.Timespan?.date?.start || 'Ingen tidsram'}</td>
                                            <td><Link to={`/project/${project.id}`}>Öppna projekt</Link> </td>
                                        </tr>
                                    ))}
                            </tbody>
    
                        </table>
                    )}
                </div>
            </div>
        </header>
    );
};

export default OverviewTable;