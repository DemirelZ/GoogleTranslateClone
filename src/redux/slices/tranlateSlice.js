import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "../actions/translateAction";

const initialState = {
  languages: [],
  isLoading: true,
  isError: false,

  isTextLoading: false,
  isTextError: false,
  answer: "",
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.languages = action.payload;
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    //for post response
    builder.addCase(translateText.pending, (state) => {
      state.isTextLoading = true;
      state.isError = false;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isTextLoading = false;
      state.isError = false;
      state.answer = action.payload;
    });
    builder.addCase(translateText.rejected, (state) => {
      state.isTextLoading = false;
      state.isError = true;
    });
  },

  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});

export const {clearAnswer} = translateSlice.actions;
