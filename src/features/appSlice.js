import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    topicId: null,
  },
  reducers: {
    switchTopic: (state, action) => {
      state.topicId = action.payload.topicId;
    },
  },
});

export const { switchTopic } = appSlice.actions;

export const selectTopicId = state => state.app.topicId;

export default appSlice.reducer;
