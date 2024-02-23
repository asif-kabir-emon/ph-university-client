import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateStudent from '../pages/admin/UserManagement/CreateStudent';
import CreateAdmin from '../pages/admin/UserManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/UserManagement/CreateFaculty';
import AcademicSemester from '../pages/admin/AcademicManagement/AcademicSemester';
import CreateAcademicSemester from '../pages/admin/AcademicManagement/CreateAcademicSemester';
import AcademicDepartment from '../pages/admin/AcademicManagement/AcademicDepartment';
import CreateAcademicDepartment from '../pages/admin/AcademicManagement/CreateAcademicDepartment';
import AcademicFaculty from '../pages/admin/AcademicManagement/AcademicFaculty';
import CreateAcademicFaculty from '../pages/admin/AcademicManagement/CreateAcademicFaculty';
import StudentData from '../pages/admin/UserManagement/StudentData';
import StudentDetails from '../pages/admin/UserManagement/StudentDetails';
import SemesterRegistration from '../pages/admin/CourseManagement/SemesterRegistration';
import RegisteredSemester from '../pages/admin/CourseManagement/RegisteredSemester';
import CreateCourse from '../pages/admin/CourseManagement/CreateCourse';
import Courses from '../pages/admin/CourseManagement/Courses';
import OfferCourse from '../pages/admin/CourseManagement/OfferCourse';
import OfferedCourses from '../pages/faculty/OfferedCourses';

export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Academic Management',
        children: [
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
            {
                name: 'Create Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
        ],
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Student',
                path: 'student-data',
                element: <StudentData />,
            },
            {
                path: 'student-data/:studentId',
                element: <StudentDetails />,
            },
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
        ],
    },
    {
        name: 'Course Management',
        children: [
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <SemesterRegistration />,
            },
            {
                name: 'Registered Semester',
                path: 'registered-semester',
                element: <RegisteredSemester />,
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse />,
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <Courses />,
            },
            {
                name: 'Offer Course',
                path: 'offer-course',
                element: <OfferCourse />,
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourses />,
            },
        ],
    },
];
