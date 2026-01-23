# %% 
import numpy as np 
# %%
original = np.array([[10, 20, 30], [40, 50, 60], [  70, 80, 90]])
# %%
print(f"Original")
print(original)
# %%
# Slice ( VIEW )
fatia = original[0:2, :] # pega primeiro as 2 linhas
print(f"Fatia :view")
print(fatia)

# %%
# Modificar a view
fatia[0, 0] = 999

print("Fatia modificada")
print(fatia)
# %%
print("Oriignal")
print(original)

# %%
# usando COPY
import numpy as np
array = np.array([[10, 20, 30],
                     [40, 50, 60],
                     [70, 80, 90]])


# %%
print("Original antes:")
print(array)

# %%
# COPIA IDENPENDEER
fatia = array[0:2, :].copy()

print("Fatia")
print(fatia)
# %%
# 3. Modificar a cópia
fatia[0, 0] = 999

print("\nFatia depois de modificar:")
print(fatia)

print("\nOriginal depois:")
print(array)  # AGORA OLHA A DIFERENÇA!
# %%
