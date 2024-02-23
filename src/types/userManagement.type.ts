export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNumber: string;
    motherName: string;
    motherOccupation: string;
    motherContactNumber: string;
};

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNumber: string;
    address: string;
};

export type TStudent = {
    _id: string;
    id: string;
    user: string;
    name: TUserName;
    gender: string;
    dateOfBirth?: Date;
    email: string;
    role: string;
    contactNumber: string;
    emergencyContactNumber?: string;
    bloodGroup?: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian?: TLocalGuardian;
    admissionSemester: string;
    academicDepartment: string;
    academicFaculty: string;
    profileImage?: string;
    isDeleted?: boolean;
    fullName: string;
};
