from abc import ABC, abstractmethod
from math import pi
#Crear clase abstracta
class Figura(ABC):
    @abstractmethod
    def area(self):
        pass   
#Clase concreto
class Circulo(Figura):
    def __init__(self,radio=1):
        self.radio = radio
    def area(self):
        return pi*(self.radio**2)    
class Triangulo(Figura):
    def __init__(self,base=1,altura=1):
        self.base = base
        self.altura = altura
    def area(self):
        return (self.base*self.altura)/2

class FiguraFactory:
    def __init__(self):
        pass
    def get_Figura(self,type,parameters:dict):
        if type =="Cicrulo":
            return Circulo(parameters['radio'])
        else:
            if type =="Triangulo":
                return Triangulo(parameters['base'],parameters['altura'])
            
parameters={"altura":10,"base":10}
factory=FiguraFactory()
t=factory.get_Figura("Triangulo",parameters)
print(t.area())