export interface IStudent {
    username: string;
    firstName: string;
    lastName: string;
    degree: string;
    graduationYear: number;
    gpa: {
        sem1: number;
        sem2: number;
        sem3: number;
        sem4: number;
        sem5: number;
        sem6: number;
    };
    grade: 'P' | 'C' | 'DI' | 'HD';
}
