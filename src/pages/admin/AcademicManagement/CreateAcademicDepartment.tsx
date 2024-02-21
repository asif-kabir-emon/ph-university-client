import { Button, Col, Flex } from 'antd';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAcademicDepartmentSchema } from '../../../schemas/academicManagement.schema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
    useCreateAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/feature/admin/academicManagement.api';
import PHSelect from '../../../components/form/PHSelect';
import { toast } from 'sonner';

const CreateAcademicDepartment = () => {
    const { data: faculties } = useGetAllAcademicFacultiesQuery(undefined);
    const [addAcademicDepartment] = useCreateAcademicDepartmentMutation();

    const facultiesOptions = faculties?.data?.map(
        (faculty: { _id: string; name: string }) => ({
            label: faculty.name,
            value: faculty._id,
        })
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const departmentData = {
            name: data.name,
            academicFaculty: data.academicFaculty,
        };

        try {
            const response = await addAcademicDepartment(
                departmentData
            ).unwrap();

            if (response.success) {
                toast.success('Department created', {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.error(response.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            toast.error(error.data.message || 'Failed to create', {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-5">
                Create Academic Department
            </h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(createAcademicDepartmentSchema)}
                    >
                        <PHInput
                            type="text"
                            label="Department Name"
                            name="name"
                            placeholder="Enter Department Name"
                        />
                        <PHSelect
                            label="Faculty"
                            name="academicFaculty"
                            placeholder="Select Faculty"
                            options={facultiesOptions}
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicDepartment;
