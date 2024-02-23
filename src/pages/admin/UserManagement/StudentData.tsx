import {
    Button,
    Pagination,
    Space,
    Table,
    TableColumnsType,
    TableProps,
} from 'antd';
import { useState } from 'react';
import { TQueryParam } from '../../../types/global';
import { useGetAllStudentsQuery } from '../../../redux/feature/admin/userManagement.api';
import { TStudent } from '../../../types';
import { Link } from 'react-router-dom';

type TTableData = Pick<TStudent, 'fullName' | 'id' | 'email' | 'contactNumber'>;

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const { data: studentData, isFetching } = useGetAllStudentsQuery([
        { name: 'limit', value: '10' },
        { name: 'page', value: page.toString() },
        { name: 'sort', value: 'id' },
        ...params,
    ]);

    const metaData = studentData?.meta;

    const tableData = studentData?.data?.map(
        ({ _id, id, fullName, email, contactNumber }) => ({
            key: _id,
            id,
            fullName,
            email,
            contactNumber,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Roll No.',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => {
                return (
                    <Space>
                        <Link to={`/admin/student-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Button>Update</Button>
                        <Button>Block</Button>
                    </Space>
                );
            },
            width: '10%',
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: 'name', value: item as string })
            );

            setParams(queryParams);
        }
    };

    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                onChange={onChange}
                scroll={{ x: 768 }}
            />
            <Pagination
                current={page}
                total={metaData?.total}
                pageSize={metaData?.limit}
                onChange={(page) => setPage(page)}
                className="mt-3 text-center"
            />
        </div>
    );
};

export default StudentData;
