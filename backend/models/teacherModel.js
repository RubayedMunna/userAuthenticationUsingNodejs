
const db = require('../config/db');

const createXmlDataTeacherTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS xml_teacher_data (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            Teacher_Name VARCHAR(255),
            Designation VARCHAR(255),
            Department VARCHAR(255)
        )
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error creating xml_teacher_data table:', err);
            throw err;
        }
        console.log('XML data teacher table created or already exists');
    });
};

module.exports = {
    createXmlDataTeacherTable
}