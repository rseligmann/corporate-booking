interface Token {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
    expiry_time?: number;
  }

export const saveToken = (token: Token): void => {
  if (token.expires_in) {
    token.expiry_time = Date.now() + token.expires_in * 1000;
  }
  localStorage.setItem('auth_token', JSON.stringify(token));
};

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

export const isTokenExpiringSoon = (bufferTime = 300): boolean => {
  const token = getToken()
  if (!token || !token.expiry_time) return false

  return token.expiry_time - Date.now() < bufferTime * 1000;
};

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token || !token.expiry_time) return false

  return token.expiry_time <= Date.now();
}

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};