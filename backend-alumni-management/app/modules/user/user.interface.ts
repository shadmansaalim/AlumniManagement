import { IStudent } from "../student/student.interface";


//Creating an interface
interface IUserBase extends IStudent {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: "user" | "admin";
    UCN?: string;
}

// Adding IStudent and UCN to user if role is user 
export type IUser = IUserBase & (IUserBase["role"] extends "user" ? IStudent & { UCN: string } : {});




