import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KnotMark from "@/components/KnotMark";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
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

const ecosystem = [
  {
    icon: Hospital,
    label: "Foco inicial",
    title: "Atendimento neuroinclusivo em saúde",
    description:
      "Co-desenvolver e validar práticas simples de previsibilidade, comunicação e redução de barreiras em um único fluxo de atendimento.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Plataforma ativa",
    title: "Trabalho, renda e oportunidades",
    description:
      "Conectar pessoas e organizações por meio de perfis, vagas mais claras, candidaturas acompanháveis e responsabilidade durante o processo seletivo.",
  },
  {
    icon: BookOpenText,
    label: "Conhecimento",
    title: "Conteúdo que aproxima evidência e prática",
    description:
      "Traduzir conceitos de acessibilidade, neurodiversidade e empreendedorismo social para decisões possíveis no cotidiano.",
  },
  {
    icon: Network,
    label: "Construção coletiva",
    title: "Comunidade, escuta e parceria",
    description:
      "Reunir experiência vivida, conhecimento técnico e capacidade institucional para desenvolver soluções que possam ser testadas e corrigidas.",
  },
];

const barriers = [
  {
    icon: Eye,
    title: "Barreiras invisíveis",
    description: "Ruído, luz, espera, imprevisibilidade e comunicação ambígua podem transformar uma atividade comum em uma experiência de sofrimento.",
  },
  {
    icon: MessageCircle,
    title: "Adaptações possíveis",
    description: "Informação clara, antecipação de etapas, opções de espera e mudanças de rotina podem ampliar segurança e autonomia.",
  },
  {
    icon: FlaskConical,
    title: "Evidência antes da escala",
    description: "A Inclu@tech começa com escuta, micro-pilotos e avaliação. O método só avança quando demonstrar utilidade, segurança e viabilidade.",
  },
];

const pilotSteps = ["Escuta", "Mapeamento", "Co-desenvolvimento", "Micro-piloto", "Avaliação", "Decisão responsável"];

const principles = [
  "Nada sobre pessoas neurodivergentes sem participação real.",
  "O foco está em reduzir barreiras, não em corrigir a pessoa.",
  "Informações e dados devem ter finalidade, consentimento e proteção.",
  "Impacto será comunicado com limites, resultados e aprendizados reais.",
  "Receita futura deverá sustentar a missão e ampliar acesso.",
  "Nenhuma organização será apresentada como parceira antes da autorização formal.",
];

const Home = () => (
  <div className="overflow-hidden">
    <section className="relative isolate min-h-[calc(100vh-5rem)] bg-hero-glow">
      <div className="dot-grid absolute right-0 top-20 -z-10 h-72 w-72 opacity-30" aria-hidden="true" />
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
            Tecnologia social · Neuroinclusão · Impacto
          </div>
          <p className="mb-3 text-xl font-light text-muted-foreground md:text-2xl">A pessoa no centro. O ambiente preparado.</p>
          <h1 className="mb-7 text-5xl font-extrabold leading-[1.04] tracking-tight md:text-6xl xl:text-7xl">
            Ambientes que aprendem a <span className="text-primary">incluir</span> mudam experiências e futuros.
          </h1>
          <p className="mx-auto mb-9 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl lg:mx-0">
            A Inclu@tech desenvolve caminhos para reduzir barreiras em saúde, ampliar oportunidades de trabalho e reunir pessoas, organizações e conhecimento em torno de uma inclusão que exista na prática.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="xl" asChild className="px-8 shadow-xl"><Link to="/participar">Encontre seu caminho<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            <Button size="xl" variant="outline" asChild className="border-2 px-8"><Link to="/sobre">Conheça o projeto</Link></Button>
          </div>
          <div className="mt-9 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Projeto em estruturação e validação</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <Link to="/vagas" className="font-bold text-primary hover:underline">Consultar oportunidades</Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[620px] items-center justify-center py-10 lg:py-0">
          <div className="hero-profile relative flex aspect-square w-[82%] max-w-[500px] items-center justify-center rounded-[28%] bg-primary shadow-2xl">
            <div className="absolute inset-[8%] rounded-[25%] border border-white/15" />
            <KnotMark className="relative z-10 h-[56%] w-[56%] text-white drop-shadow-2xl" title="Pessoa no centro e ambiente preparado para acolher" />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white backdrop-blur-md">
              Tecnologia pode ser método, ferramenta e relação — quando melhora a vida real.
            </div>
          </div>
          <div className="dot-stack absolute -right-2 top-10 h-32 w-12 text-primary" aria-hidden="true" />
          <div className="dot-stack absolute -bottom-1 left-2 h-32 w-12 rotate-90 text-accent" aria-hidden="true" />
        </div>
      </div>
    </section>

    <section className="border-y bg-white py-8">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {["Saúde mais previsível", "Trabalho com dignidade", "Empresas com propósito", "Comunidade com voz"].map((item) => (
          <div key={item} className="rounded-2xl bg-muted/55 px-4 py-4 text-sm font-extrabold text-foreground">{item}</div>
        ))}
      </div>
    </section>

    <section id="projeto" className="scroll-mt-24 bg-muted/55 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <span className="section-kicker">O problema que queremos enfrentar</span>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">A dificuldade nem sempre está na pessoa.</h2>
        <p className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">
          Muitas vezes, ela surge quando ambientes, comunicações e processos não consideram diferentes formas de perceber estímulos, compreender informações, trabalhar e participar. A Inclu@tech transforma essa percepção em práticas concretas, responsáveis e avaliáveis.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-7 px-6 md:grid-cols-3 lg:px-10">
        {barriers.map((barrier) => {
          const Icon = barrier.icon;
          return (
            <article key={barrier.title} className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary"><Icon className="h-7 w-7" /></div>
              <h3 className="mt-7 text-2xl font-extrabold">{barrier.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{barrier.description}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <span className="section-kicker">Todo o potencial do projeto</span>
          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">Um ecossistema de impacto, construído em etapas.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A visão é ampla, mas a execução precisa ser responsável. Cada frente tem objetivos, públicos e critérios próprios, unidos pelo compromisso de reduzir barreiras e ampliar participação.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {ecosystem.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="group rounded-[2rem] border p-8 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg"><Icon className="h-7 w-7" /></div>
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">{item.label}</span>
                </div>
                <h3 className="mt-7 text-2xl font-extrabold md:text-3xl">{item.title}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="metodo" className="scroll-mt-24 bg-[hsl(var(--foreground))] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="section-kicker section-kicker-dark">Primeira validação</span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">Um micro-piloto para aprender, não para vender uma resposta pronta.</h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              A fase inicial é restrita a um fluxo de atendimento em saúde. Unidade, público, instrumentos, dados e responsabilidades serão definidos com a instituição participante e somente após análise adequada.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/80">
              <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Um único percurso com começo, fim e responsáveis identificáveis.</p>
              <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Três a cinco melhorias priorizadas por impacto, esforço e segurança.</p>
              <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Critérios de continuidade, ajuste e interrupção definidos antes do teste.</p>
            </div>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {pilotSteps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold shadow-lg">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-5 block font-bold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <span className="section-kicker">Oportunidade e geração de renda</span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">Inclusão também precisa chegar ao trabalho.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A plataforma preserva as funcionalidades de perfis, organizações, vagas e candidaturas. O objetivo não é apenas aproximar currículos e anúncios, mas estimular descrições mais claras, processos previsíveis e relações em que competências e adaptações possam ser discutidas com respeito.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild><Link to="/vagas">Explorar oportunidades<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="outline" asChild className="border-2"><Link to="/auth?signup=true&type=company">Cadastrar organização</Link></Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-primary-light/60 p-7"><Users className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Para pessoas</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Perfil profissional, competências, preferências, candidaturas e controle sobre o que compartilhar.</p></div>
          <div className="rounded-3xl bg-accent-light/60 p-7"><Building2 className="h-8 w-8 text-accent" /><h3 className="mt-5 text-xl font-extrabold">Para organizações</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Perfil institucional, criação de vagas, transparência sobre condições e acompanhamento de candidaturas.</p></div>
          <div className="rounded-3xl bg-muted p-7 sm:col-span-2"><HeartHandshake className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Responsabilidade compartilhada</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">A tecnologia organiza o encontro. A qualidade da inclusão depende de atitudes, práticas, recursos e decisões ao longo de toda a relação.</p></div>
        </div>
      </div>
    </section>

    <section className="bg-muted/55 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <span className="section-kicker">Empreendedorismo social</span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">Lucro pode sustentar impacto. Impacto deve transformar vidas.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A Inclu@tech busca um modelo econômico ético: gerar receita para remunerar trabalho, desenvolver ferramentas, produzir conhecimento e ampliar acesso — sem transformar vulnerabilidade em marketing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle} className="flex gap-3 rounded-2xl border bg-white p-5 shadow-sm">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-6 text-muted-foreground">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="sobre" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-10">
        <div className="mx-auto flex aspect-square w-full max-w-[330px] items-center justify-center rounded-[28%] bg-primary p-16 text-white shadow-2xl">
          <KnotMark className="h-full w-full" title="Símbolo Inclu@tech" />
        </div>
        <div>
          <span className="section-kicker">A origem</span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">Uma experiência pessoal transformada em compromisso público.</h2>
          <p className="mt-7 text-lg leading-8 text-muted-foreground">
            A Inclu@tech nasceu da experiência de Jean César Villela Rodrigues como pai do Joaquim, uma criança autista com alta necessidade de suporte, e de mais de 13 anos de trabalho em ambiente hospitalar.
          </p>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Essa vivência dá sentido e conhecimento prático ao projeto, mas não substitui validação técnica, governança institucional nem participação direta de pessoas neurodivergentes. Por isso, a proposta é construir com quem vive, atende, pesquisa, trabalha e gere esses desafios.
          </p>
          <Button variant="outline" asChild className="mt-7 border-2"><Link to="/sobre">Ler a história e os princípios</Link></Button>
        </div>
      </div>
    </section>

    <section id="contato" className="scroll-mt-24 bg-white px-6 pb-20 md:pb-28 lg:px-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-primary px-7 py-14 text-center text-white shadow-2xl md:px-14 md:py-20">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Route className="mx-auto mb-6 h-12 w-12" />
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">A mudança começa com uma forma concreta de participar.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Pessoas, famílias, empresas, profissionais e instituições têm papéis diferentes — e todos podem contribuir para transformar inclusão em experiência, oportunidade e dignidade.
          </p>
          <Button size="xl" variant="secondary" asChild className="mt-9 px-8 shadow-xl"><Link to="/participar">Conhecer as formas de participar<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
