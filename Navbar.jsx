import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <h1>🌤️ Weather Dashboard</h1>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}

export default Navbar;