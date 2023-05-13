//1. Creating an interface
export interface IUser {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "user" | "admin";
}

