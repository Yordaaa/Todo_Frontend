import { apiSlice } from './apiSlice';
import { LoginUserInputProps, RegistrationInputProps, RegistrationResponseProps, ResTypeProps } from './types';
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResTypeProps, LoginUserInputProps>({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data
                };
            }
        }),

        logout: builder.mutation<void, void>({
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

export const { useLoginMutation, useLogoutMutation, useRegistrationMutation } = authApiSlice;
