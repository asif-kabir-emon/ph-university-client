import { useGetAllSemestersQuery } from '../../../redux/feature/admin/academicManagement.api';

import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from '../../../types/academicManagement.type';
import { useState } from 'react';
import { TQueryParam } from '../../../types/global';

type TTableData = Pick<
    TAcademicSemester,
    'name' | 'startMonth' | 'endMonth' | 'year'
>;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>([]);
    const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

    const tableData = semesterData?.data?.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            key: _id,
            name,
            startMonth,
            endMonth,
            year,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
            ],
            filterSearch: true,
            width: '30%',
        },
        {
            title: 'Start Month',
            key: 'startMonth',
            dataIndex: 'startMonth',
        },
        {
            title: 'End Month',
            key: 'endMonth',
            dataIndex: 'endMonth',
        },
        {
            title: 'Year',
            key: 'year',
            dataIndex: 'year',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => {
                return (
                    <div>
                        <Button>Update</Button>
                    </div>
                );
            },
        },
    ];

    // console.log(tableData);

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
                onChange={onChange}
                scroll={{ x: 768 }}
            />
        </div>
    );
};

export default AcademicSemester;
