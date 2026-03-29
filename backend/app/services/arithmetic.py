from abc import ABC, abstractmethod
from math import pi

class Sequence(ABC):
    def __init__(self,n):
        self.n=n
        self.terms =[]
    @abstractmethod
    def calculate(self):
        pass
    
class Fibonacci(Sequence):
    def __init__(self, n):
        super().__init__(n)
    def calculate(self):
        self.terms.append(1)
        self.terms.append(1)
        for x in range(2,self.n):
            self.terms.append(self.terms[x-1]+self.terms[x-2])
        return self.terms

class Triangular(Sequence):
    def __init__(self, n):
        super().__init__(n)
    def calculate(self):
        tot = 0
        for x in range(self.n):
            tot = tot + (x+1)
            self.terms.append(tot)
        #for x in range (int((self.n*(self.n+1))/2)):
            #self.terms.append(x+1)
        return self.terms
    
class Ulam(Sequence):
    def __init__(self, n):
        super().__init__(n)
    def calculate(self):
        self.terms.append(1)
        self.terms.append(2)
        pos = 3
        while len(self.terms) < self.n:
            count = 0;
            for j in range(len(self.terms) - 1):
                for k in range(j + 1, len(self.terms)):
                    if (self.terms[j] + self.terms[k] == pos):
                        count += 1
                    if (count > 1):
                        break;            
                if (count > 1):
                    break;
            if (count == 1):
                self.terms.append(pos);
            pos+=1
        return self.terms

class SequenceFactory:
    def __init__(self):
        pass
    def get_Instane(self,type,parameters:dict):
        if type =="Fibonacci":
            return Fibonacci(parameters['n'])
        elif type =="Triangular":
            return Triangular(parameters['n'])
        elif type =="Ulam":
            return Ulam(parameters['n'])

