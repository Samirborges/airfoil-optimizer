import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";
import { MoveLeft, Send } from "lucide-react";

export default function ResultsPage() {
  const location = useLocation();
  const payload = location.state?.payload;
  const navigate = useNavigate();

  return (
    <div className="page-result">
      <header>
        <nav className="nav-bar">
          <button
            className="btn-back-calculate"
            onClick={() => navigate("/forms")}
          >
            <MoveLeft />
            Calculadora
          </button>
          <div className="content-header">
            <h1>Analise do Perfil</h1>
            <ul>
              <li>Resultado</li>
              <li>Documentação</li>
              <li>Sobre a Corvos</li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <h3 className="title-analysis">Analise do Perfil</h3>
        <div className="line-info-perfil">
          <div className="container-info">
            <h4>Espessura Máxima</h4>
            <p>{payload?.Retorno.analysis.max_thickness}</p>
          </div>
          <div className="container-info">
            <h4>Posição Câmber</h4>
            <p>{payload?.Retorno.analysis.camber_position}</p>
          </div>
          <div className="container-info">
            <h4>Perfil Estimado</h4>
            <p>{payload?.Retorno.analysis.estimated_profile}</p>
          </div>
          <div className="container-info">
            <h4>CL Estimado</h4>
            <p>{payload?.Retorno.analysis.estimated_CL}</p>
          </div>
          <div className="container-info">
            <h4>CD Estimadoo</h4>
            <p>{payload?.Retorno.analysis.estimated_CD}</p>
          </div>
          <div className="container-info">
            <h4>Proporção de levantar para arrastar</h4>
            <p>{payload?.Retorno.analysis.lift_to_drag_ratio}</p>
          </div>
        </div>
        <h3 className="title-analysis">Otimização</h3>
        <div className="line-info-perfil">
          <div className="container-info">
            <h4>Sugestão de Perfil</h4>
            <p>{payload?.Retorno.optimization.suggested_profile}</p>
          </div>
          <div className="container-info">
            <h4>CL Otimizado</h4>
            <p>{payload?.Retorno.optimization.optimized_CL}</p>
          </div>
          <div className="container-info">
            <h4>CD Otimizado</h4>
            <p>{payload?.Retorno.optimization.optimized_CD}</p>
          </div>
          <div className="container-info">
            <h4>Proporção de levantar para arrastar</h4>
            <p>{payload?.Retorno.optimization.lift_to_drag_ratio}</p>
          </div>
        </div>
        <div className="ajustes-geometricos-container">
          <h3 className="title-analysis">Ajustes Geomêtricos</h3>
          <ul className="list-adjustments">
            {payload?.Retorno.optimization.geometry_adjustments.map(
              (adjustment: string, index: number) => (
                <li key={index}>{adjustment}</li>
              )
            )}
          </ul>
        </div>
        <div className="jusficativas">
          <div className="container-justify">
            <h3 className="title-analysis">Justificativas</h3>
            <p>{payload?.Retorno.justification.rationale}</p>
          </div>
          <div className="container-justify">
            <h3 className="title-analysis">Resultados Esperados</h3>
            <p>{payload?.Retorno.justification.expected_result}</p>
          </div>
        </div>
      </main>

      <footer>
        <footer className="forms-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p>Otimizador de Perfil de Asa</p>
              <p>Produzido por: Alunos da Universidades Tiradentes</p>
              <p>Grupo: Corvos Aerodesign</p>
            </div>
            <div className="footer-contact">
              <p>Dúvidas? Envie uma mensagem</p>
              <div className="contact-form">
                <input type="text" placeholder="Digite algo..." />
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Send size={16} />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
}
