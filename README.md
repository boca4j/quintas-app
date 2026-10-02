# Quintas & Eventos — Frontend

Frontend em React de uma plataforma de reserva de quintas e espaços para eventos
(casamentos, batizados, eventos de empresa). Permite pesquisar espaços, ver o
detalhe de cada um, fazer e gerir reservas, e marcar favoritos. Os dados vêm de
uma API REST fornecida (tema `quintas`).

Projeto da UC00621 — Criar Aplicações em React.

**Grupo:** _Madalena Ferreira, Leonor Policarpo, Martim Jacob_

## 1. Requisitos

- **Node.js 20.19 ou superior** (confirma com `node -v`)
- A **API do projeto** a correr em `http://localhost:3001` (ver secção 3)

## 2. Tecnologias

| Tecnologia | Para quê |
|---|---|
| **Vite** | Servidor de desenvolvimento e build. |
| **React 19** | Interface com componentes de função e hooks. |
| **react-router-dom 7** | Navegação entre páginas. |
| **Tailwind CSS 4** | Estilos (configurados em `index.css`). |
| **fetch** | Pedidos à API. |

## 3. Iniciar a API

A API fica numa pasta **à parte**, fora deste repositório. Na pasta da API:

```bash
npm install
npm run seed
npm start
```

Isto arranca a API em `http://localhost:3001`. Deixa este terminal aberto
enquanto trabalhas no frontend.

O nosso tema é **`quintas`**, por isso todos os pedidos começam por
`http://localhost:3001/quintas`.

## 4. Instalar e iniciar o frontend

Na pasta `quintas-app`, num terminal:

```bash
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências (só é preciso uma vez). |
| `npm run dev` | Inicia a aplicação em modo de desenvolvimento (Vite). |

O terminal mostra o endereço local (por norma `http://localhost:5173`). Abre-o no
browser. Para parar: `Ctrl + C`.

> A aplicação precisa da API ligada para carregar os dados. Sem ela, aparece a
> mensagem "Failed to fetch".

## 5. Aplicar as imagens dos espaços

Os espaços começam sem imagem (`imagem: null` na API). As imagens que escolhemos
estão em `scripts/imagens.json` (um link por cada `id` de espaço) e aplicam-se à
API com um script.

Com a API a correr, na pasta `quintas-app`:

```bash
node scripts/aplicarImagens.js
```

O script lê o `imagens.json` e faz um pedido `PATCH` à API por cada espaço,
mostrando no terminal o resultado de cada um. A seguir, recarrega a página do
catálogo — os cartões passam a mostrar as fotos.

> As imagens ficam guardadas no `dados.db` da API. Como esse ficheiro não vai no
> repositório, quem clonar o projeto de novo tem de correr este comando para ter
> as imagens.

## 6. Estrutura do projeto

```
src/
  api/         quintasApi.js — todas as chamadas à API
  components/  componentes reutilizaveis (cartoes, barra de filtros, formulario...)
  hooks/       hooks proprios (useItens, useItem, useReservas, useFavoritos)
  pages/       uma pagina por rota
  utils/       funcoes puras (filtros, datas, validacoes)
scripts/       imagens.json + aplicarImagens.js
```

### Rotas

| Rota | Página | O que mostra |
|---|---|---|
| `/` | `ListaEspacosPage` | Lista de espaços, com pesquisa, filtros e ordenação |
| `/espacos/:id` | `DetalhePage` | Detalhe de um espaço e formulário de reserva |
| `/minhas-reservas` | `MinhasReservasPage` | Reservas feitas, com opção de cancelar |
| `/favoritos` | `FavoritosPage` | Espaços marcados como favoritos |

## 7. Funcionalidades

- **Listagem de espaços** com pesquisa por texto (nome e descrição, ignora
  acentos e maiúsculas), filtros de região e tipo de espaço (opções geradas a
  partir dos próprios dados), e ordenação por preço e por avaliação.
- **Detalhe de um espaço**, com toda a informação e um formulário de reserva.
- **Formulário de reserva** — datas de início e fim, número de convidados (até à
  capacidade do espaço), nome e email — com validação no cliente e verificação de
  disponibilidade na API antes de submeter. Mostra o total calculado.
- **As minhas reservas**, com opção de cancelar.
- **Favoritos**, guardados no browser com `localStorage`.

## 8. Decisões

- **"As minhas reservas" mostra todas as reservas** devolvidas por
  `GET /quintas/reservas`. A API não tem utilizadores nem login, por isso não há
  forma de distinguir as reservas de cada pessoa.
- **A pesquisa, os filtros e a ordenação são feitos no frontend** — a API devolve
  todos os itens e é a aplicação que os filtra e ordena.
- **Os favoritos guardam apenas os `id`** dos espaços no `localStorage`.

## 9. Entrega

Entrega-se o projeto `quintas-app` **sem a pasta `node_modules/`**, mais o
ficheiro **`dados.db`** da API (onde ficam as reservas e as imagens), comprimido
num `.zip` com o nome dos elementos do grupo. 
