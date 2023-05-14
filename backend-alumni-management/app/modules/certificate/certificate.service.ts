import { ICertificate } from './certificate.interface';
import Certificate from './certificate.module';

import QueryString from "qs";


type queryStringType = string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];

// Database Query
export const createCertificateToDb = async (payload: ICertificate): Promise<ICertificate> => {
    const certificate = new Certificate(payload);
    await certificate.save();

    return certificate;
}

export const getCertificatesFromDb = async (): Promise<Array<ICertificate>> => {
    const certificates = await Certificate.find();
    return certificates;
}


export const getCertificateByUsernameFromDb = async (payload: queryStringType): Promise<ICertificate | null> => {
    const certificate = Certificate.findOne({ username: payload });
    return certificate;
}
