# %%
import numpy as np 

# %%

m = np.array([[2, 3, 4], 
              ['Exu', 'Ogum', 'Oxossi'],
              ['333', '777', '222']])
# %%
# Buscar terca-feria 
m[1, 1]

# %%
# linha
coluna_0 = m[:, 0]
print(coluna_0)

coluna_1 = m[:, 1]
print(coluna_1)
coluna_2 = m[:, 2]

 
# %%
# LINHAS

linha_0 = m[0, :] 
print(linha_0)
linha_2 = m[1, :]
print(linha_2)
# %%
# Atalho para LINHA
linha_0 = m[0] # linha omitir o : nada sematico foda-se.
print(f"atalho de linha {linha_0}")
# %%
