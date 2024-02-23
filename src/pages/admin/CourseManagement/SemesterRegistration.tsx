import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import { semesterStatusOptions } from '../../../constants/semester';
import { toast } from 'sonner';
import { useGetAllSemestersQuery } from '../../../redux/feature/admin/academicManagement.api';
import PHDatePicker from '../../../components/form/PHDatePicker';
import PHInput from '../../../components/form/PHInput';
import { useAddRegisterSemesterMutation } from '../../../redux/feature/admin/semesterManagement.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { semesterRegistrationSchema } from '../../../schemas/userManagement.schema';

const SemesterRegistration = () => {
    const [addSemesterRegistration] = useAddRegisterSemesterMutation();
    const { data: allSemestersData, isLoading } =
        useGetAllSemestersQuery(undefined);

    const semesterOptions = allSemestersData?.data?.map((semester) => ({
        value: semester._id,
        label: `${semester.name} ${semester.year}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const semesterRegistrationData = {
            academicSemester: data.academicSemester,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        };

        try {
            console.log(semesterRegistrationData);
            const response = await addSemesterRegistration(
                semesterRegistrationData
            ).unwrap();
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
            <h2 className="text-xl text-center my-6">
                Create Academic Semester
            </h2>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(semesterRegistrationSchema)}
                    >
                        <PHSelect
                            name="academicSemester"
                            label="Academic Semester"
                            placeholder="Select Academic Semester"
                            disabled={isLoading}
                            options={semesterOptions}
                        />
                        <PHSelect
                            name="status"
                            label="Status"
                            placeholder="Select Status"
                            options={semesterStatusOptions}
                        />
                        <PHDatePicker
                            name="startDate"
                            label="Start Date"
                            placeholder="Enter Start Date"
                        />
                        <PHDatePicker
                            name="endDate"
                            label="End Date"
                            placeholder="Enter End Date"
                        />
                        <PHInput
                            type="number"
                            name="minCredit"
                            label="Minimum Credit"
                            placeholder="Enter Minimum Credit"
                        />
                        <PHInput
                            type="number"
                            name="maxCredit"
                            label="Maximum Credit"
                            placeholder="Enter Maximum Credit"
                        />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default SemesterRegistration;
