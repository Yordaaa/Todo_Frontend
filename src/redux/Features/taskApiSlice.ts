import { apiSlice } from './apiSlice';
import { GetAllCollectionsResponse, GetCollectionByIdResponse } from './types';

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCollections: builder.query<GetAllCollectionsResponse, void>({
            query: () => ({
                url: '/collection/get-all-collections',
            }),
            providesTags: ['collection'],
        }),

        getCollectionById: builder.query<GetCollectionByIdResponse, string>({
            query: (id) => ({
                url: `/collection/get-collection/${id}`, // Corrected here
            }),
            providesTags: ['collection'],
        }),

        updateTaskStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/collection/update-task-status/${id}`, // Corrected here
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['collection'],
        }),

        // Updated addTask mutation to include collectionId
        addTask: builder.mutation({
            query: ({ collectionId, ...data }) => ({
                url: `/collection/add-task/${collectionId}`, // Corrected here
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['collection'],
        }),

        addSubtask: builder.mutation({
            query: ({ taskId, description, date }) => ({
                url: `/collection/add-subtask/${taskId}`, // Corrected here
                method: 'POST',
                body: { description, date }, // Only send description and date
            }),
            invalidatesTags: ['collection'], // Invalidate relevant collections if necessary
        }),

        // New editTask mutation for editing an existing task
        editTask: builder.mutation({
            query: ({ id, description, date, status }) => ({
                url: `/collection/edit-task/${id}`, // URL for editing a task
                method: 'PUT', // Use PUT for complete replacement
                body: { description, date, status }, // Send updated task details
            }),
            invalidatesTags: ['collection'], // Invalidate relevant collections if necessary
        }),
    }),
});

export const {
    useGetAllCollectionsQuery,
    useGetCollectionByIdQuery,
    useUpdateTaskStatusMutation,
    useAddTaskMutation,
    useAddSubtaskMutation,
    useEditTaskMutation, // Export the new editTask mutation
} = taskApiSlice;