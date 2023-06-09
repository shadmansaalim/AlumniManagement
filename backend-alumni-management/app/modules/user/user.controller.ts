import { NextFunction, Request, Response } from 'express';
import { createUserToDb, getUsersFromDb, getUserByUsernameFromDb, getUserByUCNFromDb, verifyRecaptchaFromGoogle } from './user.service';
import { getStudentByUsernameFromDb } from '../student/student.service';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// For hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the username if it is in query
    const username = req.query.username;

    // If username in query then send that user otherwise send all users 
    if (username) {
        const user = await getUserByUsernameFromDb(username);
        res.json(user);
    }
    else {
        const users = await getUsersFromDb();
        console.log(users);
        res.status(200).json({
            status: 'success',
            data: users
        })
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const data = req.body;
    if (data.role === 'user') {
        const student = await getStudentByUsernameFromDb(data.username);

        data.gpa = student?.gpa;
        data.degree = student?.degree;
        data.graduationYear = student?.graduationYear;
        data.grade = student?.grade
        data.UCN = "G" + data.graduationYear + data.username.substring(1);
    }

    // Checking password
    if (data.password)
        data.password = bcrypt.hashSync(data.password, saltRounds);
    else
        res.status(400).json({ message: 'Password is required!' });

    const user = await createUserToDb(data);
    res.status(200).json({
        status: 'success',
        data: user
    })
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    // Extracting queries
    const username = req.query.username;
    const password = req.query.password;

    // Getting the user from DB
    const user = await getUserByUsernameFromDb(username ?? '');

    if (user && bcrypt.compareSync(password, user.password)) {
        let token = sign({ user }, process?.env?.SECRET_KEY ?? ' ', { expiresIn: "1h" });
        res.status(200).json({
            status: 'success',
            data: user,
            token: token
        });
    }
    else
        //Login Fail
        res.json(null);
}

export const verifyRecaptcha = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(data);

    const verifyUser = await verifyRecaptchaFromGoogle(data);
    if (verifyUser) {
        res.status(200).json({
            status: 'success',
            verified: true
        })
    }
}

export const verifyAlumniCertificate = async (req: Request, res: Response, next: NextFunction) => {
    const UCN = req.query.ucn;

    const checkUser = await getUserByUCNFromDb(UCN ?? '');
    if (checkUser) {
        res.status(200).json({
            status: 'success',
            data: checkUser,
            verified: true
        })
    }
    else {
        res.status(200).json({
            status: 'success',
            data: checkUser,
            verified: false
        })
    }

}

