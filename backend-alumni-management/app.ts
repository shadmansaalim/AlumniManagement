// Imports
import express, { Application, } from 'express';
import cors from 'cors';

const app: Application = express();

// Application routes
import userRoutes from './app/modules/user/user.route';
import studentRoutes from './app/modules/student/student.route';
import certificateRoutes from './app/modules/certificate/certificate.route';

// Using cors
app.use(cors());

// Parse Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/certificates', certificateRoutes);

export default app;