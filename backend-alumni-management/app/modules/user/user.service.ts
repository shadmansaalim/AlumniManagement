import { IUser } from "./user.interface";
import User from "./user.model";
import QueryString from "qs";


type queryStringType = string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];


// Database Query
export const createUserToDb = async (payload: IUser): Promise<IUser> => {
    const user = new User(payload);
    await user.save();

    return user;
}

export const getUsersFromDb = async (): Promise<Array<IUser>> => {
    const users = await User.find();
    return users;
}


export const generateUCNFromDb = async (): Promise<string> => {
    const userCount = await User.countDocuments();

    // Unique Certificate Number for graduates
    const UCN = (new Date().getFullYear()).toString() + (userCount + 1).toString();

    return UCN;
}

export const getUserByEmailFromDb = async (payload: queryStringType): Promise<IUser | null> => {
    const user = await User.findOne({ email: payload });
    return user;
}


export const getUserByUCNFromDb = async (payload: queryStringType): Promise<IUser | null> => {
    const user = await User.findOne({ UCN: payload });
    return user;
}