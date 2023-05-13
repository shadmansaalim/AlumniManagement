import express from "express";
import { createUser, getUsers, loginUser, generateUCN, verifyAlumniCertificate } from "./user.controller";
const router = express.Router();



// Root API
router.get('/', getUsers);
router.get('/login', loginUser);
router.get('/verify-alumni-certificate', verifyAlumniCertificate);
router.get('/generate-ucn', generateUCN);
router.post('/create-user', createUser);


export default router;