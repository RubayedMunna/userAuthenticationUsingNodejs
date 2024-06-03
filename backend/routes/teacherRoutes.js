const express = require('express');
const { uploadTeacherAsXML } = require('../controllers/teacherController');


const router = express.Router();

router.post('/teacher_xml', uploadTeacherAsXML);

module.exports = router;