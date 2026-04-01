// src/components/Agendamento.jsx
import React, { useState, useEffect } from 'react';

export function Agendamento() {
  const [agendamentoAberto, setAgendamentoAberto] = useState(false);
  const [step, setStep] = useState(1); // 1: dados, 2: horário, 3: confirmação
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    pessoas: 2,
    data: '',
    horario: '',
    observacoes: ''
  });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  // Horários disponíveis (simulação - depois vem do Strapi)
  const horarios = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  // Atualizar horários disponíveis quando a data mudar
  useEffect(() => {
    if (formData.data) {
      // Simulação: buscar horários disponíveis (depois integra com Strapi)
      const hoje = new Date();
      const dataSelecionada = new Date(formData.data);
      const isWeekend = dataSelecionada.getDay() === 0 || dataSelecionada.getDay() === 6;
      
      // Filtra horários baseado no dia (fim de semana tem menos horários)
      let horariosFiltrados = [...horarios];
      if (isWeekend) {
        horariosFiltrados = horariosFiltrados.filter(h => {
          const hora = parseInt(h.split(':')[0]);  
          return hora >= 10 && hora <= 18;
        });
      }
      
      setHorariosDisponiveis(horariosFiltrados);
    }
  }, [formData.data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simular envio para o Strapi
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      
      // Salvar no localStorage para debug
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      reservas.push({
        ...formData,
        id: Date.now(),
        criado_em: new Date().toISOString(),
        status: 'pendente'
      });
      localStorage.setItem('reservas', JSON.stringify(reservas));
      
      // Limpar formulário
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        pessoas: 2,
        data: '',
        horario: '',
        observacoes: ''
      });
    }, 1500);
  };

  return (
    <>
      {/* Botão flutuante de agendamento */}
      <button 
        className="btn-agendamento-flutuante"
        onClick={() => setAgendamentoAberto(true)}
      >
        📅 Reservar Mesa
      </button>

      {/* Modal de agendamento */}
      {agendamentoAberto && (
        <div className="modal-overlay agendamento-modal">
          <div className="modal-conteudo agendamento-conteudo">
            <div className="modal-cabecalho">
              <h3>📅 Reservar Mesa</h3>
              <button 
                className="modal-fechar"
                onClick={() => setAgendamentoAberto(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-corpo">
              {step === 1 && (
                <div className="agendamento-step">
                  <h4>Dados da Reserva</h4>
                  
                  <div className="form-group">
                    <label>Nome completo *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="agendamento-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Telefone *</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        className="agendamento-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="agendamento-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Número de pessoas *</label>
                    <div className="pessoas-selector">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, pessoas: Math.max(1, formData.pessoas - 1)})}
                        className="btn-pessoa"
                      >-</button>
                      <span className="pessoas-count">{formData.pessoas}</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, pessoas: Math.min(10, formData.pessoas + 1)})}
                        className="btn-pessoa"
                      >+</button>
                    </div>
                  </div>

                  <button 
                    className="btn-avancar"
                    onClick={() => {
                      if (formData.nome && formData.telefone && formData.pessoas) {
                        setStep(2);
                      } else {
                        alert('Preencha os campos obrigatórios!');
                      }
                    }}
                  >
                    Próximo →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="agendamento-step">
                  <h4>Escolha a data e horário</h4>
                  
                  <div className="form-group">
                    <label>Data *</label>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="agendamento-input"
                    />
                  </div>

                  {formData.data && (
                    <div className="form-group">
                      <label>Horário *</label>
                      <div className="horarios-grid">
                        {horariosDisponiveis.map(horario => (
                          <button
                            key={horario}
                            className={`horario-btn ${formData.horario === horario ? 'selecionado' : ''}`}
                            onClick={() => setFormData({...formData, horario})}
                          >
                            {horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Observações (opcional)</label>
                    <textarea
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleChange}
                      placeholder="Preferências, alergias, ocasião especial..."
                      className="agendamento-textarea"
                      rows="3"
                    />
                  </div>

                  <div className="agendamento-acoes">
                    <button className="btn-voltar" onClick={() => setStep(1)}>
                      ← Voltar
                    </button>
                    <button 
                      className="btn-avancar"
                      onClick={() => {
                        if (formData.data && formData.horario) {
                          handleSubmit();
                        } else {
                          alert('Escolha a data e horário!');
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="agendamento-step confirmacao">
                  <div className="confirmacao-icone">✅</div>
                  <h4>Reserva Confirmada!</h4>
                  <p>Sua mesa foi reservada com sucesso!</p>
                  
                  <div className="resumo-reserva">
                    <div className="resumo-item">
                      <span>Data:</span>
                      <strong>{new Date(formData.data).toLocaleDateString('pt-BR')}</strong>
                    </div>
                    <div className="resumo-item">
                      <span>Horário:</span>
                      <strong>{formData.horario}</strong>
                    </div>
                    <div className="resumo-item">
                      <span>Pessoas:</span>
                      <strong>{formData.pessoas}</strong>
                    </div>
                    <div className="resumo-item">
                      <span>Nome:</span>
                      <strong>{formData.nome}</strong>
                    </div>
                  </div>
                  
                  <p className="mensagem-confirmacao">
                    Enviamos uma confirmação para o seu telefone/email.
                    <br />
                    Chegue 10 minutos antes do horário agendado.
                  </p>
                  
                  <button 
                    className="btn-fechar"
                    onClick={() => {
                      setAgendamentoAberto(false);
                      setStep(1);
                    }}
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}