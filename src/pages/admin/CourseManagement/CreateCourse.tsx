import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import { toast } from 'sonner';
import PHInput from '../../../components/form/PHInput';
import {
    useAddCourseMutation,
    useGetAllCoursesQuery,
} from '../../../redux/feature/admin/semesterManagement.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../../../schemas/userManagement.schema';

const CreateCourse = () => {
    const { data: allCoursesData, isLoading } =
        useGetAllCoursesQuery(undefined);
    const [addCourse] = useAddCourseMutation();

    const courseOptions = allCoursesData?.data?.map((course) => ({
        value: course._id,
        label: course.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const courseRegistrationData = {
            title: data.title,
            prefix: data.prefix,
            code: Number(data.code),
            credits: Number(data.credits),
            preRequisiteCourses: data.course
                ? data.course?.map((item: string) => ({
                      course: item,
                  }))
                : [],
        };

        console.log(courseRegistrationData);

        try {
            const response = await addCourse(courseRegistrationData).unwrap();
            if (response.success) {
                toast.success('Course created', {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.error(response.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.data.message || 'Failed to create course', {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div>
            <h2 className="text-xl text-center my-6">Create Course</h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(courseSchema)}
                    >
                        <PHInput
                            type="text"
                            name="title"
                            label="Course Title"
                            placeholder="Enter Course Title"
                        />
                        <PHInput
                            type="text"
                            name="prefix"
                            label="Course Prefix"
                            placeholder="Enter Course Prefix"
                        />
                        <PHInput
                            type="text"
                            name="code"
                            label="Course Code"
                            placeholder="Enter Course Code"
                        />
                        <PHInput
                            type="text"
                            name="credits"
                            label="Course Credits"
                            placeholder="Enter Course Credits"
                        />
                        <PHSelect
                            name="course"
                            label="Pre-Requisite Courses"
                            placeholder="Select Pre-Requisite Courses"
                            mode="multiple"
                            disabled={isLoading}
                            options={courseOptions}
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateCourse;
