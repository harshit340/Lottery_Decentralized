import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export interface AccountState {
  account : any
}

const initialAccountState: AccountState = {
  account : null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState : initialAccountState,
  reducers: {
    getAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload
    },
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { getAccount } = accountSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer;