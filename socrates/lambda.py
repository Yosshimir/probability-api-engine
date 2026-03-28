#from functools import reduce
 
#f = lambda n: reduce(lambda x, _: x+[x[-1]+x[-2]], range(n-2), [0, 1])



Y = lambda t: t(t)
T=lambda f: lambda n: 1 if n <= 0 else n*(Y(f))(n-1)
fact = Y(T)

fib = lambda n: n if n <= 1 else fib(n-1) + fib (n-2)

fib2 = lambda f: lambda n: n if n <= 2 else (Y(f))(n-1) + (Y(f))(n-2)

#def sequence(n):
#    for i in range (1,n+1):
#        print(fib(i),end=" ")

#sequence(5)

fibo = Y(fib2)
print(fibo(7))


