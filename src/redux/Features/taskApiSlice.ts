import { apiSlice } from "./apiSlice";
import {
  GetAllCollectionsResponse,
  getSubTaskProps,
  GetTasksResponseProps,
} from "./types";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all collections
    getAllCollections: builder.query<GetAllCollectionsResponse, void>({
      query: () => ({
        url: "/collection/get-all-collections",
      }),
      providesTags: ["collection"],
    }),

    // Fetch tasks by collection ID
    getUserTaskById: builder.query<GetTasksResponseProps, string>({
      query: (id) => ({
        url: `/tasks/get-user-tasks/${id}`,
      }),
      providesTags: ["tasks"],
    }),

    // Update task status
    updateTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/update-task-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["tasks"],
    }),

    // Add a new task
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks/add-tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks", "collection"], // Invalidate both tasks and collections
    }),

    // Edit an existing task
    editTask: builder.mutation({
      query: ({ id, description, date, status }) => ({
        url: `/tasks/edit-tasks/${id}`,
        method: "PUT",
        body: { description, date, status },
      }),
      invalidatesTags: ["tasks"],
    }),

    // Fetch all user tasks
    getUserTask: builder.query<GetTasksResponseProps, void>({
      query: () => ({
        url: `/tasks/get-user-tasks`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    // Fetch subtasks of a task
    getSubTasks: builder.query<getSubTaskProps, string | undefined>({
      query: (taskId) => {
        return {
          url: `/get-tasks/${taskId}`,
          method: "GET",
        };
      },
      providesTags: ["tasks"],
    }),

    // Delete a task
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/delete-task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks", "collection"],
    }),
  }),
});

export const {
  useGetAllCollectionsQuery,
  useGetUserTaskByIdQuery,
  useUpdateTaskStatusMutation,
  useAddTaskMutation,
  useEditTaskMutation,
  useGetUserTaskQuery,
  useGetSubTasksQuery,
  useDeleteTaskMutation,
} = taskApiSlice;
