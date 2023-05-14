import React, { useState, useEffect } from 'react';
import { Document, Page, StyleSheet, Font, Text, View, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../axios/axios';

// Register EB Garamond font
Font.register({
    family: 'Ubuntu',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'bold',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        padding: '50px',
        fontSize: '18px',
        lineHeight: '1.5',
        fontFamily: 'Courier',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
        marginTop: '16px',
        textTransform: 'uppercase',
        textDecoration: 'underline',

    },
    text: {
        textAlign: 'justify',
        marginBottom: '20px',
        fontFamily: 'Courier-Oblique',
    },
    signature: {
        marginTop: '28px',
        textAlign: 'start',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    signatory: {
        fontWeight: 'bold',
    },
    signatoryTitle: {
        fontWeight: 'normal',
    },
    transcript: {
        textAlign: 'start',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        marginTop: '16px',
        textTransform: 'uppercase',
        textDecoration: 'underline'
    },
    transcriptTitle: {
        fontWeight: 'bold',
        marginTop: '30px',
        marginBottom: '10px',
        textDecoration: 'underline',
    },
    transcriptCourses: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px 20px',
        backgroundColor: '#eee',
        marginBottom: '5px',
    },
    transcriptCourseName: {
        flex: 1,
        fontWeight: 'bold',
    },
    transcriptCourseMark: {
        flex: 1,
        textAlign: 'right',
    },
    logo: {
        width: '150px',
        height: 'auto',

    },
});

const transcript = [
    { name: 'Semester 01', mark: '3.24' },
    { name: 'Semester 02', mark: '3.50' },
    { name: 'Semester 03', mark: '4.00' },
    { name: 'Semester 04', mark: '3.80' },
    { name: 'Semester 05', mark: '3.30' },
    { name: 'Semester 06', mark: '3.50' },
];

const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};


const UserCertificates = () => {
    const { currentUser } = useAuth();

    // Unique Certificate Number for graduates
    const UCN = currentUser.UCN;

    const [certificate, setCertificate] = useState(null);
    useEffect(() => {
        const API = `http://localhost:3000/api/v1/certificates?username=${currentUser.username}`;
        axios.get(API).then(res => {
            if (res.data) {
                // const blob = base64toBlob(res.data.pdf);
                // const url = URL.createObjectURL(blob);
                // console.log(url);
                setCertificate(res.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <embed src={`data:application/pdf;base64,${certificate?.pdf}`} />
        </div>
    );
};

export default UserCertificates;