import { IUser } from "./user.interface";
import User from "./user.model";
import QueryString from "qs";
import axios from 'axios';

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


export const getUserByUsernameFromDb = async (payload: queryStringType): Promise<IUser | null> => {
    const user = await User.findOne({ username: payload });
    return user;
}

export const getUserByUCNFromDb = async (payload: queryStringType): Promise<IUser | null> => {
    const user = await User.findOne({ UCN: payload });
    return user;
}

export const verifyRecaptchaFromGoogle = async (payload: queryStringType) => {
    const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${payload['g-recaptcha-response']}`;
    try {
        const response = await axios.post(VERIFY_URL);
        const json = response.data;
        return json;
    } catch (error) {
        throw new Error(`Recaptcha verification failed: ${error}`);
    }
}
