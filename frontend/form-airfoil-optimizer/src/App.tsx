import "./App.css"
import Container from "./components/containers/container"
import ContainerLeft from "./components/containers/containerLeft"
import ContainerRight from "./components/containers/containerRight"
import imagem from "./img/ChatGPT Image 26 de jul. de 2025, 15_34_38.png"
import CalculatorContainer from "./components/containers/CalculatorContainer"

function App() {
  

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
            <img src="https://placehold.co/405x371" alt="Placeholder" className="img-select-input-airfol" />

          </div>
          </ContainerLeft>


          <ContainerRight>
            <img src="https://placehold.co/405x371" alt="Placeholder" className="img-select-input-airfol" />          
          </ContainerRight>
        </Container>
      </section>


      <section>
        <CalculatorContainer />
      </section>
    </>
  )
}

export default App
