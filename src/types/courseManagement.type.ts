import { TAcademicSemester } from './academicManagement.type';

export type TSemesterRegistration = {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string;
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number;
};

export type TPreRequisiteCourse = {
    course: string;
    isDeleted?: boolean;
};

export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: TPreRequisiteCourse[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
