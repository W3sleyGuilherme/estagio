
import './App.css';

function App() {
  return (
    <div className="container">

      <header className="header">
        <h1 className="titulo-principal">
          ⚽ Notícias do Futebol
        </h1>
        <p className="subtitulo">
          As principais notícias do mundo da bola
        </p>
      </header>

      <hr className="divisor" />

      <article className="noticia">
        
        <h2 className="titulo-noticia">
          Neymar se recupera de lesão
        </h2>
        
        <p className="meta-info">
          📅 05 de fevereiro de 2026 | 📍 Redação Esportiva
        </p>
        
        <div className="conteudo">
          <p>
            <strong>Neymar Jr.</strong>, atacante do Al Hilal e da Seleção Brasileira, 
            está em fase final de recuperação de uma lesão no joelho que o afastou dos 
            gramados há três meses.
          </p>
          
          <p>
            De acordo com a equipe médica do clube, a evolução do jogador tem sido 
            positiva. Neymar já realiza trabalhos com a bola e deve voltar aos 
            treinos coletivos em breve.
          </p>
          
          <p>
            O principal objetivo do atleta é estar 100% para a 
            <strong> Copa do Mundo de 2026</strong>, que será realizada no 
            Canadá, Estados Unidos e México.
          </p>

          <div className="citacao">
            <p>
              "Estou me dedicando totalmente à recuperação. Quero voltar mais forte 
              e ajudar o Brasil a ser hexacampeão"
            </p>
            <p className="autor">
              — Neymar Jr.
            </p>
          </div>
          
          <p>
            Desde sua transferência para o Al Hilal, o atacante marcou 
            <strong> 28 gols em 45 partidas</strong>.
          </p>
        </div>

        <hr className="divisor-pequeno" />
       
        <footer className="rodape">
          <p>
            Fonte: Redação esportiva - Esta página foi criada com React para fins educativos
          </p>
        </footer>
        
      </article>
      
    </div>
  )
}

export default App