# 🌐 Aula de HTML/CSS — Conceito e Uso do Flexbox

## 🧩 Por que usar Flexbox?
- Facilita alinhamento e distribuição de elementos.
- Resolve limitações dos métodos antigos (`float`, `inline-block`).
- Ideal para layouts responsivos e modernos.

---

## 🧱 Propriedades do Container
| Propriedade | Função | Valores Comuns |
|--------------|--------|----------------|
| `display` | Ativa o Flexbox | `flex` |
| `flex-direction` | Direção dos itens | `row`, `column` |
| `justify-content` | Alinha no eixo principal | `center`, `space-between`, `flex-end` |
| `align-items` | Alinha no eixo cruzado | `center`, `flex-start`, `flex-end` |
| `flex-wrap` | Quebra linha | `wrap`, `nowrap` |

---

## ⚙️ Propriedades dos Itens
| Propriedade | Descrição | Exemplo |
|--------------|------------|----------|
| `flex-grow` | Define crescimento | `flex-grow: 1;` |
| `flex-shrink` | Define redução | `flex-shrink: 0;` |
| `flex-basis` | Tamanho inicial | `flex-basis: 200px;` |
| `align-self` | Alinha item individualmente | `align-self: flex-end;` |

---

## 🧭 Exemplos Práticos
- **Barra de navegação** → `justify-content: space-around;`
- **Colunas responsivas** → `flex-wrap: wrap;`
- **Centralização total** → `justify-content: center; align-items: center;`

---

## 📱 Boas Práticas
- Combine Flexbox + `@media` queries.
- Use classes reutilizáveis (`.flex-center`, `.flex-column`).
- Evite `float` em layouts flex.
- Teste sempre em diferentes tamanhos de tela.

---

> 💡 **Dica:** use o site [https://flexboxfroggy.com](https://flexboxfroggy.com) para praticar os conceitos de Flexbox de forma interativa!
