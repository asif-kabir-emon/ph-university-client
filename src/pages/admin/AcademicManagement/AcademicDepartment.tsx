import { Button, Table, TableColumnType } from 'antd';
import { useGetAllAcademicDepartmentsQuery } from '../../../redux/feature/admin/academicManagement.api';
import { TAcademicDepartment } from '../../../types/academicManagement.type';

type TTableData = Pick<TAcademicDepartment, 'name' | 'academicFaculty'>;

const AcademicDepartment = () => {
    const { data: departments, isFetching } =
        useGetAllAcademicDepartmentsQuery(undefined);
    console.log(departments);

    const tableData = departments?.data?.map(
        (department: TAcademicDepartment) => ({
            key: department._id,
            name: department.name,
            faculty: department.academicFaculty.name,
        })
    );

    const columns: TableColumnType<TTableData>[] = [
        {
            title: 'Department',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
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

export default AcademicDepartment;
