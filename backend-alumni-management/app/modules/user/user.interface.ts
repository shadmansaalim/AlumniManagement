//1. Creating an interface
export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    UCN: string;
    role: "user" | "admin";
}

