# Sintaxia — O Mundo da Programação

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

</p>

<p align="center">

Uma plataforma educacional gamificada para o ensino de lógica de programação desenvolvida como Trabalho de Conclusão de Curso (TCC) da FEMA/IMESA.

</p>

---

# 📚 Sobre o Projeto

O **Sintaxia — O Mundo da Programação** é uma plataforma web criada para tornar o aprendizado de programação mais intuitivo, divertido e motivador.

A proposta combina **gamificação**, desafios progressivos e compilação de código em tempo real para auxiliar estudantes iniciantes na construção do raciocínio lógico.

O projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** do curso de Sistemas de Informação da **FEMA/IMESA**, em 2026.

---

# ✨ Funcionalidades

## 👤 Autenticação

- Cadastro de usuários
- Login seguro com JWT
- Verificação de e-mail
- Código de confirmação de 6 dígitos
- Envio automático pelo Gmail
- Recuperação de sessão
- Bloqueio após 3 tentativas incorretas durante 15 minutos

---

## 🎯 Sistema de Desafios

- 60 desafios
- Progressão automática
- Desbloqueio por módulos
- Sistema de XP
- Sistema de níveis
- Sistema de conquistas

### Linguagens

- Algoritmos
- JavaScript

### Níveis

- 🟢 Iniciante
- 🟡 Intermediário
- 🔴 Experiente

---

## 🧠 Tipos de Desafio

| Tipo | Descrição |
|-------|-----------|
| ❓ Pergunta e Resposta | Questões objetivas |
| 🧩 Desenvolvimento | Completar trechos de código |
| 🛠 Correção | Corrigir algoritmos existentes |
| 💻 Criação Livre | Resolver utilizando um editor de código |

---

## 💻 Editor de Código

O projeto possui dois ambientes diferentes:

### Portugol

Desenvolvido inteiramente em JavaScript.

✔ Executado diretamente no navegador

✔ Não depende de servidor externo

✔ Interpretador próprio

---

### JavaScript

Editor baseado em:

- Monaco Editor
- Judge0 API

Permite:

- Compilar código online
- Executar código
- Exibir saída
- Mostrar erros de compilação

---

## 🏆 Gamificação

O sistema possui:

- XP
- Níveis
- Medalhas
- Conquistas
- Certificados

### Conquistas

- 21 conquistas desbloqueáveis

### Certificados

- 6 certificados
- Um certificado para cada linguagem e nível concluído

---

## 👥 Sistema de Amigos

O Sintaxia possui um sistema social.

Cada usuário recebe um código exclusivo.

Exemplo:

```
ABCD-1234
```

Também é possível:

- Enviar convite
- Aceitar convite
- Visualizar amigos
- Ranking por XP
- Compartilhar link de convite

---

## 🎬 Introdução dos Módulos

Antes de iniciar um módulo, o usuário pode visualizar:

- Vídeo do YouTube
- Texto explicativo

Preparando o aluno antes dos desafios.

---

# 🔒 Segurança

O projeto utiliza diversas técnicas de segurança.

- JWT
- Bcrypt
- Helmet
- Rate Limiting
- Sanitização XSS
- Proteção contra NoSQL Injection
- CORS restrito
- Validação de dados

---

# 🛠 Tecnologias

## Frontend

| Tecnologia | Uso |
|------------|-----|
| React 18 | Interface |
| Vite 5 | Build |
| React Router | Rotas |
| Tailwind CSS | Estilização |
| Monaco Editor | Editor |
| Axios | Comunicação HTTP |

---

## Backend

| Tecnologia | Uso |
|------------|-----|
| Node.js | Servidor |
| Express 5 | API REST |
| MongoDB Atlas | Banco |
| Mongoose | ODM |
| JWT | Autenticação |
| Nodemailer | Emails |
| Helmet | Segurança |
| express-rate-limit | Proteção |
| express-validator | Validação |
| Morgan | Logs |

---

## APIs Externas

| API | Finalidade |
|------|------------|
| Judge0 API | Compilador JavaScript |
| Gmail SMTP | Verificação de email |

---

# 📂 Estrutura do Projeto

```text
sintaxia/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login
│   │   │   ├── Cadastro
│   │   │   ├── VerificarEmail
│   │   │   ├── Desafios
│   │   │   ├── Introducao
│   │   │   ├── Perfil
│   │   │   └── Amigos
│   │   │
│   │   ├── components/
│   │   │   └── EditorCodigo
│   │   │
│   │   └── utils/
│   │       └── interpretadorPortugol.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│
└── README.md
```

---

# ⚙ Pré-requisitos

- Node.js 18+
- MongoDB Atlas
- Conta Gmail
- Senha de aplicativo Gmail
- RapidAPI
- Judge0 API

---

# 🚀 Instalação

## 1 Clone o projeto

```bash
git clone https://github.com/seuusuario/sintaxia.git
```

---

## 2 Entre na pasta

```bash
cd sintaxia
```

---

## 3 Instale todas as dependências

```bash
npm run install:all
```

---

## 4 Configure o arquivo `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=

FRONTEND_URL=http://localhost:5173

NODE_ENV=development
```

---

## 5 Popule o banco

```bash
npm run seed
```

---

## 6 Execute a aplicação

```bash
npm run dev
```

---

# 🔄 Fluxo de Autenticação

```text
Cadastro

↓

Código de Verificação

↓

Email enviado

↓

Confirmação

↓

Conta ativada

↓

Login

↓

JWT

↓

Rotas protegidas

↓

Plataforma
```

---

# 📈 Fluxo dos Desafios

```text
Escolha da linguagem

↓

Introdução

↓

Módulo

↓

Desafio

↓

Correção

↓

XP

↓

Conquista

↓

Próximo módulo
```

---

# 📊 Sistema de Progressão

O progresso do aluno é composto por:

- XP
- Nível
- Certificados
- Conquistas
- Histórico
- Ranking
- Amigos

Tudo fica salvo no MongoDB.

---

# 🎓 Objetivo

Criar uma plataforma moderna que torne o aprendizado de programação mais acessível por meio de desafios interativos e elementos de gamificação.

---

# 📖 Trabalho de Conclusão de Curso

**Curso**

Sistemas de Informação

**Instituição**

Fundação Educacional do Município de Assis (FEMA)

Instituto Municipal de Ensino Superior de Assis (IMESA)

**Ano**

2026

---

# 👨‍💻 Autor

**Victor Hugo Ribeiro Felix**

Trabalho de Conclusão de Curso

FEMA / IMESA

Orientador:

**Prof. Douglas Sanches da Cunha**

---

# ⭐ Agradecimentos

Agradecimentos aos professores, colegas e à FEMA/IMESA pelo apoio durante o desenvolvimento deste projeto.

---

<p align="center">

Feito com ❤️ utilizando React, Node.js, MongoDB e muita paixão por ensinar programação.

</p>