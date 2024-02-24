import MySchedule from '../pages/student/MySchedule';
import OfferedCourse from '../pages/student/OfferedCourse';
import StudentDashboard from '../pages/student/StudentDashboard';

const studentPaths = [
    {
        name: 'Student Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />,
    },
    {
        name: 'Offered Course',
        path: 'offered-course',
        element: <OfferedCourse />,
    },
    {
        name: 'My Schedule',
        path: 'schedule',
        element: <MySchedule />,
    },
];

export default studentPaths;
