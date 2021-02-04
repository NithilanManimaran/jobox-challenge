import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../redux_slices/photoSlice';

export default configureStore({
  reducer: {
    photo: photoReducer
  },
});
