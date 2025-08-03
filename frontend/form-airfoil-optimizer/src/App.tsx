import "./App.css"
import Container from "./components/containers/container"
import ContainerLeft from "./components/containers/containerLeft"
import ContainerRight from "./components/containers/containerRight"
import imagem from "./img/ChatGPT Image 26 de jul. de 2025, 15_34_38.png"
import CalculatorContainer from "./components/containers/CalculatorContainer"
import { useState } from "react"
import type { ConfigObject } from "./types"

function App() {

  const [config, setConfig] = useState<ConfigObject>({
    img: 'a',
    envergadura: 0,
    cordaMedia: 0,
    pesoEstimado: 0,
    velocidadeCruzeiro: 0,
    altitude: 0,
  })
  
  const handleClickInvitePhoto = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log("A imagem à esquerda foi clicada!")
    console.log(event.target);
    setConfig(prevConfig => ({
      ...prevConfig,
      img: 'imagem-esquerda-selecionada.png'
    }));
  };

  const handleClickMakeDraw = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log("A imagem à direita foi clicada!")
    console.log(event.target)
    setConfig(prevConfig => ({
      ...prevConfig,
      img: "imagem-direita-selecionada.png"
    }));
  };

  return (
    <>
      <section>
        <Container>
          <ContainerLeft>
            <h2>Otimizador de Perfil</h2>
            <p>
              Otimize da melhor forma a sua asa com nosso otimizador. Entregando um ótimo desempenho do seu aeromodelo de acordo com as medidas de seu avião.
            </p>
          </ContainerLeft>
          <ContainerRight>
            <img src={imagem} alt="Otimizador" className="logo-img" />
          </ContainerRight>
        </Container>
      </section>

      <section>
        <Container>
          <ContainerLeft>
          <div className="separed">
            <img src="https://placehold.co/405x371" alt="Placeholder" className="img-select-input-airfol" onClick={handleClickInvitePhoto} />
          </div>
          </ContainerLeft>


          <ContainerRight>
            <img src="https://placehold.co/405x371" alt="Placeholder" className="img-select-input-airfol" onClick={handleClickMakeDraw} />          
          </ContainerRight>
        </Container>
      </section>


      <section>
        <CalculatorContainer config={config} setConfig={setConfig}/>
      </section>
    </>
  )
}

export default App
