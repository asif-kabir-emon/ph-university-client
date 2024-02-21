import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateStudent from '../pages/admin/CreateStudent';
import CreateAdmin from '../pages/admin/CreateAdmin';
import CreateFaculty from '../pages/admin/CreateFaculty';
import AcademicSemester from '../pages/admin/AcademicManagement/AcademicSemester';
import CreateAcademicSemester from '../pages/admin/AcademicManagement/CreateAcademicSemester';
import AcademicDepartment from '../pages/admin/AcademicManagement/AcademicDepartment';
import CreateAcademicDepartment from '../pages/admin/AcademicManagement/CreateAcademicDepartment';
import AcademicFaculty from '../pages/admin/AcademicManagement/AcademicFaculty';
import CreateAcademicFaculty from '../pages/admin/AcademicManagement/CreateAcademicFaculty';

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
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
        ],
    },
];

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//     if (item.element && item.path) {
//         acc.push({
//             path: item.path,
//             element: item.element,
//         });
//     }

//     if (item.children) {
//         item.children.forEach((child) => {
//             if (child.element && child.path) {
//                 acc.push({
//                     path: child.path,
//                     element: child.element,
//                 });
//             }
//         });
//     }

//     return acc;
// }, []);

// export const adminSideBarItems = adminPaths.reduce(
//     (acc: TSideBarItem[], item) => {
//         if (item.name && item.path) {
//             acc.push({
//                 key: item.name,
//                 label: (
//                     <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//                 ),
//             });
//         }

//         if (item.children) {
//             acc.push({
//                 key: item.name,
//                 label: item.name,
//                 children: item.children.map((child) => ({
//                     key: child.name,
//                     label: (
//                         <NavLink to={`/admin/${child.path}`}>
//                             {child.name}
//                         </NavLink>
//                     ),
//                 })),
//             });
//         }

//         return acc;
//     },
//     []
// );
