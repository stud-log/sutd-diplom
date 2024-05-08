import { TrophySchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TrophySchema = {
  isSeen: false
};

const trophySlice = createSlice({
  name: 'trophy',
  initialState,
  reducers: {
    setIsSeen: (state, { payload }: {payload: {isSeen: boolean}}) => {
      state.isSeen = payload.isSeen;
    }
  },
});

export const { actions: trophyActions } = trophySlice;
export const { reducer: trophyReducer } = trophySlice;