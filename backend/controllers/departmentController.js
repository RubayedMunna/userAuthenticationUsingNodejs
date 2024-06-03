const xml2js = require('xml2js');
const db = require('../config/db');

const uploadDepartmentsAsXML = async (req, res) => {
    const xmlData = req.body;
    console.log('Received XML Data:', xmlData); // Log incoming data for debugging

    xml2js.parseString(xmlData, async (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return res.status(400).send('Invalid XML data');
        }

        const rows = result.root.row;
        try {
            await clearTable('Department');
            for (const row of rows) {
                const dept_id = row.dept_id && row.dept_id[0];
                const dept_name = row.dept_name && row.dept_name[0];
                const description = row.description && row.description[0];
                const phone = row.phone && row.phone[0];
                const ext = row.ext && row.ext[0];
                const fax = row.fax && row.fax[0];
                const email = row.email && row.email[0];

                if (dept_id && dept_name && description && phone && ext && fax && email) {
                    await insertDepartmentIntoDatabase(dept_id, dept_name, description, phone, ext, fax, email);
                } else {
                    console.warn('Skipping incomplete row:', row);
                }
            }
            res.status(200).send('XML data imported successfully.');
        } catch (error) {
            console.error('Error importing XML data:', error);
            res.status(500).send('Error importing XML data.');
        }
    });
};

const insertDepartmentIntoDatabase = (dept_id, dept_name, description, phone, ext, fax, email) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Department (dept_id, dept_name, description, phone, ext, fax, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [dept_id, dept_name, description, phone, ext, fax, email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to clear the table before inserting new data
const clearTable = (tableName) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tableName}`;
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    uploadDepartmentsAsXML
};
