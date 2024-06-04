const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getSuperUserByEmail } = require('../controllers/superUserController');
const { getTeacherByEmail } = require('../controllers/teacherController');
const { getStudentByEmail } = require('../controllers/studentController');
const { getStaffByEmail } = require('../controllers/staffController');
const db = require('../config/db');


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    let user = await getSuperUserByEmail(email);
    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.admin_id, role: 'SuperUser' }, 'secretKey', { expiresIn: '1h' });
            return res.json({ token, role: 'SuperUser' });
        }
    }
    console.log('super user e nai');
    user = await getTeacherByEmail(email);
    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.teacher_id, role: 'Teacher' }, 'secretKey', { expiresIn: '1h' });
            return res.json({ token, role: 'Teacher' });
        }
    }
    console.log('teacher e o nai');

    

    user = await getStudentByEmail(email);
    if (user) {
        console.log(user.password);
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.student_id, role: 'Student' }, 'secretKey', { expiresIn: '1h' });
            return res.json({ token, role: 'Student' });
        }
    }

    console.log('student e o nai');

    user = await getStaffByEmail(email);
    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.staff_id, role: 'Staff' }, 'secretKey', { expiresIn: '1h' });
            return res.json({ token, role: 'Staff' });
        }
    }

    return res.status(401).send('Invalid credentials');
};

const getDashboardData = async (req, res) => {
    const { role } = req.user;

    switch (role) {
        case 'SuperUser':
            // Fetch data for SuperUser
            res.json({ message: 'Welcome SuperUser!' });
            break;
        case 'Teacher':
            // Fetch data for Teacher
            res.json({ message: 'Welcome Teacher!' });
            break;
        case 'Student':
            // Fetch data for Student
            res.json({ message: 'Welcome Student!' });
            break;
        case 'Staff':
            // Fetch data for Staff
            res.json({ message: 'Welcome Staff!' });
            break;
        default:
            res.status(400).send('Invalid user role');
    }
};

module.exports = { login, getDashboardData };
