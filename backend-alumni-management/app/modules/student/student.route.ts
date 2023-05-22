import express from "express";
import { createStudent, getStudents } from './student.controller';
const router = express.Router();
import { authGuard } from '../auth-token/check-auth-user';



// Root API
router.get('/', getStudents);
router.post('/create-student', createStudent);


export default router;