import useSWR from "swr";
import { fetcher } from "@/app/lib/data";
import { popupE } from "../trigger";
export default function useProfile (id, role) {
    const { data:profile, profileError, profileLoading } = useSWR(['/profile',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:requirements, requirementsError, requirementsLoading } = useSWR(['/files/requirements',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:photo, photoError, photoLoading } = useSWR(['/files/profile',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:training, trainingError, trainingLoading } = useSWR(['/training/attended',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:conferences, error:conferencesError, isLoading:conferencesLoading } = useSWR(['/conference/attended',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:groups, error:groupsError, isLoading:groupsLoading } = useSWR(['/groups',{}], fetcher)

    if (profileError || requirementsError || photoError || trainingError || groupsError) popupE('error', 'Error', 'Server Error')

    return {
        data: {
            ...profile, 
            requirements:requirements, 
            photo: photo,
            trainings: training,
            twgs: groups?.data,
            conferences: conferences?.data
        },
        isLoading: profileLoading || requirementsLoading || photoLoading || trainingLoading || groupsLoading,
        isError: profileError || requirementsError || photoError || trainingError || groupsError || conferencesError
    }
}