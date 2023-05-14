import { Request, Response, NextFunction } from 'express';
import { createHash, createSign, generateKeyPairSync } from 'crypto';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


import { ICertificate } from './certificate.interface';
import { createCertificateToDb, getCertificateByUsernameFromDb, getCertificatesFromDb } from './certificate.service';



// Register fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
    },
};

export const createCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { student } = req.body;

        // For test purpose, use a dummy private key
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096, // the length of your key in bits
            publicKeyEncoding: {
                type: 'spki', // recommended to be 'spki' by the Node.js docs
                format: 'pem' // recommended to be 'pem' by the Node.js docs
            },
            privateKeyEncoding: {
                type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
                format: 'pem', // recommended to be 'pem' by the Node.js docs
            }
        });

        // Create certificate document definition
        const docDefinition: any = {
            content: [
                { text: 'Certificate of Completion', style: 'header' },
                '\n',
                { text: `This certifies that ${student.firstName} ${student.lastName} has completed the requirements for the degree of ${student.degree} in ${student.graduationYear} with a ${student.grade} grade point average.`, style: 'text' },
                '\n',
                { text: `Signed by: ${student.firstName} ${student.lastName}`, style: 'text' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 20],
                },
                text: {
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
            },
        };

        const sign = createSign('SHA256');
        const pdf = pdfMake.createPdf(docDefinition);

        // Get the PDF buffer
        const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
            pdf.getBuffer((buffer: Buffer) => {
                resolve(buffer);
            });
        });

        // Sign the PDF buffer with the private key
        sign.write(pdfBuffer);
        sign.end();

        const signature = sign.sign(privateKey, 'base64');

        // Create array to store the signature content
        const signatureContent: Content[] = [{ text: `Signature: ${signature}`, style: 'text' }];

        // Add signature to the certificate document definition
        docDefinition.content = [...docDefinition.content, ...signatureContent];

        // Generate final PDF with signature
        const signedPdf = pdfMake.createPdf(docDefinition);

        // Convert the signedPdf buffer to a base64-encoded string
        signedPdf.getBase64(async (data) => {
            const pdfBase64 = data;

            // Save certificate to database
            const certificate: ICertificate = await createCertificateToDb({
                username: student.username,
                pdf: pdfBase64
            });

            // Respond with success message and generated certificate data
            res.status(201).json({ message: 'Certificate created successfully', certificate });
        });


    } catch (error) {
        next(error);
    }
};



export const getCertificates = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the username if it is in query
    const username = req.query.username;

    if (username) {
        const certificate = await getCertificateByUsernameFromDb(username);
        res.json(certificate);
    }
    else {
        const certificates = await getCertificatesFromDb();
        res.status(200).json({
            status: 'success',
            data: certificates
        })
    }
}


