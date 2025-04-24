import { User } from "@/types";

export const AuthServiceGuest ={
    
    async getCurrentUser(): Promise<User> {
        //const response = await api.get<User>('/auth/me');
        // Store username for refresh token purposes

        // temp response. replace when magic link api is complete
        const response = {
            data: {
                user_id: 'ecafa11e-8318-4656-a69c-f2252a1e61b7',
                email: 'ashleyhipskind@gmail.com',
                first_name: 'Ashley',
                last_name: 'Seligmann',
                company_id: '2b71e3af-f47b-47de-b9b2-8e8f5182e2b0'
            }
        }

        if(response.data.user_id){
          localStorage.setItem('user_name', response.data.user_id)
        }
        return response.data;
    },
    
    async logout(): Promise<void> {
            // Clear the token from storage
            // removeToken();
            // localStorage.removeItem('user_email')
    },


    isAuthenticated(): boolean {
            // const token = getToken();
    
            // if (!token) return false;
            // if (isTokenExpired()) return false;
            return true;
        }
}