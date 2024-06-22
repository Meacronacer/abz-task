import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/userSlice";
import pageSlice from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    page: pageSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
