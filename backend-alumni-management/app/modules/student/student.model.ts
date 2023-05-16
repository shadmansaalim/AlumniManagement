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
        },
        sem2: {
            type: Number,
        },
        sem3: {
            type: Number,
        },
        sem4: {
            type: Number,
        },
        sem5: {
            type: Number,
        },
        sem6: {
            type: Number,
        },
    },
    grade: {
        type: String,
        enum: ['P', 'C', 'DI', 'HD'],
    },
});


//Create a Model.
const Student = model<IStudent>('Student', studentSchema);

export default Student;