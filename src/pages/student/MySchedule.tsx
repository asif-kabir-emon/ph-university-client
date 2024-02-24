import { useGetAllEnrolledCoursesQuery } from '../../redux/feature/student/studentCourseManagement.api';

const MySchedule = () => {
    const { data: mySchedule } = useGetAllEnrolledCoursesQuery(undefined);

    console.log(mySchedule);

    return (
        <div>
            {mySchedule?.data.map(
                (item: {
                    course: {
                        title: string | number | boolean;
                    };
                    offeredCourse: {
                        section: string | number | boolean;
                        days: any[];
                    };
                }) => {
                    return (
                        <div>
                            <div>{item.course.title}</div>
                            <div>{item.offeredCourse.section}</div>
                            <div>{item.offeredCourse.days.join(', ')}</div>
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default MySchedule;
