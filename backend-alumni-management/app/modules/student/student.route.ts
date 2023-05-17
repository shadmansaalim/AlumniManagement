import express from "express";
import { createStudent, getStudents } from './student.controller';
const router = express.Router();
import { authGuard } from '../auth-token/check-auth-user';



// Root API
router.get('/', authGuard, getStudents);
router.post('/create-student', authGuard, createStudent);


export default router;