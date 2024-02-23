import {
    Button,
    Dropdown,
    MenuProps,
    Table,
    TableColumnsType,
    Tag,
} from 'antd';
import {
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
} from '../../../redux/feature/admin/semesterManagement.api';
import moment from 'moment';
import { TSemesterRegistration } from '../../../types';
import { useState } from 'react';
import { toast } from 'sonner';

type TTableData = Pick<
    TSemesterRegistration,
    '_id' | 'status' | 'startDate' | 'endDate' | 'academicSemester'
>;

const items: MenuProps['items'] = [
    {
        label: 'Upcoming',
        key: 'UPCOMING',
    },
    {
        label: 'Ongoing',
        key: 'ONGOING',
    },
    {
        label: 'Ended',
        key: 'ENDED',
    },
];

const RegisteredSemester = () => {
    const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();
    const [semesterId, setSemesterId] = useState<string>('');
    const { data: semesterData, isFetching } =
        useGetAllRegisteredSemesterQuery(undefined);

    const tableData = semesterData?.data?.map(
        ({ _id, academicSemester, status, startDate, endDate }) => ({
            key: _id,
            name: `${academicSemester.name} ${academicSemester.year}`,
            status,
            startDate: moment(new Date(startDate)).format('MMMM'),
            endDate: moment(new Date(endDate)).format('MMMM'),
        })
    );

    const handleStatusUpdate = async (data: { key: string }) => {
        const toastId = toast.loading('Updating semester status...');
        const updateData = {
            id: semesterId,
            data: {
                status: data.key as string,
            },
        };

        try {
            const response = await updateRegisteredSemester(
                updateData
            ).unwrap();

            if (response.status === 'success') {
                toast.success('Semester status updated successfully', {
                    id: toastId,
                });
            } else {
                toast.error(response.message, {
                    id: toastId,
                });
            }
        } catch (error) {
            toast.error('Failed to update semester status', {
                id: toastId,
            });
        }
    };

    const menuProps = {
        items,
        onClick: handleStatusUpdate,
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color;
                if (status === 'UPCOMING') {
                    color = 'blue';
                } else if (status === 'ONGOING') {
                    color = 'green';
                } else if (status === 'ENDED') {
                    color = 'red';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Start Date',
            key: 'startDate',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            key: 'endDate',
            dataIndex: 'endDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={['click']}>
                        <Button onClick={() => setSemesterId(item.key)}>
                            Update
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    // const onChange: TableProps<TTableData>['onChange'] = (
    //     _pagination,
    //     filters,
    //     _sorter,
    //     extra
    // ) => {
    //     if (extra.action === 'filter') {
    //         const queryParams: TQueryParam[] = [];

    //         filters.name?.forEach((item) =>
    //             queryParams.push({ name: 'name', value: item as string })
    //         );

    //         setParams(queryParams);
    //     }
    // };

    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                // onChange={onChange}
                pagination={false}
                scroll={{ x: 768 }}
            />
        </div>
    );
};

export default RegisteredSemester;
