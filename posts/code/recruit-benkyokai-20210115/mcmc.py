import sys
from random import random

def pi_mcmc(n):
    t = 0
    for i in range(n):
        x, y = random(), random()
        if x**2 + y**2 <= 1:
            t += 1

    return 4*t / n

print(pi_mcmc(int(sys.argv[1])))
