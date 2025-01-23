// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './CartSlice';
//  const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//     },
// });
// export default store
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});
