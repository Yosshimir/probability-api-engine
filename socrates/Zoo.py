import pickle

class Gato (object):
    _color = None
    __edad=0
    def __init__(self, nombre='Unknown',color='Colorless', edad=0):
        self.nombre=nombre
        self.color = color
        self.edad = edad
        
    def ronronear(self):
        print(self.nombre+" "+'RNRNRNRNRNRNRNRNRN')
        print("Tengo "+str(self.edad)+" "+'Años')
    
    def __add__(self, otroGato):
        self.edad=self.edad+otroGato.edad
        return self
    def save(self,nameFile):
        f=open(nameFile,"wb")
        pickle.dump(self,f)
        f.close()
        
class GatoSalvaje(Gato):
    def __init__(self, nombre='Unknown', color='Colorless', edad=0,habitat='selva'):
        super().__init__(nombre, color, edad)
        self.habitat = habitat
    def ronronear(self):
        print('GRGRGRGRGRGRNNNNN')


#Prueba de creacion de gato

