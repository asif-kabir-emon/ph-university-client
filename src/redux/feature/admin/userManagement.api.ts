import { TStudent } from '../../../types';
import { TResponseRedux } from '../../../types/global';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            }),
        }),
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, String(item.value));
                    });
                }

                return {
                    url: '/students',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getStudent: builder.query({
            query: (params) => {
                return {
                    url: `/students/${params.studentId}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useAddStudentMutation,
    useGetAllStudentsQuery,
    useGetStudentQuery,
} = userManagementApi;
