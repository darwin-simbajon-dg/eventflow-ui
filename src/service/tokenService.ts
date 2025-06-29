import type { UserData } from '../types/UserData';

const TOKEN_KEY = 'user-data';

export const tokenService = {
    getToken: (): string | null => {
      return localStorage.getItem(TOKEN_KEY);
    },
  
    setToken: (token: string): void => {
      localStorage.setItem(TOKEN_KEY, token);
    },
  
    removeToken: (): void => {
      localStorage.removeItem(TOKEN_KEY);
    },
  
    getUserDataFromToken: (): UserData | null => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;
  
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return {
            username: decoded["Email"],
            userId: decoded["UserId"] || decoded['sub'],
            role: decoded["Role"],
            fullName: decoded["Fullname"],
            email: decoded["Email"],
            alternateEmail: decoded["AlternativeEmail"],
            college: decoded["College"],
            studentNumber: decoded['StudentNumber'],
            imageUrl: decoded["ImageUrl"] || decoded["PictureUrl"]
          };
      } catch (e) {
        console.error('Invalid token format', e);
        return null;
      }
    }
  };

 

 