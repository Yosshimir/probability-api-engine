from abc import ABC, abstractmethod
import math
import numpy as np
import random
from scipy.integrate import quad

class ProbabilityDistribution(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def get_probability(self):
        pass

    @abstractmethod
    def get_sample(self):
        pass
    
#Discrete Functions

class Binomial(ProbabilityDistribution):
    def __init__(self, n, p):
        self.n = n
        self.p = p

    def get_probability(self,x,acc):
        if acc:
            resultado_acumulado = 0
            for i in range(x + 1):
                coeficiente = math.comb(self.n, i)
                probabilidad =coeficiente * ((self.p ** i) * ((1 - self.p) ** (self.n - i)))
                resultado_acumulado += probabilidad
            return resultado_acumulado
            
        else:
            coeficiente = math.comb(self.n, x)
            probabilidad =coeficiente * ((self.p ** x) * ((1 - self.p) ** (self.n - x)))
            return probabilidad
        
    def get_sample(self, cardinality):
        sample=[]
        for i in range(cardinality):
            u=random.random()
            k=0
            f=self.get_probability(k,0)
            while True:
                f+=self.get_probability(k,0)
                if(f>u):
                    break
                k=k+1
            sample.append(k)
        return sample

class Negative_Binomial(ProbabilityDistribution):
    def __init__(self, p, r):
        self.p = p
        self.r = r

    
    def get_probability(self,x,acc):
        if acc:
            resultado_acumulado = 0
            for i in range(x + 1):
                coeficiente = math.comb(i +(self.r- 1), i)
                probabilidad =coeficiente * ((self.p ** self.r) * ((1 - self.p) ** i))
                resultado_acumulado += probabilidad
            return resultado_acumulado
        else:
            coeficiente = math.comb( x + (self.r - 1), x)
            probabilidad =coeficiente * ((self.p ** self.r) * ((1 - self.p) ** x))
            return probabilidad
        
    def get_sample(self, cardinality):
        sample=[]
        for i in range(cardinality):
            u=random.random()
            k=0
            f=self.get_probability(k,1)
            while True:
                f+=self.get_probability(k,1)
                if(f>u):
                    break
                k=k+1
            sample.append(k)
        return sample
            

class Poisson(ProbabilityDistribution):
    def __init__(self,lam):
        self.lam = lam

    def get_probability(self,x,acc):
        if acc:
            resultado_acumulado = 0
            for i in range(x + 1):
                probabilidad = (math.exp(-self.lam) * self.lam**i) / math.factorial(i)
                resultado_acumulado += probabilidad
            return resultado_acumulado
        else:
            probabilidad = (math.exp(-self.lam) * self.lam**x) / math.factorial(x)
            return probabilidad
        
    def get_sample(self, cardinality):
        sample=[]
        for i in range(cardinality):
            u=random.random()
            k=0
            f=self.get_probability(k,1)
            while True:
                f+=self.get_probability(k,1)
                if(f>u):
                    break
                k=k+1
            sample.append(k)
        return sample


#Continue Functions

class NormalDistribution(ProbabilityDistribution):
    def __init__(self,mu, sd):
        self.mu=mu
        self.sd=sd
    #Ojo esta es función es la normal estandarizada    
    def getFunctionValue(self, z):
        coef=1/(self.sd*(math.sqrt(2*(math.pi))))
        exp=np.exp(-0.5*pow((z),2))
        return (coef*exp)  
    
    def get_probability(self,x,acc):
        if acc:
            z=(x-self.mu)/self.sd
            p=quad(self.getFunctionValue,np.NINF, z)
            return p[0]
        else:
            z=(x-self.mu)/self.sd
            return self.getFunctionValue(z)
    
    #Aplicamos el método del rechazo
    def get_sample(self, cardinality):
        sample=[]
        #print(self.sd)
        for i in range(cardinality):
            while True:
                u=random.random()
                fu=random.random()
                z=(u-self.mu)/self.sd
                fz=self.getFunctionValue(z)
                if(fu<=fz):
                    sample.append(u)
                    break
        return sample

class ExponentialDistribution(ProbabilityDistribution):
    def __init__(self,lam):
        self.lam=lam
        
    def getFunctionValue(self, x):
        if x<0:
            return 0
        else:
            return (self.lam*math.exp(-self.lam*x))
    
    def get_probability(self,x,acc):
        if acc:
            p=quad(self.getFunctionValue, 0, x)
            return p[0]
        else:
            return self.getFunctionValue(x)
    def get_sample(self, cardinality):
        sample=[]
        #print(self.sd)
        for i in range(cardinality):
            while True:
                u=random.random()
                fu=random.random()
                z=u
                fz=self.getFunctionValue(z)
                if(fu<=fz):
                    sample.append(u)
                    break
        return sample
    
class GammaDistribution(ProbabilityDistribution):
    def __init__(self,alpha,beta):
        self.alpha= alpha
        self.beta = beta
        
    def getFunctionValue(self, x):
        if x<0:
            return 0
        elif x>=0:
            first = self.beta/math.gamma(self.alpha)
            second= math.pow(self.beta * x,self.alpha-1)
            third = math.exp(-self.beta*x)
            return (first*second*third)
        
    def get_probability(self,x,acc):
        if acc:
            p=quad(self.getFunctionValue,np.NINF,x)
            return p[0]
        else:
            return self.getFunctionValue(x)
    
    def get_sample(self, cardinality):
        sample=[]
        #print(self.sd)
        for i in range(cardinality):
            while True:
                u=random.random()
                fu=random.random()
                z=u
                fz=self.getFunctionValue(z)
                if(fu<=fz):
                    sample.append(u)
                    break
        return sample
    

class DistributionFactory:
    def get_instance(self, dist_type, params):
        if dist_type == "Binomial":
            return Binomial(params['n'], params['p'])
        elif dist_type == "Negative Binomial":
            return Negative_Binomial(params['p'], params['r'])
        elif dist_type == "Poisson":
            return Poisson(params['lambda'])
        elif dist_type == "Normal":
            return NormalDistribution(params['mu'],params['sd'])
        elif dist_type == "Exponential":
            return ExponentialDistribution(params['lam'])
        elif dist_type == "Gamma":
            return GammaDistribution(params['alpha'],params['beta'])
        
p = GammaDistribution(1,1)
print(p.get_probability(1,0))