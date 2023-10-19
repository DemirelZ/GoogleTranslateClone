import { configureStore } from "@reduxjs/toolkit";
import { translateSlice } from "./slices/tranlateSlice";

export default configureStore({reducer: {translateState:translateSlice.reducer}})