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


export const getUserByUsernameFromDb = async (payload: queryStringType): Promise<IUser | null> => {
    const user = await User.findOne({ username: payload });
    return user;
}

