import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverviewTable = () => {
    const [projects, setProjects] = useState([]);

    const fetchDataFromNotion = () => {
        const payload = {

        };


        axios.post('http://localhost:3002/api/notion', payload)
            .then(response => {
                setProjects(response.data);
                console.log('data hämtad från notion', response.data);
            })
            .catch(error => {
                console.error('Fel vid hämtning från Notion:', error);
            });
    };
    useEffect(() => {
        fetchDataFromNotion();
    }, []);
    if (!projects || !Array.isArray(projects?.results)) {
        return <p>Laddar data eller ingen data att visa...</p>;
    }



    return (
        <table>
            <thead>
                <tr>
                    <th>Projectname</th>
                    <th>Status</th>
                    <th>Hours</th>
                    <th>Worked hours</th>
                    <th>Hours left</th>
                    <th>Timespan</th>
                </tr>
            </thead>
            <tbody>
                {projects.results.map(project => (
                    <tr key={project.id}>
                        <td >{project.status}</td>
                        <td>{project.properties.Projectname.title[0]?.plain_text}</td>
                        <td>{project.hours}</td>
                        <td>{project.workedhours}</td>
                        <td>{project.hoursleft}</td>
                        <td>{project.timespan}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//         case 'Färdig':
//             return 'green';
//         case 'Pågående':
//             return 'yellow';
//         case 'Inte påbörjad':
//             return 'red';
//         default:
//             return '';
//     }
// };

export default OverviewTable;