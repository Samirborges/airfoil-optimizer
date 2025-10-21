import { useMemo } from 'react';
import './AirplaneVisualization.css';

interface AirplaneVisualizationProps {
  envergadura: number;
  cordaMedia: number;
  pesoEstimado: number;
  velocidadeCruzeiro: number;
}

const AirplaneVisualization = ({ 
  envergadura, 
  cordaMedia, 
  pesoEstimado, 
  velocidadeCruzeiro 
}: AirplaneVisualizationProps) => {
  
  // Cálculos para dimensionamento proporcional da asa
  const dimensions = useMemo(() => {
    // Normalizar valores para a visualização (escala relativa)
    const baseWingspan = Math.max(envergadura * 25, 120); // Mínimo 120px
    const baseChord = Math.max(cordaMedia * 40, 20); // Mínimo 20px
    
    // Calcular aspect ratio da asa
    const aspectRatio = envergadura / (cordaMedia || 1);
    
    return {
      wingspan: Math.min(baseWingspan, 450), // Máximo 450px para caber na tela
      chord: Math.min(baseChord, 60),
      aspectRatio: aspectRatio,
      scale: Math.min(1, 450 / baseWingspan) // Fator de escala
    };
  }, [envergadura, cordaMedia]);

  const viewBoxWidth = 500;
  const viewBoxHeight = 300;
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;

  return (
    <div className="airplane-visualization">
      <div className="visualization-header">
        <h3>Visualização do Perfil da Asa</h3>
        <div className="aspect-ratio-info">
          <span>Aspect Ratio: {(envergadura / (cordaMedia || 1)).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="airplane-container">
        <svg 
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
          className="airplane-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          
          {/* Asa principal - baseada na envergadura e corda média */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={dimensions.wingspan / 2}
            ry={dimensions.chord / 2}
            fill="url(#wingGradient)"
            opacity="0.9"
            stroke="#1e40af"
            strokeWidth="2"
          />
          
          {/* Dimensões anotadas */}
          <g className="dimension-lines">
            {/* Linha de envergadura */}
            <line
              x1={centerX - dimensions.wingspan / 2}
              y1={centerY - dimensions.chord / 2 - 30}
              x2={centerX + dimensions.wingspan / 2}
              y2={centerY - dimensions.chord / 2 - 30}
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <text
              x={centerX}
              y={centerY - dimensions.chord / 2 - 35}
              textAnchor="middle"
              fontSize="12"
              fill="#10b981"
              fontWeight="bold"
            >
              Envergadura: {envergadura}m
            </text>
            
            {/* Linha de corda */}
            <line
              x1={centerX + dimensions.wingspan / 2 + 15}
              y1={centerY - dimensions.chord / 2}
              x2={centerX + dimensions.wingspan / 2 + 15}
              y2={centerY + dimensions.chord / 2}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <text
              x={centerX + dimensions.wingspan / 2 + 35}
              y={centerY + 3}
              textAnchor="middle"
              fontSize="12"
              fill="#ef4444"
              fontWeight="bold"
              transform={`rotate(90, ${centerX + dimensions.wingspan / 2 + 35}, ${centerY + 3})`}
            >
              Corda: {cordaMedia}m
            </text>
          </g>
        </svg>
      </div>
      
      <div className="specs-display">
        <div className="spec-grid">
          <div className="spec-item">
            <span className="spec-label">Envergadura:</span>
            <span className="spec-value">{envergadura || 0}m</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Corda Média:</span>
            <span className="spec-value">{cordaMedia || 0}m</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Peso:</span>
            <span className="spec-value">{pesoEstimado || 0}kg</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Velocidade:</span>
            <span className="spec-value">{velocidadeCruzeiro || 0}m/s</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Aspect Ratio:</span>
            <span className="spec-value">{(envergadura / (cordaMedia || 1)).toFixed(2)}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Área da Asa:</span>
            <span className="spec-value">{(envergadura * cordaMedia).toFixed(2)}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirplaneVisualization;