import { useQuery } from "@tanstack/react-query";
import { getBeneficiariesForCSV } from "../services/api.services";

export const ALL_ACTIVE_KEY = ["beneficiaries", "allActive","csv"];

export const useAllActivesCsv = (open) => {
    return useQuery({
        queryKey: ALL_ACTIVE_KEY,
        queryFn: getBeneficiariesForCSV,
        enabled: open,                 
        staleTime: 1000 * 60 * 10,     
        cacheTime: 1000 * 60 * 30,     
        refetchOnWindowFocus: false,
        retry: false,
        select: (data) => data.data.beneficiaries,
    })
}