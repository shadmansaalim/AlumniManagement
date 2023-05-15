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
        required: function () {
            return this.role === "user"; // Only required for user role
        },
    },
    graduationYear: {
        type: Number,
        required: function () {
            return this.role === "user"; // Only required for user role
        },
    },
    gpa: {
        sem1: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
        sem2: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
        sem3: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
        sem4: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
        sem5: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
        sem6: {
            type: Number,
            required: function () {
                return this.role === "user"; // Only required for user role
            },
        },
    },
    grade: {
        type: String,
        enum: ['P', 'C', 'DI', 'HD'],
        required: function () {
            return this.role === "user"; // Only required for user role
        },
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
        required: function () {
            return this.role === "user"; // Make UCN required if the role is "user"
        },
        unique: true
    },
});


//3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;