// App.jsx - Versão TESTADA
import React from "react";
import "./App.css";

function App() {
  return (
    <div style={{
      padding: "50px",
      textAlign: "center",
      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ fontSize: "60px", marginBottom: "30px" }}>
        ✅ REACT + STRAPI CONECTADOS!
      </h1>
      
      <div style={{
        background: "white",
        color: "#333",
        padding: "30px",
        borderRadius: "15px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <h2>Status da Conexão:</h2>
        <p style={{ fontSize: "24px", margin: "20px 0" }}>
          🟢 React rodando em: localhost:5174
        </p>
        <p style={{ fontSize: "24px", margin: "20px 0" }}>
          🟢 Strapi rodando em: localhost:1337
        </p>
        
        <button 
          onClick={() => {
            fetch("http://localhost:1337/api/documentos")
              .then(r => r.json())
              .then(d => alert(`Documentos: ${d.data?.length || 0}`))
              .catch(e => alert("Erro: " + e.message));
          }}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          🔍 Testar Conexão com Strapi
        </button>
      </div>
      
      <div style={{ marginTop: "50px" }}>
        <a 
          href="http://localhost:1337/admin" 
          target="_blank"
          style={{
            color: "#FFEB3B",
            fontSize: "20px",
            textDecoration: "none",
            borderBottom: "2px solid #FFEB3B",
            paddingBottom: "5px"
          }}
        >
          🔗 Clique aqui para acessar o Strapi Admin
        </a>
      </div>
    </div>
  );
}

export default App;
