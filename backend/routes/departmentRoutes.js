const express = require('express');
const router = express.Router();
const { uploadDepartmentsAsXML } = require('../controllers/departmentController'); // Adjust the path if needed

router.post('/upload-department', uploadDepartmentsAsXML);

module.exports = router;
