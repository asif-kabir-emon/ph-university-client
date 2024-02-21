import { TAcademicSemester } from '../../../types/academicManagement.type';
import { TResponseRedux } from '../../../types/global';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, String(item.value));
                    });
                }

                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (
                response: TResponseRedux<TAcademicSemester[]>
            ) => {
                return {
                    data: response.data,
                };
            },
        }),
        createAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data,
            }),
        }),
        getAllAcademicFaculties: builder.query({
            query: () => {
                return {
                    url: '/academic-faculties',
                    method: 'GET',
                };
            },
        }),
        createAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data,
            }),
        }),
        getAllAcademicDepartments: builder.query({
            query: () => {
                return {
                    url: '/academic-departments',
                    method: 'GET',
                };
            },
        }),
        createAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-departments/create-academic-department',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllSemestersQuery,
    useCreateAcademicSemesterMutation,
    useGetAllAcademicFacultiesQuery,
    useCreateAcademicFacultyMutation,
    useGetAllAcademicDepartmentsQuery,
    useCreateAcademicDepartmentMutation,
} = academicManagementApi;
