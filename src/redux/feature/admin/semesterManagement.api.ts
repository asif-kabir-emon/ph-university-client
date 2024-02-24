import { TCourse, TResponseRedux, TSemesterRegistration } from '../../../types';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addRegisterSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
        }),
        getAllRegisteredSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, String(item.value));
                    });
                }

                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['Semester'],
            transformResponse: (
                response: TResponseRedux<TSemesterRegistration[]>
            ) => {
                console.log('response', response);
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['Semester'],
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data,
            }),
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, String(item.value));
                    });
                }

                return {
                    url: '/courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['Courses'],
            transformResponse: (response: TResponseRedux<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getCourseFaculties: builder.query({
            query: (id) => {
                return {
                    url: `/courses/${id}/get-faculties`,
                    method: 'GET',
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        createOfferedCourse: builder.mutation({
            query: (data) => ({
                url: `offered-courses/create-offered-course`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Courses'],
        }),
    }),
});

export const {
    useAddRegisterSemesterMutation,
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useGetCourseFacultiesQuery,
    useCreateOfferedCourseMutation,
} = userManagementApi;
