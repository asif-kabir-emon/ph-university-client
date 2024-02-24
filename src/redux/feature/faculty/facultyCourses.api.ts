import { TMyOfferedCourse, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

const facultyCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, String(item.value));
                    });
                }

                return {
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['OfferedCourses'],
            transformResponse: (
                response: TResponseRedux<TMyOfferedCourse[]>
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        enrollCourse: builder.mutation({
            query: (args) => {
                return {
                    url: '/enrolled-courses/create-enrolled-course',
                    method: 'POST',
                    body: args,
                };
            },
            invalidatesTags: ['OfferedCourses'],
        }),
    }),
});

export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation } =
    facultyCourseApi;
