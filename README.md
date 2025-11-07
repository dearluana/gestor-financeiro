# 💰 Gestor Financeiro

Um projeto simples em **Node.js** que ajuda você a **organizar suas finanças**, inserindo informações sobre dívidas e calculando o total que você deve no banco.

---

## 🚀 Funcionalidades

- Adicionar dívidas informando:
  - Nome do banco
  - Valor da dívida
  - Data de vencimento
- Calcular o **total das dívidas**
- Interface de linha de comando simples e interativa
- Código limpo e comentado (clean code)

---

## 🧠 Tecnologias Utilizadas

- **Node.js** (JavaScript runtime)
- **readline-sync** (para entrada de dados no terminal)

---

## 📦 Instalação

1. **Clone este repositório** (ou crie uma pasta para o projeto):
   ```bash
   git clone https://github.com/seuusuario/gestor-financeiro.git
   cd gestor-financeiro
   ```

2. **Inicie o projeto Node:**
   ```bash
   npm init -y
   ```

3. **Instale o pacote necessário:**
   ```bash
   npm install readline-sync
   ```

4. **Crie o arquivo principal:**
   ```bash
   touch finance-manager.js
   ```

5. **Abra o arquivo e cole o código do projeto.**

---

## ▶️ Como Executar

Após criar o arquivo `finance-manager.js`, execute o programa com o comando:

```bash
node finance-manager.js
```

---

## 💡 Exemplo de Uso

```
=== GESTOR FINANCEIRO ===

Digite o nome do banco: Santander
Digite o valor da dívida: 1500
Digite a data de vencimento (dd/mm/aaaa): 10/12/2025

Deseja adicionar outra dívida? (s/n): s

Digite o nome do banco: Nubank
Digite o valor da dívida: 800
Digite a data de vencimento (dd/mm/aaaa): 15/12/2025

Deseja adicionar outra dívida? (s/n): n

💰 Total de dívidas: R$ 2300.00
```

---

## 🧹 Estrutura do Projeto

```
gestor-financeiro/
├── finance-manager.js
├── package.json
└── README.md
```

---

## 🧑‍💻 Autor

**Luana da Silva**  
💼 Projeto pessoal para controle financeiro e aprendizado em Node.js  

---

## 🪄 Licença

Este projeto é de uso pessoal e livre para estudos.
