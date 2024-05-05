import { createSlice } from "@reduxjs/toolkit";
import { Company } from "@src/models";
import { getLocalStorage, persistLocalStorage } from "../../helpers/helpers";
import { fetchCompanies } from "../actions/companies.slice";

const COMPANY_KEY = process.env.NOWLI_COMPANY_KEY;

export const initial: Company = {
  id: "",
  name: "",
  description: "",
  apiKey: "",
  isActive: false,
};

const initialState = {
  companies: [],
  company: getLocalStorage(COMPANY_KEY!) ?? initial,
  error: "",
  loading: false,
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCompany: (state, action) => {
      console.log(action.payload);

      persistLocalStorage(COMPANY_KEY!, action.payload);
      state.company = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.companies) {
        state.companies = action.payload.companies;
      }
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Error fetching companies";
    });
  },
});

export const { setCompanies, setCompany, setError, setLoading } =
  companiesSlice.actions;
export default companiesSlice.reducer;
