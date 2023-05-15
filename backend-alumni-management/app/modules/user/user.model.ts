import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

//2. Creating schema using interface
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    graduationYear: {
        type: Number,
        required: true,
    },
    gpa: {
        sem1: {
            type: Number,
            required: true,
        },
        sem2: {
            type: Number,
            required: true,
        },
        sem3: {
            type: Number,
            required: true,
        },
        sem4: {
            type: Number,
            required: true,
        },
        sem5: {
            type: Number,
            required: true,
        },
        sem6: {
            type: Number,
            required: true,
        },
    },
    grade: {
        type: String,
        enum: ['P', 'C', 'DI', 'HD'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    UCN: {
        type: String,
        required: true,
        unique: true
    },
});


//3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;