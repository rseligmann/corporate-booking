// import ky from "ky"

// const baseUrl =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"

// export const apiClient = ky.create({
//     prefixUrl: baseUrl,
//     hooks: {
//         beforeRequest: [
//             request => {
//                 const token = localStorage.getItem("token")
//                 if (token) {
//                     request.headers.set("Authorization", `Bearer ${token}`)
//                 }
//             },
//         ],
//     },
//     retry: 0, // We handle retry with TanStack Query
// })
