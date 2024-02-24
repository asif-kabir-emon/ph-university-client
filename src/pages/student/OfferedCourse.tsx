import { Button, Col, Row } from 'antd';
import {
    useEnrollCourseMutation,
    useGetAllOfferedCoursesQuery,
} from '../../redux/feature/student/studentCourseManagement.api';
import { toast } from 'sonner';
import { Key } from 'react';

type TCourse = {
    [index: string]: any;
};

const OfferedCourse = () => {
    const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
    const [enrollCourse] = useEnrollCourseMutation();

    const singleObject = offeredCourseData?.data?.reduce(
        (acc: TCourse, item) => {
            const key = item.course.title;
            acc[key] = acc[key] || {
                courseTitle: item.course.title,
                sections: [],
            };
            acc[key].sections.push({
                section: item.section,
                _id: item._id,
                days: item.days,
                startTime: item.startTime,
                endTime: item.endTime,
            });
            return acc;
        },
        {}
    );

    const modifiedData = Object.values(singleObject ? singleObject : []);

    const handleEnroll = async (id: string) => {
        const toastId = toast.loading('Enrolling...');
        const enrollData = {
            offeredCourse: id,
        };

        try {
            const response = await enrollCourse(enrollData).unwrap();

            if (response.success) {
                toast.success('Enrolled Successfully', { id: toastId });
            } else {
                toast.error(response.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    if (modifiedData.length === 0) {
        return <h1 className="text-xl">No Available Course</h1>;
    }

    return (
        <Row gutter={[0, 20]}>
            {modifiedData.map((item, index) => {
                return (
                    <Col
                        span={24}
                        style={{
                            border: 'solid #d4d4d4 2px',
                        }}
                        key={index}
                    >
                        <h3 className="text-lg m-[5px]">{item.courseTitle}</h3>
                        <div>
                            {item.sections.map(
                                (
                                    section: {
                                        section: string;
                                        days: any[];
                                        startTime: string;
                                        endTime: string;
                                        _id: string;
                                    },
                                    index: Key
                                ) => {
                                    return (
                                        <Row
                                            justify={'space-between'}
                                            align={'middle'}
                                            style={{
                                                borderTop: 'solid #d4d4d4 2px',
                                                padding: '5px',
                                            }}
                                            key={index}
                                        >
                                            <Col span={5}>
                                                Section: {section.section}
                                            </Col>
                                            <Col span={5}>
                                                Days: {section.days.join(', ')}
                                            </Col>
                                            <Col span={5}>
                                                Start Time: {section.startTime}
                                            </Col>
                                            <Col span={5}>
                                                End Time: {section.endTime}
                                            </Col>
                                            <Button
                                                onClick={() => {
                                                    handleEnroll(section._id);
                                                }}
                                            >
                                                Enroll
                                            </Button>
                                        </Row>
                                    );
                                }
                            )}
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default OfferedCourse;
