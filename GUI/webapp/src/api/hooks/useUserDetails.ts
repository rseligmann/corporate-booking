// import { useQuery } from "@tanstack/react-query"
// import { USER_KEYS } from "../query-keys"
// import { apiClient } from "../api-client"

// export interface UserDetails {
//     id: string
//     email: string
//     name: string
//     role: string
//     preferences: {
//         theme: string
//         notifications: boolean
//     }
// }

// // Type for the raw API response, if it differs from our desired type
// interface UserDetailsResponse {
//     data: {
//         user: UserDetails
//     }
// }

// async function fetchUserDetails(userId: string) {
//     const response = await apiClient
//         .get(`users/${userId}`)
//         .json<UserDetailsResponse>()
//     return response.data.user
// }

// export function useUserDetails(userId: string) {
//     return useQuery({
//         queryKey: USER_KEYS.details(userId),
//         queryFn: () => fetchUserDetails(userId),
//         enabled: !!userId,
//     })
// }
