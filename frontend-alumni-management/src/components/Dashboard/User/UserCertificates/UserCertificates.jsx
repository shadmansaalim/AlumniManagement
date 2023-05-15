import React from 'react';
import { Document, Page, StyleSheet, Font, Text, View, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import useAuth from '../../../../hooks/useAuth';

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

const UserCertificates = () => {
    const { currentUser } = useAuth();
    const { firstName, lastName, degree, graduationYear, gpa, UCN, grade } = currentUser;

    const getFullGrade = (g) => {
        switch (g) {
            case 'P':
                return 'Pass';
            case 'C':
                return 'Credit';
            case 'DI':
                return 'Distinction'
            case 'HD':
                return 'Higher Distinction'
            default:
                return ''
        }
    }

    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/RMIT_University_Logo.svg/2560px-RMIT_University_Logo.svg.png" style={styles.logo} />
                        <Text style={styles.title}>Graduation Certificate</Text>
                        <Text style={styles.text}>
                            This is to certify that <Text style={{ fontFamily: 'Courier-Bold' }}>{firstName} {lastName}</Text> has completed all the requirements for the degree of {degree} and has achieved a <Text style={{ fontFamily: 'Courier-Bold' }}>{getFullGrade(grade)}</Text> in {graduationYear} at RMIT University, Melbourne, Australia.
                        </Text>
                        <Text>
                            <Text style={{ fontFamily: 'Courier-Bold' }}>Unique Certificate Number </Text> : {UCN}
                        </Text>
                        <Text style={styles.transcript}>Transcript</Text>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 1</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem1}</Text>
                        </View>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 2</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem2}</Text>
                        </View>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 3</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem3}</Text>
                        </View>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 4</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem4}</Text>
                        </View>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 5</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem5}</Text>
                        </View>
                        <View style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>Semester 6</Text>
                            <Text style={styles.transcriptCourseMark}>{gpa.sem6}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.signature}>Jane</Text>
                        <Text style={styles.signatory}>Dr. Jane Smith</Text>
                        <Text style={styles.signatoryTitle}>Head of Department</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default UserCertificates;