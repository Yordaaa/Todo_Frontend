import { apiSlice } from './apiSlice';
import { favouritesResType } from './types';

const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addfavourite: builder.mutation({
            query: (productId) => {
                return {
                    url: '/user/add-to-favourite',
                    method: 'POST',
                    body: productId
                };
            },
            invalidatesTags: ['userInfo']
        }),
        removeFromfavourite: builder.mutation({
            query: (productId) => {
                return {
                    url: '/user/remove-from-favourite',
                    method: 'DELETE',
                    body: productId
                };
            },
            invalidatesTags: ['userInfo']
        }),
        getUserfavourite: builder.query<favouritesResType, string | undefined>({
            query: () => ({
                url: '/user/get-user-favourite',
                method: 'GET'
            }),
            providesTags: ['userInfo']
        }),
       
       
    })
});

export const { useAddfavouriteMutation, useRemoveFromfavouriteMutation, useGetUserfavouriteQuery} = userSlice;
