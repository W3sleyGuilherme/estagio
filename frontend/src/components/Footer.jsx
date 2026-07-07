import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <h4>☕ Cafeteria do Fundão</h4>
          <p>O melhor café da região,</p>
          <p>preparado com paixão e dedicação.</p>
        </div>
        <div>
          <h4>Horário</h4>
          <p>Segunda - Sexta: 8h - 22h</p>
          <p>Sábado - Domingo: 9h - 20h</p>
        </div>
        <div>
          <h4>Contato</h4>
          <p>(11) 99999-9999</p>
          <p>contato@cafeteriadofundao.com</p>
          <div className="social">
            <a href="#">📱</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Cafeteria do Fundão. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
