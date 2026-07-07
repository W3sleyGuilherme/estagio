import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ carrinhoCount, onCarrinhoClick, user, onLogout }) {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Início' },
    { to: '/produtos', label: 'Cardápio' },
    { to: '/promocoes', label: 'Promoções' },
    { to: '/agendamento', label: 'Reservas' },
  ];

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">☕</span>
          Cafeteria do Fundão
        </Link>
        <nav className="nav">
          {links.map(link => (
            <Link 
              key={link.to} 
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <div className="user-menu">
              <span className="user-name">👤 {user.username || user.nome}</span>
              <button className="btn-logout" onClick={onLogout}>Sair</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">Entrar</Link>
              <Link to="/register" className="btn-register">Cadastrar</Link>
            </>
          )}
          
          <div className="cart-icon" onClick={onCarrinhoClick}>
            🛒
            {carrinhoCount > 0 && (
              <span className="cart-badge">{carrinhoCount}</span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
