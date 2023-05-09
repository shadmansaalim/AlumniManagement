import React from 'react';
import { Document, Page, StyleSheet, Font, Text, View, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        padding: '50px',
        fontSize: '18px',
        lineHeight: '1.5',
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
        fontStyle: 'italic'
    },
    signature: {
        marginTop: '20px',
        textAlign: 'center',
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
    separator: {
        margin: '50px 0',
    },
    transcript: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
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
});

const transcript = [
    { name: 'Mathematics', mark: 'A+' },
    { name: 'Computer Science', mark: 'A+' },
    { name: 'Statistics', mark: 'A' },
    { name: 'Physics', mark: 'B+' },
];

const DashboardTranscripts = () => {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/RMIT_University_Logo.svg/2560px-RMIT_University_Logo.svg.png" style={styles.logo} />
                    <Text style={styles.title}>Graduation Certificate</Text>
                    <Text style={styles.text}>
                        This is to certify that <Text style={{ fontWeight: 'bold' }}>John Doe</Text> has completed all the requirements
                        for the degree of <Text style={{ fontWeight: 'bold' }}>Bachelor of Science in Computer Science</Text> at <Text style={{ fontWeight: 'bold' }}>RMIT University</Text>, Melbourne, Australia.{' '}
                    </Text>
                    <Text style={styles.transcript}>Transcript</Text>
                    {transcript.map((course, index) => (
                        <View key={index} style={styles.transcriptCourses}>
                            <Text style={styles.transcriptCourseName}>{course.name}</Text>
                            <Text style={styles.transcriptCourseMark}>{course.mark}</Text>
                        </View>
                    ))}
                    <Text style={styles.signature}>Signature</Text>
                    <View style={styles.separator} />
                    <Text style={styles.signatory}>Dr. Jane Smith</Text>
                    <Text style={styles.signatoryTitle}>Head of Department</Text>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default DashboardTranscripts;