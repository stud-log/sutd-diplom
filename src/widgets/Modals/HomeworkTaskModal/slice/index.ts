import { HomeworkTaskModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: HomeworkTaskModalSchema = {
  isModalOpen: false,
  recordId: -1
};

const homeworkTaskModalSlice = createSlice({
  name: 'homeworkTaskModal',
  initialState,
  reducers: {
    openModal: (state, { payload } : {payload: {recordId: number}}) => {
      state.isModalOpen = true;
      state.recordId = payload.recordId;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.recordId = -1;
    },
  },
});

export const { actions: homeworkTaskModalActions } = homeworkTaskModalSlice;
export const { reducer: homeworkTaskModalReducer } = homeworkTaskModalSlice;