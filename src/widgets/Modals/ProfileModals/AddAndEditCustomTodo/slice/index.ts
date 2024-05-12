import { AddAndEditCustomTodoSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AddAndEditCustomTodoSchema = {
  isModalOpen: false,
  recordId: -1
};

const addAndEditCustomTodoSlice = createSlice({
  name: 'addAndEditCustomTodo',
  initialState,
  reducers: {
    openModal: (state, { payload }: {payload: Omit<AddAndEditCustomTodoSchema, 'isModalOpen'>}) => {
      state.isModalOpen = true;
      state.recordId = payload.recordId;

    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.recordId = -1;
    },
  },
});

export const { actions: addAndEditCustomTodoActions } = addAndEditCustomTodoSlice;
export const { reducer: addAndEditCustomTodoReducer } = addAndEditCustomTodoSlice;