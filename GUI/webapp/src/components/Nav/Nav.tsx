import { FC, useState } from 'react'
import { ChevronRight, Menu } from 'lucide-react'
import { useTheme } from '~/contexts/ThemeContext'
import './Nav.scss'

interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`vertical-nav ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}>
      <button 
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        <div className="icon-container">
          {isExpanded ? (
            <Menu className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </div>
      </button>
      
      <ul className="nav-list">
        <li className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </li>
        <li className="nav-item">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </li>
        <li className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </li>
      </ul>

      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="nav-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
        <span className="nav-text">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </nav>
  )
}

export default Nav