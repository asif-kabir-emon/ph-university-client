import { Button, Modal, Table, TableColumnsType } from 'antd';
import { useGetAllCoursesQuery } from '../../../redux/feature/admin/semesterManagement.api';
import { TCourse } from '../../../types';
import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHSelect from '../../../components/form/PHSelect';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
    useAssignFacultyMutation,
    useGetAllFacultiesQuery,
} from '../../../redux/feature/admin/academicManagement.api';
import { toast } from 'sonner';

type TTableData = Pick<TCourse, '_id' | 'title' | 'code'>;

const Courses = () => {
    const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

    const tableData = courseData?.data?.map(({ _id, title, code }) => ({
        key: _id,
        title,
        code,
    }));

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => {
                return <AddFacultyModal courseInfo={item} />;
            },
        },
    ];

    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                scroll={{ x: 768 }}
            />
        </div>
    );
};

const AddFacultyModal = ({ courseInfo }) => {
    const { data: facultiesData, isFetching } =
        useGetAllFacultiesQuery(undefined);
    const [assignFaculty] = useAssignFacultyMutation();

    const facultyOptions = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Assigning Faculty...');
        const addFacultiesData = {
            courseId: courseInfo.key,
            data: {
                faculties: data.faculties,
            },
        };

        console.log(addFacultiesData);

        try {
            const response = await assignFaculty(addFacultiesData).unwrap();
            console.log(response);

            if (response.success) {
                toast.success('Faculty Assigned Successfully', { id: toastId });
                handleOk();
            } else {
                toast.error(response.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message || 'Failed to Assign Faculty', {
                id: toastId,
            });
        }
    };

    return (
        <>
            <Button onClick={showModal}>Add Faculty</Button>
            <Modal
                title="Assign Faculty to Course"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <PHForm onSubmit={onSubmit}>
                    <PHSelect
                        label="Faculty"
                        name="faculties"
                        placeholder="Select Faculty"
                        disabled={isFetching}
                        mode="multiple"
                        options={facultyOptions}
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    );
};

export default Courses;
