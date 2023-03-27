import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productAPI from './productAPI'

const initialState = {
  data: {},
  trls: [],
  status: {
    fetch: 'idle',
    update: 'idle',
  },
}

export const fetchProductById = createAsyncThunk(
  'product/fetchProduct',
  async (productId) => {
    const response = await productAPI.fetchById(productId)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const updateProductById = createAsyncThunk(
  'product/updateProduct',
  async ({ productId, reqData }, thunkAPI) => {
    thunkAPI.dispatch(
      updateProduct({
        type: 'product/updateProduct',
        data: reqData,
      })
    )
    const response = await productAPI.updateById(productId, reqData)
    return response.data
  }
)

export const fetchTRLs = createAsyncThunk('product/fetchTRLs', async () => {
  const response = await productAPI.fetchTRLs()
  return response.data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.data = { ...state.data, ...action.payload.data }
    },
    changeUpdateStatus: (state) => {
      state.status.update = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status.fetch = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status.fetch = 'idle'
        state.data = action.payload
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status.fetch = 'failed'
      })
      .addCase(updateProductById.pending, (state) => {
        state.status.update = 'loading'
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.status.update = 'successful'
      })
      .addCase(updateProductById.rejected, (state) => {
        state.status.update = 'failed'
      })
      .addCase(fetchTRLs.fulfilled, (state, action) => {
        state.trls = action.payload
      })
  },
})

export const { updateProduct, changeUpdateStatus } = productSlice.actions

export default productSlice.reducer
