import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/feature/admin/academicManagement.api';
import PHSelectWithWatch from '../../../components/form/PHSelectWithWatch';
import { useState } from 'react';

const OfferCourse = () => {
    const [facultyId, setFacultyId] = useState('');
    const { data: academicFacultyData, isLoading: academicFacultyDataLoading } =
        useGetAllAcademicFacultiesQuery(undefined);
    const {
        data: academicDepartmentData,
        isLoading: academicDepartmentDataLoading,
    } = useGetAllAcademicDepartmentsQuery([
        {
            name: 'academicFaculty',
            value: facultyId,
        },
    ]);

    console.log(academicDepartmentData);

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
                                academicDepartmentDataLoading &&
                                facultyId !== ''
                            }
                            options={academicDepartmentDataOptions}
                        />

                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default OfferCourse;
