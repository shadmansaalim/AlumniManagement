import React from 'react';
import { Document, Page, StyleSheet, Font, Text, View, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import useAuth from '../../../hooks/useAuth';

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
        fontFamily: 'Ubuntu',
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
        textDecoration: 'underline'

    },
    text: {
        textAlign: 'justify',
        marginBottom: '20px',
        fontStyle: 'italic',
    },
    signature: {
        marginTop: '20px',
        textAlign: 'start',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    signatory: {
        marginTop: '20px',
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
        fontSize: '20px',
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
        marginBottom: '20px',
    },
    ucn: {
        fontWeight: 'bold'
    }
});

const transcript = [
    { name: 'Data Structure & Algorithms', mark: '3.24' },
    { name: 'Web/Mobile Programming', mark: '3.50' },
    { name: 'Cloud Computing', mark: '4.00' },
    { name: 'Database Management', mark: '3.80' },
];

const DashboardTranscripts = () => {
    const { user } = useAuth();
    console.log(user);
    // Unique Certificate Number for graduates
    const UCN = user.UCN;

    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/RMIT_University_Logo.svg/2560px-RMIT_University_Logo.svg.png" style={styles.logo} />
                        <Text style={styles.title}>Graduation Certificate</Text>
                        <Text style={styles.text}>
                            This is to certify that <Text style={{ fontWeight: 'bold' }}>{user.displayName}</Text> has completed all the requirements for the degree of Bachelor of Science in Computer Science and has achieved distinction this year 2023 at RMIT University, Melbourne, Australia.
                        </Text>
                        <Text style={styles.ucn}>Unique Certificate Number : {UCN}</Text>
                        <Text style={styles.transcript}>Transcript</Text>
                        {transcript.map((course, index) => (
                            <View key={index} style={styles.transcriptCourses}>
                                <Text style={styles.transcriptCourseName}>{course.name}</Text>
                                <Text style={styles.transcriptCourseMark}>{course.mark}</Text>
                            </View>
                        ))}
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

export default DashboardTranscripts;