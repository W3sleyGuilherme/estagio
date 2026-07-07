import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <h4>☕ Cafeteria do Fundão</h4>
          <p>O melhor café do Fundão, preparado com ingredientes de qualidade, tradição e um atendimento acolhedor.</p>
          <p>O lugar ideal para começar o dia, fazer uma pausa ou encontrar amigos.</p>
        </div>
        <div>
          <h4>Horário</h4>
          <p>Segunda a Sexta: 08:00 – 20:00</p>
          <p>Sábado: 09:00 – 19:00</p>
          <p>Domingo: 09:00 – 13:00</p>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>📞 +351 275 000 000</p>
          <p>✉️ contacto@cafeteriadofundao.pt</p>
          <p>📍 Rua da Misericórdia, 6230-000 Fundão, Castelo Branco, Portugal</p>
          <div className="social">
            <a href="#" aria-label="Facebook">📱 Facebook</a>
            <a href="#" aria-label="Instagram">📸 Instagram</a>
            <a href="#" aria-label="LinkedIn">💼 LinkedIn</a>
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
