// Imports
import express, { Application, } from 'express';
import cors from 'cors';

const app: Application = express();

// Application routes
import userRoutes from './app/modules/user/user.route';

// Using cors
app.use(cors());

// Parse Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api/v1/users', userRoutes);

export default app;