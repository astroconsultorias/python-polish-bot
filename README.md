# Inclu@tech

Tecnologia social para reduzir barreiras em saúde, ampliar oportunidades de trabalho e conectar pessoas, organizações e conhecimento em torno da neuroinclusão.

> **Status:** projeto e plataforma em estruturação e validação. O repositório não representa parceria formal, protocolo clínico, pesquisa aprovada ou autorização do Hospital de Clínicas de Porto Alegre ou de qualquer outra organização.

## Visão do produto

A aplicação reúne cinco camadas:

1. **Site institucional** — propósito, problema, método, princípios, origem e formas de participação.
2. **Oportunidades profissionais** — consulta de vagas, filtros, detalhes e candidaturas.
3. **Painel de talentos** — perfil profissional, competências, preferências e acompanhamento de candidaturas.
4. **Painel de organizações** — perfil institucional, criação e gestão de vagas e acompanhamento das pessoas candidatas.
5. **Administração e conhecimento** — usuários, permissões, vagas, candidaturas e artigos.

A primeira proposta de validação institucional da Inclu@tech permanece restrita a um micro-piloto de atendimento neuroinclusivo em um fluxo de saúde. As funções de trabalho e renda fazem parte da visão de impacto e da plataforma, mas não devem ser confundidas com um piloto hospitalar aprovado.

## Identidade visual

- **Símbolo:** Ponto Protegido — a pessoa no centro e o ambiente preparado para acolher.
- **Índigo:** `#4B3F72`
- **Coral:** `#E76F61`
- **Fundo:** `#F8F7FA`
- **Grafite:** `#17151D`
- **Tipografia:** Plus Jakarta Sans

## Tecnologias

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui e Radix UI
- React Router
- React Hook Form e Zod
- TanStack Query
- Supabase Auth e Postgres
- Netlify para deploy e previews

## Funcionalidades

### Público

- página inicial institucional completa;
- página aprofundada do projeto;
- página de participação para talentos, organizações, instituições e comunidade;
- listagem e filtro de vagas;
- visualização detalhada da oportunidade;
- hub de conteúdos e página individual de artigo;
- termos, privacidade e página 404;
- navegação responsiva e acessível.

### Pessoa ou talento

- criação e autenticação de conta;
- perfil profissional progressivo;
- campos opcionais para identidade e acomodações;
- consulta e candidatura a vagas;
- prevenção de candidatura duplicada;
- acompanhamento de etapas e histórico.

### Organização

- perfil institucional;
- criação, edição, publicação, pausa e exclusão de vagas próprias;
- acompanhamento de candidaturas relacionadas às próprias vagas;
- atualização de etapas;
- acesso limitado aos dados das pessoas que efetivamente se candidataram.

### Administração

- gestão de conteúdos;
- gestão de usuários e permissões;
- visão global de vagas;
- gestão de candidaturas;
- proteção por função administrativa.

## Configuração local

Requisitos: Node.js 18+ e npm.

```bash
git clone https://github.com/astroconsultorias/python-polish-bot.git
cd python-polish-bot
npm install
cp .env.example .env
npm run dev
```

Variáveis necessárias:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Nunca coloque a chave `service_role` no frontend ou em arquivos públicos.

## Banco de dados e permissões

A aplicação utiliza as tabelas:

- `profiles`
- `talents`
- `companies`
- `jobs`
- `applications`
- `blog_posts`
- `user_roles`

A migração abaixo foi adicionada para permitir o fluxo de autosserviço das organizações com Row Level Security:

```text
supabase/migrations/20260801052000_company_opportunity_workflows.sql
```

Ela precisa ser revisada e aplicada no projeto Supabase antes de considerar os fluxos autenticados prontos para produção. A existência do arquivo no GitHub não significa que a migração já foi executada no banco remoto.

## Validação antes do merge

Execute:

```bash
npm run build
npm run lint
```

Teste no ambiente conectado ao Supabase:

1. criar uma conta de talento;
2. completar e editar o perfil profissional;
3. criar uma conta de organização;
4. completar o perfil institucional;
5. criar, editar, pausar e publicar uma vaga;
6. candidatar o talento à vaga;
7. confirmar que a organização enxerga somente candidaturas às próprias vagas;
8. atualizar a etapa e confirmar o painel do talento;
9. testar administração com uma conta autorizada;
10. verificar responsividade, teclado, foco, mensagens de erro e contraste.

O deploy preview do pull request valida o build de produção do frontend. Ele não substitui testes ponta a ponta com contas reais nem confirma que as migrações foram executadas no banco remoto.

## Deploy

O Netlify gera uma prévia para cada pull request. O deploy de produção deve acontecer somente após:

- build bem-sucedido;
- migrações aplicadas;
- teste autenticado ponta a ponta;
- revisão dos textos institucionais;
- validação de termos e privacidade por profissional competente quando o projeto entrar em operação pública;
- definição do domínio e dos canais oficiais de contato.

## Princípios

- participação real de pessoas neurodivergentes e famílias;
- centralidade na pessoa;
- redução de barreiras, não normalização da pessoa;
- linguagem clara e baixa fricção;
- dados mínimos e finalidade definida;
- evidência e transparência;
- sustentabilidade econômica subordinada à missão.

## Contato atual

`astroconsultorias@gmail.com`

Porto Alegre, Rio Grande do Sul, Brasil.
