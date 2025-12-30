import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';
import destinationsReducer from './slices/destinationsSlice';
import destinationDetailReducer from './slices/destinationDetailSlice';
import reservationReducer from './slices/reservationSlice';
import contactReducer from './slices/contactSlice';
import dashboardReducer from './slices/dashboardSlice';
import adminDestinationsReducer from './slices/adminDestinationsSlice';
import adminReservationsReducer from './slices/adminReservationsSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    destinations: destinationsReducer,
    destinationDetail: destinationDetailReducer,
    reservation: reservationReducer,
    contact: contactReducer,
    dashboard: dashboardReducer,
    adminDestinations: adminDestinationsReducer,
    adminReservations: adminReservationsReducer,
    articles : articlesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
