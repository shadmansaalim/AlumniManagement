import { NextFunction, Request, Response } from 'express';
import { getStudentByUsernameFromDb, getStudentsAlumniFromDb, getStudentsFromDb, createStudentToDb } from './student.service';
import { authGuard } from '../auth-token/check-auth-user';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the username if it is in query
    const username = req.query.username;
    const data = req.query.data;

    // If username in query then send that user otherwise send all users 
    if (username) {
        const student = await getStudentByUsernameFromDb(username);
        res.json(student);
    }
    else if (data === 'alumni') {
        var responce = await authGuard(req,res,next);
        if(responce?.statusCode!=401){
            const students = await getStudentsAlumniFromDb();
            res.status(200).json({
                status: 'success',
                data: students
            })
        }
    }
    else {
        var responce = await authGuard(req,res,next);
        if(responce?.statusCode!=401){
            const students = await getStudentsFromDb();
            res.status(200).json({
                status: 'success',
                data: students
            })
        }
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
