import useSWR from "swr";
import { fetcher } from "@/app/lib/data";

export default function useUser () {
    const { data, error, isLoading, mutate } = useSWR(['/user',{}], fetcher,{
        errorRetryInterval: 10000,
    })

    return {
        user: data?data.user:data,
        isLoading,
        isError: error,
        mutate: mutate
    }
}