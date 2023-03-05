import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { authorizationAtom } from "./authorization-atom";
import { getUser } from "@/services/common";
export function useUser() {
    const [ isAuthorized, setAuthorized ] = useAtom(authorizationAtom);
    const option = {
        retry: 1,
        enabled: isAuthorized,
        onError: (err) => {
            setAuthorized(false);
            console.log(err);
        },
    }
    const { data, refetch, isLoading, error } = useQuery(['/me'], getUser, option);
    return {user: data || null, isLoading, refetch, error, isAuthorized }; 
}

export function useLogin(token) {
    const [_, setAuthorized] = useAtom(authorizationAtom);
    setAuthorized(true);
}