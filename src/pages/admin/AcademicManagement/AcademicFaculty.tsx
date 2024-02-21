import { Button, Table, TableColumnType } from 'antd';
import { useGetAllAcademicFacultiesQuery } from '../../../redux/feature/admin/academicManagement.api';
import { TAcademicFaculty } from '../../../types/academicManagement.type';

type TTableData = Pick<TAcademicFaculty, 'name'>;

const AcademicFaculty = () => {
    const { data: faculties, isFetching } =
        useGetAllAcademicFacultiesQuery(undefined);

    const tableData = faculties?.data?.map(
        ({ _id, name }: { _id: string; name: string }) => ({
            key: _id,
            name,
        })
    );

    const columns: TableColumnType<TTableData>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => {
                return (
                    <div className="flex gap-2">
                        <Button>Update</Button>
                        <Button danger>Delete</Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={tableData}
                loading={isFetching}
                scroll={{ x: 500 }}
            />
        </div>
    );
};

export default AcademicFaculty;
