import { Router } from 'express';
import { studentLogin, teacherLogin, organisationLogin, studentSignup, teacherSignup, organisationSignup } from '../controllers/authController';



const router = Router();

// auth routes 

router.post('/student/login', studentLogin);
router.post('/teacher/login', teacherLogin);
router.post('/organisation/login', organisationLogin);

router.post('/student/signup', studentSignup);
router.post('teacher/signup', teacherSignup);
router.post('organisation/signup', organisationSignup);


// services routes 