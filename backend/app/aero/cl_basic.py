import math

def calculate_cl_basic(weight_kg: float, velocity: float, span: float, chord: float, altitude: float = 0.0):
    """
    Calcula o CL necessário com base em dados básicos do aeromodelo.
    
    :param weight_kg: Peso do aeromodelo (kg)
    :param velocity: Velocidade de cruzeiro (m/s)
    :param span: Envergadura (m)
    :param chord: Corda média (m)
    :param altitude: Altitude de voo (m)
    :return: Coeficiente de sustentação requerido (float)
    """
    # Conversão para Newtons
    g = 9.81
    W = weight_kg * g  
    
    # Área da asa
    S = span * chord  
    
    # Densidade do ar (simplificação: ISA, sem correção de temperatura)
    rho0 = 1.225  # kg/m³ ao nível do mar
    rho = rho0 * math.exp(-altitude / 8500.0)  # modelo simplificado de densidade
    
    # Fórmula de CL
    CL = (2 * W) / (rho * velocity**2 * S)
    return round(CL, 4)
