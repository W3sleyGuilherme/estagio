import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Agendamento({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    data: '',
    hora: '',
    pessoas: 2,
    observacao: ''
  });
  const [agendamentos, setAgendamentos] = useState([]);
  const [success, setSuccess] = useState(false);

  // Carregar agendamentos salvos
  useEffect(() => {
    const salvos = localStorage.getItem('agendamentos');
    if (salvos) {
      try {
        setAgendamentos(JSON.parse(salvos));
      } catch (e) {
        console.error('Erro ao carregar agendamentos:', e);
      }
    }
  }, []);

  // Preencher com dados do usuário se logado
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        nome: user.username || user.nome || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Faça login para agendar uma reserva!');
      navigate('/login');
      return;
    }

    const novoAgendamento = {
      id: Date.now(),
      ...form,
      criadoEm: new Date().toISOString(),
      status: 'confirmado'
    };

    const atualizados = [...agendamentos, novoAgendamento];
    setAgendamentos(atualizados);
    localStorage.setItem('agendamentos', JSON.stringify(atualizados));
    
    setSuccess(true);
    setForm({
      nome: user.username || user.nome || '',
      telefone: '',
      data: '',
      hora: '',
      pessoas: 2,
      observacao: ''
    });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const cancelarAgendamento = (id) => {
    const atualizados = agendamentos.filter(a => a.id !== id);
    setAgendamentos(atualizados);
    localStorage.setItem('agendamentos', JSON.stringify(atualizados));
  };

  return (
    <div className="agendamento-page">
      <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <h1>📅 Reservas</h1>
        <p>Reserve sua mesa na nossa cafeteria</p>

        {!user && (
          <div className="auth-warning">
            ⚠️ Você precisa <a href="/login">fazer login</a> para agendar
          </div>
        )}

        {success && (
          <div className="success-message">
            ✅ Reserva confirmada! Você receberá um e-mail de confirmação.
          </div>
        )}

        <div className="agendamento-grid">
          <div className="agendamento-form">
            <h3>Nova reserva</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                  disabled={!!user}
                />
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data *</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hora *</label>
                  <input
                    type="time"
                    name="hora"
                    value={form.hora}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Número de pessoas</label>
                <input
                  type="number"
                  name="pessoas"
                  value={form.pessoas}
                  onChange={handleChange}
                  min="1"
                  max="20"
                />
              </div>

              <div className="form-group">
                <label>Observação</label>
                <textarea
                  name="observacao"
                  value={form.observacao}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Alguma preferência especial?"
                />
              </div>

              <button type="submit" className="btn" disabled={!user}>
                {user ? 'Agendar reserva' : 'Faça login para agendar'}
              </button>
            </form>
          </div>

          <div className="agendamentos-lista">
            <h3>Minhas reservas</h3>
            {agendamentos.length === 0 ? (
              <p className="sem-reservas">Nenhuma reserva agendada ainda.</p>
            ) : (
              agendamentos.map(a => (
                <div key={a.id} className="agendamento-item">
                  <div className="agendamento-info">
                    <h4>{a.nome}</h4>
                    <p>📅 {new Date(a.data).toLocaleDateString('pt-BR')} às {a.hora}</p>
                    <p>👥 {a.pessoas} pessoas</p>
                    {a.observacao && <p className="obs">📝 {a.observacao}</p>}
                    <span className="status-confirmado">✅ Confirmado</span>
                  </div>
                  <button 
                    className="btn-cancelar"
                    onClick={() => cancelarAgendamento(a.id)}
                  >
                    Cancelar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamento;
