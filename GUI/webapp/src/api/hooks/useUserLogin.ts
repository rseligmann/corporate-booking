// import { useMutation } from "@tanstack/react-query"
// import { AUTH_KEYS } from "../query-keys"
// import { apiClient } from "../api-client"

// export interface LoginCredentials {
//     email: string
//     password: string
// }

// export interface LoginResponse {
//     token: string
//     user: {
//         id: string
//         email: string
//         name: string
//     }
// }

// interface LoginAPIResponse {
//     data: {
//         auth: LoginResponse
//     }
// }

// async function loginUser(
//     credentials: LoginCredentials
// ): Promise<LoginResponse> {
//     const response = await apiClient
//         .post("auth/login", {
//             json: credentials,
//         })
//         .json<LoginAPIResponse>()

//     return response.data.auth
// }

// export function useUserLogin() {
//     return useMutation({
//         mutationKey: AUTH_KEYS.login(),
//         mutationFn: loginUser,
//     })
// }
