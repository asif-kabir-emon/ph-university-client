import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout } from '../feature/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ph-university-beta.vercel.app/api/v1',
    // baseUrl: 'http://localhost:4000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        const res = await fetch(
            'https://ph-university-beta.vercel.app/api/v1/auth/refresh-token',
            // 'http://localhost:4000/api/v1/auth/refresh-token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );
        const data = await res.json();
        if (data?.data.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch({
                setUser: {
                    user,
                    token: data.data.accessToken,
                },
            });
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['Semester', 'Courses', 'OfferedCourses'],
    endpoints: () => ({}),
});
