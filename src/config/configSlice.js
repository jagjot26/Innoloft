import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import configAPI from './configAPI'

const initialState = {
  data: {},
}

export const fetchConfigById = createAsyncThunk(
  'product/fetchConfig',
  async (configId) => {
    const response = await configAPI.fetchById(configId)
    return response.data
  }
)

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchConfigById.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(fetchConfigById.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default configSlice.reducer
