// Imports
import mongoose from 'mongoose';
import app from './app';

// Defining port
const port: number = 3000;

// Database connection
async function bootstrap() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/backend-alumni-management');
        console.log(`Database connection successful`);

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    }
    catch (err) {
        console.log(`Failed to connect database`, err);
    }
}
// Calling the function
bootstrap()

