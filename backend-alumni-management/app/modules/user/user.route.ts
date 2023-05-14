import express from "express";
import { createUser, getUsers, loginUser, verifyAlumniCertificate, verifyRecaptcha } from "./user.controller";
const router = express.Router();



// Root API
router.get('/', getUsers);
router.get('/login', loginUser);
router.get('/verify-alumni-certificate', verifyAlumniCertificate);

router.post('/create-user', createUser);
router.post('/verify-recaptcha', verifyRecaptcha);


export default router;