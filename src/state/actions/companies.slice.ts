import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCompanies } from "@src/services/companies.service";

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    try {
      const response = await getCompanies();
      console.log(response);

      return { companies: response };
    } catch (error: any) {
      console.log("Error fetching companies", error.response.data);
      return { message: error.response?.data?.detail };
    }
  }
);
