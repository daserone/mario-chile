import { AppDispatch, AppStore } from "@src/state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "@src/state/actions/companies.slice";
import { useCallback } from "react";
import { companiesSlice } from "@src/state/slice/companies.slice";
import { Company } from "@src/models";

export default function useCompanies() {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector((state: AppStore) => state.companies.companies);
  const company = useSelector((state: AppStore) => state.companies.company);

  const getCompanies = useCallback(async () => {
    dispatch(fetchCompanies());
  }, []);

  const setCompany = useCallback(async (company: Company) => {
    dispatch(companiesSlice.actions.setCompany(company));
  }, []);
  return { companies, getCompanies, setCompany, company };
}
