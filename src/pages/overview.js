import React from 'react';

const OverviewTable = ({ projects }) => {
    return(
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
                {projects.map(project => (
                    <tr key={project.id}>
                        <td className={getStatusColor(project.status)}>{project.status}</td>
                        <td>{project.projectname}</td>
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

const getStatusColor =(status) => {
    switch (status.toLowerCase()) {
        case 'Färdig':
            return 'green';
        case 'Pågående':
            return 'yellow';
        case 'Inte påbörjad':
            return 'red';
        default:
            return '';
    }
};

export default OverviewTable;