import { AddAndEditCustomActivitySchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AddAndEditCustomActivitySchema = {
  isModalOpen: false,
  recordId: -1
};

const addAndEditCustomActivitySlice = createSlice({
  name: 'addAndEditCustomActivity',
  initialState,
  reducers: {
    openModal: (state, { payload }: {payload: Omit<AddAndEditCustomActivitySchema, 'isModalOpen'>}) => {
      state.isModalOpen = true;
      state.recordId = payload.recordId;

    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.recordId = -1;
    },
  },
});

export const { actions: addAndEditCustomActivityActions } = addAndEditCustomActivitySlice;
export const { reducer: addAndEditCustomActivityReducer } = addAndEditCustomActivitySlice;