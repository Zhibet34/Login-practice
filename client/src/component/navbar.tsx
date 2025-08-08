import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

type PathType = '/' | '/register' | '/login' | '/profile' | '/logout' | '/create';

interface NavItem {
  path: PathType;
  label: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState<{isAuthenticated: boolean, user?: any}>({
    isAuthenticated: false
  });

  const handleNavigate = (path: PathType) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
     const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      setLoggedIn({isAuthenticated: false}); 
      console.log('user have been loggedout successfuly', response.data)
    } catch (error: any) {
      console.error('logout failed', error)
    }
  }

  useEffect(() => {
    const checkStatus = async () => {
      const response = await axios.get('http://localhost:3000/auth',{
        withCredentials: true
      });
      setLoggedIn(response.data);
      console.log(response.data); 
    }
    checkStatus();
  }, []);


  const guestItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/register', label: 'Register' }, 
    { path: '/login', label: 'Login' },
  ];

  const authNavItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/profile', label: 'Profile' },
    { path: '/logout', label: 'Logout' }
  ];
  
  const currentNavbar = loggedIn.isAuthenticated ? authNavItems : guestItems;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand" onClick={() => handleNavigate('/')}>
          Zhibet
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {currentNavbar.map((item) => (
            <div
              key={item.path}
              className="nav-item"
              onClick={() => item.path === '/logout' ? handleLogout() : handleNavigate(item.path)}
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
          {currentNavbar.map((item) => (
            <div
              key={item.path}
              className="mobile-nav-item"
              onClick={() => item.path === '/logout' ? handleLogout() : handleNavigate(item.path)}
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