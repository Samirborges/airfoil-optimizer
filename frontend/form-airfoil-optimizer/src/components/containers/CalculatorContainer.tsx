import "./CalculatorContainer.css"



const CalculatorContainer = () => {

    return(
        <div className="container-calculator">
            <h2 className="title-calculate">Otimizador de Perfil</h2>

            <div className="display-container-calculator">
                <div className="container-form">
                    <form className="form-cal">
                        <label htmlFor="envergadura">Envergadura (m)*</label>
                        <input type="number" name="envergadura" id="envergadura" placeholder="Ex: 5m" required/>
                        <label htmlFor="corda-media">Corda média (m)*</label>
                        <input type="number" name="corda-media" id="corda-media" placeholder="Ex: 1m" required />
                        <label htmlFor="peso-estimado">Peso Estimado (kg)*</label>
                        <input type="number" name="peso-estimado" id="peso-estimado" placeholder="Ex: 10kh" required />
                        <label htmlFor="velocidade-cruzeiro">Velocidade Cruzeiro (m/s)*</label>
                        <input type="number" name="velocidade-cruzeiro" id="velocidade-cruzeiro" placeholder="Ex: 10m/s" required />
                        <label htmlFor="altitude">Altitude (m)</label>
                        <input type="number" name="altitude" id="altitude" placeholder="Ex: 20m" />
                        <div className="content-buttons">
                            <button type="submit" id="invite">Enviar</button>
                            <button type="reset" id="cancel">Cancelar</button>
                        </div>
                    </form>
                </div>
                <div className="container-image">
                    <img src="https://placehold.co/503x596" alt="Placeholder" className="img-select-input-airfol" />
                </div>
            </div>
        </div>
    )
        
}

export default CalculatorContainer