import { ActivityTimerSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ActivityTimerSchema = {
  isModalOpen: false,
};

const activityTimerSlice = createSlice({
  name: 'activityTimer',
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

export const { actions: activityTimerActions } = activityTimerSlice;
export const { reducer: activityTimerReducer } = activityTimerSlice;