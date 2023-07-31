import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1),
});
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transfromResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return notesAdapter.setAll(initialState, loadedPosts);
      },
      invalidatesTags: (result, error, tag) => {
        if (result?.id) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else {
          return { type: "Post", id: "LIST" };
        }
      },
    }),
    addNewNote: builder.mutation({
      query: (newNoteData) => ({
        url: "/notes",
        method: "POST",
        body: { ...newNoteData },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (updateData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...updateData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});
export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();
const selectNotesData = createSelector(
  selectNotesResult,
  (notesData) => notesData.data
);
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
