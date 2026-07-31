import KnotMark from "@/components/KnotMark";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  HeartHandshake,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Missão inicial",
    description:
      "Co-desenvolver e validar práticas simples de atendimento neuroinclusivo em saúde, começando por um fluxo pequeno, ético e mensurável.",
  },
  {
    icon: Eye,
    title: "Visão",
    description:
      "Transformar neuroinclusão em práticas concretas, avaliáveis e replicáveis em ambientes de saúde e, futuramente, de trabalho.",
  },
  {
    icon: ShieldCheck,
    title: "Responsabilidade",
    description:
      "Construir com governança institucional, participação técnica e social, proteção de dados e limites claros de atuação.",
  },
];

const About = () => (
  <div className="space-y-16 pb-10">
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-hero px-7 py-16 text-white shadow-2xl md:px-14 md:py-20">
      <div className="dot-grid absolute inset-0 opacity-15" aria-hidden="true" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] backdrop-blur-sm">
            Sobre o projeto
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Neuroinclusão precisa sair do discurso e entrar na experiência.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
            A Inclu@tech é um projeto de tecnologia social voltado à redução de
            barreiras sensoriais, comunicacionais, informacionais, processuais e
            culturais enfrentadas por pessoas neurodivergentes.
          </p>
        </div>
        <div className="mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[18%] border border-white/20 bg-white/10 p-9 backdrop-blur-sm">
          <KnotMark className="h-full w-full text-white" />
        </div>
      </div>
    </section>

    <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div>
        <span className="section-kicker">Origem</span>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight">
          Uma vivência real, tratada com responsabilidade técnica.
        </h2>
      </div>
      <div className="space-y-5 text-lg leading-8 text-muted-foreground">
        <p>
          O projeto nasceu da experiência de Jean Cesar Villela Rodrigues como pai
          do Joaquim, uma criança autista com alta necessidade de suporte, e de sua
          atuação por mais de 13 anos em ambiente hospitalar.
        </p>
        <p>
          Essa trajetória permitiu observar como espera, estímulos, mudanças de
          rotina e comunicação pouco previsível podem ampliar sofrimento. A vivência
          pessoal, porém, não substitui evidência científica, governança institucional
          nem a participação de pessoas neurodivergentes.
        </p>
        <p>
          Por isso, a Inclu@tech não se apresenta como solução pronta. O caminho é
          construir instrumentos com profissionais, instituições, usuários e famílias,
          testar em pequena escala e aprender antes de expandir.
        </p>
      </div>
    </section>

    <section>
      <div className="mb-10 text-center">
        <span className="section-kicker">Direção estratégica</span>
        <h2 className="mt-5 text-4xl font-extrabold">O que orienta a construção</h2>
      </div>
      <div className="grid gap-7 md:grid-cols-3">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <Card key={principle.title} className="rounded-3xl border-2 border-transparent bg-gradient-card shadow-lg transition hover:border-primary/20 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-4 text-2xl font-extrabold">{principle.title}</h3>
                <p className="leading-7 text-muted-foreground">{principle.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>

    <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl md:p-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero">
            <Users className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Escopo atual</h2>
          <p className="mt-4 leading-7 text-white/70">
            O primeiro ciclo está concentrado em atendimento em saúde: mapear um
            fluxo real, identificar barreiras e avaliar um conjunto limitado de
            melhorias de baixo custo.
          </p>
        </div>
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-pink-300">
            <HeartHandshake className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Visão futura</h2>
          <p className="mt-4 leading-7 text-white/70">
            Depois de gerar evidência, o método poderá inspirar soluções para
            ambientes de trabalho, apoio a famílias e ferramentas digitais. Essas
            frentes não fazem parte do micro-piloto inicial.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
