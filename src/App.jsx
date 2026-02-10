import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/documentos?populate=*")
      .then((r) => r.json())
      .then((d) => {
        console.log("✅ CONEXÃO OK!", d);
        setDocs(d.data || []);
      })
      .catch((e) => console.error("❌ ERRO:", e));
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ color: "green", fontSize: "40px" }}>🎯 REACT + STRAPI</h1>
      <p style={{ fontSize: "20px" }}>Documentos: <strong>{docs.length}</strong></p>
      
      {docs.map(doc => (
        <div key={doc.id} style={{ 
          background: "white", 
          border: "2px solid blue", 
          padding: "20px", 
          margin: "20px",
          borderRadius: "10px"
        }}>
          <h2>{doc.attributes.titulo || "Sem título"}</h2>
          <p style={{ color: "red", fontSize: "30px" }}>R$ {doc.attributes.preco || "0.00"}</p>
          <button style={{ 
            background: "orange", 
            color: "white", 
            padding: "10px 30px", 
            fontSize: "18px",
            border: "none",
            borderRadius: "5px"
          }}>
            COMPRAR AGORA
          </button>
        </div>
      ))}
      
      {docs.length === 0 && (
        <div style={{ marginTop: "50px", padding: "30px", background: "#ffeb3b", borderRadius: "10px" }}>
          <h3>📭 Nenhum documento encontrado</h3>
          <p>Vá para o <a href="http://localhost:1337/admin" target="_blank">Strapi Admin</a> e crie seu primeiro documento!</p>
        </div>
      )}
    </div>
  );
}

export default App;
