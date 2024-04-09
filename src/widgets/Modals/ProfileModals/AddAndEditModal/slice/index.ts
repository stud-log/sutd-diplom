import { AddAndEditModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AddAndEditModalSchema = {
  isModalOpen: false,
  recordTable: 'News',
  recordId: -1
};

const addAndEditModalSlice = createSlice({
  name: 'addAndEditModal',
  initialState,
  reducers: {
    openModal: (state, { payload }: {payload: Omit<AddAndEditModalSchema, 'isModalOpen'>}) => {
      state.isModalOpen = true;
      state.recordTable = payload.recordTable;
      state.recordId = payload.recordId;

    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.recordTable = 'News';
      state.recordId = -1;
    },
  },
});

export const { actions: addAndEditModalActions } = addAndEditModalSlice;
export const { reducer: addAndEditModalReducer } = addAndEditModalSlice;