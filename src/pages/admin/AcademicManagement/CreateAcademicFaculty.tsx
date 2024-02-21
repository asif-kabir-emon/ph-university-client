import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { Button, Col, Flex } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAcademicFacultySchema } from '../../../schemas/academicManagement.schema';
import { useCreateAcademicFacultyMutation } from '../../../redux/feature/admin/academicManagement.api';
import { toast } from 'sonner';

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useCreateAcademicFacultyMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const facultyData = {
            name: data.name,
        };

        try {
            const response = await addAcademicFaculty(facultyData).unwrap();
            if (response.success) {
                toast.success('Faculty created', {
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
                Create Academic Faculty
            </h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(createAcademicFacultySchema)}
                    >
                        <PHInput
                            type="text"
                            label="Faculty Name"
                            name="name"
                            placeholder="Enter Faculty Name"
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicFaculty;
