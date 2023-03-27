import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Components/Product/productSlice'
import configReducer from '../config/configSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    config: configReducer,
  },
})
