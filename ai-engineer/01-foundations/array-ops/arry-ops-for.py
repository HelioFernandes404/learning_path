import numpy as np 

temperaturas = [10, 20, 30, 40 ,50]

# celsius = np.array(temperaturas)

for celsius in temperaturas:
    fatrenheit = (celsius * 9/5) + 32
    print(fatrenheit + 1)  