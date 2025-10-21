import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isFormsPage = location.pathname === '/forms';
  return (
    <header className={`header ${isFormsPage ? 'header-forms' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>AeroProfile AI</h1>
        </div>
        <nav className="nav">
          <div className="dropdown">
            <span>Sobre o corvos</span>
            <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="dropdown">
            <span>Sobre o otimizador</span>
            <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="dropdown">
            <span>Objetivo</span>
            <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;