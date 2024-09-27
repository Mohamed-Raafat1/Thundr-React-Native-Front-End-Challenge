import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { polygonApi } from '../api/polygon.ts/api';


export const store = configureStore({
  reducer: {
    // Add the API reducer
    [polygonApi.reducerPath]: polygonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(polygonApi.middleware),
});

// Optional: Setup listeners to enable refetch on focus or reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;