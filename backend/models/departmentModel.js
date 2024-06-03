// models/departmentModel.js

const db = require('../config/db');

const createDepartmentTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Department (
            dept_id INT AUTO_INCREMENT PRIMARY KEY,
            dept_name VARCHAR(255),
            description VARCHAR(255),
            phone VARCHAR(255),
            ext VARCHAR(255),
            fax VARCHAR(255),
            email VARCHAR(255)
        );
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error creating Department table:', err);
            throw err;
        }
        console.log('Department table created or already exists');
    });
};

module.exports = {
    createDepartmentTable
};
