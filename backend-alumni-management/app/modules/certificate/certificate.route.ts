import express from "express";
import { createCertificate, getCertificates } from './certificate.controller';
const router = express.Router();



// Root API
router.get('/', getCertificates);

router.post('/create-certificate', createCertificate);


export default router;

