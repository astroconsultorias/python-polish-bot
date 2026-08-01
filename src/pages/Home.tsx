import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KnotMark from "@/components/KnotMark";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Eye,
  FlaskConical,
  HeartHandshake,
  Hospital,
  Lightbulb,
  MessageCircle,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const entryPaths = [
  {
    icon: Users,
    title: "Sou uma pessoa ou talento",
    description: "Crie seu perfil, encontre oportunidades e acompanhe suas candidaturas.",
    to: "/auth?signup=true&type=individual",
    action: "Começar meu perfil",
    tone: "primary",
  },
  {
    icon: Building2,
    title: "Represento uma organização",
    description: "Publique vagas mais claras e desenvolva práticas de inclusão consistentes.",
    to: "/auth?signup=true&type=company",
    action: "Cadastrar organização",
    tone: "accent",
  },
  {
    icon: Hospital,
    title: "Atuo em saúde ou pesquisa",
    description: "Conheça a proposta de validação e os princípios do micro-piloto.",
    to: "/sobre#metodo",
    action: "Conhecer o método",
    tone: "lavender",
  },
  {
    icon: HeartHandshake,
    title: "Quero apoiar ou participar",
    description: "Descubra como famílias, profissionais e parceiros podem contribuir.",
    to: "/participar",
    action: "Ver formas de participar",
    tone: "soft",
  },
];

const impactAreas = [
  {
    icon: Hospital,
    label: "Saúde",
    title: "Atendimento mais previsível, compreensível e acolhedor.",
    description:
      "Mapear barreiras sensoriais, comunicacionais e processuais para co-desenvolver melhorias simples, seguras e avaliáveis em um fluxo real.",
    className: "md:col-span-2 lg:col-span-7",
    tone: "primary",
  },
  {
    icon: BriefcaseBusiness,
    label: "Trabalho e renda",
    title: "Oportunidades que valorizam competências sem ignorar necessidades.",
    description:
      "Perfis profissionais, vagas mais claras e candidaturas acompanháveis para aproximar pessoas e organizações com mais respeito e transparência.",
    className: "lg:col-span-5",
    tone: "accent",
  },
  {
    icon: BookOpenText,
    label: "Conhecimento",
    title: "Informação que sai do discurso e chega à prática.",
    description:
      "Conteúdos acessíveis para traduzir neurodiversidade, acessibilidade e empreendedorismo social em decisões possíveis no cotidiano.",
    className: "lg:col-span-5",
    tone: "soft",
  },
  {
    icon: Network,
    label: "Comunidade",
    title: "Soluções construídas com experiência vivida e responsabilidade técnica.",
    description:
      "Um espaço para reunir pessoas neurodivergentes, famílias, profissionais, instituições e organizações em torno de problemas concretos.",
    className: "md:col-span-2 lg:col-span-7",
    tone: "lavender",
  },
];

const barriers = [
  {
    icon: Eye,
    title: "O que não é visto continua ferindo",
    description:
      "Ruído, luz, espera, imprevisibilidade e comunicação ambígua podem transformar uma atividade comum em sofrimento evitável.",
  },
  {
    icon: MessageCircle,
    title: "Pequenas mudanças podem ampliar autonomia",
    description:
      "Antecipar etapas, oferecer informação clara e flexibilizar rotinas pode tornar ambientes mais seguros para diferentes formas de perceber e agir.",
  },
  {
    icon: FlaskConical,
    title: "Impacto precisa ser demonstrado",
    description:
      "A Inclu@tech começa com escuta, prototipagem e avaliação. Só avança o que mostrar utilidade, segurança e viabilidade.",
  },
];

const pilotSteps = [
  { title: "Escutar", description: "Compreender a experiência de quem vive e opera o fluxo." },
  { title: "Mapear", description: "Identificar barreiras, riscos, recursos e pontos de decisão." },
  { title: "Co-desenvolver", description: "Priorizar mudanças simples com participação real." },
  { title: "Testar", description: "Executar um micro-piloto delimitado e acompanhado." },
  { title: "Avaliar", description: "Medir utilidade, segurança, adesão e aprendizados." },
  { title: "Decidir", description: "Continuar, ajustar ou interromper com responsabilidade." },
];

const principles = [
  "Nada sobre pessoas neurodivergentes sem participação real.",
  "O foco está em reduzir barreiras, não em corrigir a pessoa.",
  "Dados precisam de finalidade, consentimento e proteção.",
  "Resultados serão comunicados com limites e aprendizados reais.",
];

const Home = () => (
  <div className="overflow-hidden bg-white">
    <section className="home-hero relative isolate">
      <div className="home-orb home-orb-one" aria-hidden="true" />
      <div className="home-orb home-orb-two" aria-hidden="true" />
      <div className="dot-grid absolute -right-10 top-28 -z-10 h-72 w-72 opacity-30" aria-hidden="true" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-24">
        <div className="relative z-10 text-center lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-accent" />
            Tecnologia social para neuroinclusão
          </div>

          <p className="mb-4 text-lg font-semibold text-primary md:text-xl">
            A pessoa no centro. O ambiente preparado.
          </p>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] md:text-6xl xl:text-[4.75rem]">
            Incluir não é pedir que alguém se adapte ao impossível.
            <span className="mt-2 block text-gradient">É transformar o ambiente.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl lg:mx-0">
            A Inclu@tech conecta saúde, trabalho, conhecimento e comunidade para reduzir barreiras invisíveis e construir experiências mais previsíveis, dignas e acessíveis.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="xl" asChild className="px-8 shadow-xl shadow-primary/20">
              <Link to="/participar">
                Quero participar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-2 bg-white/70 px-8 backdrop-blur">
              <Link to="/sobre">Conhecer o projeto</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Projeto em estruturação e validação responsável
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <Link to="/vagas" className="inline-flex items-center gap-1 font-extrabold text-primary hover:underline">
              Ver oportunidades
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px] py-8 lg:py-0">
          <div className="home-visual-stage relative mx-auto aspect-[0.94] w-[90%] overflow-hidden rounded-[2.75rem] p-7 shadow-2xl md:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,hsl(var(--primary))_0%,hsl(254_34%_46%)_58%,hsl(var(--accent))_140%)]" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-xl">
                  Ecossistema de impacto
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>

              <div className="mx-auto flex w-[62%] max-w-[280px] items-center justify-center rounded-[31%] border border-white/15 bg-white/10 p-9 text-white shadow-2xl backdrop-blur-md">
                <KnotMark className="h-full w-full" title="Pessoa no centro e ambiente preparado" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["Saúde", "Trabalho", "Conhecimento", "Comunidade"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-xl">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="home-floating-card absolute -left-2 top-[18%] hidden max-w-[190px] rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Route className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experiência</p>
                <p className="mt-1 text-sm font-extrabold">Caminhos mais previsíveis</p>
              </div>
            </div>
          </div>

          <div className="home-floating-card home-floating-card-delay absolute -right-1 bottom-[15%] hidden max-w-[205px] rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Participação</p>
                <p className="mt-1 text-sm font-extrabold">Construção com a comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="relative z-20 -mt-6 px-6 pb-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border bg-white/95 p-4 shadow-xl shadow-primary/10 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {entryPaths.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} to={item.to} className={`entry-path entry-path-${item.tone} group rounded-3xl p-5 transition duration-300 hover:-translate-y-1`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-lg font-extrabold leading-snug">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold">
                {item.action}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[hsl(var(--foreground))] p-8 text-white shadow-2xl md:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/35 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="relative z-10">
            <span className="section-kicker section-kicker-dark">Por que isso importa</span>
            <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
              A dificuldade nem sempre está na pessoa.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
              Ela também nasce de ambientes, comunicações e processos que foram desenhados para um único jeito de perceber, compreender, trabalhar e participar.
            </p>
            <div className="mt-9 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">Nosso ponto de partida</p>
              <p className="mt-3 text-xl font-bold leading-8">
                Quando o ambiente aprende, a pessoa deixa de carregar sozinha o custo da exclusão.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {barriers.map((barrier, index) => {
            const Icon = barrier.icon;
            return (
              <article key={barrier.title} className="group flex gap-5 rounded-3xl border bg-white p-6 shadow-sm transition hover:border-primary/25 hover:shadow-lg md:p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-primary/70">0{index + 1}</p>
                  <h3 className="mt-1 text-xl font-extrabold md:text-2xl">{barrier.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{barrier.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="impact-section py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-kicker">Um ecossistema, quatro frentes</span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Uma visão ampla, desenvolvida com foco e responsabilidade.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Cada frente possui objetivos e públicos próprios. Todas compartilham a mesma missão: reduzir barreiras e ampliar participação com soluções que possam ser testadas, aprendidas e melhoradas.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {impactAreas.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={`impact-card impact-card-${item.tone} ${item.className} group rounded-[2rem] border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10`}>
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] backdrop-blur">{item.label}</span>
                </div>
                <h3 className="mt-8 max-w-2xl text-2xl font-extrabold leading-tight md:text-3xl">{item.title}</h3>
                <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
        <div>
          <span className="section-kicker">Oportunidades e organizações</span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Uma plataforma para transformar intenção em prática profissional.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A tecnologia organiza perfis, vagas e candidaturas. A inclusão acontece quando descrições são claras, processos são previsíveis e as necessidades podem ser discutidas sem apagar competências.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/vagas">
                Explorar oportunidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2">
              <Link to="/auth?signup=true&type=company">Publicar uma vaga</Link>
            </Button>
          </div>
        </div>

        <div className="platform-preview relative overflow-hidden rounded-[2.5rem] border p-5 shadow-2xl md:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,hsl(var(--primary-light))_0%,white_55%,hsl(var(--accent-light))_100%)]" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border bg-white/85 p-4 shadow-sm backdrop-blur">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">Minha jornada</p>
                <p className="mt-1 font-extrabold">Perfil, vagas e candidaturas em um só lugar</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border bg-white/90 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="font-extrabold">Perfil profissional</p>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-primary" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Competências, experiências, preferências e informações opcionais.</p>
              </div>

              <div className="rounded-3xl border bg-white/90 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="font-extrabold">Painel da organização</p>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Criar vagas, acompanhar candidaturas e organizar cada etapa do processo.</p>
              </div>
            </div>

            <div className="rounded-3xl border bg-white/90 p-5 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-extrabold">Candidaturas acompanháveis</p>
                  <p className="mt-1 text-sm text-muted-foreground">Mais transparência para pessoas e organizações.</p>
                </div>
                <div className="flex gap-2 text-xs font-bold">
                  <span className="rounded-full bg-primary-light px-3 py-2 text-primary">Recebida</span>
                  <span className="rounded-full bg-accent-light px-3 py-2 text-accent">Em análise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="metodo" className="scroll-mt-24 bg-[hsl(var(--foreground))] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl">
          <span className="section-kicker section-kicker-dark">Primeira validação</span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Começar pequeno para aprender com profundidade.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            A fase inicial propõe um micro-piloto delimitado em um fluxo de atendimento em saúde. Não oferece resposta pronta: organiza escuta, decisão, teste e avaliação antes de qualquer expansão.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pilotSteps.map((step, index) => (
            <li key={step.title} className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold shadow-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CheckCircle2 className="h-5 w-5 text-accent opacity-70" />
              </div>
              <h3 className="mt-6 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Button variant="secondary" asChild>
            <Link to="/sobre#metodo">Entender a metodologia</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10">
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="aspect-square rounded-[34%] bg-primary p-16 text-white shadow-2xl md:p-20">
            <KnotMark className="h-full w-full" title="Símbolo Inclu@tech" />
          </div>
          <div className="absolute -bottom-5 -right-4 max-w-[220px] rounded-2xl border bg-white p-4 shadow-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">Ponto protegido</p>
            <p className="mt-2 text-sm font-bold leading-6">A pessoa permanece no centro. O ambiente se reorganiza para acolher.</p>
          </div>
        </div>

        <div>
          <span className="section-kicker">Uma origem pessoal, uma construção coletiva</span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Experiência vivida transformada em compromisso público.
          </h2>
          <p className="mt-7 text-lg leading-8 text-muted-foreground">
            A Inclu@tech nasceu da experiência de Jean César Villela Rodrigues como pai do Joaquim, uma criança autista com alta necessidade de suporte, e de mais de 13 anos de trabalho em ambiente hospitalar.
          </p>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Essa vivência revela problemas reais, mas não substitui conhecimento técnico, governança institucional nem a participação de pessoas neurodivergentes. O projeto existe para construir com quem vive, atende, pesquisa, trabalha e decide.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle} className="flex gap-3 rounded-2xl bg-muted/60 p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm font-semibold leading-6 text-muted-foreground">{principle}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" asChild className="mt-8 border-2">
            <Link to="/sobre">Conhecer a história e os princípios</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-muted/45 px-6 py-20 md:py-28 lg:px-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] bg-primary px-7 py-16 text-center text-white shadow-2xl md:px-16 md:py-20">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <HeartHandshake className="mx-auto h-12 w-12" />
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Uma comunidade inteira pode ajudar a tornar a inclusão concreta.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Pessoas, famílias, profissionais, organizações e instituições possuem papéis diferentes. O próximo passo é encontrar a forma de participação que faz sentido para você.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="secondary" asChild className="px-8 shadow-xl">
              <Link to="/participar">
                Encontrar meu caminho
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-white/30 bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white">
              <Link to="/vagas">Explorar oportunidades</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
