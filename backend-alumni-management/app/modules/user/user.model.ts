import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

//2. Creating schema using interface
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    UCN: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
});


//3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;