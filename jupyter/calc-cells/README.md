Dá para montar um setup com **uv** + `.venv` por projeto e usar “célula por célula” (estilo Jupyter) para criar uma calculadora em poucos minutos. [docs.astral](https://docs.astral.sh/uv/guides/integration/jupyter/)
A ideia é: criar o projeto com `uv init`, instalar `ipykernel`, registrar um kernel apontando para a `.venv`, e então rodar o JupyterLab ou executar células `# %%` pela IDE. [docs.astral](https://docs.astral.sh/uv/guides/projects/)

## Setup do projeto (uv + .venv)
No terminal, crie um projeto novo (ex.: `calc-cells`) e inicialize: [docs.astral](https://docs.astral.sh/uv/guides/projects/)
```bash
mkdir calc-cells
cd calc-cells
uv init
```

Instale o kernel Python como dependência de desenvolvimento: [docs.astral](https://docs.astral.sh/uv/guides/integration/jupyter/)
```bash
uv add --dev ipykernel
```

Registre um kernel do projeto apontando para a `.venv` local (isso é o que faz o notebook rodar com o Python do projeto): [docs.astral](https://docs.astral.sh/uv/guides/integration/jupyter/)
```bash
uv run ipython kernel install --user --env VIRTUAL_ENV $(pwd)/.venv --name=calc-cells
```

## Rodar JupyterLab (e usar o kernel certo)
Suba o JupyterLab via uv: [docs.astral](https://docs.astral.sh/uv/guides/integration/jupyter/)
```bash
uv run --with jupyter jupyter lab
```

No JupyterLab, crie um notebook e selecione o kernel `calc-cells` (o que você acabou de instalar). [docs.astral](https://docs.astral.sh/uv/guides/integration/jupyter/)

## Calculadora com células (demo)
### Opção A: notebook (.ipynb)
No notebook, crie células assim (uma por bloco):

**Célula 1 — funções**
```python
def add(a: float, b: float) -> float:
    return a + b

def sub(a: float, b: float) -> float:
    return a - b

def mul(a: float, b: float) -> float:
    return a * b

def div(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return a / b
```

**Célula 2 — testes rápidos**
```python
add(2, 3), sub(10, 4), mul(6, 7), div(20, 5)
```

**Célula 3 — “mini UI” no terminal (input)**
```python
def calc(expr: str) -> float:
    a_str, op, b_str = expr.split()
    a, b = float(a_str), float(b_str)
    ops = {"+": add, "-": sub, "*": mul, "/": div}
    return ops[op](a, b)

calc("12 / 3")
```

### Opção B: arquivo .py com células (# %%)
Crie `calculator_cells.py` e cole:  
```python
# %%
def add(a: float, b: float) -> float:
    return a + b

def sub(a: float, b: float) -> float:
    return a - b

def mul(a: float, b: float) -> float:
    return a * b

def div(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return a / b

# %%
add(2, 3), sub(10, 4), mul(6, 7), div(20, 5)
```

Esse formato “células em `.py`” normalmente funciona bem com a extensão Jupyter (a mesma usada para notebooks) e combina com um fluxo de IDE. [cursor](https://cursor.com/docs/cookbook/data-science)

## Se for usar no Cursor
O Cursor tem docs de data science/notebooks e geralmente o passo-chave é ter a extensão Jupyter instalada e selecionar o kernel do projeto (o `calc-cells`) ao abrir o `.ipynb`. [cursor](https://cursor.com/docs/cookbook/data-science)

Você quer que essa calculadora evolua para algo mais “real” (CLI com `argparse` + testes com `pytest`), ainda mantendo células para experimentação?
