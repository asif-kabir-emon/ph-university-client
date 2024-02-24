export interface TMyOfferedCourse {
    _id: string;
    semesterRegistration: string;
    academicSemester: string;
    academicFaculty: string;
    academicDepartment: string;
    course: Course;
    faculty: string;
    maxCapacity: number;
    section: number;
    days: string[];
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isPreRequisitesFulFilled: boolean;
    isAlreadyEnrolled: boolean;
}

export interface Course {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: PreRequisiteCourse[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PreRequisiteCourse {
    course: string;
    isDeleted: boolean;
}
