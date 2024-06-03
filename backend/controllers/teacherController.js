const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');


const uploadTeacherAsXML = async (req, res) => {
    const xmlData = req.body;
    console.log('Received XML Data:', xmlData); // Log incoming data for debugging

    xml2js.parseString(xmlData, async (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return res.status(400).send('Invalid XML data');
        }

        const rows = result.root.row;
        try {
            await clearTable('xml_teacher_data');
            for (const row of rows) {
                var Id=row.Id && row.Id[0];
                const Teacher_Name = row.Teacher_Name && row.Teacher_Name[0];
                const Designation = row.Designation && row.Designation[0];
                const  Department = row.Department && row.Department[0];

                if (Teacher_Name &&  Designation && Department) {
                    await insertXmlTeacherIntoDatabase(row);
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

const insertXmlTeacherIntoDatabase = (row) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO xml_teacher_data (Id,Teacher_Name, Designation, Department) VALUES (?,?, ?, ?)';
        db.query(query, [row.Id[0],row.Teacher_Name[0], row.Designation[0], row.Department[0]], (err, results) => {
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
    uploadTeacherAsXML
}