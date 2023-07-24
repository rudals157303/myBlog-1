import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MySliceState {
  value: boolean;
}

const initialState: MySliceState = {
  value: false,
};

export const MenuSlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});
export const { reset, setMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
