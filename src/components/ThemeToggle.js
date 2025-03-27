import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <span className="sun"><i className="fas fa-sun"></i></span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkTheme}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <span className="moon"><i className="fas fa-moon"></i></span>
    </div>
  );
};

export default ThemeToggle; 