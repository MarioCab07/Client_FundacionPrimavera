import { useQuery } from "@tanstack/react-query";
import { getBeneficiaries,getInactiveBeneficiaries } from "../services/api.services";

export const useBeneficiaries = ({page = 1,limit = 10,showActive})=>{
   const statusKey = showActive ? "active" : "inactive";

   return useQuery({
    queryKey: ["beneficiaries", statusKey,page],
    queryFn: () =>
      showActive
        ? getBeneficiaries(page, limit).then(r => r.data)
        : getInactiveBeneficiaries(page, limit).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
   });
};