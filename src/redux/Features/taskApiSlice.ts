import { apiSlice } from "./apiSlice";
import { GetAllCollectionsResponse, GetTasksResponseProps } from "./types";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<GetAllCollectionsResponse, void>({
      query: () => ({
        url: "/collection/get-all-collections",
      }),
      providesTags: ["collection"],
    }),

    getUserTaskById: builder.query<GetTasksResponseProps, string>({
      query: (id) => ({
        url: `/tasks/get-collection-tasks/${id}`,
      }),
      providesTags: ["tasks"],
    }),

    updateTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/update-task-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["tasks"],
    }),

    addTask: builder.mutation({
      query: ({ collectionId, ...data }) => ({
        url: `/tasks/add-task/${collectionId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    addSubtask: builder.mutation({
      query: ({ taskId, description, date }) => ({
        url: `/tasks/add-subtask/${taskId}`,
        method: "POST",
        body: { description, date },
      }),
      invalidatesTags: ["tasks"],
    }),

    editTask: builder.mutation({
      query: ({ id, description, date, status }) => ({
        url: `/tasks/edit-task/${id}`,
        method: "PUT",
        body: { description, date, status },
      }),
      invalidatesTags: ["tasks"],
    }),
    getUserTask: builder.query<GetTasksResponseProps, void>({
      query: () => ({
        url: `/tasks/get-user-task`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetAllCollectionsQuery,
  useGetUserTaskByIdQuery,
  useUpdateTaskStatusMutation,
  useAddTaskMutation,
  useAddSubtaskMutation,
  useEditTaskMutation,
  useGetUserTaskQuery,
} = taskApiSlice;
