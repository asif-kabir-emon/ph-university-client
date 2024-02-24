import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
    useGetAllSemestersQuery,
} from '../../../redux/feature/admin/academicManagement.api';
import PHSelectWithWatch from '../../../components/form/PHSelectWithWatch';
import { useState } from 'react';
import {
    useGetAllCoursesQuery,
    useGetCourseFacultiesQuery,
} from '../../../redux/feature/admin/semesterManagement.api';
import PHInput from '../../../components/form/PHInput';
import { daysOptions } from '../../../constants/global';
import PHTimePicker from '../../../components/form/PHTimePicker';

const OfferCourse = () => {
    const [facultyId, setFacultyId] = useState('');
    const [courseId, setCourseId] = useState('');
    const { data: semesterData, isLoading: semesterDataLoading } =
        useGetAllSemestersQuery(undefined);
    const { data: academicFacultyData, isLoading: academicFacultyDataLoading } =
        useGetAllAcademicFacultiesQuery(undefined);
    const {
        data: academicDepartmentData,
        isLoading: academicDepartmentDataLoading,
    } = useGetAllAcademicDepartmentsQuery(
        [
            {
                name: 'academicFaculty',
                value: facultyId,
            },
        ],
        {
            skip: !facultyId,
        }
    );
    const { data: courseData, isLoading: courseDataLoading } =
        useGetAllCoursesQuery(undefined);
    const { data: facultiesData, isLoading: facultyDataLoading } =
        useGetCourseFacultiesQuery(courseId, {
            skip: !courseId,
        });

    const semesterOptions = semesterData?.data?.map(
        (item: { _id: any; name: any; year: any }) => ({
            value: item._id,
            label: `${item.name} - ${item.year}`,
        })
    );
    const academicFacultyDataOptions = academicFacultyData?.data?.map(
        (item: { _id: any; name: any }) => ({
            value: item._id,
            label: item.name,
        })
    );
    const academicDepartmentDataOptions = academicDepartmentData?.data?.map(
        (item: { _id: any; name: any }) => ({
            value: item._id,
            label: item.name,
        })
    );
    const courseDataOptions = courseData?.data?.map(
        (item: { _id: any; title: any }) => ({
            value: item._id,
            label: item.title,
        })
    );
    const facultiesOptions = facultiesData?.data?.faculties?.map(
        (item: { _id: any; fullName: any }) => ({
            value: item._id,
            label: item.fullName,
        })
    );
    console.log(facultiesData);
    // const sectionsOptions = facultiesData?.data?.sections?.map(
    //     (item: { _id: any; name: any }) => ({
    //         value: item._id,
    //         label: item.name,
    //     })
    // );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        // const toastId = toast.loading('Creating...');
        // try {
        //     console.log(semesterRegistrationData);
        //     const response = await addSemesterRegistration(
        //         semesterRegistrationData
        //     ).unwrap();
        //     if (response.success) {
        //         toast.success('Semester created', {
        //             id: toastId,
        //             duration: 2000,
        //         });
        //     } else {
        //         toast.error(response.message, { id: toastId, duration: 2000 });
        //     }
        // } catch (error: any) {
        //     console.error(error);
        //     toast.error(error.data.message || 'Failed to create', {
        //         id: toastId,
        //         duration: 2000,
        //     });
        // }
    };

    return (
        <div>
            <h2 className="text-xl text-center my-6">Create Offered Course</h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm onSubmit={onSubmit}>
                        <PHSelect
                            name="semesterRegistration"
                            label="Semester Registration"
                            placeholder="Select Semester Registration"
                            disabled={semesterDataLoading}
                            options={semesterOptions}
                        />
                        <PHSelectWithWatch
                            onValueChange={setFacultyId}
                            name="academicFaculty"
                            label="Academic Faculty"
                            placeholder="Select Academic Faculty"
                            disabled={academicFacultyDataLoading}
                            options={academicFacultyDataOptions}
                        />
                        <PHSelect
                            name="academicDepartment"
                            label="Academic Department"
                            placeholder="Select Academic Department"
                            disabled={
                                academicDepartmentDataLoading || !facultyId
                            }
                            options={academicDepartmentDataOptions}
                        />
                        <PHSelectWithWatch
                            onValueChange={setCourseId}
                            name="course"
                            label="Course"
                            placeholder="Select Course"
                            disabled={courseDataLoading}
                            options={courseDataOptions}
                        />
                        <PHSelect
                            name="faculty"
                            label="Faculty"
                            placeholder="Select Faculty"
                            disabled={!courseId || facultyDataLoading}
                            options={facultiesOptions}
                        />
                        <PHInput
                            type="text"
                            name="maxCapacity"
                            label="Max Capacity"
                            placeholder="Enter Max Capacity"
                        />
                        <PHSelect
                            name="section"
                            label="Section"
                            placeholder="Select Section"
                            disabled={courseDataLoading}
                            options={courseDataOptions}
                        />
                        <PHSelect
                            name="days"
                            label="Days"
                            placeholder="Select Days"
                            mode="multiple"
                            options={daysOptions}
                        />
                        <PHTimePicker
                            name="startTime"
                            label="Start Time"
                            placeholder="Enter Start Time (HH:MM)"
                        />
                        <PHTimePicker
                            name="endTime"
                            label="End Time"
                            placeholder="Enter End Time (HH:MM)"
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default OfferCourse;
