import { Button } from "@/components/ui/button";
import KnotMark from "@/components/KnotMark";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  FlaskConical,
  HeartHandshake,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Barreiras invisíveis",
    description:
      "Ruído, luz, espera, imprevisibilidade e comunicação ambígua podem transformar um atendimento simples em uma experiência de sofrimento.",
  },
  {
    icon: MessageCircle,
    title: "Adaptações possíveis",
    description:
      "Mudanças de comunicação, fluxo e ambiente podem ampliar previsibilidade, autonomia e segurança sem exigir soluções complexas.",
  },
  {
    icon: FlaskConical,
    title: "Evidência antes da escala",
    description:
      "A proposta começa com escuta, micro-pilotos e avaliação. O método só avança quando demonstrar utilidade, segurança e viabilidade.",
  },
];

const steps = [
  "Escuta",
  "Mapeamento",
  "Co-desenvolvimento",
  "Micro-piloto",
  "Avaliação",
  "Método validado",
];

const audiences = [
  {
    icon: Stethoscope,
    label: "Foco atual",
    title: "Serviços de saúde",
    description:
      "Estruturar e validar práticas de atendimento neuroinclusivo em um fluxo real, com governança institucional e participação técnica.",
  },
  {
    icon: Users,
    label: "Impacto social",
    title: "Pessoas e famílias",
    description:
      "Reduzir sofrimento evitável e ampliar previsibilidade, compreensão e participação durante a jornada de atendimento.",
  },
  {
    icon: Building2,
    label: "Visão futura",
    title: "Ambientes de trabalho",
    description:
      "Levar aprendizados validados para relações de trabalho mais humanas, acessíveis e sustentáveis, sem misturar essa etapa ao piloto inicial.",
  },
];

const Home = () => (
  <div className="overflow-hidden">
    <section className="relative isolate min-h-[calc(100vh-5rem)] bg-background">
      <div className="absolute inset-0 -z-10 bg-hero-glow" aria-hidden="true" />
      <div
        className="dot-grid absolute right-0 top-24 -z-10 h-64 w-64 opacity-40"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Tecnologia social · Saúde · Neuroinclusão
          </div>

          <p className="mb-3 text-xl font-light text-muted-foreground md:text-2xl">
            Ambientes também podem aprender a incluir.
          </p>

          <h1 className="mb-7 text-5xl font-extrabold leading-[1.04] tracking-tight md:text-6xl xl:text-7xl">
            <span className="text-gradient">Desatando barreiras invisíveis.</span>
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl lg:mx-0">
            A Inclu@tech busca tornar ambientes, atendimentos e relações mais
            previsíveis, humanos e neuroinclusivos — começando por um piloto pequeno,
            ético e mensurável em saúde.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="xl" asChild className="px-8 shadow-xl">
              <a href="#projeto">
                Conheça o projeto
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-2 px-8">
              <a href="#metodo">Entenda o piloto</a>
            </Button>
          </div>

          <div className="mt-9 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              Projeto em estruturação
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>Sem parceria institucional anunciada antes de autorização formal</span>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[620px] items-center justify-center py-10 lg:py-0">
          <div className="hero-profile relative flex aspect-square w-[82%] max-w-[500px] items-center justify-center rounded-[12%] bg-gradient-hero shadow-2xl">
            <div className="absolute inset-[9%] rounded-[10%] border border-white/20" />
            <KnotMark className="relative z-10 h-[56%] w-[56%] text-white drop-shadow-2xl" />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white backdrop-blur-md">
              A pessoa no centro. O ambiente preparado para acolher.
            </div>
          </div>
          <div className="dot-stack absolute -right-2 top-10 h-32 w-12 text-primary" aria-hidden="true" />
          <div className="dot-stack absolute -bottom-1 left-2 h-32 w-12 rotate-90 text-accent" aria-hidden="true" />
        </div>
      </div>
    </section>

    <section id="projeto" className="scroll-mt-24 bg-muted/55 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <span className="section-kicker">O problema que queremos enfrentar</span>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
          A dificuldade nem sempre está na pessoa.
        </h2>
        <p className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">
          Muitas vezes, ela surge quando ambientes, comunicações e processos não
          consideram diferentes formas de perceber estímulos, compreender informações e
          participar de uma experiência. A Inclu@tech nasce para transformar essa
          percepção em práticas concretas, responsáveis e avaliáveis.
        </p>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-kicker">Nossa tese</span>
          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
            Inclusão precisa aparecer na experiência real.
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="group rounded-3xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-4 text-2xl font-extrabold">{pillar.title}</h3>
                <p className="leading-7 text-muted-foreground">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="metodo" className="scroll-mt-24 bg-[#28213D] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="section-kicker section-kicker-dark">Como começa</span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
              Um piloto para aprender, não para prometer uma solução pronta.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              O primeiro ciclo deve ser construído com a instituição participante,
              profissionais técnicos e representação social. O escopo é deliberadamente
              pequeno para proteger usuários, equipes e a qualidade da aprendizagem.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/80">
              <p className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                Um único fluxo de atendimento, definido em conjunto.
              </p>
              <p className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                Medidas de baixo custo, com critérios claros de segurança e avaliação.
              </p>
              <p className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                Nenhuma coleta de dado sensível sem governança e autorização adequadas.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-8 h-[calc(100%-4rem)] w-px bg-white/15 md:left-1/2 md:top-7 md:h-px md:w-auto md:right-8" aria-hidden="true" />
            <ol className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:flex-col md:items-start"
                >
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero text-lg font-extrabold shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section id="impacto" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-kicker">Impacto com foco</span>
          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
            Uma visão ampla, executada em etapas responsáveis.
          </h2>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <article key={audience.title} className="rounded-3xl bg-gradient-card p-8 shadow-lg ring-1 ring-border">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero text-white shadow-lg">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary shadow-sm">
                    {audience.label}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-extrabold">{audience.title}</h3>
                <p className="leading-7 text-muted-foreground">{audience.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="sobre" className="scroll-mt-24 bg-muted/55 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-10">
        <div className="mx-auto flex aspect-square w-full max-w-[330px] items-center justify-center rounded-[18%] bg-gradient-hero p-12 shadow-2xl">
          <KnotMark className="h-full w-full text-white" />
        </div>

        <div>
          <span className="section-kicker">A origem</span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
            Uma inquietação pessoal transformada em projeto coletivo.
          </h2>
          <p className="mt-7 text-lg leading-8 text-muted-foreground">
            A Inclu@tech nasceu da experiência de Jean Cesar Villela Rodrigues como pai
            do Joaquim, uma criança autista com alta necessidade de suporte, e de mais de
            13 anos de trabalho em ambiente hospitalar.
          </p>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Essa vivência dá sentido e conhecimento prático ao projeto, mas não substitui
            validação técnica, governança institucional nem a participação direta de
            pessoas neurodivergentes. Por isso, a proposta é construir com quem vive,
            atende, pesquisa e gere esses desafios.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border bg-white px-5 py-4 font-semibold shadow-sm">
            <HeartHandshake className="h-6 w-6 text-accent" aria-hidden="true" />
            Lucro pode sustentar impacto. Impacto deve transformar vidas.
          </div>
        </div>
      </div>
    </section>

    <section id="contato" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero px-7 py-14 text-center text-white shadow-2xl md:px-14 md:py-20">
          <div className="dot-grid absolute inset-0 opacity-15" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <Route className="mx-auto mb-6 h-12 w-12" aria-hidden="true" />
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Inclusão não deve existir apenas no discurso.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Ela precisa aparecer no ambiente, no atendimento e nas oportunidades. Neste
              momento, buscamos escuta técnica, orientação institucional e parceiros para
              construir o primeiro micro-piloto com responsabilidade.
            </p>
            <Button size="xl" variant="secondary" asChild className="mt-9 px-8 shadow-xl">
              <a href="mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20conversa%20sobre%20parceria">
                Conversar sobre parceria
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
