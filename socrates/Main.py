from Zoo import Gato


class GatoCallejero(Gato):
    def _init_(self, name="X"):
        Gato._init_(self)
        self.name = name
        self._color = "red"
        self.__edad = 0
    def mostrarAtributos(self):
        Gato.__init__(self)
        print(self.nombre)
        print(self._color)
        #print(self.__edad)
        


m = GatoCallejero()
m.mostrarAtributos()


# g1 = Gato()
# print(g1.name)
# print(g1.__color)
# g1.nomber = "Tom"
# print(g1.name)
# g1.__color = "Naranja"
# print(g1.__color)