import { NextFunction, Request, Response } from 'express';
import { getStudentByUsernameFromDb, getStudentsFromDb, createStudentToDb } from './student.service';


export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the username if it is in query
    const username = req.query.username;

    // If username in query then send that user otherwise send all users 
    if (username) {
        const student = await getStudentByUsernameFromDb(username);
        res.json(student);
    }
    else {
        const students = await getStudentsFromDb();
        console.log(students);
        res.status(200).json({
            status: 'success',
            data: students
        })
    }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {

    const data = req.body;
    console.log(data);

    const student = await createStudentToDb(data);
    res.status(200).json({
        status: 'success',
        data: student
    })
}
