import { useLocation } from "react-router-dom";
import "./ResultPage.css";

// {
//   "mensagem": "Payload gerado com sucesso! Veja o terminal.",
//   "Retorno": {
//     "analysis": {
//       "max_thickness": "12.5%",
//       "camber_position": "40%",
//       "estimated_profile": "NACA 2412",
//       "estimated_CL": 0.6,
//       "estimated_CD": 0.04,
//       "lift_to_drag_ratio": 15
//     },
//     "optimization": {
//       "suggested_profile": "NACA 2415",
//       "optimized_CL": 0.65,
//       "optimized_CD": 0.035,
//       "lift_to_drag_ratio": 18.57,
//       "geometry_adjustments": [
//         "Aumentar a curvatura do perfil para melhorar a eficiência aerodinâmica",
//         "Deslocar o ponto de máxima espessura para 42% do comprimento da corda",
//         "Reduzir o camber para diminuir a resistência ao avanço"
//       ]
//     },
//     "justification": {
//       "rationale": "Ajustes geométricos sugeridos visam melhorar a eficiência aerodinâmica do perfil de asa, aumentando a relação entre sustentação e resistência",
//       "expected_result": "Aumento de 15% na eficiência aerodinâmica do perfil de asa"
//     }
//   }
// }

export default function ResultsPage() {
  const location = useLocation();
  const payload = location.state?.payload;

  return (
    <div className="page-result">
      <h1>Results Page</h1>
      <pre>{JSON.stringify(payload, null, 2)}</pre>

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

      {/* Temporario, devem ser removido depois */}
      <footer></footer>
    </div>
  );
}
