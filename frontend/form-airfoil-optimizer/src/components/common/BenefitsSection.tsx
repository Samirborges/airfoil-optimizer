import './BenefitsSection.css';
import aviaoLandPage from '../../img/AviaoLandPageTest.png';
import { Zap, Target, Upload, Plane } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Velocidade no desenvolvimento',
      description: 'O sistema entrega automaticamente sugestões de perfis e design aerodinâmico, permitindo que você gaste mais tempo com design das quais.',
      color: '#3b82f6'
    },
    {
      icon: Target,
      title: 'Maior precisão no projeto',
      description: 'Identifica problemas como fluxo dos perfis e superfície refletiva, otimizando o formato das asas antes de começar construção do seu projeto.',
      color: '#10b981'
    },
    {
      icon: Upload,
      title: 'Exportação prática para uso imediato',
      description: 'Gere arquivos SVG prontos para uso técnico ou CSV com coordenadas de todos seus pontos, facilitando integração com software de projeto.',
      color: '#06b6d4'
    },
    {
      icon: Plane,
      title: 'Adaptação à missão de voo',
      description: 'Configure parâmetros como levante, arrasta e velocidade de resposta para mapear o perfil mais adequado pensando na performance e eficiência do projeto.',
      color: '#10b981'
    }
  ];

  return (
    <section className="benefits">
      <div className="benefits-container">
        <div className="benefits-content">
          <div className="benefits-image">
            <div className="image-placeholder-clean">
              <img
                src={aviaoLandPage}
                alt="Aeronave - AeroProfile AI"
                className="airplane-photo-clean"
              />
            </div>
          </div>
          
          <div className="benefits-text">
            <h2 className="benefits-title">
              <span className="highlight">Benefícios</span> de usar o AeroProfile AI
            </h2>
            
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div 
                    className="benefit-icon"
                    style={{ backgroundColor: `${benefit.color}20`, color: benefit.color }}
                  >
                    <benefit.icon size={24} />
                  </div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;