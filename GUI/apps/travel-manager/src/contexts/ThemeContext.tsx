// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>(() => {
//     // Check for saved theme
//     const saved = localStorage.getItem('theme');
//     // Check system preference if no saved theme
//     if (!saved) {
//       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//     }
//     return saved as Theme;
//   });

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };