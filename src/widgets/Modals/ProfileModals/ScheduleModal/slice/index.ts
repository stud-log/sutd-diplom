import { ScheduleModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ScheduleModalSchema = {
  isModalOpen: false
};

const scheduleModalSlice = createSlice({
  name: 'scheduleModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;

    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { actions: scheduleModalActions } = scheduleModalSlice;
export const { reducer: scheduleModalReducer } = scheduleModalSlice;