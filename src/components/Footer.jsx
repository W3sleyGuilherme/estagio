// src/components/Footer.jsx
import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <div className="footer-logo">
              <span className="footer-logo-icone">☕</span>
              <h3>Coffee<span>Shop</span></h3>
            </div>
            <p className="footer-descricao">Seu café especial todos os dias</p>
            <div className="footer-redes">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">👤</a>
              <a href="#" aria-label="WhatsApp">💬</a>
            </div>
          </div>
          
          <div className="footer-contato">
            <h4>Horário de Funcionamento</h4>
            <p>Segunda a Sexta: 8h às 20h</p>
            <p>Sábado e Domingo: 9h às 18h</p>
          </div>
          
          <div className="footer-contato">
            <h4>Contato</h4>
            <p>📞 (11) 9999-9999</p>
            <p>📧 contato@coffeeshop.com</p>
            <p>📍 Rua dos Cafés, 123 - São Paulo</p>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>© 2026 CoffeeShop. Todos os direitos reservados.</p>
          <p>Desenvolvido com ❤️ para amantes de café</p>
        </div>
      </div>
    </footer>
  );
}