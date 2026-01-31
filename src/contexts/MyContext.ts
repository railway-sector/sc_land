import { createContext } from "react";

type MyDropdownContextType = {
  municipals: any;
  barangays: any;
  updateMunicipals: any;
  updateBarangays: any;
};

const initialState = {
  municipals: undefined,
  barangays: undefined,
  updateMunicipals: undefined,
  updateBarangays: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
