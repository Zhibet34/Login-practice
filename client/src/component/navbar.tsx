import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../App.css';

type PathType = '/' | '/register' | '/login';

interface NavItem {
  path: PathType;
  label: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/register', label: 'Register' },  // Changed from 'Contact' to match path
    { path: '/login', label: 'Login' },
  ];

  const handleNavigate = (path: PathType) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand" onClick={() => handleNavigate('/')}>
          MyApp
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="nav-item"
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="mobile-nav-item"
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;