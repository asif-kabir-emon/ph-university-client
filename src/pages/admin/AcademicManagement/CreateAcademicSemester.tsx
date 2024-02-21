import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import {
    monthOptions,
    nameOptions,
    yearOptions,
} from '../../../constants/semester';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useCreateAcademicSemesterMutation } from '../../../redux/feature/admin/academicManagement.api';
import { toast } from 'sonner';

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useCreateAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const name = nameOptions.find(
            (option) => option.value === data.name
        )?.label;
        const semesterData = {
            name: name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        try {
            console.log(semesterData);
            const response = await addAcademicSemester(semesterData).unwrap();
            if (response.success) {
                toast.success('Semester created', {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.error(response.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.data.message || 'Failed to create', {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div>
            <h2>Create Academic Semester</h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(academicSemesterSchema)}
                    >
                        <PHSelect
                            name="name"
                            label="Semester Name"
                            placeholder="Select Semester Name"
                            options={nameOptions}
                        />
                        <PHSelect
                            name="year"
                            label="Year"
                            placeholder="Select Year"
                            options={yearOptions}
                        />
                        <PHSelect
                            name="startMonth"
                            label="Start Month"
                            placeholder="Select Start Month"
                            options={monthOptions}
                        />
                        <PHSelect
                            name="endMonth"
                            label="End Month"
                            placeholder="Select End Month"
                            options={monthOptions}
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicSemester;
