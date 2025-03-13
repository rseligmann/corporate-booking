interface Token {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
  }

export const saveToken = (token: Token): void => {
  localStorage.setItem('auth_token', JSON.stringify(token));
};

//export const refreshToken = (token: Token): void => {}


export const getToken = (): Token | null => {
  const tokenStr = localStorage.getItem('auth_token');
  if (!tokenStr) return null;
  try {
    return JSON.parse(tokenStr) as Token;
  } catch (error) {
    console.error('Failed to parse token from localStorage', error);
    return null;
  }
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// export const removeRefreshToken = (): void => {
//   localStorage.removeItem('refresh_token');
// };