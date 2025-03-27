import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem('theme', !darkTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 