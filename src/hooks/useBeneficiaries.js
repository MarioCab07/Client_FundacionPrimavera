import { useQuery } from "@tanstack/react-query";
import { getBeneficiaries,getInactiveBeneficiaries } from "../services/api.services";

export const useBeneficiaries = ({page = 1,limit = 10,showActive})=>{
    const activeQuery =  useQuery({
        queryKey: ["beneficiaries", page, true],
        queryFn : async () =>
            getBeneficiaries(page, limit).then((res) => res.data),
            staleTime: 1000 * 60 * 5,       // 5 min de freshness
        cacheTime: 1000 * 60 * 30,      // 30 min en cache tras inactividad
        keepPreviousData: true,         // mantiene la página anterior mientras carga
        refetchOnWindowFocus: false,    // no refetch al volver al tab
        refetchOnMount: false,          // no refetch al remount
        retry: false,
    });

    const inactiveQuery = useQuery({
        queryKey: ["beneficiaries", page, false],
        queryFn : async () =>
            getInactiveBeneficiaries(page, limit).then((res) => res.data),
            staleTime: 1000 * 60 * 5,       // 5 min de freshness
        cacheTime: 1000 * 60 * 30,      // 30 min en cache tras inactividad
        keepPreviousData: true,         // mantiene la página anterior mientras carga
        refetchOnWindowFocus: false,    // no refetch al volver al tab
        refetchOnMount: false,          // no refetch al remount
        retry: false,
    });

    return showActive ? activeQuery : inactiveQuery;
}