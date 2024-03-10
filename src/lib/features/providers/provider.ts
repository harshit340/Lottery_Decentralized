import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'


export interface AccountState {
  account : any,
  signer : any ,
  provider : any,
  contract : any,
}

const initialAccountState: AccountState = {
  account : null ,
  signer : null ,
  provider : null,
  contract : null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState : initialAccountState,
  reducers: {
    getAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload
    },
    getSigner: (state, action: PayloadAction<any>) => {
      state.signer = action.payload
    },
    getProvider: (state, action: PayloadAction<any>) => {
      state.provider = action.payload
    },
    getContract: (state, action: PayloadAction<any>) => {
      state.provider = action.payload
    },
  }
})

export const { getAccount , getSigner , getProvider , getContract } = accountSlice.actions

export const selectAccount = (state: RootState) => state.account.account;
export const selectSigner = (state: RootState) => state.account.signer;
export const selectProvider = (state: RootState) => state.account.provider;
export const selectContract = (state: RootState) => state.account.contract;


export default accountSlice.reducer;