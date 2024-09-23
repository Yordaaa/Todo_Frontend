import { apiSlice } from './apiSlice';
import { LoginUserInputProps, RegistrationInputProps, RegistrationResponseProps, resTypeProps } from './types';
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<resTypeProps, LoginUserInputProps>({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data
                };
            }
        }),

        logoutApi: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        }),

        registration: builder.mutation<RegistrationResponseProps, RegistrationInputProps>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),
       
    })
});

export const { useLoginMutation, useLogoutApiMutation, useRegistrationMutation } = authApiSlice;
