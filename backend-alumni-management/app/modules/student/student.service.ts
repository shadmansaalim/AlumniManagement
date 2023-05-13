import { IStudent } from "./student.interface";
import Student from "./student.model";
import QueryString from "qs";


type queryStringType = string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];



// Database Query
export const createStudentToDb = async (payload: IStudent): Promise<IStudent> => {
    const user = new Student(payload);
    await user.save();

    return user;
}

export const getStudentsFromDb = async (): Promise<Array<IStudent>> => {
    const users = await Student.find();
    return users;
}

export const getStudentByUsernameFromDb = async (payload: queryStringType): Promise<IStudent | null> => {
    const user = await Student.findOne({ username: payload });
    return user;
}