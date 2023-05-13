import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';


const studentSchema = new Schema<IStudent>({
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
});


//Create a Model.
const Student = model<IStudent>('Student', studentSchema);

export default Student;