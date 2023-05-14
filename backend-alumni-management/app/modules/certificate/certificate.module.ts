import { Schema, model } from 'mongoose';
import { ICertificate } from './certificate.interface';

// Certificate Schema
const certificateSchema = new Schema<ICertificate>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pdf: {
        type: String,
        required: true,
    },
});


//Certificate Model.
const Certificate = model<ICertificate>('Certificate', certificateSchema);

export default Certificate;